---
title: Miscellaneous
excerpt: ''
hidden: false
---

## Minimum Requirements

We officially support the two latest major iOS versions. You can try older versions but there are no guarantees it will work as expected.

_Note:_ The Sinch SDK library uses Automatic Reference Counting (ARC). However, it can still be used in non-ARC projects.

## Note on Sinch.framework File Size vs. Linked Size

The _Sinch.framework_ file includes a FAT-binary containing the architectures _armv7_, _arm64_, _x86_64_. When linking an application target against the _Sinch.framework_ targeting an iOS device, it will add a approximately 6Mb per _arm_ slice.

**Example**: Assuming linking _armv7_ and _arm64_ into the final application, it would add approximately 12Mb to the application.

## Restrictions on User IDs

User IDs can only contain characters in the _printable ASCII character set_. That is:

```text
!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
```

User IDs **must not** be longer than **40** characters.

## Encryption Export Regulations

Please check the Summary of U.S. Export Controls Applicable to Commercial Encryption Products and ensure that the application is registered for the Encryption Regulations, if applicable. It can be found under this [link](http://www.sinch.com/).

## Statistics

The Sinch SDK client uploads statistics to the Sinch servers at the end of a call, a call failure, or similar event. The statistics are used for monitoring of network status, call quality, and other aspects regarding the general quality of the service.

Some of the information is not anonymous and may be associated with the User ID call participants.

The statistics upload is done by the client in the background.

## Linking Against the C++ Standard Library

Since Sinch SDK version 3.4.0, it is required to link against _libc++_. Though if your application is also dependent on _libstdc++_ (which is now considered deprecated by Apple for use on iOS), you can actually link against both _libc++_ and _libstdc++_ by passing the following linker flags:

- Other Linker Flags -\> `-ObjC -Xlinker -lc++ -Xlinker -lstdc++`

## App Extensions

_App Extensions_ is a feature introduced in iOS 8. App extensions are compiled into executables that are separate from the main application executable. The Sinch SDK are using parts of the iOS SDK APIs that are unavailable to app extensions, thus it’s not supported to use the Sinch SDK in an app extension.

## Xcode and Bitcode Intermediate Representation

The Sinch SDK supports Bitcode intermediate representation.

## Deprecated Features and APIs

### Active Connection in Background

Apple has since iOS 10 discontinued support for maintaining a _VoIP_ control connection alive via `-[UIApplication setKeepAliveTimeout:handler:]`. Attempting to use this method on an iOS device running iOS 10 results in the following warning log: `Legacy VoIP background mode is deprecated and no longer supported`. The Sinch feature _Active connection in background_ was using the keep alive handler API and is as a consequence no longer supported on iOS. It is recommended to use [VoIP Push Notifications and CallKit](doc:voice-ios-cloud-push-notifications-callkit) to achieve the equivalent functionality.
