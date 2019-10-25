---
title: Groups Endpoint
excerpt: >-
  The most feaure rich API Sinch offers. It allows for single messages,
  scheduled batch send-outs using message templates and more.
next:
  pages:
    - sms-rest-batches-endpoint
    - sms-rest-inbounds-endpoint
    - sms-rest-automatic-default-originator
    - sms-rest-limiting-message-parts
    - sms-rest-url-link-previews
---
## Groups endpoint

A group is a set of MSISDNs that can be used as a target in the `send_batch_msg` operation. An MSISDN can only occur once in a group and any attempts to add a duplicate would be ignored but not rejected.

### Create a group

#### Request

`POST /xms/v1/{service_plan_id}/groups`

JSON object parameters:

| Name                                                                         | Description                                                                                                                                                                                                                                                          | JSON Type            | Default     | Constraints                                                             | Required   |
|-- -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------: | :---------: | ----------------------------------------------------------------------- | :------: --|
| name                                                                         | Name of the group.                                                                                                                                                                                                                                                   | String               | N/A         | Max 20 characters                                                       | No         |
| members                                                                      | Initial list of MSISDNs for the group.                                                                                                                                                                                                                               | String array         | N/A         | Elements must be MSISDNs. Max 10,000 elements                           | No         |
| child_groups auto_update                                                     | MSISDNs of child group will be included in this group. If present then this group will be auto populated.                                                                                                                                                            | String array Object  | N/A N/A     | Elements must be group IDs. Max 10 elements                             | No No      |
| auto_update.to auto_update.add auto_update.add.first_word                    | Short code or long number addressed in MO. Keyword to be sent in MO to add MSISDN to a group Opt-in keyword like "JOIN" If auto_update.to is dedicated long/short number or unique brand keyword like "Sinch" if it is a shared short code.                          | String Object String | N/A N/A N/A | Must be valid MSISDN or short code Must be one word. Max 15 characters  | No No No   |
| auto_update.add.second_word auto_update.remove auto_update.remove.first_word | Opt-in keyword like "JOIN" if auto_update.to is shared short code. Keyword to be sent in MO to remove from a group. Opt-out keyword like "LEAVE" If auto_update.to is dedicated long/short number or unique brand keyword like "Sinch" if it is a shared short code. | String Object String | N/A N/A N/A | Must be one word. Max 15 characters Must be one word. Max 15 characters | No No No   |
| auto_update.remove.second_word                                               | Opt-out keyword like "LEAVE" if auto_update.to is shared short code.                                                                                                                                                                                                 | String               | N/A         | Must be one word. Max 15 characters                                     | No         |

#### Response

`201 Created`

The response body is a JSON object with the following
parameters:

| Name         | Description                                     | JSON Type       |
| ------------ | ----------------------------------------------- | --------------- |
| id           | The ID used to reference this group             | String          |
| name         | Name of group if set                            | String          |
| size         | The number of members currently in the group    | Integer         |
| created\_at  | Timestamp for when the group was created.       | ISO-8601 String |
| modified\_at | Timestamp for when the group was last modified. | ISO-8601 String |

`400 Bad Request`

There was an error with your request. The body is a JSON object described in `rest_http_errors`. Possible error codes include **syntax\_invalid\_json**, **syntax\_invalid\_parameter\_format** and **syntax\_constraint\_violation**.

`403 Forbidden`

The system was not able to fulfill your request. The body is a JSON object described in `rest_http_errors`. Possible error codes include **conflict\_group\_name**.

Create a group named *My group* with two members.

**Create Group**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "members": [
              "123456789",
              "987654321"
          ],
          "name": "My group"
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups"
```


Create auto update group for members sending MOs to \`443456789012\`: keyword *JOIN* will add them to the group, keyword *STOP* will remove them from the group.

**Create Auto Update Group**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "name": "My auto group",
          "auto_update": {
                "to": "443456789012",
                    "add": {
                        "first_word": "join"
                    },
                    "remove": {
                        "first_word": "stop"
                    }
                }
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups"
```


Create auto update group for shared short code *54321* with keyword `SINCH`: if followed by *JOIN* will add them to the group, if followed by *LEAVE* will remove them from the group. Please note that keywords are not case sensitive so *Sinch* , *SInCh* , *SINCH* and other permutations will all be treated the same.

**Create Auto Update Group For Shared Short Code**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "name": "My auto group 2",
          "auto_update": {
                "to": "54321",
                    "add": {
                        "first_word": "Sinch",
                        "second_word": "Join"
                    },
                    "remove": {
                        "first_word": "SINCH",
                        "second_word": "leave"
                    }
                }
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups"
```


Create a parent group that includes all members of groups with ID *dxCJTlfb1UsF* and *yiinTKVNAEAu*.

**Create Parent Group**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "name": "My groups collection",
          "child_groups": [
                "dxCJTlfb1UsF",
                "yiinTKVNAEAu"
          ]
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups"
```


### List groups

With the list operation you can list all groups that you have created.  This operation supports pagination.

Groups are returned in reverse chronological order.

#### Request

`GET /xms/v1/{service_plan_id}/groups`

Query parameters:

| Name       | Description                     | Type    | Default | Constraints | Required |
| ---------- | ------------------------------- | ------- | ------- | ----------- | -------- |
| page       | The page number starting from 0 | Integer | 0       | 0 or larger | No       |
| page\_size | Determines the size of a page   | Integer | 30      | Max 100     | No       |

#### Response

`200 OK`

| Name       | Description                                   | JSON Type                                                                 |
| ---------- | --------------------------------------------- | ------------------------------------------------------------------        |
| page       | The requested page                            | Integer                                                                   |
| page\_size | The number of groups returned in this request | Integer                                                                   |
| count      | The total number of groups                    | Integer                                                                   |
| groups     | The page of groups matching                   | Array of objects described in [Create a group](#section-create-a-group) |

**Retrieve the first 30 groups**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups"
```




**Retrieve the third page of groups with a page size of 50**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups?page=3&page_size=50"
```


### Retrieve a group

This operation retrieves a specific group with the provided group ID.

#### Request

`GET /xms/v1/{service_plan_id}/groups/{group_id}`

#### Response

`200 OK`

The response is a JSON object described in `create_group` response.

`404 Not Found`

If the group ID is unknown to the system.

**Retrieve a group**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}"
```


### Retrieve the members of a group

This operation retrieves the members of the group with the provided group ID.

#### Request

`GET /xms/v1/{service_plan_id}/groups/{group_id}/members`

#### Response

`200 OK`

The response is a JSON array with MSISDNs.

`404 Not Found`

If the group ID is unknown to the system.

**Retrieve group members**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}/members"
```


### Update a group

With the update group operation you can add and remove members to an existing group as well as rename the group.

The request will **not** be rejected for duplicate adds or unknown removes.

The adds will be done before the deletes so if an MSISDN is in both lists then it will not be part of the resulting group.

To remove an existing name set name explicitly to the JSON value **null**. Omitting **name** from the JSON body will leave the name unchanged.

Updating a group targeted by a batch message scheduled in the future is allowed and changes will be reflected until the batch is sent.

#### Request

`POST /xms/v1/{service_plan_id}/groups/{group_id}`

The request is a JSON object with the following fields:

| Name                | Description                                            | JSON Type    | Default | Constraints                                    | Required |
| ------------------- | ------------------------------------------------------ | ------------ | ------- | ---------------------------------------------- | -------- |
| add                 | MSISDNs to add as members.                             | String Array | N/A     | Elements must be MSISDNs. Max 10 000 elements. | No       |
| remove              | MSISDNs to remove from group.                          | String Array | N/A     | Elements must be MSISDNs. Max 10 000 elements. | No       |
| name                | Name of group.                                         | String       | N/A     | Max 20 characters.                             | No       |
| add\_from\_group    | Copy the members from the given group into this group. | String       | N/A     | Must be valid group ID                         | No       |
| remove\_from\_group | Remove members in the given group from group.          | String       | N/A     | Must be valid group ID                         | No       |

#### Response

`200 OK`

The response is a JSON object described in `create_group` response.

`400 Bad Request`

There was an error with your request. The body is a JSON object described in `rest_http_errors`. Possible error codes include **syntax\_invalid\_json**, **syntax\_invalid\_parameter\_format** and **syntax\_constraint\_violation**.

`403 Forbidden`

One or more groups referenced in your request could not be found.

`404 Not Found`

If the group ID is unknown to the system.

**Update a group by adding two new members and removing one existing**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "add": [
              "123456789",
              "987654321"
          ],
          "remove": [
              "432156789"
          ]
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}"
```




**Rename a group without changing its members**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "name": "New group name"
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}"
```




**Remove the current name of a group without changing its members**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "name": null
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}"
```


### Replace a group

The replace operation will replace all parameters, including members, of an existing group with new values.

Replacing a group targeted by a batch message scheduled in the future is allowed and changes will be reflected when the batch is sent.

#### Request

`PUT /xms/v1/{service_plan_id}/groups/{group_id}`

JSON object
parameters:

| Name    | Description                      | JSON Type    | Default | Constraints                                    | Required |
| ------- | -------------------------------- | ------------ | ------- | ---------------------------------------------- | -------- |
| name    | Name of group.                   | String       | N/A     | Max 20 characters.                             | No       |
| members | The initial members of the group | String array | N/A     | Elements must be MSISDNs. Max 10 000 elements. | Yes      |

#### Response

`200 OK`

The response is a JSON object described in `create_group` response.

`400 Bad Request`

There was an error with your request. The body is a JSON object described in `rest_http_errors`. Possible error codes include **syntax\_invalid\_json**, **syntax\_invalid\_parameter\_format** and **syntax\_constraint\_violation**.

`403 Forbidden`

The system was not able to fulfill your request. The body is a JSON object described in `rest_http_errors`. Possible error codes include **conflict\_group\_name**.

`404 Not Found`

If the group ID is unknown to the system.

**Replace a group**
```shell
curl -X PUT \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "members": [
              "123456789",
              "987654321"
          ],
      "name": "New name"
}' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}"
```


### Delete a group

Deletes a group from the system. Any message created for a deleted group will be rejected. If a group is deleted that's part of the to-array of a message scheduled for the future then the group will be considered empty at the time of sending.

#### Request

`DELETE /xms/v1/{service_plan_id}/groups/{group_id}`

#### Response

`200 OK`

The group was successfully deleted.

`404 Not Found`

If the group ID is unknown to the system.

**Delete a group**
```shell
curl -X DELETE \
     -H "Authorization: Bearer {token}" \
     "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/groups/{group_id}"
```


