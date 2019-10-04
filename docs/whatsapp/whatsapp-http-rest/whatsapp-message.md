---
title: "Send WhatsApp Messages"
excerpt: "Send messages via WhatsApp with Sinch WhatsApp API."
---
The message endpoint is used as the primary endpoint of the API and this is where all the messages are sent through.

**WhatsApp message flow**

![image](images/whatsapp-msg-flow.png)

1.  Customer opt-in is essential before sending any messages.
2.  Businesses can only start a conversation with a defined message template.
3.  Once you get a reply from your customer, a *customer care session* starts. You can then send “session” rich content messages for 24 hours.
4.  Every time a customer replies to one of your messages, a new 24-hour cycle starts.
5.  If a “session” expires, you’ll need to re-initiate a conversation, starting with a defined message template again.
6.  Customers can start a rich content conversation with a business at any time  
    -   this opens up a new 24-hour session.


## Send a WhatsApp message

#### Request
`POST whatsapp/v1/{bot-id}/messages`

JSON object parameters:

| Name    | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| to      | List of MSISDNs and group IDs                                        | String array | N/A        | 1 to 20 elements      | Yes      |
| message | Message object                                                       | Object       | N/A        | Valid Message object  | Yes      |
| callback| Callback URL to overwrite configured callback URL for status updates | String       | N/A        | Valid URL             | No       |

#### Response

`201 Created`

The response body is a JSON object with the same format as a [delivery report callback](doc:whatsapp-callback#section-delivery-report-callback).

```json
{
  "type": "whatsapp",
  "statuses":[
    {
      "message_id":"f1690238-9c72-49c3-b1c6-b701f8765732",
      "recipient":"+46732001122",
      "status":"success",
      "state":"queued"
    },
  ]
}
```

`400 Bad Request`

There was an error with your request. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described in the [introduction](doc:whatsapp-introduction#section-http-errors).

### Message object types

The types of messages that can be sent are one of the following:


#### Template message

JSON object parameters:

| Name          | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ------------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type          | Constant value `template`                                            | String       | N/A        | N/A                   | Yes      |
| template_name | Name of the template                                                 | String       | N/A        | N/A                   | Yes      |
| language      | Language to send the template in                                     | String       | `en`       | Language codes and locales (e.g `en`, `en_us`) | No       |
| params        | Parameters to inject into the template.                              | String       | N/A        |                       | Yes      |
| ttl           | Time to live of the template message. If the receiver has not opened the
template message before the time to live expires, the message will be deleted
and a failed callback will be sent. The time to live can be specified
in ISO-8601 Duration format or in seconds as a string. | String       | 30 Days    | Valid URL             | No      |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "template",
    "template_name": "sinch_test_greeting",
    "language": "en",
    "params": [
      "Nick"
    ],
    "ttl": "P1D"
  }
}
```

#### Text message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `text`                                                | String       | N/A        | N/A                   | Yes      |
| preview_url | Message object                                                       | Boolean      | false      | `true` or `false`     | No       |
| text        | The text message content                                             | String       | N/A        | Valid URL             | Yes      |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "text",
    "preview_url": false,
    "text": "Greetings from Sinch"
  }
}
```

#### Image message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `image`                                               | String       | N/A        | N/A                   | Yes      |
| url         | Public url of the image file                                         | String       | N/A        | `jpg` or `png`        | Yes      |
| caption     | Optional caption that will be displayed underneath the image.        | String       | None       | N/A                   | No       |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "image",
    "url": "https://example.com/image.jpg",
    "caption": "Example Image"
  }
}
```

#### Video message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `video`                                               | String       | N/A        | N/A                   | Yes      |
| url         | Public url of the video file (mp4)                                   | String       | N/A        | `mp4`                 | Yes      |
| caption     | Optional caption that will be displayed underneath the video.        | String       | None       | N/A                   | No       |

```json
{
  "to":[
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message":{
    "type": "video",
    "url": "https://example.com/video.mp4",
    "caption": "Example Video"
  }
}
```

#### Document message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `video`                                               | String       | N/A        | N/A                   | Yes      |
| url         | Public url of the document file                                      | String       | N/A        | `pdf`, `doc` or `docx`| Yes      |
| caption     | Optional caption that will be displayed as the document title.       | String       | None       | N/A                   | No       |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "document",
    "url": "https://example.com",
    "caption": "Example study",
    "filename": "document.pdf"
  }
}
```

#### Audio message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `video`                                               | String       | N/A        | N/A                   | Yes      |
| url         | Public url of the document file                                      | String       | N/A        | `mp3`                 | Yes      |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "audio",
    "url": "https://example.com/song.mp3"
  }
}
```


#### Location message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `location`                                            | String       | N/A        | N/A                   | Yes      |
| lat         | The latitude position as a float number.                             | Number       | N/A        | [-90, 90]             | Yes      |
| lng         | The longitude position as a float number.                            | Number       | N/A        | [-180, 180]           | Yes      |
| name        | The name for the location. Will be displayed in the message.         | String       | N/A        | N/A                   | No       |
| address     | The address for the location. Will be displayed in the message.      | String       | N/A        | N/A                   | No       |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "location",
    "lat": 55.7047,
    "lng": 13.191,
    "name": "Sinch Ideon Lund",
    "address": "Scheelevägen 17"
  }
}
```
#### Contacts message

JSON object parameters:

| Name        | Description                                                          | JSON Type    | Default    | Constraints           | Required |
| ----------- | -------------------------------------------------------------------- | ------------ | ---------- | --------------------- | :------: |
| type        | Constant value `contacts`                                            | String       | N/A        | N/A                   | Yes      |
| contacts    | List of contact cards                                                | Object array | N/A        | Valid contact cards   | Yes      |

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "contacts",
    "contacts": [
      {
        "addresses": [
          {
            "city": "Menlo Park",
            "country": "United States",
            "country_code": "us",
            "state": "CA",
            "street": "1 Hacker Way",
            "type": "HOME",
            "zip": "94025"
          }
        ],
        "birthday": "2012-08-18",
        "emails": [
          {
            "email": "test@fb.com",
            "type": "WORK"
          }
        ],
        "name": {
          "first_name": "John",
          "formatted_name": "John Smith",
          "last_name": "Smith"
        },
        "org": {
          "company": "WhatsApp",
          "department": "Design",
          "title": "Manager"
        },
        "phones": [
          {
            "phone": "+1 (650) 555-1234",
            "type": "WORK",
            "wa_id": "16505551234"
          }
        ],
        "urls": [
          {
            "url": "https://www.facebook.com",
            "type": "WORK"
          }
        ]
      }
    ]
  }
}
```


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/whatsapp/whatsapp-http-rest/whatsapp-message.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>