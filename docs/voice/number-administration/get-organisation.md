---
title: "Get organisation"
excerpt: ""
---
With the instance that you created you can now perform instance signed requests, which are needed for the number administration endpoints. First you should retrieve your organisation Id.

## Headers

This is a protected resource and requires an [instance signed request](doc:authorization#section-instance-signed-request).

    Authorization: Instance {instance ID}:{instance signature}
    X-Timestamp: {now}
    
    eg:
    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:bb9i9SGuw8mPspPF6WHzIZxw4yQxdOwGaDliMi+IhCU=
    X-Timestamp: 2015-06-20T11:43:10.944Z

## Request

    [GET]
    
    URL:
    https://api.sinch.com/v1/organisations

    [body]
        empty
    
    eg:
    {}

## Response

    [Organisation]
        int - id
        string? - name
        string? - website
        string? - countryId
        string? - phone
        string? - vatnumber
    
eg:

```json
  {
     "id":"8888123",
     "name":"Acme"
     "website":"http://www.example.com"
     "phone":"+12055500000"
     "countryId":"US"
  }
```

<a class="edit-on-github" href="https://github.com/sinch/docs/blob/master/docs/voice/number-administration/get-organisation.md">Edit on GitHub</a>