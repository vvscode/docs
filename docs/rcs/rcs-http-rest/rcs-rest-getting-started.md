---
title: "Getting Started"
excerpt: ""
---
RCS is the logical evolution of SMS enabling enterprises and individuals to exchange rich media, deep linking features and interactive content with the same ease as SMS.

The RCS REST API requires the message originator to be an A2P agent (also known as chatbot). The agent specifies the "appearance" of the conversation on the handset, with brand logo, color, and contact information. Please contact Sinch to get your agent provisioned with your branding.

The RCS REST API exposes a large portion of the chatbot enabled messaging formats described in the [GSMA Universal Profile 2.0 specification](https://www.gsma.com/futurenetworks/rcs/resources-rcs-events/universal-profile/).

The following types and concept are available:

* Two-way text messaging
* Two-way file transfer (including rich media messages such as videos and GIFs)
* Rich cards (with suggestion chips)
* Rich card carousels
* Suggestion chips (actions and replies)
* Delivery, display and composing indications
* Message revocation

### Authentication

Request with token

**Request with token**
```shell
$ curl -H "Authorization: Bearer {token}" \
"https://api.clxcommunications.com/rcs/v1/{endpoint}"
```


The token is required for all requests made to the REST API.

The token is sent in the `Authorization` header, preceded by `Bearer`.

Please contact your Technical Account Manager to obtain your API token.

### Sending the first message

Example of sending a simple text message.

**Sending a simple text message**
```shell
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
    "message_id": "59a75b73-0669-4075-aeff-2a13f9967ebb",
    "to": "46555123456",
    "message": {
      "type": "text",
      "text": "Madam Im Adam"
    }
  }'
```


Sending messages is described in detail in [Messages Endpoint](doc:rcs-rest-messages-endpoint#section-send-a-message).

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/rcs/rcs-http-rest/rcs-rest-getting-started.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>