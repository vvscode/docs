---
title: List all rented numbers
excerpt: ''
hidden: 'true'
next:
  pages:
    - get-numbers-assigned-to-an-application
---
This endpoint lists all the numbers that are assigned to your account.

## Headers

This is a protected resource and requires an [instance signed request](doc:using-rest#instance-signed-request).

    Authorization: Instance {instance ID}:{instance signature}
    x-timestamp: {now}

    eg:
    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:PToDaAs7AiJDqGKZHCl3mayEigGWodVfg4fSlkAYLHg=
    x-timestamp: 2015-06-20T11:43:10.944Z

## Request

    [GET]

    URL:
    https://portalapi.sinch.com/v1/organisations/id/{organisationId}/numbers

    eg:
    https://portalapi.sinch.com/v1/organisations/id/8888123/numbers

    [body]
        empty

    eg:
    {}

## Response

    Number[]

    [Number]
        long     - number
        integer  - groupId
        string[] - capabilities
        string?  - applicationKey
        string   - countryId
        string   - city
        string   - country
        string   - areaCode
        string?  - expires
        Money    - cost

    eg:
```json
[
    {
        "number" : 14150005550,
        "groupId" : 13,
        "capabilities" : ["voice"],
        "countryId" : "US",
        "city" : "SAN FRANCISCO",
        "country" : "US",
        "areaCode" : "415",
        "expires" : "2015-12-31T23:59:59+00:00",
        "cost":{
            "amount":0.00,
            "currencyId":"USD"
        }
    }, {
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

If some numbers are already assigned to your app, then the application key will also appear in the response for those numbers.

## Error Codes

    [Error Codes]
        InvalidScheme (40301)       - The authorization scheme 'instance' is required.
        ForbiddenRequest (40300)    - The current user is not the owner of the organisation: {ORGANISATION_ID}
