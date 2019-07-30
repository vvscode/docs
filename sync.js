#!/usr/bin/env node

const program = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');
const request = require('request-promise-native');
const path = require('path');
const rdme = require('rdme/lib/docs/index');

function loadConfig(path) {
    try {
        return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

function mandatory(value, option) {
    if (value !== undefined) return value;
    console.log(`Option --${option} is required.`);
    process.exit();
}

function httpOptions(ctx) {
    return {
        auth: { user: ctx.key },
        headers: {
            'x-readme-version': ctx.version,
        },
        json: true,
    }
}

function loadContext(cmd) {
    return {
        config: loadConfig(cmd.config),
        key: mandatory(cmd.key, 'key'),
        version: mandatory(cmd.docsversion, 'docsversion'),
    }
}

function listCategorySlugs(specificSlug, config) {
    return specificSlug ? [specificSlug] : config.categories;
}

function fetchDoc(docDetails, outputPath, ctx) {
    const slug = docDetails.slug;

    request.get(`https://dash.readme.io/api/v1/docs/${slug}`, httpOptions(ctx))
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
            fetchDoc(child, path.join(outputPath, slug), ctx);
        }
    }
}

async function pushChanges(dir, ctx, recurse) {
    console.log(`Pushing contents of Markdown files from directory ${dir} to readme.io`);

    // invoke the `rdme` CLI directly for simplicity
    const result = await rdme.run({
        args: [dir],
        opts: ctx,
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
Global arguments \`key\` and \`docsversion\` must always be provided for each command, before the command name.
`);

program.option('-k, --key <apikey>', 'API key for readme.io (required)');
program.option('-v, --docsversion <docsversion>', 'Documentation version to act upon (required)');
program.option('-c, --config [config]', 'Path to the YAML configuration file', 'config.yml');

program
    .command('fetch [category_slug]')
    .description('Fetches up-to-date Markdown content files from readme.io, overwriting local files.')
    .option('-o, --output <dir>', 'Destination directory where docs Markdown files will be written', 'docs')
    .action((slug, cmd) => {
        const ctx = loadContext(cmd.parent);

        listCategorySlugs(slug, ctx.config).forEach((slug) => {
            request
                .get(`https://dash.readme.io/api/v1/categories/${slug}/docs`, httpOptions(ctx))
                .then(function(docs) {
                    for (const doc of docs) {
                        fetchDoc(doc, path.join(cmd.output, slug), ctx);
                    }
                });
        });
    });

program
    .command('push [category_slug]', )
    .description('Pushes local Markdown content files to readme.io')
    .option('-i, --input <dir>', 'Input directory', "docs")
    .option('-r, --no-recurse', 'If specified, subdirectories will not be traversed recursively to find content files.')
    .action((slug, cmd) => {
        const ctx = loadContext(cmd.parent);

        listCategorySlugs(slug, ctx.config).forEach((slug) => {
            pushChanges(path.join(cmd.input, slug), ctx, cmd.recurse).catch(err => console.error(err));
        });
    });

program.parse(process.argv);