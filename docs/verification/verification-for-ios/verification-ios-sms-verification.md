---
title: "SMS Verification"
excerpt: ""
---
Verification of a phone number is performed in two steps, a verification SMS is requested and a verification code for that particular verification session is sent to the recipient. It's the responsibility of the developer to ask the end-user to provide the verification code from the SMS.

## Request an SMS verification

To initiate a SMS verification, start by creating a `SINVerification`, then request an SMS by invoking `-[SINVerification initiateWithCompletionHandler:]`.
```objectivec
// Get user's current region by carrier info
NSString* defaultRegion = [SINDeviceRegion currentCountryCode];

NSError *parseError = nil;
id<SINPhoneNumber> phoneNumber = [SINPhoneNumberUtil() parse:@"<user input>"
                                               defaultRegion:defaultRegion
                                                       error:&parseError];

if (!phoneNumber){
  // Handle invalid user input
}

NSString *phoneNumberInE164 = [SINPhoneNumberUtil() formatNumber:phoneNumber
                                                          format:SINPhoneNumberFormatE164];

id<SINVerification> verification = [SINVerification SMSVerificationWithApplicationKey:@"<application key>"
                                                                          phoneNumber:phoneNumberInE164];

self.verification = verification; // retain the verification instance

[verification initiateWithCompletionHandler:^(id<SINInitiationResult> result, NSError *error) {
  if (result.success) {
    // Show UI for entering the code which will be received via SMS
  }
}];
```


The call to `initiateWithCompletionHandler:` triggers sending a verification SMS. This method can be called multiple times, in case another SMS should be sent.

### Phone numbers - Parsing and E.164 Formatting

> **WARNING: Important**    
>
> When passing a number as a [NSString*` to create a `SINVerification`, the string should contain a number in *E.164* format. See the section `Phone numbers](doc:verification-ios-phone-numbers) for details.

## Set the content language of an SMS verification

It is possible to specify the content language when initiating an SMS verification from the SDK. This is specified via a list of [IETF](https://tools.ietf.org/html/rfc3282) language tags in order of priority. If the first language is not available, the next one will be selected and so forth. The default is "en-US".

The content language of the actual SMS verification message can be retrieved in `id<SINInitiationResult> result` of the `initiateWithCompletionHandler:` callback.
```objectivec
NSArray<NSString *> *languages = @[ @"zh-CN", @"es-ES", @"en-US" ];
id<SINVerification> verification = [SINVerification SMSVerificationWithApplicationKey:@"<APP KEY>"
                                                                          phoneNumber:phoneNumberInE164
                                                                            languages:languages];

[verification initiateWithCompletionHandler:^(id<SINInitiationResult> result, NSError *error) {
  if (result.success) {
    NSLog(@"Content Language is: %@", result.contentLanguage);
    // Show UI for entering the code which will be received via SMS
  }
}];
```




> **Note**    
>
> The content language specified can be overridden by carrier provider specific templates, due to compliance and legal requirements, such as [US shortcode requirements (pdf)](https://www.wmcglobal.com/storage/us_resources/ctia-short-code-monitoring-handbook-current-Short-Code-Monitoring-Handbook-v1.7.pdf).

## Validate code

To complete the verification of the phone number, the user should be instructed to enter the code from the SMS to the application, and the code should be passed to `-[SINVerification verifyCode:completionHandler:]`. For example:
```objectivec
- (IBAction)done:(id)sender {
  // User pressed a "Done" button after entering the code from the SMS.

  NSString* code = @"<get code from user input text field>";

  [self.verification verifyCode:code
              completionHandler:^(BOOL success, NSError* error) {
                if (success) {
                  // Phone number was successfully verified
                } else {
                  // Ask user to re-attempt verification
                }
              }];
}
```


The method `verifyCode:completionHandler:` may be invoked multiple times (for a limited number of times within a short duration). So for example, if the completion handler is invoked with an `NSError` with domain `SINVerificationErrorDomain` and code `SINVerificationErrorInvalidInput` or `SINVerificationErrorIncorrectCode`, the application may hint to the user that the code was incorrect, let the user adjust it, and call `verifyCode:completionHandler:` once again on the same `SINVerification`-instance.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-for-ios/verification-ios-sms-verification.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>