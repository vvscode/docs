---
title: Application Authentication
excerpt: 'Application Authentication with the Sinch SDK.'
next:
  pages:
    - voice-ios-cloud-miscellaneous
---

A user identity must be provided when initiating a Sinch client. The first time the application instance and the Sinch client are running on behalf of a particular user, it is required to register against the Sinch service. This is mostly handled transparently by the Sinch SDK. The step of registering a user identity against the Sinch service requires the application instance to provide a token that authenticates the _Application_ and grants permission (authorizes) the given user to register. Once the application instance has successfully registered the user identity, the client will have obtained the necessary credentials to perform further authorized requests on behalf of the _Application_ and for that specific user to make and receive calls.

## Token-based User Registration - Overview

To authorize the registration of a user, the application must provide a registration token to the `SINClient`. This token should be in the form of a [JSON Web Token (JWT)](https://jwt.io/) signed with a signing key derived from the _Application Secret_.

The recommended way to implement this authentication scheme is that the _Application Secret_ should be kept securely on your server-side backend, and the signed token should be passed via a secure channel to the application instance and Sinch client running on a device.

![Providing an Access Token by Application Server](images/0711e55-authentication_via_application_server.png)

The following sections describes in detail how to create and sign the _JWT_, and how to provide it to the `SINClient`.

## Creating a Registration Token

### JWT Header

A registration token is a _JWT_ with the following JWT header parameters:

| Header Parameter | Value | Note |
| -----------------|:---------------|:-------|
| `alg` | `HS256` |
| `kid` | `hkdfv1-{DATE}` | Where `{DATE}` is date in UTC on format `YYYYMMDD` |

Example of JWT header:

```
{
  "alg": "HS256",
  "kid": "hkdfv1-20200102"
}
```

### JWT Claims

The JWT must contain the following _claims_:

| Claim | Value / Description | Note |
|:--- |:--- |
| `iss` | `//rtc.sinch.com/applications/{APPLICATION_KEY}` |
| `sub` | `//rtc.sinch.com/applications/{APPLICATION_KEY}/users/{USER_ID}` |
| `iat` | See [JWT RFC 7519 section-4.1.1](https://tools.ietf.org/html/rfc7519#section-4.1.1) |
| `exp` | See [JWT RFC 7519 section-4.1.4](https://tools.ietf.org/html/rfc7519#section-4.1.4) |
| `nonce` | A unique cryptographic [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) |

__IMPORTANT__: The expiration time for the token itself (`exp`) should be set so that the _Time-to-Live_ of the token is not less than 1 minute.

### Signing the JWT

The _JWT_ should be signed using a _signing key_ derived from the _Sinch Application Secret_ as follows. Given:

- A function `HMAC256(key, message)`.
- A date-formatting function `FormatDate(date, format)`.
- The current date as variable `now`.
- _Sinch Application Secret_ as variable `applicationSecret`, holding the secret as a _base64_ encoded string.

, derive the signing key as follows:

```
signingKey = HMAC256(BASE64-DECODE(applicationSecret), UTF8-ENCODE(FormatDate(now, "YYYYMMDD")))
```

For additional information about _JWT_, along with a list of available libraries for generating signed _JWTs_, see [https://jwt.io](https://jwt.io).

For detailed information about the _JWT_ specification, see [https://tools.ietf.org/html/rfc7519](https://tools.ietf.org/html/rfc7519).



!!! REMOVE SECTION BELOW !!

## Authentication by client access to Application Secret

This application authentication scheme is based on giving the application direct access to the Application Secret, which enables the Sinch Client SDK in the application to self-sign an authorized request to perform user registration. Choosing this authentication scheme corresponds to initiating the Sinch client by using the factory method that takes both an Application Key and an Application Secret.

Using this authentication scheme is the quickest way to get started as the client application instances can directly perform authorized requests against the Sinch service.

> **WARNING: Caution**
>
> It is not recommended to have the application secret in plain text in the source code in the release version of the application.

## Authentication supported by application server

This application authentication scheme is based on the client application instance not having direct access to the Application Secret. Instead, when the Sinch client needs to perform an authorized request to register a user identity against the Sinch service, it needs to be provided with an authentication signature and a registration sequence to perform the registration. This should be provided by the application’s backend service, for example, by using a HTTP request over an SSL connection.

This scheme has the benefit of the application secret never being directly accessible by the client applications and provides a better level of security as well as flexibility.

> **Note**
>
> The need for the Sinch client to request an authentication signature and registration sequence is only required once per user and device–not on every application launch.

![authentication_via_application_server.png](images/0711e55-authentication_via_application_server.png)

### Generating the signature

The _Application Server_ is responsible for generating a valid signature for each registration request that it accepts as a valid user registration. The _sequence_ is a [cryptographic nonce](http://en.wikipedia.org/wiki/Cryptographic_nonce), and must be a monotonically increasing value. The signature is then generated as as follows (pseudogrammar):

```objectivec
string userId;
string applicationKey; // E.g. "d404a4d3-51cf-45e2-bc32-e294ae879d58"
string applicationSecret; // E.g. "oYdgGRXoxEuJhGDY2KQ/HQ=="
uint64 sequence = previous_sequence + 1; // E.g. previous_sequence = 0

string stringToSign = userId + applicationKey + sequence + applicationSecret;

// Use a Base64-encoder that don't introduce line-breaks,
// or trim the output signature afterwards.
string signature = Base64.encode(SHA1.digest(stringToSign));
```

For example, in Java:

```java
// Generating the Signature - Java
// import java.security.MessageDigest;
// import org.apache.commons.codec.binary.Base64;

String userId;
String applicationKey; // E.g. "d404a4d3-51cf-45e2-bc32-e294ae879d58";
String applicationSecret; // E.g. "oYdgGRXoxEuJhGDY2KQ/HQ==";
long sequence; // fetch and increment last used sequence

String toSign = userId + applicationKey + sequence + applicationSecret;

MessageDigest messageDigest = MessageDigest.getInstance("SHA-1");
byte[] hash = messageDigest.digest(toSign.getBytes("UTF-8"));

String signature = Base64.encodeBase64String(hash).trim();
```

### Starting the Client and Providing Authorization Credentials for User Registration

```objectivec
// Instantiate a client object using the client factory method.
id<SINClient> client = [Sinch clientWithApplicationKey:@"<application key>"
                                           environmentHost:@"ocra.api.sinch.com"
                                                    userId:@"<user id>"];

client.delegate = ...;

[client start];

// This will on the first run for this user, call
// -[SINClientDelegate client:requiresRegistrationCredentials:],
// which implementations could look something like this:

- (void)client:(id<SINClient>)client
requiresRegistrationCredentials:(id<SINClientRegistration>) registrationCallback {

  // Perform API request to server which keeps the Application Secret
  [myAPIService getAuthorizedSignatureForUser:[client userId]
  onSuccess:^(NSString* signature, long long sequence){

    // Forward the signature and sequence back into Sinch SDK
    [registrationCallback registerWithSignature:signature sequence:sequence];
  }
  onFailure:^(NSError* error) {

    // Forward potential network request error to Sinch SDK,
    // e.g. failure due to no internet connection.
    [registrationCallback registerDidFail:error];
  }];
}
```
