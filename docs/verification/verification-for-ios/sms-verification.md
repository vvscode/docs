---
title: "SMS Verification"
excerpt: ""
---
Verification of a phone number is performed in two steps, a verification SMS is requested and a verification code for that particular verification session is sent to the recipient. It's the responsibility of the developer to ask the end-user to provide the verification code from the SMS.

## Request an SMS verification

To initiate a SMS verification, start by creating a `SINVerification`, then request an SMS by invoking `-[SINVerification initiateWithCompletionHandler:]`.
[block:code]
{
  "codes": [
    {
      "code": "// Get user's current region by carrier info\nNSString* defaultRegion = [SINDeviceRegion currentCountryCode];\n\nNSError *parseError = nil;\nid<SINPhoneNumber> phoneNumber = [SINPhoneNumberUtil() parse:@\"<user input>\"\n                                               defaultRegion:defaultRegion\n                                                       error:&parseError];\n\nif (!phoneNumber){\n  // Handle invalid user input\n}\n\nNSString *phoneNumberInE164 = [SINPhoneNumberUtil() formatNumber:phoneNumber\n                                                          format:SINPhoneNumberFormatE164];\n\nid<SINVerification> verification = [SINVerification SMSVerificationWithApplicationKey:@\"<application key>\"\n                                                                          phoneNumber:phoneNumberInE164];\n\nself.verification = verification; // retain the verification instance\n\n[verification initiateWithCompletionHandler:^(id<SINInitiationResult> result, NSError *error) {\n  if (result.success) {\n    // Show UI for entering the code which will be received via SMS\n  }\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]
The call to `initiateWithCompletionHandler:` triggers sending a verification SMS. This method can be called multiple times, in case another SMS should be sent.

### Phone numbers - Parsing and E.164 Formatting
[block:callout]
{
  "type": "warning",
  "title": "Important",
  "body": "When passing a number as a `NSString*` to create a `SINVerification`, the string should contain a number in *E.164* format. See the section `Phone numbers <phonenumbers>` for details."
}
[/block]
## Set the content language of an SMS verification

It is possible to specify the content language when initiating an SMS verification from the SDK. This is specified via a list of [IETF](https://tools.ietf.org/html/rfc3282) language tags in order of priority. If the first language is not available, the next one will be selected and so forth. The default is "en-US".

The content language of the actual SMS verification message can be retrieved in `id<SINInitiationResult> result` of the `initiateWithCompletionHandler:` callback.
[block:code]
{
  "codes": [
    {
      "code": "NSArray<NSString *> *languages = @[ @\"zh-CN\", @\"es-ES\", @\"en-US\" ];\nid<SINVerification> verification = [SINVerification SMSVerificationWithApplicationKey:@\"<APP KEY>\"\n                                                                          phoneNumber:phoneNumberInE164\n                                                                            languages:languages];\n\n[verification initiateWithCompletionHandler:^(id<SINInitiationResult> result, NSError *error) {\n  if (result.success) {\n    NSLog(@\"Content Language is: %@\", result.contentLanguage);\n    // Show UI for entering the code which will be received via SMS\n  }\n}];",
      "language": "objectivec"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "The content language specified can be overridden by carrier provider specific templates, due to compliance and legal requirements, such as [US shortcode requirements (pdf)](https://www.usshortcodes.com/info/static/docs/CTIA%20Short%20Code%20Monitoring%20Handbook%20v1.5.2.pdf)."
}
[/block]
## Validate code

To complete the verification of the phone number, the user should be instructed to enter the code from the SMS to the application, and the code should be passed to `-[SINVerification verifyCode:completionHandler:]`. For example:
[block:code]
{
  "codes": [
    {
      "code": "- (IBAction)done:(id)sender {\n  // User pressed a \"Done\" button after entering the code from the SMS.\n\n  NSString* code = @\"<get code from user input text field>\";\n\n  [self.verification verifyCode:code\n              completionHandler:^(BOOL success, NSError* error) {\n                if (success) {\n                  // Phone number was successfully verified\n                } else {\n                  // Ask user to re-attempt verification\n                }\n              }];\n}",
      "language": "objectivec"
    }
  ]
}
[/block]
The method `verifyCode:completionHandler:` may be invoked multiple times (for a limited number of times within a short duration). So for example, if the completion handler is invoked with an `NSError` with domain `SINVerificationErrorDomain` and code `SINVerificationErrorInvalidInput` or `SINVerificationErrorIncorrectCode`, the application may hint to the user that the code was incorrect, let the user adjust it, and call `verifyCode:completionHandler:` once again on the same `SINVerification`-instance.