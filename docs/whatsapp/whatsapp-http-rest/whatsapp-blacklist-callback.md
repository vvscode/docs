---
title: Blacklisting numbers from callbacks
excerpt: Get to know how to blacklist numbers from generating callbacks.
next:
  pages:
    - whatsapp-callback-store
---
## Add to blacklist endpoint

Blacklist numbers, preventing them from generating inbound message callbacks.


> **Note**
>
> It can take up to five minutes for all caches to get up to date after blacklisting a number.


#### Request

`POST whatsapp/v1/{bot-id}/provision/blacklist`

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

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors)

`503 Service Unavailable`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors)

## Remove from blacklist endpoint

Remove numbers from blacklist.

> **Note**
>
> It can take up to five minutes for all caches to get up to date after removing a number from the blacklist.


#### Request

`DELETE whatsapp/v1/{bot-id}/provision/blacklist`

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

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors)

`503 Service Unavailable`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors)
