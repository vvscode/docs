---
title: "Get numbers assigned to an application"
excerpt: ""
---
This endpoint lists all numbers that are assigned to a particular app.

## Headers

This is a protected resource and requires an [instance signed request](doc:using-rest#section-instance-signed-request).

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

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/number-administration/get-numbers-assigned-to-an-application.md"><span class="fab fa-github"></span>Edit on GitHub!</a>