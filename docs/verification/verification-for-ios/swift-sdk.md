---
title: "Swift SDK"
excerpt: ""
---
The Sinch Verification iOS SDK is also available for [Swift](https://developer.apple.com/).

## Example usage
[block:code]
{
  "codes": [
    {
      "code": "import SinchVerification;\n\ndo {\n\n    let input = \"<user input>\"\n\n    // Get user's current region by carrier info\n    let defaultRegion = DeviceRegion.currentCountryCode()\n\n    let phoneNumber = try PhoneNumberUtil().parse(input, defaultRegion:defaultRegion)\n    let phoneNumberE164 = PhoneNumberUtil().format(phoneNumber, format: PhoneNumberFormat.E164)\n\n    let verification = SMSVerification(applicationKey:\"<APP KEY>\", phoneNumber: phoneNumberInE164)\n\n    verification.initiate { (result: InitiationResult, error: NSError?) -> Void in\n        // handle outcome\n    }\n\n    let code = \"<user input code from SMS>\"\n\n    verification.verify(code, completion: { (success: Bool, error:NSError?) -> Void in\n        // handle outcome\n    })\n\n} catch let error as PhoneNumberParseError {\n    // Handle phone number parsing error, i.e. invalid user input.\n}",
      "language": "swift"
    }
  ]
}
[/block]
## Importing the Sinch Verification Swift SDK

### Import as CocoaPod

If you are using [CocoaPods](http://www.cocoapods.org), add the following to your Podfile:
[block:code]
{
  "codes": [
    {
      "code": "platform :ios, '8.0'\n\ntarget '<your target>' do\n    use_frameworks!\n    pod 'SinchVerification-Swift'\nend",
      "language": "objectivec"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "The directive \\`\\`use\\_frameworks\\!\\`\\` is necessary to make cocoapods add the framework to '*Embedded Binaries*'"
}
[/block]
#### Note on uploading to App Store / iTunes Connect

If you integrate the Sinch SDK via *CocoaPods*, you must not check the option "Include bitcode" when uploading the application binary. The reason is a [bug in CocoaPods](https://github.com/CocoaPods/CocoaPods/issues/4624). In the upload dialog in Xcode Organizer it should look something like this:
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ebf587e-swift-dont-include-bitcode-upload.png",
        "swift-dont-include-bitcode-upload.png",
        1040,
        88,
        "#eff0f3"
      ]
    }
  ]
}
[/block]
### Import SinchVerification.framework as *Embedded Binaries*

1.  In the Sinch Verification SDK package (SinchVerification-iOS-{VERSION}.tar) there is a *SinchVerification.framework* bundle in the directory named `swift`:

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2cbde47-add-frameworks-package-structure.png",
        "add-frameworks-package-structure.png",
        400,
        180,
        "#e3e8f3"
      ]
    }
  ]
}
[/block]
2.  Add it to the Xcode target build settings section *Embedded Binaries* (under *General*):

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/089382c-add-frameworks-embedded-binaries.png",
        "add-frameworks-embedded-binaries.png",
        400,
        132,
        "#f9f9f9"
      ]
    }
  ]
}
[/block]
3.  In the Xcode target build settings, verify that the setting *Runpath Search Paths* is set to `@executable_path/Frameworks`.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e0bad42-add-frameworks-search-paths.png",
        "add-frameworks-search-paths.png",
        560,
        80,
        "#d7e1f5"
      ]
    }
  ]
}
[/block]
4.  Setup to run `strip-frameworks.sh` as a *"Run Script Phase"*
Create a new *"Run Script Phase"* in your application target's *"Build Phases"* and paste the following snippet:

[block:code]
{
  "codes": [
    {
      "code": "bash ${BUILT_PRODUCTS_DIR}/${FRAMEWORKS_FOLDER_PATH}/SinchVerification.framework/strip-frameworks.sh",
      "language": "shell"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d73dab6-swift-run-script-add.png",
        "swift-run-script-add.png",
        504,
        123,
        "#e2e5ed"
      ]
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0f8e419-swift-run-script-contents.png",
        "swift-run-script-contents.png",
        732,
        151,
        "#cecece"
      ]
    }
  ]
}
[/block]
(This step is required to work around an [App Store / iTunes Connect bug](http://www.openradar.meradar?id=6409498411401216))

5.  Make sure that *libc++*, *libz* and *libicucore* are linked (See `here <firsttimesetupios>`)

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9b2867b-link-binary-with-libraries-xcode.png",
        "link-binary-with-libraries-xcode.png",
        499,
        202,
        "#f7f6f6"
      ]
    }
  ]
}
[/block]
**That's it\!**

Now the SDK can be imported as follows (from any of your .swift files)
[block:code]
{
  "codes": [
    {
      "code": "import SinchVerification",
      "language": "swift"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "This import method requires iOS Deployment Target iOS 8.0 or above"
}
[/block]