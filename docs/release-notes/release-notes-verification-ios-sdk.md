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


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/release-notes/release-notes-verification-ios-sdk.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>