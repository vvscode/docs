---
title: "Types"
excerpt: ""
---
There are standard types, array types, and custom types.

## Standard Types

    string - string 
    int - signed 32 bit number 
    long - signed 64 bit number
    bool - boolean (true/false)
    decimal - decimal

## Optional Values

An object can contain an optional value which is represented as the type with a trailing question mark.

*Example*

    string? - firstName 

## Array Values

An object can contain an array of types which is represented as the type followed by square brackets.

*Example*

    string[] - locales

## Custom Types

### Timestamp (time)

Timestamp is sent as an string ([ISO 8061](http://en.wikipedia.org/wiki/ISO_8601)).

    2014-06-02T15:39:31Z
    2014-06-02T15:39:31.2729234Z

### Binary data (byte\[\])

A binary byte array is sent as a Base64-encoded string.

    WbUCsMDTfW7mjCiMpG4bmw==

### Country Id (country)

Represents a country defined as a string ([ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)).

*Example*

    "US" - United States
    "SE" - Sweden
    "GB" - United Kingdom

### Timezone (timezone)

Represents a timezone defined as a string ([Timezone](http://en.wikipedia.org/wiki/Time_zone)).

*Example*

    "UTC-04:30" - Venezuela 
    "UTC-01:00" - Cape Verde
    "UTC+08:45" - Australia (Eucla)

### Locale (locale)

Defined as a string with Language ([ISO 639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)) and Country Id.

*Example* ([Language Codes](http://www.lingoes.net/en/translator/langcode.htm))

    "sv-SE" - Swedish (Sweden)
    "en-US" - English (United States)
    "en-GB" - English (United Kingdom)
    "fr-FR" - French (France)

#### Identity (identity)

An endpoint identity is sent as an object containing type and identity.

    [Identity]
        string - type
        string - endpoint
        bool? - verified
    
    Type:
        "number" - Phone Number - in international format starting with a '+'
        "email" - Email Address
        "facebook" - Facebook Id
        "userName" - User name
        "conference" - The id of the conference that a call will be connected to.
        "did" - a Phone number for inbound voice rented from Sinch (DID means "direct inward dialing")

  - **verified** is a *readonly* Boolean sent when listing a user’s identities and specifies whether the identity has been validated.

*Example*

    {
        "type":"number",
        "endpoint":"+46707123456",
        "verified":true
    }

### Currency Id (currency)

Represents a currency defined as a string ([ISO 4217](http://en.wikipedia.org/wiki/ISO_4217)).

*Example*

    "USD" - United States Dollar
    "GBP" - United Kingdom Pound
    "EUR" - Euro Member Countries

### Money (money)

Represents a money object that is formatted based on the currency’s defined locale.

``` 
[Money]
    currency - currencyId
    decimal - amount 
    string? – formatted     
```

  - **formatted** is a *readonly* string that can be sent from the server for display purposes.

*Example*

    {
        "currencyId": "USD",
        "amount":10.25,
        "formatted":"$10.25"
    }

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/using-rest/types.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>