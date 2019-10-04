---
title: "Calling Video API JavaScript"
excerpt: ""
---
The Sinch SDK supports four types of calls: *web-to-web (or app)* calls, *web-to-phone* calls, *web-to-sip* and *conference* calls. The CallClient is the entry point for the calling functionality of the Sinch SDK. At the moment, calling is only supported in Chrome and Firefox, and we hope to add support in more browsers later on. The `CallClient` is the entry point for the calling functionality of the Sinch SDK.

Calls are placed through the `CallClient` and general events are received through `eventListener` callback on CallClient. The call client is owned by the SinchClient and accessed using `sinchClient.getCallClient()`. When a call is placed, a new `call` object is generated. It’s possible to add eventListener\` callbacks on the created call-object, to listen for events related to this call, such as when the call state changes.

Calling is not enabled by default. Enable calling by instantiating `SinchClient` in the following way:
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true}});
```


## Set up a *web-to-web (or app)* call

Use the CallClient to start the call (the `callUser` method). Pass the user identifier of the callee (the user receiving the call) to the call method, so that Sinch services can connect the call to the callee.
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true}});
var call = sinchClient.callUser('<remote user id>');
call.addEventListener(...);
```


A call object is returned, containing details about the participants in the call, call details such as start time, call state, possible errors, and so on.

Assuming any of callee’s apps are available, the method `onCallProgressing` is called on the `CallListener`. It notifies the application that the outgoing call is progressing. If a progress tone should be played, this is where it should be started.

When the other party answers, the `onCallEstablished` method is called. Now, the users can start talking. If a progress tone was previously played, it should be stopped now. This is also where the incoming audio stream can be connected to a HTML audio element:
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true}});

var callListeners = {
    onCallEstablished: function(call) {
        $('audio').attr('src', call.incomingStreamURL); //If audio element has attribute "autoplay"
    },
}

var callClient = sinchClient.getCallClient();
var call = callClient.callUser('<remote user id>');
call.addEventListener(callListeners);
```




> **Note**    
>
> If the audio is not connected properly to the audio element, as shown above, there will be no sound.

## Set up an *web-to-phone* call

An *web-to-phone* call is a call that is made to a phone on the regular telephone network. Setting up an *web-to-phone* call is not much different from setting up a *web-to-web* call. Instead of invoking the `callUser` method, invoke the `callPhoneNumber` method on the `CallClient` object. Sufficient funds must be available on the Sinch account and a valid phone number specified for the call to connect successfully. The phone number should be specified according to the E.164 number formatting (<http://en.wikipedia.org/wiki/E.164>) recommendation and should be prefixed with a ‘+’. E.g. to call the US phone number 415 555 0101, the phone number should be specified as “+14155550101”. The ‘+’ is the required prefix and the US country code ‘1’ prepended to the local subscriber number.
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true}});

var callListeners = {
    onCallEstablished: function(call) {
        $('audio').attr('src', call.incomingStreamURL); //If audio element has attribute "autoplay"
    },
}

var call = callClient.callPhoneNumber('+46000000000');
call.addEventListener(callListeners);
```


Placing an *web-to-phone* call requires a developer account with credits. Topping up credits can be done on the Account page. Credits are used each time an *web-to-phone* call is placed and the balance history is updated after each call.

*Web-to-phone* calls can be tested by calling the following test number: *+46000000000*. When placing a call to this number, you will hear a voice prompt stating that the call has been connected, and shortly after that the call will automatically be ended.

## Setting up an *app-to-sip* call

An *app-to-sip* call is a call that is made to a SIP server. Setting up an *app-to-sip* call is not much different from setting up an *app-to-app* call. Instead of invoking the `callUser` method, invoke the `callSip` method on the `CallClient` object. The SIP identity follows the form of email addresses (<user@domain>), for example <Alice@SipProviderA.com>.
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true}});

var callListeners = {
    onCallEstablished: function(call) {
        $('audio').attr('src', call.incomingStreamURL); //If audio element has attribute "autoplay"
    },
}

var call = callClient.callSip('Alice@SipProviderA.com');
call.addEventListener(callListeners);
```


When customized SIP headers are passed as a parameter, the headers should be prefixed with ‘x-’. If the SIP-server reported any errors, the call object will contain an error object with the headers, listen for this using the onCallEnded callback and check for call.errors.

## Set up a *conference* call

A *conference* call can be made to connect a user to a conference room where multiple users can be connected at the same time. The identifier for a conference room may not be longer than 64 characters.
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true}});

var callListeners = {
    onCallEstablished: function(call) {
        $('audio').attr('src', call.incomingStreamURL); //If audio element has attribute "autoplay"
    },
}

var call = callClient.callConference('CONFERENCE_ROOM_HASH');
call.addEventListener(callListeners);
```


It is also possible to connect users to a conference call via the [Sinch REST API](doc:voice-rest-api-calling-api#section-text-to-speech).

## Play ringback tone

For a good user experience, users expect a ringback tone while waiting for receiving end to pick up the phone. For this purpose, the following eventListener for a call may be a good template.
```javascript
var callListeners = {
    onCallProgressing: function(call) {
        $('audio#ringback').prop("currentTime",0); //Ensure ringback start from beginning
        $('audio#ringback').trigger("play"); //Play ringback when call is progressing
    },
    onCallEstablished: function(call) {
        $('audio#ringback').trigger("pause"); //End ringback

        $('audio#incoming').attr('src', call.incomingStreamURL); //Connect incoming stream to audio element
    },
    onCallEnded: function(call) {
        $('audio#ringback').trigger("pause"); //End the ringback
        $('audio#incoming').attr('src', ''); //Ensure no incoming stream is playing

        //Optional: Enable user interface to make another call
    }
}
```


## Handle incoming calls

In order to receive calls, `SinchClient` must be instantiated with configuration option `supportActiveConnection` set to true and invoking `startActiveConnection` after your `SinchClient` has successfully started.
```javascript
var sinchClient = new SinchClient({
    applicationKey: '<application_key>',
    capabilities: {calling: true},
    supportActiveConnection: true,
});
```


To answer calls, the application must be notified when the user receives an incoming call.

Add a `eventListener` to the `CallClient` to act on the incoming calls. The `eventListener` is notified using onIncomingCall as calls come in to the application.
```javascript
CallClient callClient = sinchClient.getCallClient();

callClient.addEventListener({
    onIncomingCall: function(incomingCall) {...}
});
```


When the incoming call method is executed, the call can either be connected automatically without any user action, or it can wait for the user to press the answer or the hangup button. If the call is set up to wait for a user response, we recommended that a ringtone is played to notify the user that there is an incoming call.
```javascript
callClient.addEventListener({
    onIncomingCall: function(incomingCall) {
        //Play some groovy tunes & show UI
        ...
        //Add event listeners to the new call object representing the incoming call
        incomingCall.addEventListener(callListeners);
    }
});
```


To get events related to the call, add a call listener. The call object contains details about participants, start time, potential error codes, and error messages.

### Answer incoming call

To answer the call, use the `answer` method on the call to accept it. If a ringtone was previously played, it should be stopped now.

User presses the answer button:
```javascript
// User answers the call
call.answer();
// Stop playing ringing tone
...
```


Now, the clients on both ends establish the connection. When the call is established and the voice streams are running in both directions, the `onCallEstablished` listener method is called. In this listener method you should connect the incoming audio to an HTML audio element to hear the other side.

### Decline incoming call

If the call should not be answered, use the `hangup` method on the call to decline. The caller is notified that the incoming call was denied. If a ringtone was previously played, it should be stopped now.

User presses the hangup button:
```javascript
// User does not want to answer
call.hangup();
// Stop playing ringing tone
...
```


## Disconnecting a Call

When the user wants to disconnect an ongoing call, use the `hangup` method. Either user taking part in a call can disconnect it.

Hanging up a call:
```javascript
call.hangup();
```


When either party disconnects a call, the application is notified using the call listener method `onCallEnded`. This allows the user interface to be updated, an alert tone to be played, or similar actions to occur.

A call can be disconnected before it has been completely established.

Hanging up a connecting call:
```javascript
// Starting a call
var call = callClient.callPhoneNumber("<remote participant>");

// User changed his/her mind, let’s hangup
call.hangup();
```


## Video calling

> **WARNING: Beta**    
>
> The Sinch JS SDK Video Calling features are still under development and not suitable for a production environment

Video calling can be activated for data calling by adding the capability “video” when starting the client. With this capability, video will now be added to all data-calls. Web to phone (PSTN) calling will be unaffected. A video call is set up in the same way as a voice only call:
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true, video: true}}); // Notice the video capability
var call = sinchClient.callUser('<remote user id>');
call.addEventListener(...);
```


For callbacks, hangup and other methods on the call object when performing a video call, please reference the API docs for audio-only calls.

## Group calling

> **WARNING: Beta**    
>
> The Sinch JS SDK group calling feature is still under development and not suitable for a production environment

Group calling allows participants to broadcast their presence to a particular “conference room”, upon which all participants already online will automatically add the new participant to the call. This results in a flexible “all-to-all” video conferencing solution.

For starting the sinchClient with the capability of making a group call, the capability “multiCall” must be set.
```javascript
var sinchClient = new SinchClient({applicationKey: '...', capabilities: {calling: true, video: true, multiCall: true}}); // Notice the multiCall capability
```


When joining a particular group and acting on the incoming media streams from other participants, the Sinch JS SDK will automatically take care of all call management, but you have to initiate the process and act on certain callbacks in order to connect incoming media streams to the relevant HTML elements.
```javascript
var callClient = sinchClient.getCallClient();

sinchClient.start({username: "<username>", password: "<password>"}).then(function() { // After the client is started, place the call
    var groupCall = callClient.callGroup("<name_of_group>");

    groupCall.addEventListener({
        onGroupRemoteCallAdded: function(call) { // Called when a remote participant stream is ready
            $('video#other').attr('src', call.incomingStreamURL);
        },
        onGroupLocalMediaAdded: function(stream) { // Called when the local media stream is ready (optional)
            $('video#me').attr('src', window.URL.createObjectURL(stream));
        },
        onGroupRemoteCallRemoved: function(call) { // Called when a remote participant has left and the stream needs to be removed from the HTML element
            $('video#other').attr('src', (remoteCalls[index] || {}).incomingStreamURL || '');
        },
    });
});
```


In this example, the group call is initiated after the client is started. A number of listeners was added in order to connect the incoming remote media streams (first callback), connect the local media stream and also manage lost participants. When the callGroup method is called, the callClient will immediatley start communication with other participants on the specified Channel in order to establish active video calls.


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-javascript/video-javascript-calling.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>