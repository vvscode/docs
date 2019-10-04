---
title: "Authorization"
excerpt: ""
---
The API uses the standard HTTP *Authorization* header to pass authentication information.

## Timestamp

The client must send a custom header *x-timestamp* (time) with each request that is validated by the server. This custom header is used to determine that the request is not too old. The timestamp is also part of the signature. The timestamp must be formatted to [ISO 8061](http://en.wikipedia.org/wiki/ISO_8601) specifications.

*Example*

    X-Timestamp: 2014-06-02T15:39:31.2729234Z

## Public resources

Public resources do not require a *signature* in the **Authorization** header. However, the client must send an HTTP *Authorization* header with the *ApplicationKey*. A client can also perform a signed request to the public resource.

    Authorization = “Application” + " " + ApplicationKey

## Protected resources

Protected resources require a **signed** request. The signature is used to validate the client and to check whether the client is authorized to perform the operation. The Api is using standard HTTP *Authorization* header to pass authorization information. The following schemes are supported:

  - **Application signed request** - Used to sign requests that are specific to a particular application. Most Sinch APIs require this type of authorization scheme.
  - **User signed request** - Used to create instances. It is mainly used to login with your email account in order to perform administrative tasks such as rented numbers administration.
  - **Instance signed request** - Used to sign requests that are relevant only to your account and not specific to an application, such as administering rented numbers.

### Application signed request

Use the following syntax to sign a request for the Sinch Platform. The result should be included in the HTTP *Authorization* header sent with the HTTP Request.

    Authorization = Scheme + " " + applicationKey + “:” + Signature
    
    Scheme = “Application”
    
    Signature = Base64 ( HMAC-SHA256 ( applicationSecret, UTF8 (
    StringToSign ) ) );
    
    StringToSign = HTTP-Verb + “\n” +
    Content-MD5 + “\n” +
    Content-Type + “\n” +
    CanonicalizedHeaders + “\n” +
    CanonicalizedResource;
    
    Content-MD5 = Base64 ( MD5 ( UTF8 ( [BODY] ) ) )

*CanonicalizedHeaders*: Currently the only header required is “X-Timestamp”.

To get the *applicationKey* and *applicationSecret*, you should create an application in the Sinch dashboard. The dashboard will display your application key and secret pair that can be used to sign requests.

*Example*

    applicationKey: 5F5C418A0F914BBC8234A9BF5EDDAD97 applicationSecret:
    JViE5vDor0Sw3WllZka15Q==

> **Note**
> 
> The application secret value must be decoded from Base64 before it is used for signing.

*Example of an application signed request to a protected resource*

For the following POST request to the protected resource /v1/sms/+46700000000,

    POST /v1/sms/+46700000000
    X-Timestamp: 2014-06-04T13:41:58Z
    Content-Type: application/json
    
    {“message”:“Hello world”}

the signature should be formed like this:

    Content-MD5 = Base64 ( MD5 ( UTF8 ( [BODY] ) ) )
        jANzQ+rgAHyf1MWQFSwvYw==
    
    StringToSign
    POST
    jANzQ+rgAHyf1MWQFSwvYw==
    application/json
    x-timestamp:2014-06-04T13:41:58Z
    /v1/sms/+46700000000
    
    Signature = Base64 ( HMAC-SHA256 ( Secret, UTF8 ( StringToSign ) ) )
        qDXMwzfaxCRS849c/2R0hg0nphgdHciTo7OdM6MsdnM=
    
    HTTP Authorization Header Authorization: Application
        5F5C418A0F914BBC8234A9BF5EDDAD97:qDXMwzfaxCRS849c/2R0hg0nphgdHciTo7OdM6MsdnM=

> **Note** 
> 
> For requests that don’t contain a body (like GET requests) or requests where the body is empty, the Content-MD5 value of StringToSign should be left empty.

    StringToSign = HTTP-Verb + “\n” +
        “\n” +
        Content-Type + “\n” +
        CanonicalizedHeaders + “\n” +
        CanonicalizedResource;

**CanonicalizedHeaders**: Currently the only header required is “X-Timestamp”.  

#### User signed request 


    Authorization = “User” + " " + USER_AUTHORIZATION

> **Note**
> 
> The USER\_AUTHORIZATION is received in its entiry from ‘\[POST\] /authentication’. It can be added to the header as it is.

*Example*

    Authorization: User eyJhcHBsaWNhdGlvbktleSI6IllPVVJfQVBQTElDQVRJT05fS0VZIiwiaWRlbnRpdHkiOnsidHlwZSI6ImVtYWlsIiwiZW5kcG9pbnQiOiJhZGRyZXNzQGV4YW1wbGUuY29tIn0sImNyZWF0ZWQiOiIyMDE1LTA2LTI0VDA4OjMyOjMyLjk0MTc2MDVaIn0=:Uc3UQ6tnextCCXiuieizBGNf16SDKFGFWMpu6LKbOwA=

### Instance signed request

In order to increase security and minimize the risk of app secrets to be compromised requests can be signed. The signature is used to validate that the client and check if the client is authorized to perform the operation. Security is increased since the secret is not actually part on the message sent over the
   wire.

    Authorization = “Instance” + " " + INSTANCE_ID + “:” + INSTANCE_SIGNATURE
    
    INSTANCE_SIGNATURE = Base64 ( Hmac-Sha256 ( INSTANCE_SECRET, Utf8 (STRING_TO_SIGN ) ) )
    
    STRING_TO_SIGN = HTTP-Verb + “\n” +
        CONTENT_MD5 + “\n” +
        Content-Type + “\n” +
        CanonicalizedHeaders + “\n” +
        CanonicalizedResource;
    
    CONTENT_MD5 = Base64 ( Md5 ( [BODY] ) )

*INSTANCE\_SECRET*: INSTANCE\_SECRET is received from ‘\[POST\] /instances’ as a Base64 encoded byte array. It **must** be decoded from Base64 before being used for signing.

*CanonicalizedHeaders* - Currently the only header required is “X-Timestamp”.

### Instance Signing Example 1: Reserve a number

**Request**

    INSTANCE_ID: 00a3ffb1-0808-4dd4-9c7d-e4383d82e445 ~
    INSTANCE_SECRET: bRo76GRddEyetgJDTgkLHA==
    
    PUT v1/organisations/id/8888123/numbers/shop HTTP/1.1
    Host: api.sinch.com
    X-Timestamp: 2015-06-20T11:43:10.944Z
    Content-Type: application/json
    
    {“groupId”:13,“quantity”:1}

**Content-MD5**

Base64 ( HMAC-MD5 ( \[Body\] ) )

    BKCnAAx1KstTZCD0hQLbkw==

**StringToSign**

    PUT
    BKCnAAx1KstTZCD0hQLbkw==
    application/json
    x-timestamp:2015-06-20T11:43:05.270Z
    /v1/organisations/id/8888123/numbers/shop

**Signature**

Base64 ( HMAC-SHA256 ( INSTANCE\_SECRET, UTF8( \[STRING\_TO\_SIGN\] ) )
);

    a6p7RYw8bMr3JuZh1LArvWTLJjIgCeQj5nsRZaXW7VQ=

**Authorization
    Header**

    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:rMc5t4BI62b3o7JhPWX6/CslXYdbkC7rs5dyqBj9MIA=

### Instance Signing Example 2: Get numbers assigned to an application

**Request**

    INSTANCE_ID: 00a3ffb1-0808-4dd4-9c7d-e4383d82e445
    INSTANCE_SECRET: bRo76GRddEyetgJDTgkLHA==
    
    PUT v1/applications/key/bb7b4e39-4227-4913-8c81-2db4abb54fb3/numbers HTTP/1.1
    Host: api.sinch.com
    X-Timestamp: 2015-06-20T11:43:10.944Z
    Content-Type: application/json
    
    {}

**Content-MD5**

Base64 ( HMAC-MD5 ( \[Body\] ) )

    null

> **Note**
> 
> The Content-MD5 does not need to be calculated when the body is empty.

**StringToSign**

    GET
    
    application/json
    x-timestamp:2015-06-20T11:43:10.944Z
    /v1/applications/key/bb7b4e39-4227-4913-8c81-2db4abb54fb3/numbers

> **Note**
> 
> The newline character must still be included even when the request body is empty.

**Signature**

Base64 ( HMAC-SHA256 ( INSTANCE\_SECRET, UTF8( \[STRING\_TO\_SIGN\] ) )
);

    VE1UwyOa8r9DscyBWGVZ43qEDn+SGJGoNe2aN8WrR+8=

**Authorization Header**

    Authorization: Instance 00a3ffb1-0808-4dd4-9c7d-e4383d82e445:xz+CPft5te5h9bCFJAeCd1OKhSW2ZUFnmX4gcGuZqcY=

### Callback request signing

The Sinch Platform can initiate callback requests to a URL you define on events like call initiation, call answer, and call disconnect. All callback requests are signed using your Application key and Secret pair. The signature is included in the Authorization header of the
   request.

    Authorization = “Application” + " " + PartnerApplicationKey + “:” + Signature
    
    Signature = Base64 ( HMAC-SHA256 ( PartnerApplicationSecret, UTF8 (StringToSign ) ) );
    
    StringToSign = HTTP-Verb + “\n” +
        Content-MD5 + “\n” +
        Content-Type + “\n” +
        CanonicalizedHeaders + “\n” +
        CanonicalizedResource;
    
    Content-MD5 = Base64 ( MD5 ( [BODY] ) )

*Example*

    PartnerApplicationKey = 669E367E-6BBA-48AB-AF15-266871C28135
    PartnerApplicationSecret = BeIukql3pTKJ8RGL5zo0DA==

    Body
        {“event”:“ace”,“callid”:“822aa4b7-05b4-4d83-87c7-1f835ee0b6f6_257”,“timestamp”:“2014-09-24T10:59:41Z”,“version”:1}
    
    Content-MD5 = Base64 ( MD5 ( [BODY] ) )
        REWF+X220L4/Gw1spXOU7g==
    
    StringToSign
        POST
        REWF+X220L4/Gw1spXOU7g==
        application/json
        x-timestamp:2014-09-24T10:59:41Z
        /sinch/callback/ace
    
    Signature = Base64 ( HMAC-SHA256 ( PartnerApplicationSecret, UTF8 (StringToSign ) ) )
        Tg6fMyo8mj9pYfWQ9ssbx3Tc1BNC87IEygAfLbJqZb4=
    
    HTTP Authorization Header
        Authorization: Application 669E367E-6BBA-48AB-AF15-266871C28135:Tg6fMyo8mj9pYfWQ9ssbx3Tc1BNC87IEygAfLbJqZb4=



### Callback request validation

Your development platform that receives the callbacks can verify that the request originated from Sinch by re-signing the request and comparing the result with the value contained in the *Application* HTTP header.

### Basic authorization


To get started quickly, applications are enabled to use basic authorization instead of signing messages. To use basic authorization, set the application key as the username and the secret from the portal as the password.

    //application call
    usernameAndPassword = “application" + ApplicationKey + ”:" + ApplicationSecret

To get the *applicationKey* and *applicationSecret*, you should create an application in the Sinch dashboard. The dashboard will display your application key and secret pair that can be used to sign requests.

By convention, the username and password need to be base64 encoded before being added to the header:

    Authorization = “basic” + " " + Base64 ( usernameAndPassword )

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/using-rest/authorization.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>