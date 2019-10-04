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

**Retrieve the first 30 inbound messages from the last 24 hours.**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds"
```




**Retrieve the third page of inbound messages with a page size of 50 from the last 24 hours**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds?page=2&page_size=50"
```




**Retrieve inbound messages received on June 23rd, 2014 UTC**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds?start_date=20140623TZ&end_date=20140624TZ"
```




**Retrieve the batches sent to 12345 or 54321**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds?to=12345,54321"
```


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

| Name       | Description                                             | JSON Type                                                                         |
| ---------- | ------------------------------------------------------- | ------------------------------------------------------------------------          |
| page       | The requested page                                      | Integer                                                                           |
| page\_size | The number of inbounds returned in this request         | Integer                                                                           |
| count      | The total number of inbounds matching the given filters | Integer                                                                           |
| inbounds   | The page of inbounds matching the given filters         | Array of objects described in [Inbounds endpoint](doc:sms-rest-inbounds-endpoint) |

### Retrieve inbound message

Retrieve an inbound message

This operation retrieves a specific inbound message with the provided inbound ID.

#### Request

**GET /xms/v1/{service\_plan\_id}/inbounds/{inbound\_id}**

#### Response

**200 OK**

The response is a JSON object described in `inbounds_endpoint` response.

**404 Not Found**

**If the inbound ID is unknown to the system**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://api.clxcommunications.com/xms/v1/{service_plan_id}/inbounds/{inbound_id}"
```

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-inbounds-endpoint.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>