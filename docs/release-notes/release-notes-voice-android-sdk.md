---
title: "Release Notes for the Sinch Voice Android SDK"
excerpt: "See how the Sinch JavaScript SDK is evolving and find out about new features and bug fixes."
---

See how our platform is evolving. Keep track of new features, API versions and bug fixes.

<h3>2017-11-23 | SINCH SDK ANDROID 3.12.3</h3>
-   Improved Wifi/Cellular handover for App calling

<h3>2017-11-06 | SINCH SDK ANDROID 3.12.2</h3>
-   Minor video capture bug fix.

<h3>2017-11-03 | SINCH SDK ANDROID 3.12.1</h3>
-   Improved robustness of video pipeline.
-   De-coupled capturing and preview (now it’s possible dynamically show/hide preview w/o affecting capturing and sending video).
-   Added new VideoController’s API: setVideoFrameListener() to set a callback that receives remote video frames w/o affecting rendering. Allows to do “screenshot” of remote video.
-   Added new VideoController’s API: setLocalVideoFrameListener() to set a callback that receives local video frames instead of sending them to remote side. Allows processing of local video before sending it. Does not affect rendering of local preview. Sample application “sinch-rtc-sample-video-filter” is added for demonstration.
-   Managed push notifications migrated from GCM to FCM (Google -\> Firebase Cloud Messaging).
-   Sample applications updated with regards of FCM use and SinchClient auto-restart.

<h3>2017-10-20 | SINCH SDK ANDROID 3.11.1</h3>
-   General improvement.

<h3>2017-03-10 | SINCH SDK ANDROID 3.11.0</h3>
-   Video Calling General Availability Release
-   Add support for pausing and resuming video stream
-   Known issue: Compatibility problem on a few specific 64 bits devices

<h3>2017-01-24 | SINCH SDK ANDROID 3.9.14</h3>
-   Video calling bug fixes

<h3>2016-11-14 | SINCH SDK ANDROID 3.9.10</h3>
-   Fixed local DTMF feedback playout.
-   IPv6 compatibility.

<h3>2016-09-30 | SINCH SDK ANDROID 3.9.9</h3>
-   Video calling bug fixes.

<h3>2016-07-14 | Sinch SDK Android 3.9.8</h3>
-   Improve robustness of native library loading for Android \< 4.3 (Jellybean MR2).This should improve on the situation described in <https://code.google.com/p/android/issues/detail?id=35962>
-   Fixed Message.timestamp() to return server-side timestamp for a Message passed to MessageClientListener.onMessageSent(…).

<h3>2016-06-29 | Sinch SDK Android 3.9.7</h3>
-   Fixed an issue affecting incoming call ringtone on some devices.
-   Fixed a possible crash occurring while logging certain HttpRequest errors.

<h3>2016-06-23   | Sinch SDK Android 3.9.6</h3>
-   Address BoringSSL version compatibility with regards to Google Play Store.

<h3>2016-05-11 | Sinch SDK Android 3.9.5</h3>
-   Upgrade BoringSSL to revision c880e42ba1c8032d4cdde2aba0541d8a9d9fa2e9. This revision includes fixes for described in <https://www.openssl.org/news/secadv/20160503.txt>

<h3>2016-05-03 | Sinch SDK Android 3.9.4</h3>
-   Fixed a possible crash for video calling when navigating away from the video call screen and back.
-   Fixed a possible crash on devices with custom OEM Android when the app is missing BLUETOOTH permission.

<h3>2016-03-04 | Sinch SDK Android 3.9.3</h3>
-   Updated the SDK to use HttpURLConnection instead of Apache HTTP client which is obsolete in Android 6.

<h3>2016-02-02 | Sinch SDK Android 3.9.2</h3>
-   Support for 64 bit architectures.
-   Support for dual webrtc.
-   Fixed a regression since 3.8.0 which affected setting proper AudioManager mode during a call.

<h3>2016-01-27 | Sinch SDK Android 3.9.1</h3>
-   SIP errors reporting.

<h3>2015-09-25 | Sinch SDK Android 3.7.1</h3>
-   Introduced Sinch conference calling.

<h3>2015-07-08 | Sinch SDK Android 3.6.2</h3>
-   Adaptive bitrate support for OPUS codec in app-to-app calls.

<h3>2015-06-01 | Sinch SDK Android 3.6.1</h3>
-   x86 support
-   Exposed getter for push display name on NotificationResult
-   Minor internal improvements

<h3>2015-04-10 | Sinch SDK Android 3.6.0</h3>
-   Support for managed push, where the Sinch backend will handle sending of push messages. See the reference documentation for setSupportManagedPush, unregisterManagedPush, the new sample app and the user-guide for more information.
-   relayRemotePushNotificationPayload will now correctly start the client when relaying payload for an IM.
-   Additional exception catching for undocumented exceptions thrown by Android audio related APIs.

<h3>2015-03-05 | Sinch SDK Android 3.5.0</h3>
-   Support for web-to-app calling with the Sinch Javascript SDK.
-   OPUS codec support in app-to-app calls.
-   Decreased amount of messages exchanged during call setup, resulting in shorter set up time.
-   SinchClientListener.onClientFailed() will now be called if the audio device fails to initialize.
-   Samples updated to be compatible with Android Studio 1.0.

<h3>2014-12-19 | Sinch SDK Android 3.4.3</h3>
-   Updated OpenSSL version to comply with Play Store requirements.

<h3>2014-12-08 | Sinch SDK Android 3.4.2</h3>
-   Decreased amount of network requests during startup.
-   IllegalArgumentException is now correctly thrown when headers for a call exceed 1024 bytes.

<h3>2014-12-03 | Sinch SDK Android 3.4.1</h3>
-   Improved internal call reporting.

<h3>2014-11-21 | Sinch SDK Android 3.4.0</h3>
-   SinchClient.registerPushNotificationData() will now throw if support for push notifications has not been enabled before the method is called.
-   Added getCall(String) to CallClient, which returns the Call object for the given callId, if that call exists.
-   Added getHeaders() to Call, which returns the custom headers for the call.
-   Sample apps have been updated to include a more robust implementation where the SinchClient is contained inside a Service.

<h3>2014-10-27 | Sinch SDK Android 3.3.9</h3>
-   Improvements to scenario where caller hangs up a call before certain internal REST API requests has completed, but the requests completes later during the graceful termination period.

<h3>2014-10-24 | Sinch SDK Android 3.3.8</h3>
-   Added new method SinchClient.terminateGracefully()

<h3>2014-10-17 | Sinch SDK Android 3.3.7</h3>
-   Fixed issue causing long call setup time when using certain codecs.

<h3>2014-10-10 | Sinch SDK Android 3.3.6</h3>
-   Additional improvements for scenarios in which the caller cancels a call before the call is answered.

<h3>2014-10-09 | Sinch SDK Android 3.3.5</h3>
-   Fixed issue if caller hung up call quickly and before the callee answer, the callee would not receive the event that the call actually ended.

<h3>2014-10-06 | Sinch SDK Android 3.3.4</h3>
-   Improved thread handling while fetching history in specific cases.

<h3>2014-10-01 | Sinch SDK Android 3.3.3</h3>
-   Improved logging of session events to enable debugging in cases where calls might fail to establish.
-   Enabled automatic provisioning of device specific settings to increase call quality.

<h3>2014-09-19 | Sinch SDK Android 3.3.2</h3>
-   Improvements in handling unstable network connection when initiating a call.
-   Fix for Xperia Z devices not picking up any input from the microphone.

<h3>2014-09-04 | Sinch SDK Android 3.3.0<-h3>
-   Added persistence mechanism. Instant messages are now persisted internally in the SDK and retried automatically for 12 hours before failing.

<h3>2014-08-05 | Sinch SDK Android 3.2.6</h3>
-   Bugfix: Incoming calls will from now on never have state PROGRESSING. Previously, incoming calls could either be in INITIATING or PROGRESSING just after CallClientListener.onIncomingCall. Now, the call will initially be in INITIATING, until transitioning to ESTABLISHED or ENDED.
-   Fixed crash when attempting to send DTMF during call setup.
-   Increased logging for rare instances where AudioTrack/AudioRecord would not initialize correctly.
-   Internal improvements for Call headers.

<h3>2014-07-11 | Sinch SDK Android 3.2.3</h3>
-   Minor internal improvements.
-   Significantly reduced size of native binary.

<h3>2014-06-12 | Sinch SDK Android 3.1</h3>
-   stop() has been deprecated in favor of the new terminate(). As part of this change, the SinchClient is now invalidated after terminate() (or stop()) is called and may not be started again.
-   SecurityExceptions thrown on network requests are caught internally in the SDK now, workaround for a potential Android bug that sometimes throws SecurityException when it should throw an exception related to unknown host.
-   CallDetails.getError() now correctly returns null if no error occurred.
-   Sample apps support for Eclipse
-   Other minor bug fixes and improvements

<h3>2014-05-20 | Sinch SDK Android 3.0.1</h3>
Bug fix:

-   Removed internal call to AudioManager.setMode() when establishing/tearing down a call.

<h3>2014-05-14 | Sinch SDK Android 3.0</h3>
Public release of the Android SDK with:

-   Better sound quality
-   Improved sample applications and documentation
-   Refactored calling and messaging API

<h3>2014-04-23 | Sinch SDK Android 3.0 BETA</h3>
First public beta version of the Sinch SDK for Android with support for:

-   App to app calling
-   App to phone calling
-   Instant messaging to single and multiple recipient


<a class="edit-on-github" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/release-notes/release-notes-voice-android-sdk.md">Edit on GitHub</a>