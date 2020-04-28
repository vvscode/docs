---
title: Get numbers available to rent
excerpt: ''
hidden: 'true'
next:
  pages:
    - reserve-numbers
---
This API returns all available numbers, so that you can pick which ones you want to rent.

## Headers

This is a protected resource and requires an [instance signed request](doc:using-rest#instance-signed-request).

    Authorization: Instance {instance ID}:{instance signature}
    X-Timestamp: {now}

    eg:
    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:jYJQFcgc1uh7DO2uQZyLu7rpxOc3jXjcuQNKWiHFJiI=
    X-Timestamp: 2015-06-20T11:43:10.944Z

## Request

    [GET]

    URL:
    https://portalapi.sinch.com/v1/organisations/id/{organisationId}/numbers/shop

    eg:
    https://portalapi.sinch.com/v1/organisations/id/8888123/numbers/shop

    [body]
        empty

    eg:

```json
    {

    }
```

## Response

    NumberGroup[]

    [NumberGroup]
        int      - groupId
        string   - country
        string   - countryId
        string   - city
        string   - type
        integer  - availability
        string   - areaCode
        Money    - cost
        string[] - capabilities

    eg:
```json
[
   {
      "groupId":1,
      "country":"France",
      "countryId":"FR",
      "city":"PARIS",
      "type":"Voice",
      "availability":7,
      "areaCode":"01",
      "cost":{
            "amount":2.00,
            "currencyId":"USD"
      },
      "capabilities":["voice"]
   },
   {
      "groupId":2,
      "country":"UK",
      "countryId":"GB",
      "city":"LONDON",
      "type":"Voice",
      "availability":2,
      "areaCode":"020",
      "cost":{
            "amount":2.00,
            "currencyId":"USD"
      },
      "capabilities":["voice"]
   },
   {
      "groupId":75,
      "country":"US",
      "countryId":"US",
      "city":"New Orleans",
      "type":"Sms",
      "availability":5,
      "areaCode":"504",
      "cost":{
            "amount":2.00,
            "currencyId":"USD"
      },
      "capabilities":["sms"]
   }
]
```

## Error Codes

    [Error codes]
        ParameterValidation (40001) - Invalid number type: {NUMBER_TYPE}.  Type must be one of: sms, voice.
        ForbiddenRequest (40300)    - The current user is not the owner of the organisation: {ORGANISATION_ID}
        InvalidScheme (40301)       - The authorization scheme 'instance' is required.
