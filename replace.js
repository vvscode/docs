#!/usr/bin/env node

/**
 * Replaces all Readme-proprietary code widgets with standard Markdown code blocks.
 */

const replace = require('replace-in-file');
const glob = require("glob");

const findSingleCodeBlock = /\[block:code]\n((.|[\r\n])*?)\n\[\/block]/;
const findAllCodeBlocks = new RegExp(findSingleCodeBlock, 'gm');

glob('docs/**/*.md', {}, (er, files) => {
    for (const file of files) {
        replace({
            files: file,
            from: findAllCodeBlocks,
            to: (match) => {
                const result = match.match(findSingleCodeBlock);
                const details = JSON.parse(result[1]);

                var replacement = '';
                for (const block of details.codes) {
                    if (block.name) {
                        replacement += `\n**${block.name}**\n`;
                    }
                    replacement += '```' + block.language + '\n';
                    replacement += block.code + '\n';
                    replacement += '```\n\n';
                }
                return replacement;
            },
        });
    }
});
