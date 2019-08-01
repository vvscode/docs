#!/usr/bin/env node

const program = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');
const request = require('request-promise-native');
const path = require('path');
const rdme = require('rdme/lib/docs/index');

const DEFAULT_CONFIG_FILE = 'config.yml';
const DEFAULT_DOCS_DIR = 'docs';
const CONFIG_APIKEY = 'apikey';
const CONFIG_DOCSVERSION = 'docsversion';

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

function fetchDoc(docDetails, outputPath) {
    const slug = docDetails.slug;

    request.get(`https://dash.readme.io/api/v1/docs/${slug}`, httpOptions())
        .then(details => {
            var contents = `---
title: "${details.title}"
excerpt: "${details.excerpt}"
---
${details.body}`;

            const outputFile = path.join(outputPath, `${slug}.md`);
            console.log(`Writing contents of doc [${docDetails.slug}] to file [${outputFile}]`);

            fs.mkdirSync(outputPath, {recursive: true});
            fs.writeFile(outputFile, contents, (err) => {
                if (err) console.log(err);
            });
        });

    const children = docDetails.children;
    if (children) {
        for (const child of children) {
            fetchDoc(child, path.join(outputPath, slug));
        }
    }
}

async function pushChanges(dir, ctx, recurse) {
    console.log(`Pushing contents of Markdown files from directory ${dir} to readme.io`);

    // invoke the `rdme` CLI directly for simplicity
    const result = await rdme.run({
        args: [dir],
        opts: {
            key: globalOption(CONFIG_APIKEY),
            version: globalOption(CONFIG_DOCSVERSION)
        },
    });
    console.log(result);

    if (recurse) {
        const subdirs = fs.readdirSync(dir, {withFileTypes: true})
            .filter(entry => entry.isDirectory());

        for (const subdir of subdirs) {
            await pushChanges(path.join(dir, subdir.name), ctx, recurse);
        }
    }
}

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
        listCategorySlugs(slug).forEach((slug) => {
            request
                .get(`https://dash.readme.io/api/v1/categories/${slug}/docs`, httpOptions())
                .then(function(docs) {
                    for (const doc of docs) {
                        fetchDoc(doc, path.join(cmd.output, slug));
                    }
                });
        });
    });

program
    .command('push [category_slugs]', )
    .description('Pushes local Markdown content files to readme.io. ' +
        'When called with a comma-delimited list of category slugs, only those categories will be pushed.')
    .option('-i, --input <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('-r, --no-recurse', `If specified, subdirectories will not be traversed recursively to find content files.`)
    .action((slug, cmd) => {
        listCategorySlugs(slug, ctx.config).forEach((slug) => {
            pushChanges(path.join(cmd.input, slug), ctx, cmd.recurse).catch(err => console.error(err));
        });
    });

program.parse(process.argv);