---
title: "Opt-In-and-Outs"
excerpt: "Read how to enable or disable users to receive business messages via WhatsApp via Sinch WhatsApp API."
---

All Business initiated conversations via the Sinch WhatsApp Business API must start with an “Opt-In” by the user. This can be collected through any third party. For example in an SMS message, In-Line with a Web Form, in an Email, or even via a deep-link in print media.

You can record a [opt-in](doc:whatsapp-opt-in-and-outs#section-opt-in) by the API call described below and once the “Opt-In” is recorded you’ll be able to message that customer via the Sinch WhatsApp Business API.

Businesses must provide a method by which customers may opt-out of receiving future messages from your organisation. The [opt-out](doc:whatsapp-opt-in-and-outs#section-opt-out) should be handled using the API call below.

## Opt-In


Opt-in numbers to enable the receiving of business messages via WhatsApp.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
-   application/json

- The numbers that you wish to opt in, which allows the current bot to send messages to them.

<div class="magic-block-html">
  <div class="marked-table">
    <table class="last docutils" border="1">
      <tbody valign="top">
        <tr class="row-odd">
          <td>numbers <br>
            <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of string, minimum 1 number</span> <br>
            Array of phone numbers (msisdns).</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

| Name    | Description                        | JSON type       | Default | Constraints      | Required |
| ------- | --------------------------------- | --------------- | :-----: | ---------------- | :------: |
| numbers | Array of phone numbers (msisdns). | Array of string |    -    | Minimum 1 number |    Yes   |

### Responses

**200 OK**
*Response schema: application/json*

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |


### Path parameters

| Name   | Description                                             |  Type  | Required |
| ------ | ------------------------------------------------------- | :----: | :------: |
| bod-id | The identifier of the bot that wishes to send messages. | String |    Yes   |

### Request samples

**POST**

```text
/whatsapp/v1/{bot-id}/provision/optin
```

**Payload**

```json
{
  "numbers":[
    "46732001122",
    "46732002244",
    "46732003366"
  ]
}
```

### Response samples

**200 OK**

```text
<empty request body>
```

**400 Bad request**

```json
{
  "message":"Validation error",
  "reason":"Field [numbers] can not be empty."
}
```

**401 Unauthorized bot**

```json
{
  "message":"401",
  "reason":"Unauthorized bot"
}
```

## Opt-Out

Opt-out numbers to prevent them from receiving messages from the business.

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*

- application/json
- The numbers that you wish to opt out, which prevents the current bot to send messages to them.

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <colgroup>
        <col style="width: 38%">
        <col style="width: 62%">
      </colgroup>
      <thead>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>numbers <br>
            <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of string, minimum 1 number</span> <br>
            Array of phone numbers (msisdns).</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

| Name    | Decription                        | JSON type       | Default | Constraints      | Required |
| ------- | --------------------------------- | --------------- | :-----: | ---------------- | :------: |
| numbers | Array of phone numbers (msisdns). | Array of string |    -    | Minimum 1 number |    Yes   |

### Responses

**200 OK**
*Response schema: application/json*

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**Path parameters**

| Name   | Description                                             |  Type  | Required |
| ------ | ------------------------------------------------------- | :----: | :------: |
| bod-id | The identifier of the bot that wishes to send messages. | String |    Yes   |

### Request samples

**POST**

```text
/whatsapp/v1/{bot-id}/provision/optout
```

#### Payload

```json
{
  "numbers":[
    "46732001122",
    "46732002244",
    "46732003366"
  ]
}
```

### Response samples

**200 OK**

```text
<empty request body>
```

**400 Bad request**

```json
{
  "message":"Validation error",
  "reason":"Field [numbers] can not be empty."
}
```

**401 Unauthorized bot**

```json
{
  "message":"401",
  "reason":"Unauthorized bot"
}
```
