---
title: "First time setup"
excerpt: ""
---
# First time setup

This is a step-by-step guide about setting up the Sinch SDK for the first time.

## Register an Application

> 1.  Register a Sinch Developer account [here](https://portal.sinch.com/#/signup)
> 2.  Setup a new Application using the Dashboard where you can then obtain an *Application Key* and *Application Secret*.

## Download

The Sinch SDK can be downloaded [here](page:downloads) . It contains: the Sinch JS SDK, this user guide, reference documentation, and sample apps.

## Running sample apps

Make sure you configure your application key in the sample apps by replacing the placeholder text "MY\_APPLICATION\_KEY" with your key. Samples can be run in the browser as files by double-clicking the index.html file. Make sure you open the developer console in your browser to catch possible error messages.
[block:callout]
{
  "type": "info",
  "body": "Currently, calling only works in the Chrome or Firefox browsers. Chrome additionally requires the web page to be loaded using http or https and is not compatible with local storage (i.e., file://).",
  "title": "Note"
}
[/block]
## Development

There are many ways to include Sinch in your project, enabling you to select a suitable method depending on how your project is set up.

### Hosted with your webapp

You can host the library co-located with your website and include Sinch using
[block:code]
{
  "codes": [
    {
      "code": "<script src=\"sinch.min.js\"></script>",
      "language": "html"
    }
  ]
}
[/block]
### Load from Sinch CDN

If you prefer to always load the latest version from our CDN, use
[block:code]
{
  "codes": [
    {
      "code": "<script src=\"//cdn.sinch.com/latest/sinch.min.js\"></script>",
      "language": "html"
    }
  ]
}
[/block]
To control which version you load from our CDN, use
[block:code]
{
  "codes": [
    {
      "code": "<script src=\"//cdn.sinch.com/0.0.1/sinch.min.js\"></script>",
      "language": "html"
    }
  ]
}
[/block]
### Sinch is available as a npm package

If you are using [NodeJS](http://www.nodejs.org), add a dependency to Sinch by running:
[block:code]
{
  "codes": [
    {
      "code": "npm install sinch-rtc --save",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "The --save flag is optional for saving the dependency in package.json",
  "title": "Note"
}
[/block]
Import Sinch SDK in your project using
[block:code]
{
  "codes": [
    {
      "code": "var SinchClient = require('sinch-rtc');",
      "language": "javascript"
    }
  ]
}
[/block]
### Sinch is available as a Bower module

If you are using [Bower](http://bower.io/), add a dependency to Sinch by running:
[block:code]
{
  "codes": [
    {
      "code": "bower install sinch-rtc --save",
      "language": "shell"
    }
  ]
}
[/block]
Import the Sinch SDK in your website using
[block:code]
{
  "codes": [
    {
      "code": "<script src=\"PATH_TO_BOWER_MODULES/sinch-rtc/sinch.min.js\"></script>",
      "language": "html"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "The --save flag is optional for saving the dependency in bower.json",
  "title": "Note"
}
[/block]