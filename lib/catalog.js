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
        this.pages = {};
        pages.forEach(page => this.pages[page.slug] = page);
    }

    listPages() {
        return Object.keys(this.pages).map(slug => this.pages[slug]);
    }

    findPagesInCategories(categories) {
        return this.listPages().filter(page => categories.includes(page.category));
    }

    findPageByPath(filepath) {
        return this.listPages().filter(page => page.path === filepath);
    }

    static build(dir) {
        const contentFiles = glob.sync(path.join(dir, '**/*.md'));
        // const contentFiles = ['docs/sms/smpp.md'];
        const pages = contentFiles.map(file => Page.readFrom(file, dir));
        return new Catalog(pages);
    }

    deletePages(dir, filter) {
        // array of pages is provided
        let pages;
        if (filter instanceof Array) {
            pages = filter;
        } else {
            pages = this.listPages().filter(filter);
        }

        pages.forEach(page => {
            delete this.pages[page.slug];
            page.delete(dir);
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
            .update(this.sources)
            .digest('hex');
    }

    indexOf(str) {
        return this.sources.indexOf(str);
    }

    lineNumberAtCharacter(index) {
        return this.sources.substr(0, index).split('\n').length;
    }

    listHeadings() {
        return Object.keys(this.headings).map(slug => this.headings[slug]);
    }

    listLinks() {
        return this.links;
    }

    buildIndex() {
        this.headings = {};

        const tokens = marked.lexer(this.content);
        tokens
            .filter(token => token.type === 'heading')
            .forEach(token => {
                const heading = new Heading(this, token);
                this.headings[heading.slug] = heading;
            });

        // find and index links
        this.links = Link.findAll(this);
    }

    get title() {
        return this.headers.title;
    }

    get excerpt() {
        return this.headers.excerpt;
    }

    get sources() {
        return `---
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
    constructor(page) {
        this.page = page;
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
        super(page);
        this.depth = token.depth;
        this.text = token.text;
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
}

class Link extends Element {
    constructor(page, text, label, href, positionIndex) {
        super(page);
        this.text = text;
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
        const findLinks = /\[(?<label>.*)]\((?<href>.*)\)/g;

        let match;
        while ((match = findLinks.exec(page.content)) !== null) {
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

            const page = slug ? catalog.pages[slug] : this.page;

            let target = page;
            if (page !==  undefined && anchor !== undefined) {
                target = page.headings[anchor];
            }

            if (target) resolve(target);
            else reject(`Xref does not resolve to a known internal page or section heading.`);
        });
    }
}

class UrlLink extends Link {
    static get regex() {
        return /(https?:)?\/\/.*/;
    }

    async resolve(catalog) {
        return new Promise((resolve, reject) => {
            request.head(this.href, {
                headers: {
                    'User-Agent': 'curl/7.54.0',  // some servers block requests from scripts, attempt cURL impersonation
                }
            })
                .then(resp => resolve(this.href))
                .catch(err => {
                    if ([400, 401, 404, 500].includes(err.statusCode)) {
                        reject(`URL seems broken: HTTP Status ${err.statusCode} - ${err.message}`);
                    }
                });
        });
    }
}

module.exports.Catalog = Catalog;
module.exports.Page = Page;
module.exports.XrefLink = XrefLink;
module.exports.MailtoLink = MailtoLink;
module.exports.UrlLink = UrlLink;