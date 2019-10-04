---
title: "Miscellaneous Verification iOS"
excerpt: ""
---
## Minimum requirements

iOS 7.0 is the minimum version required for using the Sinch SDK (iOS Deployment Target).

## Grand Central Dispatch (GCD) Queues

By default the `SINSMSVerification` invokes the completion handler blocks on the main thread or main GCD queue. This can be changed by using `-[SINVerification setCompletionQueue:]`.

## Size footprint: SinchVerification.framework file size compared to linked size

The *SinchVerification.framework* bundle includes a fat library containing the architectures *armv7*, *arm64*, *i386* and *x86\_64*. When linking an application target against the *SinchVerification.framework* targeting an iOS device, it will add approximately 3Mb per architecture slice.


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-for-ios/verification-ios-miscellaneous.md"><span class="fab fa-github"></span>Edit on GitHub!</a>