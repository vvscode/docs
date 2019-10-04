---
title: "Call a Phone Number From Your Android App With Sinch"
excerpt: "In this tutorial, you will build an Android app that uses Sinch to call phone numbers all over the world. It will take about 15 minutes."
---
In this tutorial, you will build an Android app that uses Sinch to call phone numbers all over the world. It will take about 15 minutes.

You can find the finished code for this tutorial at [github.com/sinch/android-pstn-tutorial](https://github.com/sinch/android-pstn-tutorial).

## Setup

To get started, create a blank project in Android Studio or Eclipse. You only need one activity for this app; I’ll call mine **CallActivity**.

To use the Sinch SDK, you will need to create a developer account. If you don’t have one yet, sign up [here](https://portal.sinch.com/#/signup). Once inside the developer dashboard, you can create a new app by clicking **Apps**\>**Create new app**, and filling in an app name.
![create-new-app.png](images/4bcca58-create-new-app.png)

Once you’ve created your app, you will see your app key and secret in the dashboard. Write these down because you will need these in a few minutes.

To download a copy of the latest version of the Sinch Android SDK, click [here](https://sinch.readme.io/page/downloads). Once you’ve downloaded the SDK, follow these instructions to include it in your project:

**Android Studio**
    
1.  Copy the entire libs folder to your project’s app folder
2.  Open build.gradle (Module) in allprojects \> repositories , add these lines :
    ```text
    flatDir {
        dirs '/libs'
    }
    ```
3.  Finally, open build.gradle (Project) in dependencies and add this line:
    ```text
    compile(name:'sinch-android-rtc', version:'+', ext:'aar')
    ```

## Create the view

The view for this app is very simple. It will be a single button that functions as both the **call** and **hang-up** button. There will also be a TextView that shows the state of the call (ringing or connected, for example).

![view.png](images/55ef969-view.png)

```xml
<Button
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Call"
    android:id="@+id/callButton"
    android:layout_alignParentTop="true"
    android:layout_centerHorizontal="true"/>

<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text=""
    android:id="@+id/callState"
    android:layout_below="@+id/callButton"
    android:layout_centerHorizontal="true"/>
```

By default, the button will act as a call button and the call state will be empty.

## Permissions to make a phone call

To make a phone call, you will need a few app permissions, as well access to the hardware microphone. Add this in **AndroidManifest.xml**:

```xml
<uses-feature
    android:name="android.hardware.microphone"
    android:required="false"/>

<uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

## Make the call

To make a call with Sinch (from **CallActivity**), the first thing you will need is an instance of the Sinch client, with the app key and secret you created earlier in this tutorial:

```java
//in onCreate
final SinchClient sinchClient = Sinch.getSinchClientBuilder()
    .context(this)
    .userId("current-user-id")
    .applicationKey("your-app-key")
    .applicationSecret("your-app-secret")
    .environmentHost("clientapi.sinch.com")
    .build();

    sinchClient.setSupportCalling(true);
    sinchClient.start();
```

> **Note**
> 
> In a production app, you wouldn’t want to hardcode a single user ID into this. Instead, you would use a string that uniquely identifies the current user in your app.

Next, define the callButton and callState from the view:

```java
callState = (TextView) findViewById(R.id.callState);
callButton = (Button) findViewById(R.id.callButton);
```

Then, listen for a click on the call button:

```java
callButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        //make a call!
    }
});
```

When the button is clicked, you will make a call to our test phone number. Calling the test phone number is an easy way to test your app. (You can also easily swap out the test phone number for any phone number and give it a call.)

```java
sinchClient.getCallClient().callPhoneNumber("+46000000000");
callButton.setText("Hang Up");
```

At this point, you can use your app to make a test call. Kill the app to hang up; you will add the functionality to hang up in the next section.

## Hang up the call

The first thing you need to do is keep track of the current call. Declare a variable, call and store the current call in this:

```java
Call call;

//when calling
call = sinchClient.getCallClient().callPhoneNumber("+46000000000");
```

This way, you can check to see if there is a current call in the OnClickListener and respond appropriately:

```java
callButton.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        if (call == null) {
            call = sinchClient.getCallClient().callPhoneNumber("+46000000000");
            callButton.setText("Hang Up");
        } else {
            call.hangup();
        }
    }
});
```

## Add a call listener

A call listener makes it easy to respond to events throughout the call, such as setting the callState text to “ringing” when the call is trying to connect or letting the user control the volume of the voice stream when the call is connected. See the inline comments below for more explanation:

```java
private class SinchCallListener implements CallListener {

    //the call is ended for any reason
    @Override
    public void onCallEnded(Call endedCall) {
        call = null; //no longer a current call
        callButton.setText("Call"); //change text on button
        callState.setText(""); //empty call state
        //hardware volume buttons should revert to their normal function
        setVolumeControlStream(AudioManager.USE_DEFAULT_STREAM_TYPE);
    }

    //call is connected
    @Override
    public void onCallEstablished(Call establishedCall) {
        //change the call state in the view
        callState.setText("connected");
        //the hardware volume buttons should control the voice stream volume
        setVolumeControlStream(AudioManager.STREAM_VOICE_CALL);
    }

    //call is trying to connect
    @Override
    public void onCallProgressing(Call progressingCall) {
        //set call state to "ringing" in the view
        callState.setText("ringing");
    }

    @Override
    public void onShouldSendPushNotification(Call call, List<PushPair> pushPairs) {
        //intentionally left empty
    }
}
```

Last but not least, add an instance of the SinchCallListener to the call right after it is created:

`call.addCallListener(new SinchCallListener());`

Congratulations on completing this tutorial\! You can now call any phone number from your Android app using Sinch.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/android/call-a-phone-number-from-your-android-app-with-sinch.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>