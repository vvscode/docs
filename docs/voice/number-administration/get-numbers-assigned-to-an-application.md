---
title: "Get numbers assigned to an application"
excerpt: ""
---
This endpoint lists all numbers that are assigned to a particular app.

## Headers

This is a protected resource and requires an [instance signed request](doc:authorization#section-instance-signed-request).

    Authorization: Instance {instance ID}:{instance signature}
    X-Timestamp: {now}
    
    eg:
    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:VE1UwyOa8r9DscyBWGVZ43qEDn+SGJGoNe2aN8WrR+8=
    X-Timestamp: 2015-06-20T11:43:10.944Z

## Request

    [GET]
    
    URL:
    https://portalapi.sinch.com/v1/applications/key/{applicationKey}/numbers
    
    eg:
    https://portalapi.sinch.com/v1/applications/key/bb7b4e39-4227-4913-8c81-2db4abb54fb3/numbers

    [body]
        empty
    
    eg:
    {}

## Response

    Number[]
    
    [Number]
        long - number
        integer - groupId
        string[] - capabilities
        string? - applicationKey
        string - countryId
        string - city
        string - country
        string - areaCode
        string? - expires
        Money    - cost
    
    eg:
```json
[
    {
        "number" : 14150005551,
        "groupId" : 13,
        "capabilities" : ["voice"],
        "applicationKey" : "bb7b4e39-4227-4913-8c81-2db4abb54fb3",
        "countryId" : "US",
        "city" : "SAN FRANCISCO",
        "country" : "US",
        "areaCode" : "415",
        "expires" : "2015-12-31T23:59:59+00:00",
        "cost":{
            "amount":0.00,
            "currencyId":"USD"
        }
    }
]
```
The “capabilities” can either be “voice” or “sms”.

## Error Codes

    [Error Codes]
        InvalidScheme (40301)       - The authorization scheme 'instance' is required.
        ResourceNotFound (40400)    - Application with the key {KEY_HERE} was not found.
        TemporaryDown (50300)       - Service is temporarily unavailable, please try again later.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/number-administration/get-numbers-assigned-to-an-application.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>