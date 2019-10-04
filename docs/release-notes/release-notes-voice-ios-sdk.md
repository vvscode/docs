---
title: "Release Notes for the Sinch Voice iOS SDK"
excerpt: "See how the Sinch JavaScript SDK is evolving and find out about new features and bug fixes."
---

See how our platform is evolving. Keep track of new features, API versions and bug fixes.

<h3>2017/12/20 | SINCH SDK IOS 3.12.3</h3>
-   Improved sample apps

<h3>2017/11/22 | SINCH SDK IOS 3.12.2</h3>
-   Improved Wifi/Cellular handover for App calling

<h3>2017/10/27 | SINCH SDK IOS 3.12.1</h3>
-   Minor bug fixes with regard to CallKit support

<h3>2017/10/20 | SINCH SDK IOS 3.12.0</h3>
-   Added support for CallKit integration (voice call only).
-   Added support for accessing the raw video frame of local video stream: developers can now for example apply filter on local video stream and send it to remote, or save screenshots of the local video stream.
-   Fixed IPv6 compatibility issue.
-   Minor fixes in Sample Apps.

<h3>2017/03/10 | SINCH SDK IOS 3.11.0</h3>
-   Video Calling General Availability Release:
    -   Added support for pausing and resuming video stream.
    -   Added support for accessing the raw video frame of remote video stream.
-   Resolved potential error \`duplicate symbol
    -   OBJC\_CLASS\$\_GTMStringEncoding\` when using the Sinch SDK together with other third-party libraries that make use of GTMStringEncoding.

<h3>2017/01/30 | SINCH SDK IOS 3.10.1</h3>
-   Bug fixes

<h3>2017/01/24 | SINCH SDK IOS 3.10.0</h3>
-   General improvement

<h3>2016/11/14 | SINCH SDK IOS 3.9.8</h3>
-   IPv6 compatibility.
-   General improvement and minor bug fixes.

<h3>2016/09/30 | SINCH SDK IOS 3.9.7</h3>
-   Video calling bug fixes.

<h3>2016/08/04 | Sinch SDK iOS 3.9.6</h3>
-   iOS 10 compatibility.
-   Deprecated -[SINClient setSupportActiveConnectionInBackground:] for iOS 10. See the new section ‘Deprecated features and APIs’ in User Guide for details on this deprecation.

<h3>2016/08/04 | Sinch SDK iOS 3.9.5</h3>
-   Fix -[SINMessage timestamp] to return server-side timestamp for a id passed to -[SINMessageClientDelegate messageSent:recipientId:]
-   Dropped support for i386 iOS Simulator. Please use x86\_64 iOS Simulator.

<h3>2016/05/11 | Sinch SDK iOS 3.9.4</h3>
-   Upgrade BoringSSL to revision c880e42ba1c8032d4cdde2aba0541d8a9d9fa2e9. This revision includes fixes for described in <https://www.openssl.org/news/secadv/20160503.txt>

<h3>2016/03/09 | Sinch SDK iOS 3.9.3</h3>
-   Fix linker issues when using the SDK via CocoaPods.

<h3>2016/03/04 | Sinch SDK iOS 3.9.2</h3>
-   Support for LLVM bitcode.

<h3>2016/01/27 | Sinch SDK iOS 3.9.1</h3>
-   SIP errors reporting.

<h3>2015/09/25 | Sinch SDK iOS 3.7.1</h3>
-   Removed armv7s slice in framework/library binary
-   Fixed the macro SINAPSEnvironmentAutomatic to consider both DEBUG and NDEBUG. This should make it work with Xcode projects that are created with the default build setting DEBUG=1 defined for the Debug build configuration.
-   Updated to comply with iOS 9 App Transport Security defaults. See the following link for details: <https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/>
-   Sample app updates for Xcode 7 and iOS 9.
-   Introduced Sinch conference calling.

<h3>2015/07/08 | Sinch SDK iOS 3.5.2</h3>
-   Adaptive bitrate support for OPUS codec in app-to-app calls.

<h3>2015/06/01 | Sinch SDK iOS 3.5.1</h3>
-   Use UIApplication background task when requesting push device token to increase robustness of aquiring device token when application is launched into background mode (e.g. after device reboot, or after a crash). Note that is only used when using VoIP push notifications (PushKit). (The background task is started upon -[SINManagedPush setDesiredPushTypeAutomatically] or -[SINManagedPush setDesiredPushType:], and it’s ended upon receiving a device token from PKPushRegistry).

<h3>2015/04/10 | Sinch SDK iOS 3.5.0</h3>
New fully integrated support for remote push notifications:

-   Push notifications sent by the Sinch cloud platform (provided that you upload Apple Push Certificates to the Sinch Dashboard).
-   Support for both regular remote push notifications and VoIP-push notifications (available since iOS 8).
-   New protocol SINManagedPush used as entry point for managing push notifications.
-   New push notification methods on SINClient: -[SINClient enableManagedPushNotifications:] -[SINClient relayRemotePushNotification:] -[SINClient registerPushNotificationDeviceToken:type:apsEnvironment:]
-   New sample apps that shows how to use the new push notification functionality.
-   New NSNotifications available (as a complement to SINClientDelegate): SINClientDidStartNotification SINClientDidFailNotification SINClientWillTerminateNotification
-   relayRemotePushNotification and relayRemotePushNotificationPayload will now correctly start the client when the payload is for an IM.

<h3>2015/02/23 | Sinch SDK iOS 3.4.2</h3>
-   Fix so that SINClient does not throw exception if -[UIApplication setKeepAliveTimeout:handler] returns NO. SINClient will now instead emit a log message with severity SINLogSeverityCritical.

<h3>2015/02/09 | Sinch SDK iOS 3.4.1</h3>
-   Support for x86\_64 architecture (iOS 64-bit Simulator)

<h3>2015/01/29 | Sinch SDK iOS 3.4.0</h3>
-   Support for arm64 architecture
-   Support for OPUS codec for app-to-app calls

<h3>2014/12/05 | Sinch SDK iOS 3.3.2</h3>
-   Added support for -[UILocalNotification category] (iOS 8)

<h3>2014/12/03 | Sinch SDK iOS 3.3.1</h3>
-   Improved internal call reporting.

<h3>2014/11/21 | Sinch SDK iOS 3.3.0</h3>
-   Added support for call headers for app-to-app calls. See -[SINCall headers] and -[SINCallClient callUserWithId:headers:]

<h3>2014/11/13 | Sinch SDK iOS 3.2.9</h3>
-   Fixed a regression in reporting SINCallEndCauseNoAnswer even if the call has been cancelled by the caller. It will now report the expected SINCallEndCauseCanceled in this case.

<h3>2014/10/27 | Sinch SDK iOS 3.2.8</h3>
-   Improvements to scenario where caller hangs up a call before certain internal REST API requests has completed, but the requests completes later during the graceful termination period.

<h3>2014/10/24 | Sinch SDK iOS 3.2.7</h3>
-   Fixed issue with user notification permission on iOS 8.
-   Added new method -[SINClient terminateGracefully]

<h3>2014/10/17 | Sinch SDK iOS 3.2.6</h3>
-   Fixed issue causing long call setup time when using certain codecs.

<h3>2014/10/10 | Sinch SDK iOS 3.2.5</h3>
-   Additional improvements for scenarios in which the caller cancels a call before the call is answered.

<h3>2014/10/09 | Sinch SDK iOS 3.2.4</h3>
-   Improvements of disposal of Sinch SDK internals if a consumer of the Sinch SDK would accidently keep reference counts on a SINMessageClient even after a -[SINClient terminate] has been called. *IMPORTANT: Do note that is not in any way recommended to keep references to e.g. a SINMessageClient or a SINCallClient after the parent SINClient has been terminated.*
-   Fixed issue if caller hung up call quickly and before the callee answer, the callee would not receive the event that the call actually ended.

<h3>2014/10/03 | Sinch SDK iOS 3.2.3</h3>
-   Improvements in handling unstable network connection when initiating a call.
-   Fixed order of instant messages received as history.

<h3>2014/09/19 | Sinch SDK iOS 3.2.1</h3>
-   Improvements in handling unstable network connection when initiating a call.

<h3>2014/09/04 | Sinch SDK iOS 3.2.0</h3>
-   Added persistence mechanism. Instant messages are now persisted internally in the SDK and retried automatically for 12 hours before failing.

<h3>2014/08/05 | Sinch SDK iOS 3.1.5</h3>
-   Bugfix: Incoming calls will from now on never have state SINCallStateProgressing. Previously, incoming calls could either be in SINCallStateInitiating or SINCallStateProgressing just after -[SINCallClientDelgate client:didReceiveIncomingCall:]. Now, the call will initially be in SINCallStateInitiating, until transitioning to SINCallStateEstablished or SINCallStateEnded.
-   Fixed crash when attempting to send DTMF during call setup.
-   Internal improvements for Call headers.

<h3>2014/07/11 | Sinch SDK iOS 3.1.3</h3>
-   Fixed crash that could occur under bad network conditions
-   Internal improvements: Reducing number of signaling messages sent when initiating a voice call.
-   Improvements for Swift compatibility: use NS\_ENUM when declaring enums, e.g. SINCallState, SINCallEndCause etc.

<h3>2014/06/12 | Sinch SDK iOS 3.1</h3>
-   [SINClient stop] has been deprecated and replaced by -[SINClient terminate]. As part of this change, the SINClient is invalidated after -[SINClient terminate] has been called and cannot be restarted.
-   Minor bug fixes and improvements

<h3>2014/05/14 | Sinch SDK iOS 3.0</h3>
Public release of the iOS SDK with:

-   Improved sample applications and documentation
-   Refactored calling and messaging API

<h3>2014/05/02 | Sinch SDK iOS 3.0 BETA</h3>
First public beta version of the Sinch SDK for iOS with support for:

-   App to app calling
-   App to phone calling
-   Instant messaging to single and multiple recipient


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/release-notes/release-notes-voice-ios-sdk.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>