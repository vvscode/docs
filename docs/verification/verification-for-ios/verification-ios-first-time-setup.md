---
title: "First time setup with iOS (Verification)"
excerpt: ""
---
This is a step-by-step guide about setting up the Sinch Verification SDK for the first time.

## Register an Application

1.  Register a Sinch Developer account [here](https://portal.sinch.com/#/signup).
2.  Set up a new Application using the Dashboard where you can then obtain an *Application Key*.
3.  Enable Verification for the application by selecting: *Authentication* \> *Public* under *App* \> *Settings* \> *Verification*

## Download

The Sinch Verification SDK can be downloaded [here](https://sinch.readme.io/page/downloads). It contains: the library binary, this user guide, reference documentation, and sample apps.

## Add the Sinch Verification framework

Drag the *SinchVerification.framework* folder from the SDK distribution package folder into the Frameworks section of the Project Navigator.

The Sinch Verification SDK depends on the following libraries and frameworks: *libc++*, *libicucore*, *libz*, SystemConfiguration.framework\_ and *CoreTelephony.framework* , which must all be added to the project and linked with the application target.
![link-binary-with-libraries-xcode.png](images/de473b8-link-binary-with-libraries-xcode.png)

### Sinch Verification is available as a CocoaPod

If you are using [CocoaPods](http://www.cocoapods.org), add the following to your Podfile:
```objectivec
target '<your xcode project>' do
    pod 'SinchVerification'
end
```



