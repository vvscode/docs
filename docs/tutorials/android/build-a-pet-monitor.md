---
title: "Build a Pet Monitor"
excerpt: "Want to check in on your pet while you’re at work, but not willing to shell out the big bucks for custom hardware devices? If you have an Android tablet and phone, you can build a voice communication system to chat with your pet in no time at all."
---
Want to check in on your pet while you’re at work, but not willing to shell out the big bucks for custom hardware devices such as [PetChatz](http://www.petchatz.com/) or [PetCube](https://www.petcube.com/) ? If you have an Android tablet and phone, you can build a voice communication system to chat with your pet in no time at all.

You can find the finished code for this tutorial [on our GitHub](https://github.com/sinch/pet-monitor/).

## Sinch setup

You will use the Sinch Android SDK for the voice stream in this app. First, download the SDK from [here](https://sinch.readme.io/page/downloads). Next, [sign up for a developer account](https://portal.sinch.com/#/signup), and create an app in the developer console. Take note of the generated app key and secret, as you will need them in a few minutes. Then, create a new Android project. (I’m using Android Studio, but Eclipse will work too.) Follow these steps to add Sinch as a library:

### Android Studio
    
> 1.  Copy the two jar files into your project’s libs folder
> 2.  Right-click the jar files and select “Add as library”
> 3.  Create a new folder under src/main, and name it jniLibs
> 4.  Move the armeabi and armeabi-v7a folders into the jniLibs folder you just created

### Eclipse
    
> 1.  Copy the entire libs folder into your project’s root directory.

## Build the pet’s app

For the pet’s app, you only need a blank screen that automatically accepts incoming phone calls. I jazzed mine up a bit:
![dog-app.png](images/ff618df-dog-app.png)

In your main activity, start an instance of the Sinch client, listen for incoming calls and automatically answer incoming calls. First, start the client using the app key and secret you generated earlier:

```java
sinchClient = Sinch.getSinchClientBuilder()
    .context(this)
    .userId("dog")
    .applicationKey("key")
    .applicationSecret("secret")
    .environmentHost("clientapi.sinch.com")
    .build();

sinchClient.setSupportCalling(true);
sinchClient.startListeningOnActiveConnection();
sinchClient.start();
```

Next, define a custom call listener that will automatically answer incoming calls:

```java
private class SinchCallClientListener implements CallClientListener {
    @Override
    public void onIncomingCall(CallClient callClient, Call incomingCall) {
        incomingCall.answer();
    }
}
```

After starting the Sinch client, add an instance of `SinchCallClientListener`:

```java
sinchClient.getCallClient().addCallClientListener(new SinchCallClientListener());
```

In addition, stop listening for incoming calls and terminate the client when the app is killed:

```java
@Override
protected void onDestroy() {
    super.onDestroy();
    sinchClient.stopListeningOnActiveConnection();
    sinchClient.terminate();
}
```

Last but not least, you don’t want the tablet to fall asleep from inactivity during the day. Add the following line before starting the Sinch client to keep the screen awake for as long as the app is open. (Let’s hope your pet isn’t smart enough to close the app\!)

```java
getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
```

## The human app

Lucky you — you don’t need to build an app for yourself\! In the Sinch Android SDK, there is a sample calling app that you can use to call your pet. Open **sinch-rtc-sample-calling** and enter the same key and secret from above in **SinchClientService.java**.

Now, run this app on your phone, and run the pet app on your tablet. The human app will prompt you for your name; you can enter anything here. To place the call, enter “dog” as the recipient name and press “call.” You’ll notice on your phone screen that the status of the call goes from “initiating” to “established” in one to two seconds without doing anything on the tablet.
![human-app.png](images/f87186e-human-app.png)

Tomorrow, before you leave for work, open this app on your tablet and turn up the volume. Call throughout the day to say hi, check if your dog is barking at the neighbors or talk to your parrot\!

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/android/build-a-pet-monitor.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>