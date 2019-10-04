---
title: "Callback Store"
excerpt: "Get to know how to poll the API for callbacks."
---

Sinch offers the ability to store your callbacks instead of sending them to a specified callback URL.

## Get message status updates endpoint

`GET whatsapp/v1/{bot-id}/callbacks/status/{message-id}`

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

|Name          | Description                    | JSON Type     |
|--------------|--------------------------------|---------------|
|results       | List of [Sinch WhatsApp API callbacks](doc:whatsapp-callback) | Object array  |

**Sample**

```json
{
  "results": [
    {
      "type": "whatsapp",
      "statuses":[
        {
          "status":"success",
          "state":"delivered",
          "message_id":"asdbas-7sdf78sd-16237smh",
          "recipient": "+46732001122",
        }
      ]
    }
  ]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Get inbound messages endpoint

`GET whatsapp/v1/{bot-id}/callbacks/notifications`

JSON object parameters:

| Name       | Description                      | JSON Type    | Default    | Constraints             | Required |
| ---------- | -------------------------------- | ------------ | ---------- | ----------------------- | :------: |
| start_time | Start time for inbound messages  | String       | 2019-09-01 | Valid ISO-8601 datetime | No       |
| end_time   | End time for inbound messages    | String       | `NOW`      | Valid ISO-8601 datetime | No       |
| from       | Msisdn of the sender             | String       | N/A        | Valid MSISDN            | No       |
| page       | Page number                      | Number       | 1          | Positive integer        | No       |
| page_size  | List of MSISDNs                  | Number       | 20         | Positive integer        | No       |

**Sample**
```json
{
    "page": 1,
    "page_size": 20,
    "from": "46732001122",
    "start_time": "2018-10-02T12:57:37.205Z",
    "end_time": "2019-10-02T12:57:37.205Z"
}
```

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

|Name          | Description                    | JSON Type     |
|--------------|--------------------------------|---------------|
|results       | List of [Sinch WhatsApp API callbacks](doc:whatsapp-callback) | Object array  |

**Sample**

```json
{
  "results": [
    {
      "type":"whatsapp",
      "notifications":[
        {
          "from":"46732001122",
          "to":"sinchbot",
          "message_id":"asd89-sdfsdfsdjsd-7as8da9",
          "message":{
            "type":"text",
            "body":"Hello bot I want to know something!"
          }
        }
      ]
    }
  ]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/whatsapp/whatsapp-http-rest/whatsapp-callback-store.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>