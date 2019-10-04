---
title: "First time setup with Android (Voice)"
excerpt: ""
---
## Register an Application

1.  Register a Sinch Developer account [here](https://portal.sinch.com/#/signup).
2.  Setup a new Application using the Dashboard where you can then obtain an *Application Key* and an *Application Secret*.

## Download

The Sinch SDK can be downloaded [here](https://sinch.readme.io/page/downloads). It contains: the library *aar*, this user guide, reference documentation, and sample apps for calling and instant messaging.

## Add the Sinch library

The Sinch SDK library is distributed in [AAR](http://tools.android.com/tech-docs/new-build-system/aar-format) format. To use it in your project either:

>  - Copy the **.aar** file to the `libs` folder and edit the build.gradle file to include
```text
repositories {
    flatDir {
        dirs 'libs'
    }
}

dependencies {
    compile(name:'sinch-android-rtc', version:'+', ext:'aar')
}
```


>  - Or using Android Studio choose `File -> New -> New Module -> Import .JAR/.AAR Package` option

## Running ProGuard

If you are using ProGuard, we bundle an example proguard-project.txt file that makes sure that the Sinch SDK will work as expected.

## Permissions

A minimum set of permissions are needed for the app to use the Sinch SDK. These are specified in the `AndroidManifest.xml` file. If the calling functionality will be used, all five permissions listed here are needed. However, if the calling functionality isn’t used, the last three (RECORD\_AUDIO, MODIFY\_AUDIO\_SETTINGS and READ\_PHONE\_STATE) can be omitted.
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
```




> **Note**    
>
> By default, the Sinch SDK hangs up any Sinch call if the regular phone app has an active call. This functionality requires the permission READ\_PHONE\_STATE. However, if this default functionality isn’t wanted, turn it off by calling `sinchClient.getCallClient().setRespectNativeCalls(false);` and the permission READ\_PHONE\_STATE is not needed.

### Verify manifest in runtime during development

To verify that the manifest has the necessary permissions the `sinchClient.checkManifest()` method can be used. This method should be called before starting the client and will throw an exception if the manifest isn’t setup correctly. `sinchClient.checkManifest()` should only be called during development. When the application is ready for release the method call can safely be removed.

*Note:* This method takes into consideration which features the app supports (for example, calling, instant messaging, respecting native calls, and so on). Call `sinchClient.checkManifest()` after the setup but before the start of the SinchClient.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/voice-for-android/voice-android-first-time-setup.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>