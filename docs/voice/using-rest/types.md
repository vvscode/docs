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

<a class="edit-on-github" href="https://github.com/sinch/docs/blob/master/docs/voice/using-rest/types.md">Edit on GitHub</a>