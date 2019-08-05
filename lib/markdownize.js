const replace = require('replace-in-file');
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
module.exports.markdownize = (file, widgetTypes, options) => {
    const operations = widgetTypes.map(type => {
        return { widget: type, conversion: conversions[type] };
    });

    for (const operation of operations) {
        replaceWidgets(file, operation.widget, operation.conversion, options);
    }
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
    return json.html + '\n';
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

function replaceWidgets(file, widget, conversionFn, options) {
    const blockRegex = new RegExp(`\\[block:${widget}\\]\\n((.|[\\r\\n])*?)\\n\\[/block\\]`);
    // when finding all blocks in a file, the flags must be set to 'global' and 'multiline'.
    const findAllBlocks = new RegExp(blockRegex, 'gm');

    replace({
        files: file,
        from: findAllBlocks,
        to: (match) => {
            // extract json from block
            const result = match.match(blockRegex);
            const json = JSON.parse(result[1]);

            const replacement = conversionFn(json);
            if (options.dryRun) {
                console.log(`In file [${file}], the following ${widget} widget: \n`);
                console.log(chalk.red('\t' + match.replace(/\n/g, '\n\t')));
                console.log('\n');
                console.log(`Would be replaced by this Markdown: \n    `);
                console.log(chalk.green('\t' + replacement.replace(/\n/g, '\n\t')));
                return match;
            } else {
                return replacement;
            }
        },
    });
}
