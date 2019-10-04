---
title: "Create an instance"
excerpt: ""
---
As a second step, you need to create an instance with the ‘authorization’ string received from the authentication response (above).

## Headers

This is a protected resource and requires a [user signed request](doc:authorization#section-user-signed-request).

    Authorization: User {authorization}
    X-Timestamp: {now}
    
    eg:
    Authorization: User eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=
    X-Timestamp: 2015-06-20T11:43:10.944Z

## Request

    [POST]
    
    URL:
    https://api.sinch.com/v1/instance


[body]
    string   - authorization
    Version  - version

[Version]
    string - os
    string - platform

eg:
```json
{
   "authorization":"eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=",
   "version":{
      "os":"{os}",
      "platform":"{platform}"
   }
}  
```

> **Note** 
> 
> ‘version’ data is mandatory, but is up to the client to decide how to populate it. Choose values that best represent your OS and platform combination.

## Response

    [Instance]
        string   - id
        byte[]   - secret
        integer? - expiresIn
    
    eg:

```json
{
   "id":"00a3ffb1-0808-4dd4-9c7d-e4383d82e445",
   "secret":"bRo76GRddEyetgJDTgkLHA==",
   "expiresIn":172800
}
```

<a class="edit-on-github" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/number-administration/create-an-instance.md">Edit on GitHub</a>