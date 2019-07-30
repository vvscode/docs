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
[block:code]
{
  "codes": [
    {
      "code": "$ curl -H \"Authorization: Bearer {token}\" \\\n\"https://api.clxcommunications.com/rcs/v1/{endpoint}\"",
      "language": "shell",
      "name": "Request with token"
    }
  ]
}
[/block]
The token is required for all requests made to the REST API.

The token is sent in the `Authorization` header, preceded by `Bearer`.

Please contact your Technical Account Manager to obtain your API token.

### Sending the first message

Example of sending a simple text message.
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n    \"message_id\": \"59a75b73-0669-4075-aeff-2a13f9967ebb\",\n    \"to\": \"46555123456\",\n    \"message\": {\n      \"type\": \"text\",\n      \"text\": \"Madam Im Adam\"\n    }\n  }'",
      "language": "shell",
      "name": "Sending a simple text message"
    }
  ]
}
[/block]
Sending messages is described in detail in [Messages Endpoint](doc:messages-endpoint#section-send-a-message).