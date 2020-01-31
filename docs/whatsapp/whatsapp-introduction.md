---
title: Introduction
excerpt: >-
  WhatsApp for Business messaging. The Sinch WhatsApp Business Messaging API provides a rich, enterprise grade messaging solution for clients who wish to communicate with their customers via WhatsApp.
next:
  pages:
    - whatsapp-http-rest
  description: Get started today
---
The Sinch WhatsApp Business Messaging API provides a rich, enterprise grade messaging solution for clients who wish to communicate with their customers via WhatsApp.

With over 1.5bn users globally using WhatsApp regularly to communicate with friends and family, it really does represent the digital extension of the users living room. It’s the inner circle of your customer’s communication so bringing your trusted brand communications to that inner circle has huge potential.

Integrating the Sinch WhatsApp Business Messaging API with your own backend systems enables Rich, High fidelity, contextual conversations to be established via the WhatsApp channel.

> **Note**
>
> Try out the WhatsApp API live in our new tutorial here [WhatsApp Tutorial](doc:send-your-first-whatsapp-message).

## Authentication
The Sinch WhatsApp API securely authenticates via a bot identifier and bearer token pair. During the initial client on boarding process, these will be provided by your account manager.

To be able to authenticate the access token needs to be passed. For all WhatsApp end-points it is required to set the [bearer token](https://oauth.net/2/bearer-tokens/) in the authorization HTTP header like: `Authorization: Bearer AbCdEf123456`. Where the string `AbCdEf123456` is the bearer authorization token.

If no authentication header is present or if the bearer token is invalid, the API will respond with HTTP 401 Unauthorized.

## BearerAuth

|                           |        |
| ------------------------- | ------ |
| Security scheme type      | HTTP   |
| HTTP Authorization Scheme | bearer |


## HTTP Errors
Responses with status `400 Bad Request` and `401 Unauthorized` will present a JSON object in the body explaining the error.
It has the following structure:

| Name      | Description                                                          | JSON Type |
| --------- | -------------------------------------------------------------------- | --------- |
| `message` | A error message describing the general error.                        | `String`  |
| `details` | Human readable description of the error. Can be used for debugging.  | `String`  |


## Base URL

> **Note**
>
> We recently added support for a EU server. We are currently working to add a production server in Asia, so stay tuned!

The following WhatsApp URLs can be used by the WhatsApp API. We have servers in the US and EU.


| Server        |  URL                                   |
|---------------|----------------------------------------|
| US Production | https://us1.whatsapp.api.sinch.com     |
| EU Production | https://eu1.whatsapp.api.sinch.com     |

## Accepted media types

> **Note**
>
> Any media file sent through the Sinch WhatsApp API will be processed before it's sent to the recipient.
> While the maximum file size for every uploaded media is 100 mb, be aware that the file can be compressed to meet the post-processing limits listed below.
> 

| Message type  |  Supported content types               |  Post-processing size limit       |
|---------------|----------------------------------------|-----------------------------------|
| document      | text/plain, text/csv, <br>application/pdf, application/msword, application/x-tar, application/rtf.0, <br> application/vnd.ms-powerpoint,<br> application/vnd.openxmlformats-officedocument.presentationml.presentation, <br>application/vnd.openxmlformats-officedocument.wordprocessingml.document, <br>application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, <br>application/vnd.oasis.opendocument.presentation, <br>application/vnd.oasis.opendocument.spreadsheet, <br>application/vnd.ms-excel, <br>application/vnd.oasis.opendocument.text  | 100 mb |
| image         | image/jpeg, image/png                                             | 5 mb   |
| audio         | audio/aac, audio/mp4, audio/amr, audio/mpeg, audio/ogg, audio/opus| 16 mb  |
| video         | video/mp4, video/3gpp                                            | 16 mb  |
