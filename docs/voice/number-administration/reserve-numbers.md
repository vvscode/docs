---
title: "Reserve number(s)"
excerpt: ""
hidden: "true"
---
To rent numbers, you must first reserve them and then check out. This endpoint allows reserving the numbers that you would like to rent.

## Headers

This is a protected resource and requires an [instance signed request](doc:using-rest#section-instance-signed-request).

    Authorization: Instance {instance ID}:{instance signature}
    X-Timestamp: {now}

    eg:
    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:a6p7RYw8bMr3JuZh1LArvWTLJjIgCeQj5nsRZaXW7VQ=
    X-Timestamp: 2015-06-20T11:43:10.944Z

## Request

    [PUT]

    URL:
    https://portalapi.sinch.com/v1/organisations/id/{organisationId}/numbers/shop

    eg:
    https://portalapi.sinch.com/v1/organisations/id/8888123/numbers/shop

    [body]
        integer  - groupId
        integer  - quantity
        string[] - capabilities

    eg:

```json
{
    "groupId":13,
    "quantity":1,
    "capabilities":["voice","sms"]
}
```
## Response

    string - referenceId

    eg:

```json
{
    "referenceId":"c8b27491-3379-44f3-af31-fbbfbb2ba510"
}
```
## Error Codes

    [Error codes]
        ParameterValidation (40001) - Invalid capability '{CAPABILITY}'
        MissingParameter (40002)    - No groupIds specified
        InvalidRequest (40003)      - Too many number groups specified.  Unable to complete request.
                                    - Invalid number group: {GROUP_ID}
        ForbiddenRequest (40300)    - The current user is not the owner of the organisation: {ORGANISATION_ID}
        InvalidScheme (40301)       - The authorization scheme 'instance' is required.
