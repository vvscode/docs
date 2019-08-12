const { XrefLink, UrlLink, MailtoLink } = require('./catalog');


class Validator {
    validate(catalog, page, errorCallback) {
        throw new Error("Abstract method not implemented");
    }
}


class LinkValidator extends Validator {
    constructor(type) {
        super();
        this.type = type;
    }

    validate(catalog, page, errorCallback) {
        const links = page.listLinks().filter(link => link instanceof this.type);
        for (const link of links) {
            link.resolve(catalog).catch(err => errorCallback(link, err));
        }
    }
}


class HeadingsValidator extends Validator {

    validate(catalog, page, errorCallback) {
        const headings = page.listHeadings().filter(heading => heading.depth === 1);
        headings.forEach(heading => errorCallback(heading,
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

