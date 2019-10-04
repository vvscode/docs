---
title: "Calling Voice API iOS"
excerpt: ""
---
The Sinch SDK supports four types of calls: *app-to-app (audio or video)*, *app-to-phone*, *app-to-sip* and *conference* calls. The SINCallClient is the entry point for the calling functionality of the Sinch SDK.

Calls are placed through the `SINCallClient` and events are received using the `SINCallClientDelegate`. The call client is owned by the SinchClient and accessed using `[sinchClient callClient]`. Calling is not enabled by default.

Enable calling with the following method before starting the `SINCallClient`:
```objectivec
[sinchClient setSupportCalling:YES];   
```


## Setting up an *app-to-app* call

Use the call client to start the call using the `callUserWithId:` method by passing the user identifier of the callee (the user receiving a call) as an argument.
```objectivec
id<SINCallClient> callClient = [sinchClient callClient];
id<SINCall> call = [callClient callUserWithId:@"<remote user id>"];
// Or for video call: id<SINCall> call = [callClient callUserVideoWithId:@"<remote user id>"];
```


A call object is returned, containing details about the participants in the call, call details such as start time, call state, possible errors, and so on.

Assuming the callee’s device is available and responsive, the delegate method `callDidProgress:` is called. It notifies the application that the outgoing call is progressing. If a progress tone should be played, this is where it should be started. We recommend that you use the available functionality provided by the Sinch SDK to play sounds such as ringtones (`SINAudioController`). See \[Playing Ringtones\]\[\] for details.

When the other party answers, the `callDidEstablish:` call delegate method is called. Now, the users can start talking. If a progress tone has been initiated, it should be stopped now, in the delegate callback method.

## Setting up an *app-to-phone* call

An *app-to-phone* call is a call that is made to a phone on the regular telephone network. Setting up an *app-to-phone* call is not much different from setting up an *app-to-app* call.

Instead of invoking the `callUserWithId:` method, invoke the `callPhoneNumber:` method on the `SINCallClient` object. Sufficient funds must be available on the Sinch account and a valid phone number specified for the call to connect successfully. The phone number should be specified according to the E.164 number formatting (<http://en.wikipedia.org/wiki/E.164>) recommendation and should be prefixed with a ‘+’. E.g. to call the US phone number 415 555 0101, the phone number should be specified as “+14155550101”. The ‘+’ is the required prefix and the US country code ‘1’ prepended to the local subscriber number.

Placing an *app-to-phone* call requires an account with credits; topping up credits can be done on the Account page. Credits are used each time an *app-to-phone* call is placed and the balance history is updated after each call.

*App-to-phone* calls can be tested by calling the following test number: *+46000000000*. When placing a call to this number, you will hear a voice prompt stating that the call has been connected, and shortly after that the call will automatically be ended.

## Setting up an *app-to-sip* call

An *app-to-sip* call is a call that is made to a SIP server. Setting up an *app-to-sip* call is not much different from setting up an *app-to-app* call. Instead of invoking the `callUserWithId:` method, invoke the `callSIP:` method on the `SINCallClient` object. The SIP identity follows the form of email addresses (<user@domain>), for example <Alice@SipProviderA.com>.
```objectivec
id<SINCallClient> callClient = [sinchClient callClient];
id<SINCall> call = [callClient callSIP:@"<SIP Identity>"];
```


When customized SIP headers are passed as a parameter, the headers should be prefixed with ‘x-’. If the SIP server reported any errors, the `SINCallDetails` object will provide an error with *SINErrorDomainSIP*.

## Setting up a *conference* call

A *conference* call can be made to connect a user to a conference room where multiple users can be connected at the same time. The identifier for a conference room may not be longer than 64 characters.
```objectivec
id<SINCallClient> callClient = [sinchClient callClient];
id<SINCall> call = [callClient callConferenceWithId:@"<conferenceId>"];
```


It is also possible to connect users to a conference call via the [Sinch REST API](doc:voice-rest-api-calling-api#section-text-to-speech).

## Handling incoming calls

To act on the incoming calls, implement the protocol *SINCallClientDelegate* and assign a delegate to the call client. The call client delegate is notified using the delegate method `didReceiveIncomingCall:` as calls come in to the device.

When the delegate method is executed, the call can either be connected automatically without any user action, or it can wait for the user to press the answer or the hangup button. We recommend that ringtones are played from within the delegate callback method. See \[Playing Ringtones\]\[\] for details.
```objectivec
- (void)client:(id<SINCallClient>)client didReceiveIncomingCall:(id<SINCall>)call {
    // Start playing ringing tone
    ...

    // Assign delegate
    call.delegate = self;
```


To get events related to the call, set the call delegate. The call object contains details about participants, start time, potential error codes, and error messages.

If [VoIP push notifications](doc:voice-ios-local-and-remote-push-notifications#section-enabling-voip-push-notifications) is enabled, add logic for presenting a local notification if the app is in the background when receiving the call:
```objectivec
- (SINLocalNotification *)client:(id<SINClient>)client
  localNotificationForIncomingCall:(id<SINCall>)call {
    SINLocalNotification *notification = [[SINLocalNotification alloc] init];
    notification.alertAction = @"Answer";
    notification.alertBody = @"Incoming call";
    return notification;
```




> **WARNING: Important**    
>
> See \[Local and Remote Push Notifications\]\[\] for further details on how to present and handle a user notification for an incoming call when the application is in the background.

### Incoming video call

When incoming call is a video call, the `didReceiveIncomingCall` delegate method will be executed, just like for the incoming audio call. The `SINCallDetails` object provides a `isVideoOffered` property to check whether the call offers a video track. See the \[Video calling\] section for details on how to add video views.

### Answering an incoming call

To answer a call, use the `answer` method on the call to accept it. If a ringtone was previously played, it should be stopped now.

User presses the answer button:
```objectivec
// User answers the call
[call answer];

// Stop playing ringing tone
```


Now, the clients on both ends establish the connection. When the call is established and the voice streams are running in both directions, the `callDidEstablish:` delegate method is called.

### Declining an incoming call

If the call should not be answered, use the `hangup` method on the call to decline. The caller is notified that the incoming call was denied. If a ringtone was previously played, it should be stopped now.

User presses the hangup button:
```objectivec
// User does not want to answer
[call hangup];

// Stop playing ringing tone
```


## Disconnecting a call

When the user wants to disconnect an ongoing call, use the `hangup` method. Either user taking part in a call can disconnect it.

Hanging up a call:
```objectivec
[call hangup];
```


When either party disconnects a call, the application is notified using the call delegate method `callDidEnd:`. This allows the user interface to be updated, an alert tone to be played, or similar actions to occur.

A call can be disconnected before it has been completely established.

Hanging up a connecting call:
```objectivec
// Starting a call
id<SINCall> call = [client callUserWithId:@"<remote user id>"];

// User changed his/her mind, let’s hangup
[call hangup];
```


Handling a call that ends:
```objectivec
// SINCallDelegate implementation

- (void)callDidEnd:(id<SINCall>) call {
  // update user interface, e.g. hide the call screen.
```


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/voice-for-ios/voice-ios-calling.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>