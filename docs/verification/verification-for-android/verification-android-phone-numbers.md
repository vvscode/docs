---
title: Phone numbers
excerpt: >-
  How should a phone number (MSISDN) be formatted in E.164? Sinch provides
  utility tools that help with correct formatting. Read more.
next:
  pages:
    - verification-android-improving-verification-performance-with-a-great-ui
---
The phone number should be specified according to the E.164 number formatting (<http://en.wikipedia.org/wiki/E.164>) recommendation and should be prefixed with a `+`. For example, to verify the US phone number 415 555 0101, the phone number should be specified as `+14155550101`. The `+` is the required prefix and the US country code `1` prepended to the local subscriber number.

The Sinch SDK provides APIs for formatting phone numbers. The primary class for this functionality is `PhoneNumberUtils`. A key thing when parsing user input as a phone number is the concept of *default region*; if a user enters their number in a local format, the parsing must know which region / country to assume. Example:
```java
// Get user's current region by carrier info
String defaultRegion = PhoneNumberUtils.getDefaultCountryIso();
```




> **WARNING: Important**    
>
> When passing a number as a string to create a `Verification`, the string should contain a number in *E.164* format.

A number can be formatted as *E.164* like this:
```java
String phoneNumberInE164 = PhoneNumberUtils.formatNumberToE164(phoneNumberString, defaultRegion);
```
