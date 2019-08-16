const {XrefLink, UrlLink, MailtoLink} = require('./catalog');


class Validator {
    /**
     * Runs one or multiple validations on the page provided, and returns a Promise. That promise will not resolve to
     * any significant value, they'll just act as a marker of completion.
     * @param catalog the catalog instance we're validating
     * @param page a specific page to apply the validations on.
     * @param errorCallback A function that will be called for each validation error, with signature (Element, String),
     * where the 2nd argument is the error message for the element in question.
     */
    validate(catalog, page, errorCallback) {
        throw new Error("Abstract method not implemented");
    }
}


class LinkValidator extends Validator {
    constructor(type) {
        super();
        this.type = type;
    }

    async validate(catalog, page, errorCallback) {
        return Promise.all(
            page.links
                .filter(link => link instanceof this.type)
                .map(link => this.validateLink(link, catalog, errorCallback))
        );
    }

    validateLink(link, catalog, errorCallback) {
        return link.resolve(catalog).catch(err => errorCallback(link, err));
    }
}


class HeadingsValidator extends Validator {

    async validate(catalog, page, errorCallback) {
        const headings = page.headings.filter(heading => heading.depth === 1);
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

