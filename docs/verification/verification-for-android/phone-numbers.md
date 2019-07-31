---
title: "Phone numbers"
excerpt: ""
---
The phone number should be specified according to the E.164 number formatting (<http://en.wikipedia.org/wiki/E.164>) recommendation and should be prefixed with a `+`. For example, to verify the US phone number 415 555 0101, the phone number should be specified as `+14155550101`. The `+` is the required prefix and the US country code `1` prepended to the local subscriber number.

The Sinch SDK provides APIs for formatting phone numbers. The primary class for this functionality is `PhoneNumberUtils`. A key thing when parsing user input as a phone number is the concept of *default region*; if a user enters their number in a local format, the parsing must know which region / country to assume. Example:
[block:code]
{
  "codes": [
    {
      "code": "// Get user's current region by carrier info\nString defaultRegion = PhoneNumberUtils.getDefaultCountryIso();",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Important",
  "body": "When passing a number as a string to create a `Verification`, the string should contain a number in *E.164* format."
}
[/block]
A number can be formatted as *E.164* like this:
[block:code]
{
  "codes": [
    {
      "code": "String phoneNumberInE164 = PhoneNumberUtils.formatNumberToE164(phoneNumberString, defaultRegion);",
      "language": "java"
    }
  ]
}
[/block]