const path = require('path');
const { URL } = require('url');

const { UrlLink } = require('./catalog');


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
 * This filter enables the hosting of files (like images and other content files) on a publicly accessible Web server.
 * All relative URLs will be transformed to their corresponding public URL on the way to Readme and then transformed
 * back to their relative representation on the way back.
 *
 * All relative paths in content should be specified as relative to the page's `.md` file location in the project
 * directories and it is assumed that content files will be published at the exact same location on the public Web
 * server.
 */
class HostedFilesFilter extends Filter {

    apply(page) {
        const replacements = [];

        for (const link of page.links.filter(link => link instanceof UrlLink && link.isLocal())) {
            const localFilePath = path.join(page.directory, link.href);
            const hostingUrl = new URL(localFilePath, this.baseUrl);

            replacements.push([link, link.copy({href: hostingUrl.toString()})]);
        }
        return page.replaceElements(replacements);
    }

    rollback(page) {
        const replacements = [];

        for (const link of page.links.filter(link => link instanceof UrlLink && link.isRemote())) {
            if (link.href.startsWith(this.baseUrl)) {
                const localFilePath = decodeURI(link.href.substr(this.baseUrl.length));
                const relativePath = path.relative(page.directory, localFilePath);

                replacements.push([link, link.copy({href: relativePath})]);
            }
        }
        return page.replaceElements(replacements);
    }
}


module.exports = {
    hostedFiles: HostedFilesFilter,
};
