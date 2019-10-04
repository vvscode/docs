---
title: "Opt-In-and-Outs"
excerpt: "Read how to enable or disable users to receive business messages via WhatsApp via Sinch WhatsApp API."
---
All Business initiated conversations via the Sinch WhatsApp Business API must start with an “Opt-In” by the user. This can be collected through any third party channel. For example in an SMS message, In-Line with a Web Form, in an Email, or even via a deep-link in print media.

You can record a [opt-in](doc:whatsapp-opt-in-and-outs#section-opt-in-endpoint) by the API call described below and once the “Opt-In” is recorded you’ll be able to message that customer via the Sinch WhatsApp Business API.

Businesses must provide a method by which customers may opt-out of receiving future messages from your organization. The [opt-out-endpoint](doc:whatsapp-opt-in-and-outs#section-opt-out-endpoint) should be handled using the API call below.

> **Note**
>
> If a customer initiates contact with a WhatsApp Business, this will constitute as a temporary opt-in meaning that the
> business is allowed to send messages to that customer for 24 hours since the last received message. After that period
> has expired, a active opt-in is required before the business is allowed to send messages to that customer again.

## Opt-In endpoint

Opt-in numbers to enable the receiving of business messages via WhatsApp. Opting in already opted in numbers
would be ignored but not rejected.

#### Request

`POST whatsapp/v1/{bot-id}/provision/optin`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| numbers | List of MSISDNs                  | String array | N/A        | 1 to 20 elements      | Yes      |

**Sample**
```json
{
  "numbers": [
    "46732001122",
    "46732002244"
  ]
}
```

#### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described [here](doc:whatsapp-introduction#section-http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described [here](doc:whatsapp-introduction#section-http-errors)

### Opt in sample



## Opt-Out endpoint

Opt-out numbers to prevent them from receiving messages from the business.

#### request

`DELETE whatsapp/v1/{bot-id}/provision/optin`
`POST whatsapp/v1/{bot-id}/provision/optout`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| numbers | List of MSISDNs                  | String array | N/A        | 1 to 20 elements      | Yes      |

**Sample**
```json
{
  "numbers": [
    "46732001122",
    "46732002244"
  ]
}
```

#### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described [here](doc:whatsapp-introduction#section-http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described [here](doc:whatsapp-introduction#section-http-errors)


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/whatsapp/whatsapp-http-rest/whatsapp-opt-in-and-outs.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>