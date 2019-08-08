const chalk  = require('chalk');
const request = require('request-promise-native');

const { flatten } = require('./tools');
const { Page } = require('./catalog');


class Api {
    constructor(apiKey, version) {
        this.apiKey = apiKey;
        this.version = version;
    }

    get httpOptions() {
        return {
            auth: { user: this.apiKey },
            headers: {
                'x-readme-version': this.version,
            },
            json: true,
        }
    }

    loadPage(slug) {
        return request.get(`https://dash.readme.io/api/v1/docs/${slug}`, this.httpOptions);
    }

    /**
     * Fetches all pages of the provided categories, calling the `callback` function for each page loaded.
     * @param categories List of categories slugs to load pages from.
     * @param callback A function accepting a single Page parameter.
     */
    async fetchPages(categories, callback) {
        let pages = [];
        for (const category of categories) {
            const pagesInCategory = await request.get(`https://dash.readme.io/api/v1/categories/${category}/docs`, this.httpOptions);
            for (const json of pagesInCategory) {
                pages.push(this.fetchPage(json, category, undefined, callback));
            }
        }
        // once the Promise resolves, the result will actually be a nested array representing the page hierarchy
        // we flatten it so that the final result is actually an Array of Page objects
        return Promise.all(pages).then(pageTree => flatten(pageTree));
    }

    async fetchPage(pageJson, category, parent, callback) {
        const slug = pageJson.slug;
        const docDetails = await this.loadPage(slug);

        const page = Api.jsonToPage(docDetails, category, parent);

        callback(page);

        let pages = [Promise.resolve(page)];
        const children = pageJson.children;
        if (children) {
            for (const child of children) {
                pages = pages.concat(this.fetchPage(child, category, page, callback));
            }
        }
        return Promise.all(pages);
    }

    async pushPage(localPage, options) {
        const pageJson = await this.loadPage(localPage.slug);
        const remotePage = Api.jsonToPage(pageJson);

        if (remotePage.hash === localPage.hash) {
            console.log(chalk.cyan(`Contents of page [${localPage.slug}] was not pushed because contents are the same.`));
            return;
        }

        if (options.dryRun) {
            console.log(chalk.dim(`DRY RUN: Would push contents of [${localPage.ref}] to readme.io`));
        } else {
            await request
                .put(`https://dash.readme.io//api/v1/docs/${localPage.slug}`, {
                    ...this.httpOptions,
                    json: Object.assign(pageJson, {
                        body: localPage.content,
                        ...localPage.headers,
                        lastUpdatedHash: localPage.hash,
                    }),
                });
            console.log(chalk.green(`Pushed contents of [${localPage.ref}] to readme.io`));
        }
    }

    /**
     * Converts JSON received from the Readme API to a `Page` object instance.
     * @param json The JSON object loaded from the API.
     * @param category An optional category to assign to the page (string)
     * @param parent An optional parent `Page` object.
     * @returns {Page}
     */
    static jsonToPage(json, category, parent) {
        const headers = {
            title: json.title,
            excerpt: json.excerpt,
        };
        return new Page(category, parent ? parent.slug : null, json.slug, json.body, headers);
    }
}


module.exports.Api = Api;