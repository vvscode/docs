---
title: "Getting a second number and testing Sinch Callbacks/Webhooks with ngrok"
excerpt: "In this tutorial you will learn how you can redirect a Sinch number to your own mobile number. Since a few friends (and my boss) live in Sweden, I thought it’d be cool to have a Swedish number that can be redirected to my US mobile."
---
Today I will show how you can redirect a Sinch number to your own mobile number. Since a few friends (and my boss) live in Sweden, I thought it’d be cool to have a Swedish number that can be redirected to my US mobile.

Before we dive in, I want to show you the awesome tool, ngrok. One of the more difficult aspects of an integration with webhooks/callbacks is that the remote server needs to be able to access your server. Typically, your dev server is not available as a web server on the internet, so you have to rely on dynamic DNS or a similar solution. You can easily remedy this with the use of [ngrok](https://ngrok.com/). It sets up a tunnel and enables you to see all requests and responses with data.

## Getting started

In this example we are going to build a simple node app that will respond with SVAML to connect any call to a chosen number to my SF-based mobile. To read more about different events and how you can respond, read the docs [here](doc:voice-rest-api)

Create a file and call it app.js

```javascript
var http = require('http')

var server = http.createServer(function (request, response) {
    var data = '';
    request.on('data', function (chunk) {
        data += chunk;

    });
    request.on('end', function () {
        var requestModel;
        var responsedata;
        if (data == '') {
            response.writeHead(500, { 'Content-Type': 'application/json' });
            response.end('{"message":"no data posted"}');
            return;
        }
        requestModel = JSON.parse(data);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        switch (requestModel.event) {
            case "ice":
                responsedata = {
                    instructions: [],
                    action: {
                        name: "connectpstn",
                        destination: {
                            type: "number",
                            endpoint: "+15612600684"
                        },
                        cli: "+15612600684",
                        maxDuration: 14400,
                        locale: "en-US"
                    }
                };
                break;
            case "ace":
                responsedata = {
                    "instructions": [],
                    "action": {
                        "name": "continue"
                    }
                };
                break;
            default:
                responsedata = {}
        }
        response.end(JSON.stringify(responsedata));
    }
    );
});
server.listen(5500);
```

As you can see, we just need to read the body of the request, look to see if it’s an incoming call (start of call) or if someone answered, and reply with the correct action to connect the call. We start the server on port 5500.

Before we continue, install ngrok <https://ngrok.com/download>. It’s a one file app with no installer. Unpack it to a folder of your choice (I love ngrok so I also put in in path so I can access it easily from anywhere).

On windows, you need two terminals, one for node and one for ngrok. Start your node app

```shell
node app.js
```

start ngrok

```shell
ngrok http 5500
```

After starting ngrok you should see the dynamic domain name you were given. Open a browser and point it to <http://localhost:4040/> and you should see this:
![ngrokportal.png](images/4920505-ngrokportal.png)

Take note of the url. Before I connect up a real phone number in the Sinch portal, I want to make a sample request to the url. Head over to <http://svaml.net/simulator> to simulate an incoming call event.
![svamlnet.png](images/ea03e1b-svamlnet.png)

Change the url to the ngrok url. Hit test and you should now see what was posted to the server and what the response was in your <http://localhost:4040/>. Everything looks good\! If something’s not working the way you wanted, you can use your favorite node debugger and step thru code from real integration traffic. Awesome, right?

## Wrapping up

Let’s wrap this up and add a number to Sweden as I mentioned at the start.

To make this happen you must have an application in the Sinch platform and a phone number (DM me @cjsinch if you need some more test credits)

 1.  Rent a number with voice capability in the [rent number](https://portal.sinch.com/#/numbers)
 1.  Go to your app <https://portal.sinch.com/#/apps> or create one
 1.  Configure the voice tab by adding your newly rented number and add your ngrok url
![sinchdashboard.png](images/c47c644-sinchdashboard.png)

Call the number and start seeing real live requests from the Sinch platform.

Hope you found this helpful and if you have any questions dm me on @cjsinch

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/javascript/getting-a-second-number-and-testing-sinch-callbackswebhooks-with-ngrok.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>