---
title: "Release Notes for the Sinch Verification Android SDK"
excerpt: "See how the Sinch JavaScript SDK is evolving and find out about new features and bug fixes."
---

See how our platform is evolving. Keep track of new features, API versions and bug fixes.

<h3>2018-12-19 | Verification SDK Android 1.6.0</h3>
-   Updated SMS verification method. It no longer requires RECEIVE\_SMS and READ\_SMS permissions.
-   [BREAKING] Minimal supported SDK is now 14
-   SDK now has optional dependency on ‘play-services-auth-api-phone’ from Google Play Services
-   Minimal required version of Google Play Services is 11.0.0.
-   It is required for automatic SMS code parsing.
-   Application Hash config param is now required for automatic SMS code parsing.

<h3>2017-11-17 | Verification SDK Android 1.5.0</h3>
- Added support for SMS verification interception without SMS permissions for API level 26 and higher.

<h3>2017-04-18 | Verification SDK Android 1.4.1</h3>
-   Minor changes and improvements

<h3>2016-10-12 | Verification SDK Android 1.4.0</h3>
-   Improved internal logging.
-   Improved APIs for sms language selection.
-   Fixed a problem with adding excess permissions to the application manifest.

<h3>2016-07-15 | Verification SDK Android 1.2.0</h3>
-   Fixed an issue where the Sinch SDK would hangup a non-Sinch flash call if the call had been active since before a flash call verification was initiated.
-   Add support for external logger, see new method SinchVerification.setLogger(1).

<h3>2016-06-14 | Verification SDK Android 1.1.8</h3>
-   Internal improvements to metadata robustness
-   Enhanced logging capability for troubleshooting
-   Improved multi-sim support

<h3>2016-04-28 | Verification SDK Android 1.1.6</h3>
Fixed a possible verification failure when a flash call starts ringing before verification initiation request is completed.

<h3>2016-03-23 | Verification SDK Android 1.1.5</h3>
Fixed a possible crash when querying phone metadata on some devices and API levels before 18.

<h3>2016-03-15 | Verification Android 1.1.4</h3>
-   Early detection of flashcall attempt with high probability of failure. SDK will invoke failure callback for fallback to other verification method.
-   Shorter timeout of flashcall verification attempt for quicker fallback to other verification method.

<h3>2016-03-02 | Verification Android 1.1.3</h3>
-   Flash call verification report improvements for better service monitoring and quality assurance.

<h3>2015-12-18 | Verification Android 1.1.2</h3>
-   Fixed a rare crash when querying sms or call log database on some devices and API levels before 16.

<h3>2015-12-08 | Verification Android 1.1.1</h3>
-   Fixed a rare crash when unregistering call or sms listeners on some devices.

<h3>2015-12-04 | Verification Android 1.1</h3>
-   Introduced PhoneNumberUtils to allow for proper phone number formatting and displaying.
-   Added a PhoneNumberFormattingTextWatcher class that behaves exactly like the Android version, but allows setting a country code different from the default one on APIs before 21.

<h3>2015-08-27 | Verification Android 1.0.4</h3>
-   Fixed crash on unsupported operator code.
-   Fixed issues with error callbacks and anonymous calls after flash call verification succeeded.

<h3>2015-07-16 | Verification Android 1.0.3</h3>
-   Improvements for Flash Call detection

<h3>2015-07-09 | Verification Android 1.0.2</h3>
-   Fixed a rare crash when unregistering ConnectivityListener on some devices.
-   Fixed a rare crash when an empty number string was obtained from BroadcastReceiver on incoming call.

<h3>2015-06-30 | Verification Android 1.0.1</h3>
-   Fixed a rare occurence where two flashcalls would be received and the second one would ring normally.

<h3>2015-06-24 | Verification Android 1.0</h3>
-   Flash Call Verification GA
-   SMS Verification GA
-   Verification reports available in the Sinch Portal

<h3>2015-05-20 | Verification Android 0.9.0 Beta</h3>
-   First public release with support for SMS and flash call verification


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/release-notes/release-notes-verification-android-sdk.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>