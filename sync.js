#!/usr/bin/env node

const program = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');
const request = require('request-promise-native');
const path = require('path');
const glob = require('glob');
const stagedGitFiles = require('staged-git-files');
const crypto = require('crypto');
const frontMatter = require('gray-matter');
const chalk = require('chalk');

const markdownize = require('./lib/markdownize');

const DEFAULT_CONFIG_FILE = 'config.yml';
const DEFAULT_DOCS_DIR = 'docs';
const CONFIG_APIKEY = 'apikey';
const CONFIG_DOCSVERSION = 'docsversion';

program.description(
    `Tools to sync content back and forth between this local Git repository and the remote readme.io API.
Global arguments \`apikey\` and \`docsversion\` must always be provided for each command, before the command name.
`);

program.option(
    `-k, --${CONFIG_APIKEY} <${CONFIG_APIKEY}>`,
    `API key for readme.io (required)`,
        key => process.env.APIKEY = key);
program.option(`-v, --${CONFIG_DOCSVERSION} <${CONFIG_DOCSVERSION}>`,
    `Documentation version to act upon (required)`,
        version => process.env.DOCSVERSION = version);
program.option(`-c, --config [config]`,
    `Path to the YAML configuration file. Defaults to ${DEFAULT_CONFIG_FILE}`,
        config => process.env.CONFIG_FILE = config);

program
    .command('fetch [category_slugs]')
    .description('Fetches up-to-date Markdown content files from readme.io, overwriting local files. ' +
        'When called with a comma-delimited list of category slugs, only those categories will be fetched.')
    .option('-d, --dir <dir>', 'Destination directory where docs Markdown files will be written', DEFAULT_DOCS_DIR)
    .action((slug, cmd) => {
        fetchDocs(describeCategories(cmd.dir, slug), cmd.output);
    });

program
    .command('push [category_slugs]', )
    .description('Pushes local Markdown content files to readme.io. ' +
        'When called with a comma-delimited list of category slugs, only those categories will be pushed.')
    .option('-d, --dir <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('--staged-only', `Only push files staged files that have been modified. Important: files must have been added to the index with 'git add'`)
    .option('--dry-run', `No remote content will be updated but command output will show what would be done.`)
    .action(async (slug, cmd) => {
        const options = { stagedOnly: cmd.stagedOnly, dryRun: cmd.dryRun };

        var files = findMarkdownFiles(describeCategories(cmd.dir, slug));

        if (options.stagedOnly) {
            files = await keepOnlyStagedGitFiles(files);
        }

        if (files.length === 0) {
            console.warn('No files to found to push.');
            return;
        }

        for (const file of files) {
            pushDoc(file, options);
        }
    });

program
    .command('markdownize [category_slugs]', )
    .description('Converts proprietary Readme widgets to standard Markdown.')
    .option('-d, --dir <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('-w, --widgets <widgets>', `Comma-separated list of Readme widgets to replace to Markdown. Supported widgets: 'code', 'callout', 'image', 'html'`)
    .option('-f, --file <file>', `Path to a single file to process, relative to current working directory.`)
    .option('--dry-run', `Will only output modifications that would be made, without actually saving them.`)
    .action(async (slug, cmd) => {
        const options = { dryRun: cmd.dryRun };

        var files;
        if (cmd.file) {
            files = [cmd.file];
        } else {
            files = findMarkdownFiles(describeCategories(cmd.dir, slug));
        }

        if (files.length === 0) {
            console.warn('No files to found to markdownize.');
            return;
        }

        var widgets = markdownize.widgetTypes;
        if (cmd.widgets) {
            widgets = cmd.widgets.split(',');
        }

        for (const file of files) {
            markdownize.markdownize(file, widgets, options);
        }
    });

program.parse(process.argv);



function loadConfigYaml(path) {
    try {
        return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

function globalOption(config, defaultValue) {
    const envVar = config.toUpperCase();
    const value = process.env[envVar];

    if (value === undefined && defaultValue === undefined) {
        console.log(`Global option '${config}' is required. Provide it with --${config} option or ${envVar} environment variable.`);
        process.exit();
    }
    return value || defaultValue;
}

function httpOptions() {
    return {
        auth: { user: globalOption(CONFIG_APIKEY) },
        headers: {
            'x-readme-version': globalOption(CONFIG_DOCSVERSION),
        },
        json: true,
    }
}

function describeCategories(dir, slugs) {
    const configFile = globalOption('config_file', DEFAULT_CONFIG_FILE);
    var categories = slugs ? slugs.split(',') : loadConfigYaml(configFile).categories;
    return categories.map(name => {
        return { slug: name, path: path.join(dir, name)}
    })
}

function getDoc(slug) {
    return request.get(`https://dash.readme.io/api/v1/docs/${slug}`, httpOptions());
}

async function fetchDocs(categories, outputPath) {
    for (const category of categories) {
        const docs = await request.get(`https://dash.readme.io/api/v1/categories/${category.slug}/docs`, httpOptions());
        for (const doc of docs) {
            fetchDoc(doc, category.path);
        }
    }
}

async function fetchDoc(doc, outputPath) {
    const slug = doc.slug;
    const docDetails = await getDoc(slug);

    var contents = `---
title: "${docDetails.title}"
excerpt: "${docDetails.excerpt}"
---
${docDetails.body}`;

    const outputFile = path.join(outputPath, `${slug}.md`);
    console.log(chalk.green(`Writing contents of doc [${doc.slug}] to file [${outputFile}]`));

    fs.mkdirSync(outputPath, {recursive: true});
    fs.writeFile(outputFile, contents, (err) => {
        if (err) console.log(err);
    });

    const children = doc.children;
    if (children) {
        for (const child of children) {
            fetchDoc(child, path.join(outputPath, slug));
        }
    }
}

async function pushDoc(file, options) {
    const filename = path.parse(file).base;
    const slug = filename.replace(path.extname(filename), '');

    const data = fs.readFileSync(file, 'utf8');
    const hash = crypto
        .createHash('sha1')
        .update(data)
        .digest('hex');

    const opts = httpOptions();
    const matter = frontMatter(data);
    const existingDoc = await getDoc(slug);

    if (existingDoc.lastUpdatedHash === hash) {
        console.log(chalk.cyan(`Contents of page [${slug}] was not pushed because contents are the same.`));
        return;
    }

    if (options.dryRun) {
        console.log(chalk.dim(`DRY RUN: Would push contents of [${file}] to readme.io`));
    } else {
        await request
            .put(`https://dash.readme.io//api/v1/docs/${slug}`, {
                ...opts,
                json: Object.assign(existingDoc, {
                    body: matter.content,
                    ...matter.data,
                    lastUpdatedHash: hash,
                }),
            });
        console.log(chalk.green(`Pushed contents of [${file}] to readme.io`));
    }
}

async function keepOnlyStagedGitFiles(files) {
    const stagedFiles = await stagedGitFiles();
    return files.filter(file => stagedFiles.map(descriptor => descriptor.filename).includes(file));
}

/**
 * Finds all Markdown content files found in the directory of a content category.
 * @param categories Array of category descriptors.
 */
function findMarkdownFiles(categories) {
    return categories
        .map(category => category.path)
        .map(dir => glob.sync(path.join(dir, '**/*.md')))
        .reduce((curr, prev) => curr.concat(prev));
}
