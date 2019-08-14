---
id: "5d417e55d8fd860041a8d987"
title: "Swift SDK"
excerpt: ""
---
The Sinch Verification iOS SDK is also available for [Swift](https://developer.apple.com/).

## Example usage
```swift
import SinchVerification;

do {

    let input = "<user input>"

    // Get user's current region by carrier info
    let defaultRegion = DeviceRegion.currentCountryCode()

    let phoneNumber = try PhoneNumberUtil().parse(input, defaultRegion:defaultRegion)
    let phoneNumberE164 = PhoneNumberUtil().format(phoneNumber, format: PhoneNumberFormat.E164)

    let verification = SMSVerification(applicationKey:"<APP KEY>", phoneNumber: phoneNumberInE164)

    verification.initiate { (result: InitiationResult, error: NSError?) -> Void in
        // handle outcome
    }

    let code = "<user input code from SMS>"

    verification.verify(code, completion: { (success: Bool, error:NSError?) -> Void in
        // handle outcome
    })

} catch let error as PhoneNumberParseError {
    // Handle phone number parsing error, i.e. invalid user input.
}
```


## Importing the Sinch Verification Swift SDK

### Import as CocoaPod

If you are using [CocoaPods](http://www.cocoapods.org), add the following to your Podfile:
```objectivec
platform :ios, '8.0'

target '<your target>' do
    use_frameworks!
    pod 'SinchVerification-Swift'
end
```




> **Note**    
>
> The directive \`\`use\_frameworks\!\`\` is necessary to make cocoapods add the framework to '*Embedded Binaries*'

#### Note on uploading to App Store / iTunes Connect

If you integrate the Sinch SDK via *CocoaPods*, you must not check the option "Include bitcode" when uploading the application binary. The reason is a [bug in CocoaPods](https://github.com/CocoaPods/CocoaPods/issues/4624). In the upload dialog in Xcode Organizer it should look something like this:
![swift-dont-include-bitcode-upload.png](https://files.readme.io/ebf587e-swift-dont-include-bitcode-upload.png)

### Import SinchVerification.framework as *Embedded Binaries*

1.  In the Sinch Verification SDK package (SinchVerification-iOS-{VERSION}.tar) there is a *SinchVerification.framework* bundle in the directory named `swift`:

![add-frameworks-package-structure.png](https://files.readme.io/2cbde47-add-frameworks-package-structure.png)

2.  Add it to the Xcode target build settings section *Embedded Binaries* (under *General*):

![add-frameworks-embedded-binaries.png](https://files.readme.io/089382c-add-frameworks-embedded-binaries.png)

3.  In the Xcode target build settings, verify that the setting *Runpath Search Paths* is set to `@executable_path/Frameworks`.

![add-frameworks-search-paths.png](https://files.readme.io/e0bad42-add-frameworks-search-paths.png)

4.  Setup to run `strip-frameworks.sh` as a *"Run Script Phase"*
Create a new *"Run Script Phase"* in your application target's *"Build Phases"* and paste the following snippet:

```shell
bash ${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}/SinchVerification.framework/strip-frameworks.sh
```



![swift-run-script-add.png](https://files.readme.io/d73dab6-swift-run-script-add.png)


![swift-run-script-contents.png](https://files.readme.io/0f8e419-swift-run-script-contents.png)

(This step is required to work around an [App Store / iTunes Connect bug](http://www.openradar.meradar?id=6409498411401216))

5.  Make sure that *libc++*, *libz* and *libicucore* are linked (See [here](doc:firsttimesetupios))

![link-binary-with-libraries-xcode.png](https://files.readme.io/9b2867b-link-binary-with-libraries-xcode.png)

**That's it\!**

Now the SDK can be imported as follows (from any of your .swift files)
```swift
import SinchVerification
```




> **Note**    
>
> This import method requires iOS Deployment Target iOS 8.0 or above
       "https://files.readme.io/0f8e419-swift-run-script-contents.png",
        "swift-run-script-contents.png",
        732,
        151,
        "#cecece"
      ]
    }
  ]
}

(This step is required to work around an [App Store / iTunes Connect bug](http://www.openradar.meradar?id=6409498411401216))

5.  Make sure that *libc++*, *libz* and *libicucore* are linked (See [here](doc:firsttimesetupios))

![link-binary-with-libraries-xcode.png](https://files.readme.io/9b2867b-link-binary-with-libraries-xcode.png)

**That's it\!**

Now the SDK can be imported as follows (from any of your .swift files)
```swift
import SinchVerification
```




> **Note**    
>
> This import method requires iOS Deployment Target iOS 8.0 or above