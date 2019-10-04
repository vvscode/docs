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

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-for-ios/verification-ios-guidelines-for-acting-on-completion-handler-outcome.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>