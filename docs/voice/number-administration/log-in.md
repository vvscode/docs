---
title: "Log in"
excerpt: ""
---
First you need to login to retrieve a token that will be used to create an instance.

## Headers

This is a [public resource](doc:authorization#section-public-resources).

When logging in, you should always pass in the header the “number administration” key. This is the key that you should pass:

    669762D5-2B10-44E0-8418-BC9EE4457555

> **Note** 
> 
> Always use this exact key in the log in step. Do not use any of your app keys.

    Authorization: Application 669762D5-2B10-44E0-8418-BC9EE4457555
    X-Timestamp: {now}
    
    eg:
    Authorization: Application 669762D5-2B10-44E0-8418-BC9EE4457555
    X-Timestamp: 2015-06-20T11:43:10.944Z

## Request

    [POST]
    
    URL:
    https://userapi.sinch.com/v1/users/{type}/{identity}/authentication
    
    eg:
    https://userapi.sinch.com/v1/users/email/address@example.com/authentication

    [body]
        string - password
    
    eg:
```json
{
    "password":"YOUR_ACCOUNT_PASSWORD"
}
```
### Response

    string - authorization
    User   - user
    
    eg:
```json
{
   "authorization":"eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=",
   "user":{
      "id":123456789,
      "identities":[
         {
            "type":"email",
            "endpoint":"address@example.com"
         },
         {
            "type":"number",
            "endpoint":"+12055500000"
         }
      ],
      "profile":{
         "name":{
            "first":"Jane",
            "last":"Bloggs",
            "full":"Jane Bloggs"
         },
         "contact":{
            "email":"address@example.com"
         }
      }
   }
}
```

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/number-administration/log-in.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>