---
title: "First time setup with iOS (Video)"
excerpt: "Follow this step-by-step guide if you want to set up the Sinch Voice w/ Video SDK for the first time."
---
## Register an Application
> 1.  Register a Sinch Developer account [here](https://portal.sinch.com/#/signup).
> 2.  Setup a new Application using the Dashboard where you can then obtain an *Application Key* and an *Application Secret*.

## Download
The Sinch SDK can be downloaded [here](https://sinch.readme.io/page/downloads). It contains: the library binary, this user guide, reference documentation, and sample apps for calling and instant messaging.

### Sinch is availible as a CocoaPod

If you are using [CocoaPods](http://www.cocoapods.org), add the following to your Podfile:

**Code**
```ruby
target '<your xcode project>' do
	pod 'SinchRTC'
end
```




> **Tip**    
>
> Using the pod allows you to skip the manual steps in the next section.

## Add the *Sinch.framework*
Drag the *Sinch.framework* bundle from the SDK distribution package folder into the Frameworks section in the Xcode Project Navigator.

The Sinch SDK depends on the following frameworks which must be linked with the application target:
> *libc++.dylib* (*libc++.tbd*), *libz.tbd*, *Security.framework*, *AVFoundation.framework*, *AudioToolbox.framework*, *VideoToolbox.framework*, *CoreMedia.framework*, *CoreVideo.framework*, *CoreImage.framework*, *GLKit.framework*, *OpenGLES.framework*, *QuartzCore.framework*

## Info.plist

If only the instant messaging functionality will be used, then no changes to the *Info.plist* are necessary.

If voice calling functionality will be enabled and used, add the following to your *Info.plist*:

  - Required background modes (`UIBackgroundModes`):

      - Application plays audio (`audio`)
      - Application provides Voice over IP services (`voip`)

  - Privacy - Microphone Usage Description (`NSMicrophoneUsageDescription`):

    [NSMicrophoneUsageDescription](https://developer.apple.com/library/prerelease/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW25) describes the reason your app accesses the microphone. When the system prompts the user to allow access, this string is displayed as part of the alert, and it *cannot* be left empty.

In addition to the keys above, if video calling functionality will be enabled and used, add the following to your *Info.plist*:

  - Privacy - Camera Usage Description
    (`NSCameraUsageDescription`):

    [NSCameraUsageDescription](https://developer.apple.com/library/prerelease/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW24) describes the reason that your app accesses the camera. When the system prompts the user to allow access, this string is displayed as part of the alert, and it *cannot* be left empty.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-ios/video-ios-first-time-setup.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>