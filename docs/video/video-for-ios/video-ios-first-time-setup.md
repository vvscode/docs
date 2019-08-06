---
title: "First time setup"
excerpt: "Follow this step-by-step guide if you want to set up the Sinch Voice w/ Video SDK for the first time."
---
## Register an Application
> 1.  Register a Sinch Developer account [here](https://portal.sinch.com/#/signup).
> 2.  Setup a new Application using the Dashboard where you can then obtain an *Application Key* and an *Application Secret*.

## Download
The Sinch SDK can be downloaded `here <sinchvvvdownloads>`. It contains: the library binary, this user guide, reference documentation, and sample apps for calling and instant messaging.

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