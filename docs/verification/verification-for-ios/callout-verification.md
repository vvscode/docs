---
title: "Callout Verification"
excerpt: ""
---
Verification of a phone number is performed in one step: a PSTN call to the end-user phone is placed and a text-to-speech or recorded voice will instruct the end-user to press a digit.

## Request a callout verification

To initiate a callout verification, start by creating a `SINVerification`, then request a callout by invoking `-[SINVerification initiateWithCompletionHandler:`.
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

id<SINVerification> verification = [SINVerification calloutVerificationWithApplicationKey:@"<application key>"
                                                                              phoneNumber:phoneNumberInE164];

[verification initiateWithCompletionHandler:^(id<SINInitiationResult> result, NSError *error) {
    if (result.success) {
      // User's phone number was successfully verified
    } else {
      if ([error.domain isEqualToString:SINVerificationErrorDomain] &&
        error.code == SINVerificationErrorCancelled) {
        // Handle cancellation error code separately
        NSLog(@"Verification cancelled: %@", error);
      } else {
        // Inform user of error, e.g. that input was invalid.
      }
    }
}];
```


### Phone numbers - Parsing and E.164 Formatting

> **WARNING: Important**    
>
> When passing a number as a `NSString*` to create a `SINVerification`, the string should contain a number in *E.164* format. See the section [Phone numbers](#phonenumbers) for details.

### Re-attemping a callout

The method `initiateWithCompletionHandler:` should not be invoked multiple times. If the application UI flow is structured so that a user can initiate retries for callout verification, it is recommended to create a new instance of `SINVerification` for each attempt.