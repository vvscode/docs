# Public documentation sources for Sinch

This repository holds the sources for the documentation hosted on [readme.io](http://sinch.readme.io).

## Content files

All contents are stored in `.md` files under the `docs` directory. Each subdirectory represents a category slug, and
subsequent subdirectories mimic the page hierarchy in Readme.

## `sync.js` CLI

## Preparation

If NVM (Node Version Manager) is not installed, [install it](https://github.com/nvm-sh/nvm#installation-and-update).

Then, make sure the right Node version is installed and in use:

    $ nvm install              
    $ nvm use

Finally, install project dependencies:
    
    $ npm install
    
### API key

You will need the API key for your Readme account to proceed with using the CLI. It can be obtained via the Readme admin 
user interface.

### Configuration

Global configurations can be provided either via `--` options on the command line, or via environment variables. 
If both are provided (not recommended), the `--` option will have precedence over the environment variable.

The following global configurations are available:

| Option            | Environment Variable |
| ---               | ---                  |
| `--apikey`        | `APIKEY`             |
| `--docsversion`   | `DOCSVERSION`        |

See help (`-h`) for details of each configuration option.

In addition to the global configuration, the file `config.yml` contains general configuration for the CLI. 
The following fields are available:

| Field         | Description |
| ---           | ---         |
|`categories`   | List of category slugs that exist on Readme documentation site. These slugs have been implied from the label of each category. This list is used by the CLI to list all categories when no specific slug is specified. |

### Get help

You can get help for the CLI or for any command by running it with `-h` argument:

    $ ./sync.js [command] -h 

### Commands

#### `push`

Pushes local Markdown content files to Readme via their public API. It is assumed that each `.md` file in the 
contents directory matches the slug of the page in Readme. 

**Usage examples**

Pushing contents for all categories defined in `config.yml`:

    $ ./sync.js --apikey {KEY} --docsversion {VERSION} push
    
Pushing contents for a specific category:

    $ ./sync.js --apikey {KEY} --docsversion {VERSION} push sms
    
Simulate (dry run) a push of only locally Git-staged files:  

    $ ./sync.js --apikey {KEY} --docsversion {VERSION} push sms --staged-only --dry-run   
    
#### `fetch`

Fetches up-to-date contents from Readme via their public API in a local folder. 
This command will create or update local `.md` files that represent the current content in Readme, organized in directories 
that represent the category/page hierarchy in Readme.  

**Usage examples**

Fetching contents of all categories defined in `config.yml`:

    $ ./sync.js --apikey {KEY} --docsversion {VERSION} fetch
    
Fetching contents for a specific category:

    $ ./sync.js --apikey {KEY} --docsversion {VERSION} fetch sms

#### `markdownize`

Converts Readme-specific widget blocks to standard Markdown.

**Usage examples**

Replace all Readme widgets with their Markdown equivalent:
 
    $ ./sync.js --apikey {KEY} --docsversion {VERSION} markdownize 

Only show what changes would be performing without actually saving them:
 
    $ ./sync.js --apikey {KEY} --docsversion {VERSION} markdownize --dry-run
    
Only convert Code and Image widgets from a specific content file:
 
    $ ./sync.js --apikey {KEY} --docsversion {VERSION} markdownize --file sms/sms.md --widgets code,image
    
#### `validate`

Runs a few sanity checks on content files, such as checking for broken links (both internal / cross references and remote URL links).    
 
**Usage examples** 
 
Run all validations on all content files:
 
    $ ./sync.js --apikey {KEY} --docsversion {VERSION} validate  
    
Validate only cross references for a single file:
 
    $ ./sync.js --apikey {KEY} --docsversion {VERSION} markdownize --file sms/sms.md --validations xrefs
 