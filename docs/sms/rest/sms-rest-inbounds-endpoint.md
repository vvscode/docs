---
title: "Inbounds Endpoint"
excerpt: ""
---
Inbounds, or Mobile Originated messages, are incoming messages. Inbound messages can be listed and retrieved like batch messages and they can also be delivered by callback requests like delivery reports.

| Name         | Description                                                                           | JSON Type       |
| ------------ | ------------------------------------------------------------------------------------- | --------------- |
| type         | The object type. Either *mo\_text* or *mo\_binary*.                                   | String          |
| id           | The ID of this inbound message.                                                       | String          |
| from         | The originator MSISDN.                                                                | String          |
| to           | The destination MSISDN or short code.                                                 | String          |
| body         | Message body, Base64 encoded if type is *mo\_binary*.                                 | String          |
| operator\_id | The MCCMNC of the sender's operator if known.                                         | String          |
| sent\_at     | When the message left the originating device. Only available if provided by operator. | ISO-8601 String |
| received\_at | When the system received the message.                                                 | ISO-8601 String |

NB: The operator is only available for MOs sent to short codes.

### List inbound messages
[block:code]
{
  "codes": [
    {
      "code": "curl -H \"Authorization: Bearer {token}\" \\\n  \"https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds\"",
      "language": "shell",
      "name": "Retrieve the first 30 inbound messages from the last 24 hours."
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "curl -H \"Authorization: Bearer {token}\" \\\n  \"https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds?page=2&page_size=50\"",
      "language": "shell",
      "name": "Retrieve the third page of inbound messages with a page size of 50 from the last 24 hours"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "curl -H \"Authorization: Bearer {token}\" \\\n  \"https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds?start_date=20140623TZ&end_date=20140624TZ\"",
      "language": "shell",
      "name": "Retrieve inbound messages received on June 23rd, 2014 UTC"
    }
  ]
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "curl -H \"Authorization: Bearer {token}\" \\\n  \"https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds?to=12345,54321\"",
      "language": "shell",
      "name": "Retrieve the batches sent to 12345 or 54321"
    }
  ]
}
[/block]
With the list operation you can list all inbound messages that you have received. This operation supports pagination.

Inbounds are returned in reverse chronological order.

#### Request

**GET /xms/v1/{service\_plan\_id}/inbounds**

Query parameters:

| Name        | Description                                                                               | Type                 | Default | Constraints                   | Required |
| ----------- | ----------------------------------------------------------------------------------------- | -------------------- | ------- | ----------------------------- | -------- |
| page        | The page number starting from 0                                                           | Integer              | 0       | 0 or larger                   | No       |
| page\_size  | Determines the size of a page                                                             | Integer              | 30      | Max 100                       | No       |
| to          | Only list messages set to this destination. Multiple destinations can be comma separated. | MSISDN or short code | No      | No                            | No       |
| start\_date | Only list messages received at or after this date time.                                   | ISO-8601             | Now-24  | Must be valid ISO-8601 string | No       |
| end\_date   | Only list messages received before this date time.                                        | ISO-8601             | No      | Must be valid ISO-8601 string | No       |

#### Response

**200 OK**

| Name       | Description                                             | JSON Type                                                                |
| ---------- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| page       | The requested page                                      | Integer                                                                  |
| page\_size | The number of inbounds returned in this request         | Integer                                                                  |
| count      | The total number of inbounds matching the given filters | Integer                                                                  |
| inbounds   | The page of inbounds matching the given filters         | Array of objects described in \[Inbounds endpoint\](\#inbounds-endpoint) |

### Retrieve inbound message

Retrieve an inbound message

This operation retrieves a specific inbound message with the provided inbound ID.

#### Request

**GET /xms/v1/{service\_plan\_id}/inbounds/{inbound\_id}**

#### Response

**200 OK**

The response is a JSON object described in `inbounds_endpoint` response.

**404 Not Found**
[block:code]
{
  "codes": [
    {
      "code": "curl -H \"Authorization: Bearer {token}\" \\\n  \"https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds/{inbound_id}\"",
      "language": "shell",
      "name": "If the inbound ID is unknown to the system"
    }
  ]
}
[/block]