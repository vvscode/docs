---
id: "5d417c7710531c0347934afc"
title: "Phone numbers"
excerpt: ""
---
The phone number should be specified according to the E.164 number formatting (<http://en.wikipedia.org/wiki/E.164>) recommendation and should be prefixed with a `+`. For example, to verify the US phone number 415 555 0101, the phone number should be specified as `+14155550101`. The `+` is the required prefix and the US country code `1` prepended to the local subscriber number.

The Sinch SDK provides APIs for parsing and formatting phone numbers. The primary class for this functionality is `SINPhoneNumberUtil`. A key thing when parsing user input as a phone number is the concept of *default region*; if a user enters their number in a local format, the parsing must know which region / country to assume. Example:
```objectivec
// Get user's current region by carrier info
NSString* defaultRegion = [SINDeviceRegion currentCountryCode];

NSError *parseError = nil;
id<SINPhoneNumber> phoneNumber = [SINPhoneNumberUtil() parse:@"<user input>"
                                               defaultRegion:defaultRegion
                                                       error:&parseError];
```




> **WARNING: Important**    
>
> When passing a number as a `NSString*` to create a `SINVerification`, the string should contain a number in *E.164* format.

A number that have been parsed into a `id<SINPhoneNumber>` can then be formatted as *E.164*:
```objectivec
NSString *phoneNumberInE164 = [SINPhoneNumberUtil() formatNumber:phoneNumber format:SINPhoneNumberFormatE164];
```