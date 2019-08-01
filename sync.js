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
    .option('-o, --output <dir>', 'Destination directory where docs Markdown files will be written', DEFAULT_DOCS_DIR)
    .action((slug, cmd) => {
        fetchDocs(listCategorySlugs(slug), cmd.output);
    });

program
    .command('push [category_slugs]', )
    .description('Pushes local Markdown content files to readme.io. ' +
        'When called with a comma-delimited list of category slugs, only those categories will be pushed.')
    .option('-i, --input <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('-m, --staged-only', `Only push files staged files that have been modified. Important: files must have been added to the index with 'git add'`)
    .option('-d, --dry-run', `No remote content will be updated but command output will show what would be done.`)
    .action((slug, cmd) => {
        pushDocs(cmd.input, listCategorySlugs(slug), { stagedOnly: cmd.stagedOnly, dryRun: cmd.dryRun });
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

function listCategorySlugs(slugs) {
    const configFile = globalOption('config_file', DEFAULT_CONFIG_FILE);
    return slugs ? slugs.split(',') : loadConfigYaml(configFile).categories;
}

function getDoc(slug) {
    return request.get(`https://dash.readme.io/api/v1/docs/${slug}`, httpOptions());
}

async function fetchDocs(slugs, outputPath) {
    for (const slug of slugs) {
        var downloadDir = path.join(outputPath, slug);

        const docs = await request.get(`https://dash.readme.io/api/v1/categories/${slug}/docs`, httpOptions());
        for (const doc of docs) {
            fetchDoc(doc, downloadDir);
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
    console.log(`Writing contents of doc [${doc.slug}] to file [${outputFile}]`);

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
        console.log(`Contents of page [${slug}] was not pushed because contents are the same.`);
        return;
    }

    if (options.dryRun) {
        console.log(`DRY RUN: Would push contents of [${file}] to readme.io`);
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
        console.log(`Pushed contents of [${file}] to readme.io`);
    }
}

async function pushDocs(dir, slugs, options) {
    var includeOnly;

    if (options.stagedOnly) {
        const stagedFiles = await stagedGitFiles();
        includeOnly = stagedFiles.map(descriptor => descriptor.filename);
    }

    glob(path.join(dir, '**/*.md'), {}, (err, items) => {
        var files = slugs
            .map(slug => path.join(dir, slug))
            .map(categoryPath => items.filter(item => item.startsWith(categoryPath)))
            .reduce((curr, prev) => prev.concat(curr));

        if (includeOnly) {
            files = files.filter(file => includeOnly.includes(file));
        }

        for (const file of files) {
            pushDoc(file, options);
        }
    });
}
