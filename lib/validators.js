const { XrefLink, UrlLink, MailtoLink } = require('./catalog');


class Validator {
    validate(catalog, page, callback) {
        throw new Error("Abstract method not implemented");
    }
}


class LinkValidator extends Validator {
    constructor(type) {
        super();
        this.type = type;
    }

    validate(catalog, page, callback) {
        const links = page.listLinks().filter(link => link instanceof this.type);
        for (const link of links) {
            link.resolve(catalog).catch(err => callback(link, err));
        }
    }
}


class HeadingsValidator extends Validator {

    validate(catalog, page, callback) {
        const headings = page.listHeadings().filter(heading => heading.depth === 1);
        headings.forEach(heading => callback(heading,
            'Heading with level 1 are reserved for page titles. ' +
            'Use headings of level 2 and more in content files.'));
    }
}


module.exports = {
    xrefs: new LinkValidator(XrefLink),
    urls: new LinkValidator(UrlLink),
    mailtos: new LinkValidator(MailtoLink),
    headings: new HeadingsValidator(),
};

