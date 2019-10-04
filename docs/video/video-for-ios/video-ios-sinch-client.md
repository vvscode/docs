---
title: "Sinch Client Video API iOS"
excerpt: ""
---
The *SINClient* is the Sinch SDK entry point. It is used to configure the user’s and device’s capabilities, as well as providing access to feature classes such as the *SINCallClient*, *SINMessageClient* and *SINAudioController*.

## Creating the *SINClient*

Set up the client and its delegate (*SINClientDelegate*, see [Reference](http://download.sinch.com/docs/iOS/latest/reference/html/Protocols/SINClientDelegate.html) documentation).
```objectivec
#import <Sinch/Sinch.h>

// Instantiate a Sinch client object
id<SINClient> sinchClient = [Sinch clientWithApplicationKey:@"<application key>"
                                          applicationSecret:@"<application secret>"
                                            environmentHost:@"sandbox.sinch.com"
                                                     userId:@"<user id>"];
```


The *Application Key* and *Application Secret* are obtained from the Sinch Developer Dashboard. See \[Production and Sandbox Environments\]\[\] for valid values for *environmentHost*. The User ID should uniquely identify the user on the particular device.

## Specifying capabilities

The SINClient can be configured to enable / disable certain functionality. Please see the [Reference](http://download.sinch.com/docs/iOS/latest/reference/html/Protocols/SINClient.html) for details.
 The following example shows how to setup the client with both voice calling and instant messaging enabled, and using [push notifications](doc:voice-ios-local-and-remote-push-notifications).
```objectivec
// Specify the client capabilities.
// (At least one of the messaging or calling capabilities should be enabled.)
[sinchClient setSupportCalling:YES];
[sinchClient setSupportMessaging:YES];

[sinchClient enableManagedPushNotifications];
```


## Starting the Sinch client
Before starting the client, make sure you assign a *SINClientDelegate*.
```objectivec
// Assign as SINClientDelegate                             
sinchClient.delegate = ... ;

// Start the Sinch Client
[sinchClient start];

// Start listening for incoming calls and messages
[sinchClient startListeningOnActiveConnection];
```




> **Note**    
>
> If the application is meant to only make outgoing calls but not receive incoming calls, don’t call the `startListeningOnActiveConnection`. Outgoing calls can be made after calling the start method, and after the delegate has received the callback `clientDidStart:`.

For applications that want to receive incoming calls while not running in the foreground, [push notifications](doc:voice-ios-local-and-remote-push-notifications) are required.

### Life cycle management of a *SINClient*-instance

We recommend that you initiate the Sinch client, start it, but not terminate it, during the lifetime of the running application. That also implies that the *SINClient*-instance should be *retained* by the application code.
 If incoming events are not needed, stop listening for incoming events by invoking `-[SINClient stopListeningOnActiveConnection]`), but **do not** invoke `-[SINClient terminateGracefully]` or `-[SINClient terminate]`. The reason is initializing and *starting* the client is relatively resource-intensive in terms of CPU.

It is best to keep the client instance alive and started unless there are reasons specific to your application. It should *not* be necessary to dispose of the client instance if memory warnings are received from iOS, because once the client is started it does not use much memory in comparison to view layers, view controllers etc. For the same reasons, if support for push notifications is enabled, the preferred method of temporarily stopping incoming events is to \[Unregister a push device token\]\[\].

The Sinch client can of course be completely stopped and also disposed. To do so, call one of the terminate methods on the client before the application code releases its last reference to the client object.

The following example shows how to dispose the Sinch client:
```objectivec
[sinchClient stopListeningOnActiveConnection];
[sinchClient terminateGracefully]; // or invoke -[SINClient terminate]
sinchClient = nil;
```


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-ios/video-ios-sinch-client.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>