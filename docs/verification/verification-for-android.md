---
title: Verification for Android
excerpt: ''
---
The Sinch Verification SDK makes verifying phone numbers easy. This SDK supports the verification of phone numbers via SMS or flash calls.

This document provides an overview for developers integrating with Sinch Verification SDK for the first time. Please see the [Reference Documentation](http://www.sinch.com/docs/verification/android/reference/) for a comprehensive description of all the classes.

> **WARNING: Important notice #1 - migration to 1.6.x and using using Flash Calls on Android 9**    
>
> Due to newly introduced [restrictions for accessing SMS and call logs](https://support.google.com/googleplay/android-developer/answer/9047303?hl=en), users of older versions of this SDK (`1.5.3` and older) need to remove following permissions from their app manifests, when migration to new version of this SDK (`1.6.0` and newer):
> 
> ```xml
> <uses-permission android:name="android.permission.READ_SMS" />
> <uses-permission android:name="android.permission.RECEIVE_SMS" />
> <uses-permission android:name="android.permission.READ_CALL_LOG" />
> ```



> **WARNING: Important notice #2 - using flash calls on Android 9 and newer versions**    
>
> Removing `<uses-permission android:name="android.permission.READ_CALL_LOG" />` will effectively break flash call feature on Android 9 and newer. If you plan to use flash call feature, you’ll need to keep this permission in your manifest. Since this is one of the permissions restricted in normal use, you’ll have to declare how this permission will be used in your app. Below you’ll find a screenshot that shows properly selected use case for flash calls.


![permission-requests.png](images/9b057ba-permission-requests.png)

