---
title: "Turn Your Browser Into a Phone With the Sinch JS SDK"
excerpt: "A step-by-step walk through on how to build a web app to make VoIP calls between browsers using JavaScript. Read more."
---
The UI isn’t anything to write home about, but the finished web app will looking something like this:
![overview.png](images/350da25-overview.png)

The finished code for this tutorial can be found on [our Github](https://github.com/sinch/js-web-calling).

## Setup

 1.  If you don’t have a Sinch developer account, sign up and register a new app [here](https://portal.sinch.com/#/signup)
 1.  Download the SDK from [here](https://download.sinch.com/js/1.4.11/Sinch-javascript-1.4.11-863cac2.zip)
 1.  Create an index.html file with references to jQuery and the Sinch JavaScript SDK:

```html
<head>
    <title>Sinch Web Calling</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="sinch.min.js"></script>
</head>
```

## Create the UI

There are two parts to the UI for this app: a login form and a call screen. Users will first see the login screen and after successfully logging in, they will see the call screen:

```html
<form id="auth">
    <input id="username" placeholder="username">
    <input id="password" type="password" placeholder="password">
    <button id="loginUser">Login</button>
    <button id="createUser">Signup</button>
</form>

<div id="call" style="display:none;">
    current user: <span id="username"></span>
    <button id="logout">Logout</button>

    <form>
        <input id="callUsername" placeholder="username"><br>
        <button id="call">Call</button>
        <button id="hangup">Hangup</button>
        <button id="answer">Answer</button>

        <audio id="incoming" autoplay></audio>
        <div id="callLog"></div>
    </form>
</div>
```

Lastly, a div at the bottom of the page to display any errors that might occur:

`<div class="error"></div>`

## Login and user registration

This section will demonstrate how to log in and register users using the Sinch SDK. For this tutorial, you will use a very basic backend for user management to get started. You should not use this in a production environment. In production, you should use your own user authentication. You can find a [.net sample project here](https://github.com/sinch/net-backend-sample).

First, create an instance of the Sinch client:

```javascript
sinchClient = new SinchClient({
    applicationKey: 'your-app-key',
    capabilities: {calling: true},
});
```

Then, either create or log in the user and start the Sinch client:

```javascript
//store the username of the current user
var global_username = '';

$('button#createUser').on('click', function(event) {
    event.preventDefault();
    $('button#createUser').attr('disabled', true);
    $('button#loginUser').attr('disabled', true);
     clearError();

     var username = $('input#username').val();
     var password = $('input#password').val();

    var loginObject = {username: username, password: password};
    sinchClient.newUser(loginObject, function(ticket) {
          sinchClient.start(ticket, function() {
            global_username = username;
               showCall();
          }).fail(handleError);
    }).fail(handleError);
});

$('button#loginUser').on('click', function(event) {
    event.preventDefault();
    $('button#createUser').attr('disabled', true);
    $('button#loginUser').attr('disabled', true);
    clearError();

    var username = $('input#username').val();
    var password = $('input#password').val();

    var loginObject = {username: username, password: password};
    sinchClient.start(loginObject, function() {
          global_username = username;
        showCall();
    }).fail(handleError);
});

//handle errors
var handleError = function(error) {
     $('button#createUser').attr('disabled', false);
     $('button#loginUser').attr('disabled', false);
     $('div.error').text(error.message);
}

//clear out old errors
var clearError = function() {
    $('div.error').text("");
}

//show the call screen
var showCall = function() {
    $('form#auth').css('display', 'none');
    $('div#call').show();
    $('span#username').append(global_username);
}
```

## Make outgoing calls

Once a user is authenticated, you will use the Sinch call client to make outgoing calls. First, define a custom call listener. This lets you make decisions based on whether a call is ringing, connected or ended:

```javascript
var callListener = {
    onCallProgressing: function(call) {
        $('div#callLog').append("<div>Ringing...</div>");
    },
    onCallEstablished: function(call) {
        $('audio#incoming').attr('src', call.incomingStreamURL);
        $('div#callLog').append("<div>Call answered</div>");
    },
    onCallEnded: function(call) {
        $('audio#incoming').removeAttr('src');
        $('button#call').removeAttr('disabled');
        $('button#answer').removeAttr('disabled');
        $('div#callLog').append("<div>Call ended</div>");
    }
}
```

Then, define the Sinch call client and a variable to store the current call:

```javascript
var callClient = sinchClient.getCallClient();
   var call;
```

When the call button is clicked, disable the call and answer buttons, tell the user who they are calling and initiate the call. Lastly, add a call listener to the current call.

```javascript
$('button#call').click(function(event) {
    event.preventDefault();
    clearError();

    $('button#call').attr('disabled', 'disabled');
    $('button#answer').attr('disabled', 'disabled');
    $('div#callLog').append("<div>Calling " + $('input#callUsername').val() + "</div>");

    call = callClient.callUser($('input#callUsername').val());
    call.addEventListener(callListener);
});
```

To hang up the call:

```javascript
$('button#hangup').click(function(event) {
    event.preventDefault();
    clearError();

    call && call.hangup();
});
```

## Receive incoming calls

Your app should also listen for incoming calls:

```javascript
callClient.addEventListener({
    onIncomingCall: function(incomingCall) {
    $('div#callLog').append("<div>Incoming call from " + incomingCall.fromId + "</div>");

    call = incomingCall;
    call.addEventListener(callListener);
    }
});
```

## Test it

To test your app, open two browser windows, log in as two different users and make the call. Some browsers will ask for permission to use the microphone on your computer when you place the call.

Happy coding\! If you have any questions, feel free to reach out to us on [Twitter](https://twitter.com/sinchdev) or via our [help page](https://www.sinch.com/customer-service/).

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/javascript/turn-your-browser-into-a-phone-with-the-sinch-js-sdk.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>