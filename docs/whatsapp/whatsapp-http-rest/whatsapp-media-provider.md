---
title: Media provider
excerpt: >-
  Get to know how to use your own file storage service for sending media links.
---

A providers list allows you to have different media providers for the same provider type 
while being able to pick a provider to use on a per request basis.

### Updating the Providers List
> **Note**
>
> Be sure to give each provider a unique name as reusing a name will overwrite the previous entry.

#### Request
`POST whatsapp/v1/{bot-id}/provision/provider`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| name    | Name of Your provider            | String       | N/A        | N/A                   | Yes      |
| type    | The type Your provider           | String       | N/A        | `www`                 | Yes      |
| config  | The config object                | Object       | N/A        | N/A                   | Yes      |

#### Response

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

### Config object types

#### Basic authorization
*config* JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| username| Username for Basic authorization | String       | N/A        | N/A                   | Yes      |
| password| Password for Basic authorization | String       | N/A        | N/A                   | Yes      |

```json
{
    "name": "your-basic-provider",
    "type": "www",
    "config": {
        "basic": {
            "username": "user",
            "password": "AbCdEf123456"
        }
    }
 }
```
#### Bearer authorization
*config* JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| bearer  | Bearer authorization token       | String       | N/A        | N/A                   | Yes      |

```json
{
    "name": "your-bearer-provider",
    "type": "www",
    "config": {
        "bearer": "AbCdEf123456"
    }
 }
```

### Retrieving the Providers List
`GET whatsapp/v1/{bot-id}/provision/provider`

#### Responses
`200 OK`

The response body is a JSON object with the following parameters: 


| Name    | Description                      | JSON Type    |
| ------- | -------------------------------- | ------------ |
| name    | Name of Your provider            | String       |
| type    | The type Your provider           | String       |
| config  | The config object                | Object       |

**Basic Authorization Media Provider**

| Name    | Description                      | JSON Type    | 
| ------- | -------------------------------- | ------------ | 
| username| Username for Basic authorization | String       |
| password| Password for Basic authorization | String       | 

**Bearer Authorization Media Provider**

| Name    | Description                      | JSON Type    | 
| ------- | -------------------------------- | ------------ | 
| bearer  | Bearer authorization token       | String       |


**Sample**
```json
{
    "settings": {
        "application": {
            "media": {
                "providers": [
                    {
                        "name": "basic_media_provider_name",
                        "type": "www",
                        "config": {
                            "basic": {
                                "username": "user",
                                "password": "AbCdEf123456&44jf"
                            }
                        }
                    },
                    {
                        "name": "bearer_media_provider_name",
                        "type": "www",
                        "config": {
                            "bearer":  "AbCdEf123456&44jf"
                        }
                    }
                ]
            }
        }
    }
}

```

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).
 

### Deleting the Providers List

`DELETE whatsapp/v1/{bot-id}/provision/provider`

#### Responses

`200 OK`

Empty response body

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).
