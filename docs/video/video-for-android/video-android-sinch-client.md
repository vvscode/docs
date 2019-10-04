---
title: "Sinch Client Video API Android"
excerpt: ""
---
The *SinchClient* is the Sinch SDK entry point. It is used to configure the user’s and device’s capabilities, as well as to provide access to feature classes such as the *CallClient*, *MessageClient* and *AudioController*.

## Create a *SinchClient*
```java
// Instantiate a SinchClient using the SinchClientBuilder.
android.content.Context context = this.getApplicationContext();
SinchClient sinchClient = Sinch.getSinchClientBuilder().context(context)
                                                  .applicationKey("<application key>")
                                                  .applicationSecret("<application secret>")
                                                  .environmentHost("sandbox.sinch.com")
                                                  .userId("<user id>")
                                                  .build();
```


The *Application Key* and *Application Secret* are obtained from the Sinch Developer Dashboard. See [Production and Sandbox Environments](doc:video-android-miscellaneous#section-production-and-sandbox-environments) for valid values for *environmentHost*. The User ID should uniquely identify the user on the particular device.

*Note:* All listener callbacks emitted from the Sinch SDK are invoked on the same thread that the call to `SinchClientBuilder.build` is made on. If the invoking thread is *not* the main-thread, it needs to have an associated `Looper`.

## Specify capabilities

The SinchClient can be configured to enable or disable certain functionality. Please see the [Reference](reference/index.html?com/sinch/android/rtc/SinchClient.html) for a comprehensive description of each capability.

The following example shows how to setup the client with both voice calling and instant messaging enabled.
```java
// Specify the client capabilities.
// At least one of the messaging or calling capabilities should be enabled.
sinchClient.setSupportMessaging(true);
sinchClient.setSupportCalling(true);
sinchClient.setSupportManagedPush(true);
// or
sinchClient.setSupportActiveConnectionInBackground(true);
sinchClient.startListeningOnActiveConnection()
```


Calling `startListeningOnActiveConnection` allows your application to receive incoming calls and messages without using push notifications.

> **Note**    
>
> If the application is meant to only make outgoing calls but not receive incoming calls, don’t call `startListeningOnActiveConnection` or `setSupportManagedPush`. Outgoing calls can be made after calling the start method.

## Start the Sinch client

Before starting the client, add a client listener (see [Reference](reference/index.html?com/sinch/android/rtc/SinchClientListener.html) documentation):
```java
sinchClient.addSinchClientListener(new SinchClientListener() {

    public void onClientStarted(SinchClient client) { }

    public void onClientStopped(SinchClient client) { }

    public void onClientFailed(SinchClient client, SinchError error) { }

    public void onRegistrationCredentialsRequired(SinchClient client, ClientRegistration registrationCallback) { }

    public void onLogMessage(int level, String area, String message) { }
});

sinchClient.start();
```


### Terminate the Sinch client

When the app is done using the SinchClient, it should be stopped. If the client is currently listening for incoming events, it needs to stop listening as well. After `terminate` is called, any object retrieved directly from the client object (that is, `CallClient`, `MessageClient`, and `AudioController`) is considered invalid.

Terminating the client:
```java
sinchClient.stopListeningOnActiveConnection();
sinchClient.terminate();
```


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-android/video-android-sinch-client.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>