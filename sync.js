#!/usr/bin/env node

const program = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const stagedGitFiles = require('staged-git-files');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

const markdownize = require('./lib/markdownize');
const { Catalog, Page, XrefLink, UrlLink, MailtoLink } = require('./lib/catalog');
const { Api } = require('./lib/api-client');

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
    .action(async (slug, cmd) => {
        const options = {
            dir: cmd.dir,
            categories: slug,
        };

        const modifiedContentFiles = (await stagedGitFiles())
            .map(details => details.filename)
            .filter(file => file.startsWith(cmd.dir));

        if (modifiedContentFiles.length > 0) {
            console.log(chalk.yellow(modifiedContentFiles.join('\n')));
            if (!readlineSync.keyInYN('The above files have staged changes that could be overwritten. Are you sure you want to proceed?')) {
                return;
            }
        }

        const readme = apiClient();

        let fetchedPages = await readme.fetchPages(listCategories(slug), async page => {
            const outputFile = await page.writeTo(cmd.dir);
            console.log(chalk.green(`Wrote contents of doc [${page.ref}] to file [${outputFile}]`));
        });

        let fetchedPagePaths = fetchedPages.map(page => page.path);

        // build the catalog from local content files
        const catalog = Catalog.build(cmd.dir);
        const catalogPagePaths = (await selectPages(catalog, options)).map(page => page.path);

        const staleLocalPages = catalogPagePaths.filter(path => !fetchedPagePaths.includes(path));

        if (staleLocalPages.length > 0) {
            console.log(chalk.yellow(`WARNING: Found ${staleLocalPages.length} possibly stale local content pages; they were not fetched from Readme:`));
            staleLocalPages.forEach(path => console.log(chalk.yellow(` - ${path}`)));
            console.log(chalk.yellow(`They might have been deleted or moved.`));
        }
    });

program
    .command('push [category_slugs]', )
    .description('Pushes local Markdown content files to readme.io. ' +
        'When called with a comma-delimited list of category slugs, only those categories will be pushed.')
    .option('-d, --dir <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('-f, --file <file>', `Path to a single file to process, relative to the directory specified with -d/--dir option.`)
    .option('--staged-only', `Only push files staged files that have been modified. Important: files must have been added to the index with 'git add'`)
    .option('--dry-run', `No remote content will be updated but command output will show what would be done.`)
    .action(async (slug, cmd) => {
        const options = {
            dir: cmd.dir,
            file: cmd.file,
            categories: slug,
            stagedOnly: cmd.stagedOnly,
            dryRun: cmd.dryRun
        };
        const catalog = Catalog.build(cmd.dir);

        const pages = await selectPages(catalog, options);
        if (pages.length === 0) {
            console.warn('No files to found to push.');
            return;
        }

        const readme = apiClient();
        for (const page of pages) {
            readme.pushPage(page, options);
        }
    });

program
    .command('markdownize [category_slugs]', )
    .description('Converts proprietary Readme widgets to standard Markdown.')
    .option('-d, --dir <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('-f, --file <file>', `Path to a single file to process, relative to the directory specified with -d/--dir option.`)
    .option('-w, --widgets <widgets>', `Comma-separated list of Readme widgets to replace to Markdown. Supported widgets: 'code', 'callout', 'image', 'html'`)
    .option('-v, --verbose', `Output more details about the replacements being made.`)
    .option('--dry-run', `Will only output modifications that would be made, without actually saving them.`)
    .action(async (slug, cmd) => {
        const options = {
            dir: cmd.dir,
            file: cmd.file,
            categories: slug,
            dryRun: cmd.dryRun,
            verbose: cmd.dryRun || cmd.verbose,
        };
        const catalog = Catalog.build(cmd.dir);

        const pages = await selectPages(catalog, options);
        if (pages.length === 0) {
            console.warn('No files to found to markdownize.');
            return;
        }

        let widgets = markdownize.widgetTypes;
        if (cmd.widgets) {
            widgets = cmd.widgets.split(',');
        }

        for (const page of pages) {
            const updated = markdownize.markdownize(page, widgets, options);
            if (!options.dryRun) {
                if (page.content !== updated) {
                    page.content = updated;
                    console.log(chalk.green(`Writing updated Markdown to [${page.path}]`));
                    await page.writeTo(cmd.dir);
                }
            }
        }
    });

program
    .command('validate [category_slugs]', )
    .description(`Validates Markdown content files. 
    
The following validations are available:

 - 'url':      Verifies that URLs do resolve to an existing. An HTTP HEAD request is performed for each URL.
 - 'xref':     Verifies that internal cross references point to known content.
 - 'mailto':   Verifies that mailto: links (links to email addresses) are correctly formed.
 
All validations are performed unless --validations is specified.
    `)
    .option('-d, --dir <dir>', `Directory where the Markdown content files will be loaded from.`, DEFAULT_DOCS_DIR)
    .option('-f, --file <file>', `Path to a single file to process, relative to the directory specified with -d/--dir option.`)
    .option('--staged-only', `Only validate Git staged files. Important: files must have been added to the index with 'git add'`)
    .option('--validations <validations>', `Comma-delimited list of validations to perform. See command help for supported validations.`)
    .action(async (slug, cmd) => {
        const options = {
            dir: cmd.dir,
            file: cmd.file,
            categories: slug,
            stagedOnly: cmd.stagedOnly,
        };
        const catalog = Catalog.build(cmd.dir);

        const pages = await selectPages(catalog, options);
        if (pages.length === 0) {
            console.warn('No files to found to validate.');
            return;
        }

        let validations = ['xref', 'url', 'mailto'];
        if (cmd.validations) {
            validations = cmd.validations.split(',');
        }

        for (const page of pages) {
            // xref:
            if (validations.includes('xref')) {
                validateLinks(catalog, page, XrefLink, (link, err) => {
                    console.log(`${page.path}:${link.lineNumber} Cross reference [${link.href}] seems broken: ${err}`);
                });
            }

            // mailto:
            if (validations.includes('mailto')) {
                validateLinks(catalog, page, MailtoLink, (link, err) => {
                    console.log(`${page.path}:${link.lineNumber} Link to email [${link.href}] seems broken: ${err}`);
                });
            }

            // url:
            if (validations.includes('url')) {
                validateLinks(catalog, page, UrlLink, (link, err) => {
                    console.log(`${page.path}:${link.lineNumber} URL [${link.href}] seems broken: ${err}`);
                });
            }
        }
    });

program.parse(process.argv);


function apiClient() {
    return new Api(globalOption(CONFIG_APIKEY), globalOption(CONFIG_DOCSVERSION));
}


async function selectPages(catalog, options) {
    let pages;
    if (options.file) {
        pages = catalog.findPageByPath(options.file);
    } else {
        const categories = listCategories(options.categories);
        pages = catalog.findPagesInCategories(categories);
    }

    if (options.stagedOnly) {
        const stagedFiles = await stagedGitFiles();
        const stagedFilePaths = stagedFiles.map(stagedFile => stagedFile.filename);
        pages = pages.filter(page => stagedFilePaths.includes(path.join(options.dir, page.path)));
    }
    return pages;
}


function validateLinks(catalog, page, type, invalidCallback) {
    const links = page.links.filter(link => link instanceof type);
    for (const link of links) {
        link.resolve(catalog).catch(err => invalidCallback(link, err));
    }
}


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


function listCategories(slugs) {
    const configFile = globalOption('config_file', DEFAULT_CONFIG_FILE);
    return slugs ? slugs.split(',') : loadConfigYaml(configFile).categories;
}
