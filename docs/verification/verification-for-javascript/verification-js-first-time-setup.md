---
title: "First time setup with JavaScript (Verification)"
excerpt: ""
---
This is a step-by-step guide about setting up the Sinch SDK for the first time.

## Register an Application

> 1.  Register a Sinch Developer account [here](https://portal.sinch.com/#/signup)
> 2.  Setup a new Application using the Dashboard where you can then obtain an *Application Key* and *Application Secret*.

## Download

The Sinch SDK can be downloaded [here](https://sinch.readme.io/page/downloads) . It contains: the Sinch JS SDK, this user guide, reference documentation, and sample apps.

## Running sample apps

Make sure you configure your application key in the sample apps by replacing the placeholder text "MY\_APPLICATION\_KEY" with your key. Samples can be run in the browser as files by double-clicking the index.html file. Make sure you open the developer console in your browser to catch possible error messages.

> **Note**    
>
> Currently, calling only works in the Chrome or Firefox browsers. Chrome additionally requires the web page to be loaded using http or https and is not compatible with local storage (i.e., file://).

## Development

There are many ways to include Sinch in your project, enabling you to select a suitable method depending on how your project is set up.

### Hosted with your webapp

You can host the library co-located with your website and include Sinch using
```html
<script src="sinch.min.js"></script>
```


### Load from Sinch CDN

If you prefer to always load the latest version from our CDN, use
```html
<script src="//cdn.sinch.com/latest/sinch.min.js"></script>
```


To control which version you load from our CDN, use
```html
<script src="//cdn.sinch.com/0.0.1/sinch.min.js"></script>
```


### Sinch is available as a npm package

If you are using [NodeJS](http://www.nodejs.org), add a dependency to Sinch by running:
```javascript
npm install sinch-rtc --save
```




> **Note**    
>
> The --save flag is optional for saving the dependency in package.json

Import Sinch SDK in your project using
```javascript
var SinchClient = require('sinch-rtc');
```


### Sinch is available as a Bower module

If you are using [Bower](http://bower.io/), add a dependency to Sinch by running:
```shell
bower install sinch-rtc --save
```


Import the Sinch SDK in your website using
```html
<script src="PATH_TO_BOWER_MODULES/sinch-rtc/sinch.min.js"></script>
```




> **Note**    
>
> The --save flag is optional for saving the dependency in bower.json

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-for-javascript/verification-js-first-time-setup.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>