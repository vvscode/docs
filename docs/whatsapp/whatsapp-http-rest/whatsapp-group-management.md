---
title: "Group Management"
excerpt: "Manage your WhatsApp groups and their admins. Learn how to add or remove members of the different groups."
---
A collection of endpoints used to manage groups that are linked to a specific bot.
  - [Creating a new group](doc:whatsapp-group-management#section-create-group-endpoint)
  - [Listing all groups associated with your bot](doc:whatsapp-group-management#section-list-groups-endpoint)
  - [List all information for a specific group](doc:whatsapp-group-management#section-list-group-information-endpoint)
  - [Updating a groups subject](doc:whatsapp-group-management#section-update-group-subject-endpoint)
  - [Updating a groups icon](doc:whatsapp-group-management#section-update-group-icon-endpoint)
  - [Leaving a group created by your bot](doc:whatsapp-group-management#section-leave-group-endpoint)
  - [Remove group members from a specific group](doc:whatsapp-group-management#section-remove-members-endpoint)
  - [Add admins to a specific group](doc:whatsapp-group-management#section-add-admins-endpoint)
  - [Remove admins from a specific group](doc:whatsapp-group-management#section-remove-admins-endpoint)
  - [Get an invite link to a specific group](doc:whatsapp-group-management#section-get-invite-link-endpoint)
  - [Remove an active invite link from a specific group](doc:whatsapp-group-management#section-remove-invite-link-endpoint)

## Create group endpoint

`POST whatsapp/v1/{bot-id}/groups`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | :------------------------------: | :----------: | :--------: | :-------------------: | :------: |
| subject | Group subject                    | String       | N/A        | None                  | Yes      |

### Create group sample

```json
{
  "subject": "Sinch WhatsApp Team Group"
}
```

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

|Name          | Description                    | JSON Type     |
|--------------|--------------------------------|---------------|
|group_id      | Group id of just created group | String        |

**Sample**

```json
{
  "group_id": "group:447506616260-1565342732"
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## List groups endpoint

`GET whatsapp/v1/{bot-id}/groups`

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

|Name          | Description                       | JSON Type     |
|--------------|-----------------------------------|---------------|
|groups        | Array of string group identifiers | String array  |

**Sample**

```json
{
  "groups": [
    "group:447506616260-1565342732"
  ]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## List group information endpoint

`GET whatsapp/v1/{bot-id}/groups/{group-id}`

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

| Name          | Description                               | JSON Type    |
| ------------- | ----------------------------------------- | ------------ |
| admins        | Array of msisdns of all admins            | String array |
| creation_time | ISO-8601 creation datetime of the group   | String       |
| creator       | Msisdn of the creator of the group        | String       |
| members       | Array of msisdns for members in the group | String array |
| subject       | Subject of the group                      | String       |

**Sample**

```json
{
    "admins": [
        "1805550000"
    ],
    "creator": "1805550000",
    "members": [
        "1805550000",
        "46732001122"
    ],
    "subject": "Sinch Team WhatsApp Group",
    "creation_time": "2019-09-23T07:56:22.000Z"
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Update group subject endpoint

`PATCH whatsapp/v1/{bot-id}/groups/{group-id}`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| subject | Group subject                    | String       | N/A        | None                  | Yes      |

### Update group subject sample

```json
{
  "subject": "Updated Sinch WhatsApp Team Group"
}
```

#### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Update group icon endpoint

`POST whatsapp/v1/{bot-id}/groups/{group-id}/icon`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| url     | Public url of group icon         | String       | N/A        | Valid URL, jpeg/png   | Yes      |


### Update group icon sample

```json
{
  "url": "https://www.example.com/new_icon.jpg"
}
```

#### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Leave group endpoint

`DELETE whatsapp/v1/{bot-id}/groups/{group-id}`

#### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Remove members endpoint

`POST whatsapp/v1/{bot-id}/groups/{group-id}/member`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| numbers | List of MSISDNs                  | String array | N/A        | 1 to 20 elements      | Yes      |

### Remove members sample

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

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Add admins endpoint

`POST whatsapp/v1/{bot-id}/groups/{group-id}/admin`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| numbers | List of MSISDNs                  | String array | N/A        | 1 to 20 elements      | Yes      |

### Add admins sample

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

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Remove admins endpoint

`DELETE whatsapp/v1/{bot-id}/groups/{group-id}/admin`

JSON object parameters:

| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| numbers | List of MSISDNs                  | String array | N/A        | 1 to 20 elements      | Yes      |

### Remove admins sample

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

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Get invite link endpoint

`GET whatsapp/v1/{bot-id}/groups/{group-id}/invite`

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

| Name          | Description                               | JSON Type    |
| ------------- | ----------------------------------------- | ------------ |
| invite_link   | Public url of link. Any WhatsApp user who clicks this link will join the group that this link relates to | String array |

**Sample**

```json
{
    "invite_link": "https://chat.whatsapp.com/<invite-link>"
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

## Remove invite link endpoint

`DELETE whatsapp/v1/{bot-id}/groups/{group-id}/invite`

#### Responses

`200 OK`

Empty response body

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/whatsapp/whatsapp-http-rest/whatsapp-group-management.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>