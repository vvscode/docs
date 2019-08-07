const chalk = require('chalk');

const conversions = {
    code: codeBlockToMarkdown,
    image: imageToMarkdown,
    callout: calloutToMarkdown,
    html: htmlToMarkdown,
};

module.exports.widgetTypes = Object.keys(conversions);

/**
 * Replaces Readme-proprietary code widgets with standard Markdown code blocks.
 */
module.exports.markdownize = (page, widgetTypes, options) => {
    const operations = widgetTypes.map(type => {
        return { widget: type, conversion: conversions[type] };
    });

    let content = page.content;
    for (const operation of operations) {
        content = replaceWidgets(page, content, operation.widget, operation.conversion, options);
    }
    return content;
};

function codeBlockToMarkdown(json) {
    var markdown = '';
    for (const block of json.codes) {
        if (block.name) {
            markdown += `\n**${block.name}**\n`;
        }
        markdown += '```' + block.language + '\n';
        markdown += block.code + '\n';
        markdown += '```\n\n';
    }
    return markdown;
}

function calloutToMarkdown(json, match) {
    // body must be pre-processed
    const body = json.body
        .replace(/\n/g, '\n> ');

    var type;
    switch (json.type) {
        case 'warning': type = 'WARNING: '; break;
        default:
            type = '';
    }

    return `
> **${type}${json.title}**    
>
> ${body}
`;
}

function htmlToMarkdown(json) {
    return `
<div class="magic-block-html">
    ${json.html.replace(/\n/g, '\n   ')}
</div>
`;
}

function imageToMarkdown(json) {
    var markdown = '';
    for (const details of json.images) {
        markdown += `![${details.image[1]}](${details.image[0]})`;
        if (details.caption) {
            markdown += `\n${details.caption}`;
        }
        markdown += `\n`;
    }
    return markdown;
}

function replaceWidgets(page, content, widget, conversionFn, options) {
    const findAllBlocks = new RegExp(`\\[block:${widget}\\]\\n(?<json>(.|[\\r\\n])*?)\\n\\[/block\\]`, 'gm');

    return content.replace(findAllBlocks, (match, json) => {
        json = JSON.parse(json);

        const replacement = conversionFn(json);

        if (options.verbose) {
            console.log(`In page [${page.ref}], the following ${widget} widget: \n`);
            console.log(chalk.red('\t' + match.replace(/\n/g, '\n\t')));
            console.log('\n');
            console.log(`Has been replaced by this Markdown: \n    `);
            console.log(chalk.green('\t' + replacement.replace(/\n/g, '\n\t')));
        }

        return replacement;
    });
}
