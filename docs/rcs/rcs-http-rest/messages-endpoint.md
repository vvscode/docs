---
title: "Messages Endpoint"
excerpt: ""
---
The messages endpoint provides operations for sending and revoking messages.

### Send a message

Send an RCS message, optionally falling back to SMS depending on provided conditions. A fallback SMS can be delivered if:

  - The targeted device does not support RCS (controlled by the rcs\_unavailable condition)
  - The targeted device does not support the specific RCS capability needed to deliver the message provided in the message body (controlled by the capability\_unsupported condition)
  - The RCS platform does not receive a delivery confirmation before the provided expiration time. It is possible to configure if the original RCS message should be revoked when a message expires (controlled by the expired condition)
  - The RCS message cannot reliably be delivered because of an error within the RCS platform or the downstream suppliers. (controlled by the agent\_error condition)

Status reports will be continuously delivered to the agent’s webhook endpoint described in `rcs_api_call_back`.

#### HTTP Request

`POST /rcs/v1/{agent_id}/messsages`

#### Path parameters

| Field     | Type   | Description                | Default | Constraints | Required |
| --------- | ------ | -------------------------- | ------- | ----------- | -------- |
| agent\_id | string | ID of the agent to be used | No      | No          | Yes      |

#### Request Body

The request body contains an instance of `AgentMessage`.

#### Response

**200 OK**

The message was successfully accepted by the system. The response body contains an instance of `StatusReport`.

**400 Bad Request**

This error is returned when either the JSON is malformed or one or more parameters in the JSON failed validation. The body contains an `Error` object further describing the error.

**409 Conflict**

Duplicate message id, make sure `message_id` in `AgentMessage` is unique. The body contains an `Error` object further describing the error.

##### Examples

###### Send text message

**Send text message**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
      "message_id": "5f6ec22b-f03a-4961-9c57-6c4e464edae0",
      "to": "46555123456",
      "message": {
          "type": "text",
          "text": "Test message!"
      }
  }'
```


###### Send text message with fallback

**Send text message with fallback**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
      "message_id": "5bb77a04-78b7-41ff-abd3-a1006f8d6979",
      "to": "46555123456",
      "message": {
          "type": "text",
          "text": "Test message!"
      },
      "fallback": {
          "message": {
              "type": "mt_text",
              "from": "MyOriginator",
              "text": "Test message!"
          }
      }
  }'
```


###### Send text message with (non-default) expire

** Send text message with (non-default) expire**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
      "message_id": "66c4eeea-259b-4ba0-9dcd-cd0545cd9344",
      "to": "46555123456",
      "message": {
          "type": "text",
          "text": "This is a time-sensitive message!"
      },
      "expire": {
          "timeout": 3,
          "revoke": true
      }
  }'
```


###### Send file message

**Send file message**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
      "message_id": "41a54db6-6abf-48dd-8a2b-63890981d80d",
      "to": "46555123456",
      "message": {
          "type": "file",
          "thumbnail": {
              "mime_type": "image/png",
              "file_size": 1234,
              "file_uri": "http://example.com/my_image_thumbnail.png"
          },
          "file": {
              "mime_type": "image/png",
              "file_name": "funny.png",
              "file_size": 123456,
              "file_uri": "http://example.com/my_image.png"
          }
      }
  }'
```


###### Send text message and suggestions

**Send text message and suggestions**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
      "message_id": "feed1169-8500-4b66-a65c-5986b8ae59f7",
      "to": "46555123456",
      "message": {
          "type": "text",
          "text": "Test message!"
      },
      "suggestions": [
          {
              "type": "reply",
              "display_text": "Like",
              "postback": {
                  "data": "feed1169-8500-4b66-a65c-5986b8ae59f7_LIKE"
              }
          },
          {
              "type": "reply",
              "display_text": "Stop please",
              "postback": {
                  "data": "feed1169-8500-4b66-a65c-5986b8ae59f7_STOP"
              }
          },
          {
              "type": "action",
              "display_text": "Call us",
              "postback": {
                  "data": "feed1169-8500-4b66-a65c-5986b8ae59f7_CALL"
              },
              "action": {
                  "type": "dial_phone_number",
                  "phone_number": "+46555123456"
              }
          }
      ]
  }'
```


###### Send standalone rich card message with suggestions on card

**Send standalone rich card message with suggestions on card**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
      "message_id": "ea099bc3-541a-4967-bbe3-5598e8209c75",
      "to": "46555123456",
      "message": {
          "type": "standalone_rich_card",
          "orientation": "VERTICAL",
          "thumbnail_alignment": "RIGHT",
          "content": {
              "title": "Hello1",
              "description": "Hello There",
              "media": {
                "height": "TALL",
                "thumbnail": {
                    "mime_type": "image/png",
                    "size": 1234,
                    "file_uri": "http://example.com/my_image_thumbnail.png"
                },
                "file": {
                    "mime_type": "image/png",
                    "name": "funny.png",
                    "file_size": 12345,
                    "file_uri": "http://example.com/my_image.png"
                }
              },
              "suggestions": [
                  {
                      "type": "reply",
                      "display_text": "Like",
                      "postback": {
                          "data": "feed1169-8500-4b66-a65c-5986b8ae59f7_LIKE"
                      }
                  },
                  {
                      "type": "reply",
                      "display_text": "Stop please",
                      "postback": {
                          "data": "feed1169-8500-4b66-a65c-5986b8ae59f7_STOP"
                      }
                  },
                  {
                      "type": "action",
                      "display_text": "Call us",
                      "postback": {
                          "data": "feed1169-8500-4b66-a65c-5986b8ae59f7_CALL"
                      },
                      "action": {
                        "type": "dial_phone_number",
                        "phone_number": "+46555123456"
                      }
                  }
              ]
          }
      }
  }'
```


#### JSON Model

##### AgentMessage

JSON Representation

**AgentMessage**
```json
{
  "message_id": string,
  "to": string,
  "message": {
    "type": enum(
      "text",
      "file",
      "standalone_rich_card",
      "carousel_rich_card"
    ),
    ... // type specific fields
  },
  "suggestions": [
    {
      "type": enum(
        "action",
        "reply"
      )
      ... // type specific fields
    }
  ],
  "expire": object(ExpireInfo),
  "fallback": object(FallbackInfo)
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>message_id</td>\n<td>string</td>\n<td>Provide a globally unique id for this message</td>\n<td>No</td>\n<td>^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>to</td>\n<td>string</td>\n<td>MSISDN of the recipient</td>\n<td>No</td>\n<td>^(?:00)[1-9][0-9]{8,16}$</td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>message</td>\n<td><dl>\n<dt><em>oneOf:</em></dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">TextMessage</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">FileMessage</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">StandaloneRichCardMessage</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">CarouselRichCardMessage</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>The content of the message</td>\n<td>No</td>\n<td>No</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>suggestions</td>\n<td><dl>\n<dt>arrayOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedAction</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedReply</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>A list of suggestions comprised of suggested replies and suggested actions.</td>\n<td>No</td>\n<td>MaxLength: 11</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>expire</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">ExpireInfo</code>)</td>\n<td>Object describing how the message should expire</td>\n<td>No</td>\n<td>No</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>fallback</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">FallbackInfo</code>)</td>\n<td>Object describing fallback message and under which conditions it should be triggered</td>\n<td>No</td>\n<td>No</td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n\n</div>\n\n<style></style>"
}
[/block]
#### TextMessage

JSON Representation


**TextMessage**
```json
{
  "type": "text",
  "text": string
}
```


###### Fields

| Field | Type   | Description              | Default | Constraints     | Required |
| ----- | ------ | ------------------------ | ------- | --------------- | -------- |
| type  | string | Static string 'text'     | N/A     | N/A             | Yes      |
| text  | string | The message body content | No      | MaxLength: 2000 | Yes      |

##### FileMessage

JSON Representation

**FileMessage**
```json
{
  "type": "file",
  "file": object(FileInfo),
  "thumbnail": object(FileInfo)
}
```


###### Fields

| Field     | Type               | Description                                                 | Default | Constraints | Required |
| --------- | ------------------ | ----------------------------------------------------------- | ------- | ----------- | -------- |
| type      | string             | Static string 'file'                                        | N/A     | N/A         | Yes      |
| file      | object(`FileInfo`) | Object describing the file                                  | No      | N/A         | Yes      |
| thumbnail | object(`FileInfo`) | Thumbnail of the media, only required for images and videos | No      | N/A         | No       |

##### FileInfo

JSON Representation

**FileInfo**
```json
{
  "mime_type": string,
  "file_size": integer,
  "file_name": string,
  "file_uri": string
}
```


###### Fields

| Field      | Type    | Description                          | Default | Constraints                                                                                                                                       | Required |
| ---------- | ------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| mime\_type | string  | Mime type of the media               | No      |                                                                                                                                                   | Yes      |
| file\_size | integer | File size in bytes                   | No      |                                                                                                                                                   | Yes      |
| file\_name | string  | Only set for payload (not thumbnail) | No      |                                                                                                                                                   | No       |
| file\_uri  | string  | HTTP(S) URL for the actual resource  | No      | URL - As defined by RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax, amended by RFC 2732: Format for Literal IPv6 Addresses in URLs. | Yes      |

##### StandaloneRichCardMessage

JSON Representation

**StandaloneRichCardMessage**
```json
{
  "type": "standalone_rich_card",
  "orientation": enum(
    "HORIZONTAL",
    "VERTICAL"
  ),
  "thumbnail_alignment": enum(
    "LEFT",
    "RIGHT"
  ),
  "content": object(RichCardContent)
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>type</td>\n<td>string</td>\n<td>Static string 'standalone_rich_card'</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>orientation</td>\n<td>string</td>\n<td>Orientation of the card</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>HORIZONTAL</li>\n<li>VERTICAL</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>thumbnail_alignment</td>\n<td>string</td>\n<td>Image preview alignment for cards with horizontal layout</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>LEFT</li>\n<li>RIGHT</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>content</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">RichCardContent</code>)</td>\n<td>Object describing the content of the rich card.</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### CarouselRichCardMessage

JSON Representation

**CarouselRichCardMessage**
```json
{
  "type": "carousel_rich_card",
  "width": enum(
    "SMALL",
    "MEDIUM"
  ),
  "contents": [
    object(RichCardContent), ...
  ]
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>type</td>\n<td>string</td>\n<td>Static string 'carousel_rich_card'</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>width</td>\n<td>string</td>\n<td>The width of the cards in the carousel</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>SMALL</li>\n<li>MEDIUM</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>contents</td>\n<td>arrayOf(<code class=\"interpreted-text\" data-role=\"ref\">RichCardContent</code>)</td>\n<td>The list of contents for each card in the carousel. There must be at least 2 and at most 10 cards in a carousel</td>\n<td>No</td>\n<td>MinLength: 2 MaxLength: 10</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### RichCardContent

JSON Representation

**RichCardContent**
```json
{
  // At least one of title, description and media must be specified
  "title": string,
  "description": string,
  "media": object(RichCardMedia),
  "suggestions": [
    {
      "type": enum(
        "reply",
        "action"
      )
      ... // type specific fields
    }
  ]
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>title</td>\n<td>string</td>\n<td>Title of the card</td>\n<td>No</td>\n<td>MaxLength: 200</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>description</td>\n<td>string</td>\n<td>Description of the card</td>\n<td>No</td>\n<td>MaxLength: 2000</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>media</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">RichCardMedia</code>)</td>\n<td>Object describing the media to be included in the card</td>\n<td>No</td>\n<td>N/A</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>suggestions</td>\n<td><dl>\n<dt>arrayOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedAction</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedReply</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>List of suggestions to be included within the rich card</td>\n<td>No</td>\n<td>MaxLength: 4</td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### RichCardMedia

JSON Representation

**RichCardMedia**
```json
{
  "file": object(FileInfo),
  "thumbnail": object(FileInfo),
  "height": enum(
    "SHORT",
    "MEDIUM",
    "TALL"
  )
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>file</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">FileInfo</code>)</td>\n<td>Object describing the media to be included in the card</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>thumbnail</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">FileInfo</code>)</td>\n<td>Object describing the thumbnail of the media in the card.</td>\n<td>No</td>\n<td>N/A</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>height</td>\n<td>string</td>\n<td>The height of the media within a vertically oriented rich card</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>SHORT</li>\n<li>MEDIUM</li>\n<li>TALL</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### SuggestedReply

JSON Representation

**SuggestedReply**
```json
{
  "type": "reply",
  "display_text": string,
  "postback": object(Postback)
}
```


###### Fields

| Field         | Type               | Description                                                                    | Default | Constraints                | Required |
| ------------- | ------------------ | ------------------------------------------------------------------------------ | ------- | -------------------------- | -------- |
| type          | string             | Static string 'reply'                                                          | N/A     | N/A                        | Yes      |
| display\_text | string             | The text that will be shown in the suggested reply                             | No      | MinLength: 1 MaxLength: 25 | Yes      |
| postback      | object(`Postback`) | Optional data that will be sent back to the agent when the user taps the reply | No      | N/A                        | No       |

##### SuggestedAction

JSON Representation

**SuggestedAction**
```json
{
  "type": "action",
  "display_text": string,
  "postback": object(Postback),
  "action": {
    "type": enum(
      "dial_phone_number",
      "show_location",
      "request_location_push",
      "open_url",
      "create_calendar_event"
    )
    ... // type specific fields
  }
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>type</td>\n<td>string</td>\n<td>Static string 'action'</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>display_text</td>\n<td>string</td>\n<td>The text that will be shown in the suggested action</td>\n<td>No</td>\n<td>MinLength: 1 MaxLength: 25</td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>postback</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">Postback</code>)</td>\n<td>Optional data that will be sent back to the agent when the user taps the action</td>\n<td>No</td>\n<td>N/A</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>action</td>\n<td><dl>\n<dt>oneOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">DialPhoneNumber</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">ShowLocation</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">RequestLocationPush</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">OpenUrl</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">CreateCalendarEvent</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>Object defining the action</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### DialPhoneNumber

JSON Representation

**DialPhoneNumber**
```json
{
  "type": "dial_phone_number",
  "phone_number": string
}
```


###### Fields

| Field         | Type   | Description                         | Default | Constraints                  | Required |
| ------------- | ------ | ----------------------------------- | ------- | ---------------------------- | -------- |
| type          | string | Static string 'dial\_phone\_number' | N/A     | N/A                          | Yes      |
| phone\_number | string | The phone number to call            | No      | ^(?:00)\[1-9\]\[0-9\]{8,16}$ | Yes      |

##### ShowLocation

JSON Representation

**ShowLocation**
```json
{
  "type": "show_location",
  "latitude": number,
  "longitude": number,
  "label": string
}
```


###### Fields

| Field     | Type   | Description                                                 | Default | Constraints                  | Required |
| --------- | ------ | ----------------------------------------------------------- | ------- | ---------------------------- | -------- |
| type      | string | Static string 'show\_location'                              | N/A     | N/A                          | Yes      |
| latitude  | number | Latitude                                                    | No      | MinValue: -90 MaxValue: 90   | Yes      |
| longitude | number | Longitude                                                   | No      | MinValue: -180 MaxValue: 180 | Yes      |
| label     | string | Optional label to be shown on the map at the given lat/long | No      | MaxLength: 1000              | No       |

##### RequestLocationPush

JSON Representation

**RequestLocationPush**
```json
{
  "type": "request_location_push"
}
```


###### Fields

| Field | Type   | Description                             | Default | Constraints | Required |
| ----- | ------ | --------------------------------------- | ------- | ----------- | -------- |
| type  | string | Static string 'request\_location\_push' | N/A     | N/A         | Yes      |

##### OpenUrl

JSON Representation

**OpenUrl**
```json
{
  "type": "open_url",
  "url": string
}
```


###### Fields

| Field | Type   | Description               | Default | Constraints                                                                                                                                       | Required |
| ----- | ------ | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type  | string | Static string 'open\_url' | N/A     | N/A                                                                                                                                               | Yes      |
| url   | string | The URL to open           | No      | URL - As defined by RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax, amended by RFC 2732: Format for Literal IPv6 Addresses in URLs. | Yes      |

##### CreateCalendarEvent

JSON Representation

**CreateCalendarEvent**
```json
{
  "type": "create_calendar_event",
  "start_time": timestamp,
  "end_time": timestamp,
  "title": string,
  "description": string
}
```


###### Fields

| Field       | Type   | Description                             | Default | Constraints                              | Required |
| ----------- | ------ | --------------------------------------- | ------- | ---------------------------------------- | -------- |
| type        | string | Static string 'create\_calendar\_event' | N/A     | N/A                                      | Yes      |
| start\_time | string | Start time of the event                 | No      | A timestamp in RFC3339 UTC "Zulu" format | Yes      |
| end\_time   | string | End time of the event                   | No      | A timestamp in RFC3339 UTC "Zulu" format | Yes      |
| title       | string | The title of the event                  | No      | MinLength: 1 MaxLength: 1024             | Yes      |
| description | string | Description of the event                | No      | MinLength: 1 MaxLength: 1024             | Yes      |

##### Postback

JSON Representation

**Postback**
```json
{
  "data": string
}
```


###### Fields

| Field | Type   | Description                                                                                    | Default | Constraints                  | Required |
| ----- | ------ | ---------------------------------------------------------------------------------------------- | ------- | ---------------------------- | -------- |
| data  | string | Payload (base64 encoded) that will be sent back to the agent when the user taps the suggestion | No      | MinLength: 1 MaxLength: 1024 | Yes      |

##### ExpireInfo

JSON Representation

**ExpireInfo**
```json
{
  "timeout": integer,
  "revoke": boolean
}
```


###### Fields

| Field   | Type    | Description                                                                                                                                                                                                      | Default      | Constraints | Required |
| ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | -------- |
| timeout | integer | Expire the message after this many seconds. If fallback is configured for expiry, then the fallback message will be sent after this timeout.                                                                     | 172800 (48h) | Minimum: 1  | No       |
| revoke  | boolean | Should the message be revoked when the timeout happens. If not, the message might still be delivered to the handset after the configured timeout. However, no further status updates will be sent by the system. | true         | No          | No       |

##### FallbackInfo

JSON Representation

**FallbackInfo**
```json
{
  "message": object(XmsBatchMessage)
  "conditions": object(FallbackConditions)
}
```


###### Fields

| Field      | Type                         | Description                                        | Default | Constraints | Required |
| ---------- | ---------------------------- | -------------------------------------------------- | ------- | ----------- | -------- |
| message    | object(`XmsBatchMessage`)    | Object describing the SMS fallback message         | No      | No          | Yes      |
| conditions | object(`FallbackConditions`) | Object describing when to use the fallback message | No      | No          | No       |

##### FallbackConditions

JSON Representation

**FallbackConditions**
```json
{
  "rcs_unavailable": {
    "enabled": boolean
  },
  "capability_unsupported": {
    "enabled": boolean
  },
  "expired": {
    "enabled": boolean
  },
  "agent_error": {
    "enabled": boolean
  }
}
```


###### Fields

| Field                           | Type    | Description                                                                                                           | Default | Constraints | Required |
| ------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- | ------- | ----------- | -------- |
| rcs\_unavailable                | Object  |                                                                                                                       | No      | No          | No       |
| rcs\_unavailable.enabled        | boolean | Trigger fallback if recipient does not have RCS support                                                               | true    | No          | Yes      |
| capability\_unsupported         | Object  |                                                                                                                       | No      | No          | No       |
| capability\_unsupported.enabled | boolean | Trigger fallback if capability needed for sent message is not supported by the recipient                              | true    | No          | Yes      |
| expired                         | Object  |                                                                                                                       | No      | No          | No       |
| expired.enabled                 | boolean | Trigger fallback if the RCS message is not delivered in a timely manner - see expire in object(`AgentMessage`) object | true    | No          | Yes      |
| agent\_error                    | Object  |                                                                                                                       | No      | No          | No       |
| agent\_error.enabled            | boolean | Trigger fallback for any errors encountered, e.g., error from south bound service provider                            | false   | No          | Yes      |

##### XmsBatchMessage

JSON Representation

**XmsBatchMessage**
```json
{
  "type": enum(
    "mt_text",
    "mt_binary"
  )
  "from": string,
  "text": string,
  "udh": string
  "campaign_id": string,
  "delivery_report": enum(
    "none",
    "summary",
    "full",
    "per_recipient"
  ),
  "expire_at": timestamp,
  "callback_url": string
}
```


###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>from</td>\n<td>string</td>\n<td>Sender number</td>\n<td>No</td>\n<td>MinLength: 1 MaxLength: 128</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>type</td>\n<td>string</td>\n<td>Identifies the type of the message</td>\n<td>No</td>\n<td><dl>\n<dt>Valid types are:</dt>\n<dd><ul>\n<li>mt_text</li>\n<li>mt_binary</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>text</td>\n<td>string</td>\n<td>The message content. Normal text string for mt_text and Base64 encoded for mt_binary</td>\n<td>No</td>\n<td>MaxLength: 2000</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>udh</td>\n<td>string</td>\n<td>The UDH header of a binary message</td>\n<td>No</td>\n<td>^[0-9a-fA-F]\\*$</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>campaign_id</td>\n<td>string</td>\n<td>The campaign/service ID this message belongs to. (Only applicable for the USA.)</td>\n<td>No</td>\n<td>MaxLength: 2000</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>delivery_report</td>\n<td>string</td>\n<td>Request delivery report callback. Note that delivery reports can be fetched from the SMS HTTP REST API regardless of this setting</td>\n<td>none</td>\n<td><dl>\n<dt>Valid types are:</dt>\n<dd><ul>\n<li>none</li>\n<li>summary</li>\n<li>full</li>\n<li>per_recipient</li>\n</ul>\n</dd>\n</dl></td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>expire_at</td>\n<td>string</td>\n<td>If set the system will stop trying to deliver the message at this point</td>\n<td>3 days</td>\n<td>A timestamp in RFC3339 UTC \"Zulu\" format</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>callback_url</td>\n<td>string</td>\n<td>Override the default callback URL for this message</td>\n<td>No</td>\n<td>+ MaxLength: 2048 + URL - As defined by RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax, amended by RFC 2732: Format for Literal IPv6 Addresses in URLs.</td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
### Revoking a sent message

Revoke a previously sent message, not yet delivered to the user agent. If a message is delivered to the user agent shortly after a revoke request is initiated there is a possibility of receiving a delivered status report after sending the revoke request.

#### HTTP Request

`DELETE /rcs/v1/{agent_id}/messsages/{message_id}`

#### Path parameters

| Field       | Type   | Description                                   | Default | Constraints | Required |
| ----------- | ------ | --------------------------------------------- | ------- | ----------- | -------- |
| agent\_id   | string | ID of the agent to be used                    | No      | No          | Yes      |
| message\_id | string | ID of a previously sent message to be revoked | No      | No          | Yes      |

#### Request Body

The request body is empty.

#### Response

**200 OK**

The message was successfully revoked.

The response body is empty.

**404 Not found**

Unable to revoke, the `message_id` provided is not known by the system

The reason for this can be:

>   - The message has already been delivered
>   - The `message_id` provided is not known by the system

The response body will contain an `Error` object further describing the error.

**409 Conflict**

Unable to revoke, the message is in a state where is cannot be revoked.

The response body will contain an `Error` object further describing the
error.

##### Examples

###### Revoking a message
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages/2bf270e4-08a4-409b-8e0f-85293f6d1709 \
  -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
```