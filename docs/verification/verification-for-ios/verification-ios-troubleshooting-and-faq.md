---
id: "5d418111e9971f006c45134b"
title: "Troubleshooting and FAQ"
excerpt: ""
---
**Q**: Does the Sinch SDK handle network connectivity errors?

**A**: Yes to some extent, see the section `Network connectivity errors
<networkconnectivityerrors>`

**Q**: What is the size footprint of the Sinch Verification SDK?

**A**: Please see `SinchVerification.framework file size vs. linked size
<sizefootprint>`

**Q**: How do I resolve linker errors, such as:
```text
Undefined symbols for architecture:
  "_SCNetworkReachabilitySetDispatchQueue", referenced from: ...
  "_SCNetworkReachabilitySetCallback", referenced from: ...
  "_SCNetworkReachabilityCreateWithName", referenced from: ...

  "_uregex_reset", referenced from: i18n::phonenumbers::ICUCRegExp:: ...
  "_utext_clone", referenced from: i18n::phonenumbers::ExtractUtf8String ...

  "std::__1::basic_istream<char, ...  referenced from:
  "std::__1::basic_string<char, ... referenced from:
```


**A**: You must add and link against the iOS system libraries and Frameworks listed in [First time setup](doc:firsttimesetupios).

**Q**: How do I resolve Swift linker errors (runtime errors), such as:
```text
dyld: Library not loaded: @rpath/libswiftCore.dylib
  Reason: image not found
dyld: Library not loaded: @rpath/SinchVerification.framework/SinchVerification
  Reason: image not found
```


**A**: The Sinch Swift frameworks are *dynamic* frameworks, so make sure that you've added the Sinch Swift framework bundles as *Embedded Binaries*. Further, In the Xcode target build settings, verify that the setting *Runpath Search Paths* is set to `@executable_path/Frameworks`.

**Q**: My application is rejected when uploaded to the Apple App Store/iTunes Connect

Possible errors:
```text
The executable for YourApp.app/Frameworks/SinchVerification.framework contains unsupported architectures '[x86_64, i386]'.
    
Invalid Segment Alignment. The app binary at 'YourApp.app/Frameworks/SinchVerification.framework/SinchVerification' does not have proper segment alignment. Try rebuilding the app with the latest Xcode version
    
The binary is invalid. The encryption info in the LC_ENCRYPTION_INFO load command is either missing or invalid, or the binary is already encrypted. This binary does not seem to have been built with Apple's linker.
```


or
```text
The archive did not contain ... .xcarchive/BCSymbolMaps/<UUID>.bcsymbolmap as expected.
```


**A** (If you are using *CocoaPods*):

Make sure that the Xcode build setting *Valid Architectures* (VALID\_ARCHS) does *not* contain any of the iOS Simulator architectures (i386 or x86\_64). (For details, see [here](https://github.com/CocoaPods/CocoaPods/blob/691e3de4405a0b7174ccd9ca85912a045d286aa2/lib/cocoapods/generator embed_frameworks_script.rb#L111) for details on how *CocoaPods* is stripping iOS Simulator architectures.)

If you have the error concerning `.bcsymbolmap` files, try unchecking the *Include bitcode* checkbox when uploading your application binary.

**A** (If you have manually added the *SinchVerification.framework* to *Embedded Binaries*):

Make sure you have added the [strip-frameworks.sh` as part of a Xcode *"Run Script Phase"*, see the `Swift section](doc:ios-swift-verification) for details.