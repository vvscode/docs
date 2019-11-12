---
title: First time setup
excerpt: 'Set up the Sinch Voice with Video SDK for the first time. Find out more information.'
next:
  pages:
    - voice-android-sinch-client
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
