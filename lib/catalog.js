const fs = require('fs');
const path = require('path');
const glob = require('glob');
const crypto = require('crypto');
const frontMatter = require('gray-matter');
const marked = require('marked');
const slugify = require('slugify');
const request = require('request-promise-native');

class Catalog {
    constructor(pages) {
        this.pages = pages;
    }

    get length() {
        return this.pages.length;
    }

    select(...filters) {
        let pages = this.pages;
        for (const filter of filters) {
            pages = pages.filter(filter);
        }
        return new Catalog(pages);
    }

    find(filter) {
        return this.pages.find(filter);
    }

    static build(dir) {
        const contentFiles = glob.sync(path.join(dir, '**/*.md'));
        const pages = contentFiles.map(file => Page.readFrom(file, dir));

        return new Catalog(pages);
    }

    deletePages(dir, filter) {
        // array of pages is provided
        let pages;
        if (filter instanceof Array) {
            pages = filter;
        } else {
            pages = this.pages.filter(filter);
        }

        pages.forEach(toRemove => {
            this.pages = this.pages.filter(page => page.id !== toRemove.id);
            toRemove.delete(dir);
        });
    }
}

class Page {
    constructor(category, parent, slug, content, headers) {
        this.category = category;
        this.parent = parent;
        this.slug = slug;
        this.content = content;
        this.headers = headers;

        this.buildIndex();
    }

    static byPath(filepath) {
        return page => page.path === filepath;
    }

    static bySlug(slug) {
        return page => page.slug === slug;
    }

    static inCategories(categories) {
        return page => categories.includes(page.category);
    }

    static notIn(catalog) {
        return page => catalog.find(Page.bySlug(page.slug)) === undefined;
    }

    get id() {
        return this.headers.id;
    }

    get directory() {
        return this.parent ? [this.category, this.parent] : [this.category];
    }

    get filename() {
        return `${this.slug}.md`;
    }

    get path() {
        return path.join(...this.directory, this.filename);
    }

    get ref() {
        return [...this.directory, this.slug].join(':')
    }

    get hash() {
        return crypto
            .createHash('sha1')
            .update(this.hashData)
            .digest('hex');
    }

    get headings() {
        return this.elements.filter(el => el instanceof Heading);
    }

    get links() {
        return this.elements.filter(el => el instanceof Link);
    }

    get title() {
        return this.headers.title;
    }

    get excerpt() {
        return this.headers.excerpt;
    }

    findElement(filter) {
        return this.elements.find(filter);
    }

    indexOf(str) {
        return this.sources.indexOf(str);
    }

    lineNumberAtCharacter(index) {
        return this.sources.substr(0, index).split('\n').length;
    }

    buildIndex() {
        this.elements = [
            ...Heading.findAll(this),
            ...Link.findAll(this),
        ];
    }

    /**
     * Actual data that is used to compute content hash identity
     * Because the page ID changes between Readme versions, we're leaving it out from the hash computation
     */
    get hashData() {
        // readme.io always strips the last newline from content, so do the same here to prevent unnecessary content
        // updates from hash differences.
        let content = this.content;
        if (content.endsWith('\n')) {
            content = content.substr(0, this.content.length - 1);
        }

        return [
            this.headers.title,
            this.headers.excerpt,
            content
        ].join('\n');
    }

    get sources() {
        return `---
id: "${this.headers.id}"
title: "${this.headers.title}"
excerpt: "${this.headers.excerpt}"
---
${this.content}`;
    }

    async writeTo(baseDir) {
        return new Promise(resolve => {
            const outputFile = path.join(baseDir, this.path);

            fs.mkdirSync(path.parse(outputFile).dir, {recursive: true});
            fs.writeFile(outputFile, this.sources, (err) => {
                if (err) reject(err);
                else resolve(outputFile);
            });
        });
    }

    delete(dir) {
        fs.unlinkSync(path.join(dir, this.path));
    }

    static readFrom(file, baseDir) {
        const { dir, name } = path.parse(file);
        const baseDirs = baseDir.split(path.sep);
        const dirs = dir.split(path.sep).filter(part => !baseDirs.includes(part));
        const category = dirs[0];
        let parent;
        if (dirs.length > 1) parent = dirs[1];

        const data = fs.readFileSync(file, 'utf8');
        const matter = frontMatter(data);

        return new Page(category, parent, name, matter.content, matter.data);
    }
}

class Element {
    constructor(page, text) {
        this.page = page;
        this.text = text;
    }

    get ref() {
        return `${this.page.path}:${this.lineNumber}`;
    }

    get lineNumber() {
        return this.page.lineNumberAtCharacter(this.position);
    }

    get desc() {
        throw new Error("Not implemented");
    }

    get position() {
        throw new Error("Not implemented");
    }
}

class Heading extends Element {
    constructor(page, token) {
        super(page, token.text);
        this.depth = token.depth;
        this.slug = 'section-' + slugify(token.text).toLowerCase();
    }

    get desc() {
        return this.text;
    }

    get position() {
        return this.page.indexOf(this.markdown);
    }

    get markdown() {
        return `${'#'.repeat(this.depth)} ${this.text}`;
    }

    static findAll(page) {
        const found = [];
        const tokens = marked.lexer(page.content);

        return tokens
            .filter(token => token.type === 'heading')
            .map(token => new Heading(page, token));
    }

    static bySlug(slug) {
        return el => el instanceof Heading && el.slug === slug;
    }
}

class Link extends Element {
    constructor(page, text, label, href, positionIndex) {
        super(page, text);
        this.label = label;
        this.href = href;
        this.positionIndex = positionIndex;
    }

    get desc() {
        return this.href;
    }

    get position() {
        return this.positionIndex;
    }

    async resolve(catalog) {
        throw new Error('Not implemented');
    }

    static findAll(page) {
        const links = [];
        const findLinks = /\[(?<label>.*)]\((?<href>.*?)\)/g;

        let match;
        let sources = page.sources;
        while ((match = findLinks.exec(sources)) !== null) {
            const text = match[0];
            const { label, href } = match.groups;
            const positionIndex = match.index;

            var linkClass;
            if (UrlLink.regex.test(href)) linkClass = UrlLink;
            else if (MailtoLink.regex.test(href)) linkClass = MailtoLink;
            else if (XrefLink.regex.test(href)) linkClass = XrefLink;

            if (linkClass === undefined) {
                console.warn(`Link [${href}] does not correspond to a supported type of link.`);
                continue;
            }

            links.push(new linkClass(page, text, label, href, positionIndex));
        }
        return links;
    }
}

class MailtoLink extends Link {
    static get regex() {
        return /@/;
    }

    async resolve(catalog) {
        return new Promise((resolve, reject) => {
            if (!this.href.startsWith('mailto:')) {
                reject('Email links should start with mailto:');
                return;
            }
            resolve(this.href);
        });
    }
}


class XrefLink extends Link {
    static get regex() {
        return /(doc:(?<slug>[a-zA-Z0-9-]+))?(#(?<anchor>.*))?/;
    }

    async resolve(catalog) {
        return new Promise((resolve, reject) => {
            const {slug, anchor} = this.href.match(XrefLink.regex).groups;

            if (!slug && !anchor) {
                reject(`Invalid xref format`);
                return;
            }

            const page = slug ? catalog.find(Page.bySlug(slug)) : this.page;

            let target = page;

            if (target === undefined) {
                reject(`Xref does not resolve to a known internal page.`);
                return;
            }

            if (anchor !== undefined) {
                target = page.findElement(Heading.bySlug(anchor));
            }

            if (target === undefined) {
                reject(`Xref resolves to a known page but section could not be found.`);
                return;
            }

            resolve(target);
        });
    }
}

class UrlLink extends Link {
    static get regex() {
        return /(https?:)?\/\/.*/;
    }

    async resolve(catalog) {
        function checkError(err) {
            if ([400, 404, 401, 500].includes(err.statusCode)) {
                throw `URL seems broken: HTTP Status ${err.statusCode}`;
            }
        }

        // first attempt a HEAD operation
        return this.attemptFetch(request.head)
            .catch(err => {
                // if HEAD fails with 404, retry with GET
                if (err.statusCode === 404) {
                    return this.attemptFetch(request.get);
                }
                checkError(err);
            }).catch(err => {
                checkError(err);
                return this.href;
            })
            .then(resp => this.href);
    }

    async attemptFetch(httpOp) {
        return httpOp(this.href, {
            headers: {
                'Accept': '*/*',
                'User-Agent': 'curl/7.54.0',  // some servers block requests from scripts, attempt cURL impersonation
            }
        });
    }
}

module.exports.Catalog = Catalog;
module.exports.Page = Page;
module.exports.XrefLink = XrefLink;
module.exports.MailtoLink = MailtoLink;
module.exports.UrlLink = UrlLink;