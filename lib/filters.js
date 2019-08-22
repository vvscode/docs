const path = require('path');
const { URL } = require('url');

const { Image } = require('./catalog');


/**
 * Content Filters allow a different representation of content on Readme.io than in local `.md` files. Filters will
 * be invoked before pushing to Readme and after fetching from it.
 *
 * During those 2 specific phases, filters can alter page content as they see fit and return either the original
 * page or a copy of that page.
 *
 * The transformations applied to content pages should be symmetrical: pushing a page to Readme with a filter enabled
 * followed by fetching that same page from Readme should result in the exact same local content. Hence why each filter
 * implemented should not only implement the filtering itself, but also a way to roll it back.
 */
class Filter {
    constructor(config) {
        this.baseUrl = config.baseUrl;
    }

    apply(page) {
        throw new Error("Not implemented");
    }

    rollback(page) {
        throw new Error("Not implemented");
    }
}

/**
 * This filter allows for hosting image and other files on a publicly accessible Web server.
 * All relative URLs will be transformed to their corresponding public URL on the way to Readme and then transformed
 * back to their relative representation on the way back.
 *
 * All relative paths in content should be specified as relative to the page's `.md` file location in the project
 * directories and it is assumed that content files will be published at the exact same location on the public Web
 * server.
 */
class HostedFilesFilter extends Filter {

    apply(page) {
        // todo: should be able to consider all elements of type `Link`
        for (const image of page.links.filter(i => i instanceof Image)) {
            const imagePath = path.join(page.directory, image.href);
            const hostingUrl = new URL(imagePath, this.baseUrl);

            const newText = image.copy({href: hostingUrl.toString()}).markdown;
            page = page.replaceElement(image, newText);
        }
        return page;
    }

    rollback(page) {
        // todo: should be able to consider all elements of type `Link`
        for (const image of page.links.filter(i => i instanceof Image)) {
            if (image.href.startsWith(this.baseUrl)) {
                const imagePath = image.href.substr(this.baseUrl.length);
                const relativePath = path.relative(page.directory, imagePath);

                const newText = image.copy({href: relativePath}).markdown;
                page = page.replaceElement(image, newText);
            }
        }
        return page;
    }
}


module.exports = {
    hostedFiles: HostedFilesFilter,
};
