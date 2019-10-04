---
title: "Sinch SMS node module"
excerpt: "Node module to send SMS world-wide from within a Node or web application (using Browserify)."
---
Node module to send SMS world-wide from within a Node or web application (using Browserify).

Additional information available [on our website](https://www.sinch.com/products/messaging/sms/).

## Installing

Install is straight forward using npm;

```shell
npm install sinch-sms --save
```

> **Note**
> 
> Module is compatible with browserify

## Include in your project

```javascript
    var sinchSms = require('sinch-sms')({
            key: 'YOUR APPLICATION_KEY',
            secret: 'YOUR_APPLICATION_SECRET'
        });
```

To send an SMS, simply call the `send()` method, as in this simple example:

```javascript
    var sinchSms = require('sinch-sms')({
            key: 'YOUR_APPLICATION_KEY',
            secret: 'YOUR_APPLICATION_SECRET'
        });
    
    sinchSms.send('+1555123456', 'Hello World!').then(function(response) {
        //All good, response contains messageId
        console.log(response);
    }).fail(function(error) {
        // Some type of error, see error object
        console.log(error);
    });
```

For a more complete sample, including how to poll delivery status for a given messageId, please see the provided samples.

## Get your app key

New to Sinch? In order to get started, please visit [our website](https://portal.sinch.com/#/signup) and sign up for a free development account.

## Methods

 - **send**(number, message) - Send SMS `message` to `number`
 - **getStatus**(messageId) - Retrieve status for message `messageId`

*Above methods return promises, see sample for how to chain further action on success / fail.*

## Samples

See the `samples/` folder, for some basic usage examples. Samples work fine both in Node.js and in the browser by using browserify.

> **Note** 
> 
> If you’re using your clientapi application key, SMS can only be sent to numbers you have verified in the [Sinch dashboard](https://portal.sinch.com/#/login).

First edit the relevant sample to ensure it got your credentials or user information. Then you can run the sample in Node using:

    $ node samples/SAMPLE_NAME.js

If you’d like to run it in the browser, first [browserify](http://browserify.org) the sample into a browser-compatible script using:

    $ browserify samples/SAMPLE_NAME.js > sample_bundle.js

Include the bundle in a web project, by adding the following tag to your HTML file:

    <script src="sample_bundle.js"></script>

Be sure to check the developer console for console output.

## Feedback

Questions and/or feedback on this module can be sent by contacting <dev@sinch.com>.

## License

The MIT License (MIT)

Copyright (c) 2015 Sinch AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/javascript/sinch-sms-node-module.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>