---
title: "Release Notes for the Sinch Verification iOS SDK"
excerpt: "See how the Sinch JavaScript SDK is evolving and find out about new features and bug fixes."
---

See how our platform is evolving. Keep track of new features, API versions and bug fixes.

<h3>2017-11-17 | Verification SDK iOS 2.0.5</h3>
-   Re-build of Swift flavor of SinchVerification.framework for compatibility with Xcode 9.1 and Swift 4.

<h3>2016-11-14 | Verification SDK iOS 2.0.3</h3>
-   Support for making the CocoaPod ‘SinchVerification-Swift’ compile Swift bindings from source, to avoid Swift ABI incompatibilities in between Xcode / clang versions.

 

<h3>2016-11-01 | Verification SDK iOS 2.0.2</h3>
-   Re-build of Swift flavor of SinchVerification.framework for compatibility with Xcode 8.1.

<h3>2016-10-12 | Verification SDK iOS 2.0.0</h3>
-   Breaking API change: Instead of a boolean value, the result of verification initiation will be returned in an object which contains both the result and the SMS content language.
-   Added support for specifying the content language of an SMS verification.
-   Renamed SINLogSeverity into SINVLogSeverity to avoid error: “Reference to SINLogSeverity is ambiguous” when developer uses both RTC and Verification SDK from Sinch.

<h3>2016-09-26 | Verification SDK iOS 1.4.8</h3>
-   Rebuilt Swift framework with Swift 3.x
-   Updated Sample App code to Swift 3.x
-   Added Swift 2.x compatible source code bindings (see swift2/)

<h3>2016-09-13 | Verification SDK iOS 1.4.7</h3>
\* Rebuilt Swift framework with Xcode 8 to avoid Xcode error “Module file was created by an older version of the compiler”.

<h3>2016-05-12 | Verification SDK iOS 1.4.4</h3>
-   Rebuilt Swift framework with Xcode 7.3.1 to avoid Xcode error “Module file was created by an older version of the compiler”.

<h3>2016-03-23 | Verification SDK iOS 1.4.3</h3>
-   Rebuilt Swift framework with Xcode 7.3 to avoid Xcode error “Module file was created by an older version of the compiler”.

<h3>2016-01-14 | Verification SDK iOS 1.4.2</h3>
-   Workaround for possible App Store submission issues due to that SinchVerification.framework contains a universal / FAT binary that also contains iOS Simulator architectures (i386, x86\_64): Add strip-frameworks.sh script to the Swift flavor of SinchVerification.framework. This script should be setup to run as part of an Xcode “Run Script Phase”. See the documentation / User Guide for details on how to set this up.
-   Support linking with -all\_load. (Fixes linker error: undefined symbol google::protobuf::internal::WireFormat::SkipMessage)

<h3>2015-12-08 | Verification SDK iOS 1.4.1</h3>
-   Fix memory leak in SINPhoneNumberUtil.

<h3>2015-12-03 | Verification SDK iOS 1.4.0</h3>
-   New APIs for parsing, formatting and displaying phone numbers:
    -   Available for both Swift and Objective-C.
    -   SINPhoneNumberUtil: Provides methods to parse and format phone numbers.
    -   SINUITextFieldPhoneNumberFormatter: Helper for implementing “As-You-Type-Formatting” on a UITextField.
    -   SINDeviceRegion: Helper to get current device’s current region ISO-3166-1 country code.
    -   SINRegionList and SINRegionInfo: Useful for displaying a list of regions / countries including their ITU-T country calling codes.
    -   Sample apps updated to show new phone number functionality.
-   Require linking against libc++ and libicucore.

<h3>2015-10-27 | Verification SDK iOS 1.3.3<-h3>
-   Xcode 7.1 compatibility
-   Add include guard for SINLogSeverity type

<h3>2015-10-16 | Verification SDK iOS 1.3.1</h3>
-   New Callout functionality
-   New error code SINVerificationErrorCancelled (see sample app SinchCalloutVerification for example usage.)
-   Improvements to callout verification when used in combination with SMS verification.

<h3>2015-10-06 | Verification SDK iOS 1.2</h3>
-   Support for Xcode LLVM Bitcode
-   Add support for logging callback.
-   See SINLog.h and +[SINVerification setLogCallback:].
-   Improved error messages: Fixed use of NSUnderlyingErrorKey for Sinch specific NSErrors.

<h3>2015-06-24 | Verification SDK iOS 1.0</h3>
-   SMS Verification GA
-   Verification reports available in the Sinch Portal

<h3>2015-06-01 | Verification SDK iOS 0.9.1 Beta</h3>
-   Added Swift bindings

<h3>2015-05-20 | Verification SDK iOS 0.9.0 Beta</h3>
-   First public release with support for SMS verification


<a class="edit-on-github" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/release-notes/release-notes-verification-ios-sdk.md">Edit on GitHub</a>