---
title: "Getting Started with Verification"
excerpt: "This document serves as a user guide and documentation on how to use the Sinch Verification REST APIs. For general information on how to use the Sinch APIs including methods, types, errors and authorization, please check the [Using REST](https://www.sinch.com/using-rest/) page."
---
## Overview
Use the Sinch Verification Service to verify end-user's mobile phone numbers. The Sinch Verification APIs should be used in combination with the Verification SDKs for a complete end-to-end solution, though it is possible to only use the APIs. Currently, there are three verification methods supported:

- FlashCall verification - Android only
- PIN SMS verification - iOS, Android, Javascript
- Callout verification (voice call) - iOS only

## FlashCall verification
With the flashCall verification method, a user's phone number is verified by triggering a "missed call" towards this number. The call is intercepted by the Android SDK in the mobile app and blocked automatically. 

To initiate a flashCall verification, check the [Android SDK documentation](https://www.sinch.com/docs/verification/android/#flashcallverification). For additional security, it is recommended that you control which verification requests should proceed and which ones not, by listening in your backend for the [Verification Request Event](#VerificationRequestEvent) and respond accordingly. Your backend will be notified on the result of the verification with the [Verification Result Event](#VerificationResultEvent).

### PIN SMS verification
With the PIN SMS verification method, a user's phone number is verified by sending an SMS containing a PIN code to this number. In the case of iOS or Javascript, the user needs to enter the PIN manually in the app, while for Android there is an option of intercepting the SMS message delivery and capturing the PIN code automatically.

To initiate a PIN SMS verification, check the [iOS](https://www.sinch.com/docs/verification/ios/#smsverification), [Android](https://www.sinch.com/docs/verification/android/#smsverification) and [Javascript](https://www.sinch.com/docs/verification/javascript/#verification) documentation. For additional security, it is recommended that you control which verification requests should proceed and which ones not, by listening in your backend for the [Verification Request Event](#VerificationRequestEvent) and respond accordingly. Your backend will be notified on the result of the verification with the [Verification Result Event](#VerificationResultEvent)

## Callout verification
With the callout verification method, a user's phone number is verified by receiving a phone call and hearing a pre-recorded or text-to-speech message, advising the user to press a digit code. When the user presses the digit code in the dialpad, the verification is successful.

To initiate a callout verification, check the [iOS documentation](https://www.sinch.com/docs/verification/ios/#calloutverification). For additional security, it is recommended that you control which verification requests should proceed and which ones not, by listening in your backend for the [Verification Request Event](#VerificationRequestEvent) and respond accordingly. Your backend will be notified on the result of the verification with the [Verification Result Event](#VerificationResultEvent)


## API Quick Reference
### Verification API
	
		URI:  https://verificationapi-v1.sinch.com/verification/v1

[block:parameters]
{
  "data": {
    "h-0": "URL",
    "h-1": "HTTP Verb",
    "h-2": "Functionality",
    "h-3": "Notes",
    "0-0": "/verifications",
    "0-1": "POST",
    "0-2": "Verification Request",
    "0-3": "Not needed when using the Verification SDK",
    "1-3": "Not needed when using the Verification SDK",
    "1-2": "Report Verification",
    "1-0": "/verifications/{type}/{endpoint}",
    "2-0": "/verifications/id/{id}",
    "3-0": "/verifications/reference/{reference}",
    "4-0": "/verifications/{type}/{endpoint}",
    "1-1": "PUT",
    "2-1": "GET",
    "3-1": "GET",
    "4-1": "GET",
    "2-2": "Query Verification by id",
    "3-2": "Query Verification by reference",
    "4-2": "Query Verification by Endpoint"
  },
  "cols": 4,
  "rows": 5
}
[/block]
### Verification Callback API

[block:parameters]
{
  "data": {
    "h-0": "Event",
    "h-1": "HTTP Verb",
    "h-2": "Functionality",
    "h-3": "Notes",
    "0-0": "VerificationRequestEvent",
    "1-0": "VerificationResultEvent",
    "0-1": "POST",
    "1-1": "POST",
    "0-2": "Verification Request Event",
    "1-2": "Verification Result Event",
    "0-3": "Recommended for security purposes",
    "1-3": "Recommended for verification result tracking"
  },
  "cols": 4,
  "rows": 2
}
[/block]

## How to use the Verification APIs

[block:callout]
{
  "type": "info",
  "title": "Recommendation",
  "body": "It is recommended that the Verification APIs are used in combination with the Mobile or Web SDK."
}
[/block]
The following diagram shows how to use the Verification APIs when using the iOS, Android or Javascript SDKs to initiate a verification. 

![](images/verification.png)
[block:callout]
{
  "type": "info",
  "title": "Important",
  "body": "In this scenario, the *Verification Request* and *Report Verification* APIs do not need to be called explicitly by the app, since the SDK is handling that for you."
}
[/block]
**Important:** In this scenario, the *Verification Request* and *Report Verification* APIs do not need to be called explicitly by the app, since the SDK is handling that for you.

If you have configured a verification callback URL in the [Sinch Portal](https://portal.sinch.com/#/signup) (recommended), with every verification that is initiated by the app, Sinch will send a [Verification Request Event](#VerificationRequestEvent) to your backend, to get permission to perform the verification. If your backend allows the verification request to proceed, Sinch will trigger a flashcall, SMS or call towards the phone to be verified. Once the phone receives the flash-call, SMS or voice call, the SDK will report back the CLI or PIN respectively so that the Sinch platform can compare its validity. The Sinch backend responds with the result of the verification to the client and sends a [Verification Result Event](#VerificationResultEvent) to your backend. The status of a verification can also be queried ad-hoc by using the "Query Verification" APIs.


## Without the mobile or web SDK
If you are not using the mobile or web Verification SDKs, then you need to implement all the client logic for intercepting calls (in case of flashcalls) and reporting the CLI or PIN (in case of SMS or  callout verification) inside your app. The following diagram shows how to use Sinch Verification in this scenario. 

![](images/verification_without_sdk.png)


The  verification requests will be triggered from your backend towards Sinch with the [Verification Request API](#VerificationRequest), by doing an [application signed request](https://www.sinch.com/using-rest/#applicationsignedrequest). Sinch platform will respond with the CLI filter (for flashcalls) or the template (in case of an SMS), or the polling intervals (in case of a callout). As soon as the flashcall or SMS is received by your app, your backend will need to report back to Sinch the CLI or PIN that was reported through the [Report Verification API](#ReportVerification). Sinch will respond with the result of the verification.