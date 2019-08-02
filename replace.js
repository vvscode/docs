#!/usr/bin/env node

/**
 * Replaces all Readme-proprietary code widgets with standard Markdown code blocks.
 */

const replace = require('replace-in-file');
const glob = require("glob");

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

function replaceBlocks(file, blockType, conversionFunction) {
    const blockRegex = new RegExp(`\\[block:${blockType}\\]\\n((.|[\\r\\n])*?)\\n\\[/block\\]`);
    // when finding all blocks in a file, the flags must be set to 'global' and 'multiline'.
    const findAllBlocks = new RegExp(blockRegex, 'gm');

    replace({
        files: file,
        from: findAllBlocks,
        to: (match) => {
            // extract json from block
            const result = match.match(blockRegex);
            const json = JSON.parse(result[1]);

            // console.log(conversionFunction(json));
            // return match;

            return conversionFunction(json);
        },
    });
}

glob('docs/**/*.md', {}, (er, files) => {
    for (const file of files) {
        replaceBlocks(file, 'code', codeBlockToMarkdown);
        // replaceBlocks(file, 'callout', calloutToMarkdown);
        // replaceBlocks(file, 'html', htmlToMarkdown);
        // replaceBlocks(file, 'image', imageToMarkdown);
    }
});
