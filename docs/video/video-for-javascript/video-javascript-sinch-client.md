---
title: "Sinch Client Video API JavaScript"
excerpt: ""
---
The `SinchClient` class is the SDK entry point. It is used to configure the user's and device's capabilities, as well as providing access to feature classes such as the MessageClient, CallClient, and VerificationClient.

## Instantiating the SinchClient

To use Sinch you first need to create a "sinchClient" object using the application key and you can specify some other options.
```javascript
var sinchClient = new SinchClient({
    applicationKey: '<application_key>'
});
```


The \*\* is obtained from the Sinch Developer Dashboard. In this example, the SinchClient is set up for Verification.

## Asynchronous Sinch Calls

The Sinch SDK contains many asynchronous methods. Several network requests are made in the background when making certain method calls and, while this happens, your code continues to execute.

When using asynchronous methods in Sinch, there are two ways of acting on the result. All asynchronous methods accept two callbacks as additional parameters, first the success callback, then the fail callback.

Additionally, all asynchronous methods in Sinch also return a promise, which will either be resolved or rejected. If it's resolved the next method in the chain, which is specified using `.then()`, is called. If there is a failure, the method specified in `.fail()` is called.

### Sinch with callbacks
```javascript
var handleSuccess = function() {...};
var handleFail = function() {...};

sinchClient.start(loginObj, handleSuccess, handleFail);
```


### Sinch with promises
```javascript
var handleSuccess = function() {...};
var handleFail = function() {...};

SinchClient.start(loginObj)
    .then(handleSuccess)
    .fail(handleFail);
```


The benefit of using promises is that it's easy to make a *chain of method calls* and the code is clearer, but either method works.

> **Note**    
>
> If both callbacks and promises are used, the execution order is for callbacks to be executed first followed by the methods in the promise-chain, specified using \`\`.then()\`\`


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-javascript/video-javascript-sinch-client.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>