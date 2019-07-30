# Public documentation sources for Sinch APIs on readme.io

This repository holds the sources for the documentation hosted on [readme.io](http://sinch.readme.io).

## Content files

All contents are stored in `.md` files under the `docs` directory. Each subdirectory represents a category slug, and
subsequent subdirectories mimin the page hierarchy in Readme.

## `sync.js` CLI

## Preparation

If NVM (Node Version Manager) is not installed, [install it](https://github.com/nvm-sh/nvm#installation-and-update).

Then, make sure the right Node version is installed and in use:

    $ nvm install              
    $ nvm use

Finally, install project dependencies:
    
    $ npm install
    
### API key

You will need the API key for our Readme account to proceed with using the CLI. It can be obtained via the Readme admin 
user interface.

### Configuration

The file `config.yml` contains configuration for the CLI. The following fields are available:

| Field | Description |
| ----- | ----------- |
|`categories`  | List of category slugs that exist on Readme documentation site. These slugs have been implied from the label of each category. This list is used by the CLI when no specific slug is specified. |

### Get help

You can get help for the CLI or for any command by running it with `-h` argument:

    $ ./sync.js [command] -h 

### `push`: Push Local Content To Readme

Pushing contents for all categories defined in `config.yml`:

    $ ./sync.js --key {KEY} --docsversion {VERSION} push
    
Pushing contents for a specific category:

    $ ./sync.js --key {KEY} --docsversion {VERSION} push sms
    
### `fetch`: Fetch Current Content From Readme

Fetching up-to-date contents of all categories defined in `config.yml`:

    $ ./sync.js --key {KEY} --docsversion {VERSION} fetch
    
Fetching up-to-date contents for a specific category:

    $ ./sync.js --key {KEY} --docsversion {VERSION} fetch sms

