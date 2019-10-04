---
title: "Build a Conference Calling App in Node.js & Express"
excerpt: "In this tutorial we are going to create a very simple conference calling app where you can call in to a number and be connected to anyone. A little bit like the carrier hotlines back in the day."
---
In this tutorial we are going to create a very simple conference calling app where you can call in to a number and be connected to anyone. A little bit like the carrier hotlines back in the day (maybe they still exist, any one know?).

This tutorial will take approx. 15 min to finish.

## Setup

To get started, you will need:

 1.  A [Sinch account](https://portal.sinch.com/#/signup) and an app with keys
 1.  A phone number [rented from Sinch](https://portal.sinch.com/dashboard/#/numbers); make sure it’s a voice number
 1.  A place to host your backend, I am hosting my app on Azure for free

## Rent a number

Go to your dashboard, and click on numbers. Then click on the “Rent Numbers” button.
![rentnumber1.png](images/01d0dc4-rentnumber1.png)

Then, pick a local number you will be calling in to.
![rentnumber3.jpg](images/4034dc9-rentnumber3.jpg)

After your rented a number you need to configure your app. If you dont have one, just create a new one.
![rentnumber_callback.png](images/219c19d-rentnumber_callback.png)

For this tutorial the endpoint for callbacks will be `http://yourserver/sinch` so make sure you have a place to host and configure your callback to that address.

So now I have an app that as soon as someone dials **+14153493281** will make a callback to my URL. Because I have nothing there right now, the call will just hangup.

## Create a node app

As I mentioned before, this is going to be a super simple implementation where everyone will be connected to the conference, no questions asked.

Let’s start creating a node app. Open a powershell or terminal and create a folder to host your app.

```powershell
npm init
npm install express -save
npm install body-parser -save
```

This creates a **packages.json** file and installs a [express dependency](http://expressjs.com/). The reason for using express apart from it being popular, is it has some nice json extensions and I like MVC frameworks as an organisation for web apps. Open up your favorite text editor. I am using Visual Studio Code which is an awesome tool with a good debug feature and really nice intellisense. Open up **packages.json** and change **main** to **app.js**.

**packages.json**

```json
{
  "name": "nodecallbacks",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.13.3"
  }
}
```

Next create a file called **app.js** in the root folder, and start coding:

**app.js**

```javascript
// add requires
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/sinch');

//set up an app
var app = express();
//configure on what port express will create your app
var port = process.env.PORT || 5000;

//congigure body parsing for the app,
//in this tutorial we will be doing json only
app.use(bodyParser.json());

//add the sinch route
app.use('/sinch', router);

//add default content type for all requests
app.use(function (req, res, next) {
  res.setHeader("Content-Type","application/json");
  next();
});
//export and start listening
module.exports = app;
app.listen(port);
```

Nothing strange here, just some basic express setup of an app. Note that now we don’t respond to anything…yet. Create a folder and call it **routes** and add a file called **sinch.js** to it. This will be our route to handle posts from the sinch backend.

**sinch.js**

```javascript
// add requires
var express = require('express');
var router = express.Router();
router.post('/', function (req, res, next) {
    //echo the post
    res.json(req.body);
}
);
module.exports = router;
```

The only thing this router does at the moment is to echo whatever you post in to Sinch. Try it out and make sure it works. I am using Postman to create my day to day testing.
![postman_hello.png](images/422a82a-postman_hello.png)

## Add Sinch funcationality.

As mentioned before, as soon as someone calls in on a the phone number, Sinch will make a callback to my backend and I can respond with what we call **SVAML**. More information about our REST API’s can be found [here](doc:voice-rest-api) and for this tutorial we are particularly interested in the [ICE event](doc:voice-rest-api-callback-api).

Whenever someone calls in, I want to connect them to my conference with their caller ID. So reading the docs, I see that to connect to a conference (which is in fact exactly what a hotline is), I just need to respond with this:

**Conference Response**

```json
{
    "Action":
    {
        "name" : "ConnectConf",
        "conferenceId" : "myConference123"
    }
}
```

But I also wanted to spice it up and welcome the caller with a text to speech command in the instructions parameters.

**Welcome Message**

```json
{
    "name" : "Say",
    "text" : "Hello, this is a text to speech message",
    "locale" : "en-US"
}
```

In **sinch.js** just below `var router` add the SVAML code.

**SVAML Response**

```javascript
var svamlResponse =
    {
        instructions: [
            {
                "name": "Say",
                "text": "Welcome to the hotline",
                "locale": "en-US"
            }
        ],
        action: {
            "name": "ConnectConf",
            "conferenceId": "myconference1",
            "cli": "",
            "suppressCallbacks": true
        }
    }
```

You might notice that I added **supressCallbacks**, and this is because in this case I don’t want any more callbacks after the ICE event. So to connect to the conference, we need to change the the **router.post** to this

**router.post**

```javascript
router.post('/', function (req, res, next) {
    //we know its a ICE event since we supress callbacks for other events
    // set the callerid to the calling number
    svamlResponse.action.cli = req.body.cli;
    //send back the response.
    res.json(svamlResponse);
});
```

Fire it up localy and try and send this fake incoming body to your controller in Postman.

**Fake Request**

```json
{
   "event":"ice",
   "callid":"2DOQGZ3D2JA5JB54BI4OTPFT3I@81.201.84.195",
   "timestamp":"2015-11-11T03:28:25Z",
   "version":1,
   "userRate":{
      "currencyId":"USD",
      "amount":0.0
   },
   "cli":"15612600684",
   "to":{
      "type":"did",
      "endpoint":"+17864088196",
      "verified":null
   },
   "domain":"pstn",
   "applicationKey":"1680b6f8-aa0e-422f-bf25-932adb3a48af",
   "originationType":"PSTN"
}
```

And if everything works you should get back a response like this:

**Response**

```json
{
  "instructions": [
    {
      "name": "Say",
      "text": "Welcome to the hotline",
      "locale": "en-US"
    }
  ],
  "action": {
    "name": "ConnectConf",
    "conferenceId": "myconference1",
    "cli": "15612600684",
    "suppressCallbacks": true
  }
}
```

In order to test this out, deploy it your server that Sinch can access and make a test request to make sure you still get the correct SVAML response. Then dial in\!

## More resources

I hope you enjoyed this tutorial and if you have any questions, please add a comment or contact us via our [support page](https://www.sinch.com/customer-service/).

If you want to continue building a conference calling app, take a look at the other resources we have:

 - [Sinch REST Documentation](doc:voice-rest-api)
 - [Building a Conference Calling System in .NET](doc:build-a-conference-calling-app-in-nodejs-express)
 - [Hosting node on Azure](https://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/javascript/build-a-conference-calling-app-in-nodejs-express.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>