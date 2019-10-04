---
title: "Guidelines for acting on completion handler outcome"
excerpt: ""
---
As shown in the earlier examples, the completion handler blocks can indicate a successful or a failed outcome for both the *initiate* and the *verify* steps. Here are some general guidelines on how to use the completion handler in your application's flow:

- UI to enter phone number
    - Success: Progress to enter verification code
    - Failure: UI to inform user of a problem and/or ask the user to try again
- UI to enter verification code (or re-send SMS) or wait for callout verification
    - Success: Confirmation of successful verification
    - Failure: UI to inform user of verification problem

## Handling Failure

The completion handler blocks are passed an `NSError` when a failure occurs. These errors can have an error domain `SINVerificationErrorDomain` for which the error codes listed in `SINVerificationError.h` are applicable, but they can also have a generic Cocoa / Foundation error domain, for example, network-connectivity related errors.

Note that the following error codes can be recovered from by asking the user for new input:

- `SINVerificationErrorInvalidInput`
- `SINVerificationErrorIncorrectCode`

> **WARNING: Important**    
>
> If a verification is cancelled, the error code `SINVerificationErrorCancelled` will be given. It is important that the application handle this error code in a way that is not annoying the user. E.g. a cancellation is often a consequence of the user's actions so it is in a sense an expected outcome and should in most cases not be shown as an error in a `UIAlert` (or similar).

## Network connectivity errors

The Sinch Verification SDK will try to resend HTTP requests to the Sinch backend if such a request failed due to a network-related error. For example, if a request fails due to the user not having internet connectivity, or the request simply timed out, the SDK schedules a number of retries within 30 seconds. But unless it succeeds during those retries, it will eventually invoke the completion handler blocks with the underlying `NSError`. For example, it would use domain `NSURLErrorDomain` and error code `NSURLErrorNotConnectedToInternet`.

<a class="edit-on-github" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-for-ios/verification-ios-guidelines-for-acting-on-completion-handler-outcome.md">Edit on GitHub</a>