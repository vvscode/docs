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
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n      \"message_id\": \"5f6ec22b-f03a-4961-9c57-6c4e464edae0\",\n      \"to\": \"46555123456\",\n      \"message\": {\n          \"type\": \"text\",\n          \"text\": \"Test message!\"\n      }\n  }'",
      "language": "curl",
      "name": "Send text message"
    }
  ]
}
[/block]
###### Send text message with fallback
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n      \"message_id\": \"5bb77a04-78b7-41ff-abd3-a1006f8d6979\",\n      \"to\": \"46555123456\",\n      \"message\": {\n          \"type\": \"text\",\n          \"text\": \"Test message!\"\n      },\n      \"fallback\": {\n          \"message\": {\n              \"type\": \"mt_text\",\n              \"from\": \"MyOriginator\",\n              \"text\": \"Test message!\"\n          }\n      }\n  }'",
      "language": "curl",
      "name": "Send text message with fallback"
    }
  ]
}
[/block]
###### Send text message with (non-default) expire
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n      \"message_id\": \"66c4eeea-259b-4ba0-9dcd-cd0545cd9344\",\n      \"to\": \"46555123456\",\n      \"message\": {\n          \"type\": \"text\",\n          \"text\": \"This is a time-sensitive message!\"\n      },\n      \"expire\": {\n          \"timeout\": 3,\n          \"revoke\": true\n      }\n  }'",
      "language": "curl",
      "name": " Send text message with (non-default) expire"
    }
  ]
}
[/block]
###### Send file message
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n      \"message_id\": \"41a54db6-6abf-48dd-8a2b-63890981d80d\",\n      \"to\": \"46555123456\",\n      \"message\": {\n          \"type\": \"file\",\n          \"thumbnail\": {\n              \"mime_type\": \"image/png\",\n              \"file_size\": 1234,\n              \"file_uri\": \"http://example.com/my_image_thumbnail.png\"\n          },\n          \"file\": {\n              \"mime_type\": \"image/png\",\n              \"file_name\": \"funny.png\",\n              \"file_size\": 123456,\n              \"file_uri\": \"http://example.com/my_image.png\"\n          }\n      }\n  }'",
      "language": "curl",
      "name": "Send file message"
    }
  ]
}
[/block]
###### Send text message and suggestions
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n      \"message_id\": \"feed1169-8500-4b66-a65c-5986b8ae59f7\",\n      \"to\": \"46555123456\",\n      \"message\": {\n          \"type\": \"text\",\n          \"text\": \"Test message!\"\n      },\n      \"suggestions\": [\n          {\n              \"type\": \"reply\",\n              \"display_text\": \"Like\",\n              \"postback\": {\n                  \"data\": \"feed1169-8500-4b66-a65c-5986b8ae59f7_LIKE\"\n              }\n          },\n          {\n              \"type\": \"reply\",\n              \"display_text\": \"Stop please\",\n              \"postback\": {\n                  \"data\": \"feed1169-8500-4b66-a65c-5986b8ae59f7_STOP\"\n              }\n          },\n          {\n              \"type\": \"action\",\n              \"display_text\": \"Call us\",\n              \"postback\": {\n                  \"data\": \"feed1169-8500-4b66-a65c-5986b8ae59f7_CALL\"\n              },\n              \"action\": {\n                  \"type\": \"dial_phone_number\",\n                  \"phone_number\": \"+46555123456\"\n              }\n          }\n      ]\n  }'",
      "language": "curl",
      "name": "Send text message and suggestions"
    }
  ]
}
[/block]
###### Send standalone rich card message with suggestions on card
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n      \"message_id\": \"ea099bc3-541a-4967-bbe3-5598e8209c75\",\n      \"to\": \"46555123456\",\n      \"message\": {\n          \"type\": \"standalone_rich_card\",\n          \"orientation\": \"VERTICAL\",\n          \"thumbnail_alignment\": \"RIGHT\",\n          \"content\": {\n              \"title\": \"Hello1\",\n              \"description\": \"Hello There\",\n              \"media\": {\n                \"height\": \"TALL\",\n                \"thumbnail\": {\n                    \"mime_type\": \"image/png\",\n                    \"size\": 1234,\n                    \"file_uri\": \"http://example.com/my_image_thumbnail.png\"\n                },\n                \"file\": {\n                    \"mime_type\": \"image/png\",\n                    \"name\": \"funny.png\",\n                    \"file_size\": 12345,\n                    \"file_uri\": \"http://example.com/my_image.png\"\n                }\n              },\n              \"suggestions\": [\n                  {\n                      \"type\": \"reply\",\n                      \"display_text\": \"Like\",\n                      \"postback\": {\n                          \"data\": \"feed1169-8500-4b66-a65c-5986b8ae59f7_LIKE\"\n                      }\n                  },\n                  {\n                      \"type\": \"reply\",\n                      \"display_text\": \"Stop please\",\n                      \"postback\": {\n                          \"data\": \"feed1169-8500-4b66-a65c-5986b8ae59f7_STOP\"\n                      }\n                  },\n                  {\n                      \"type\": \"action\",\n                      \"display_text\": \"Call us\",\n                      \"postback\": {\n                          \"data\": \"feed1169-8500-4b66-a65c-5986b8ae59f7_CALL\"\n                      },\n                      \"action\": {\n                        \"type\": \"dial_phone_number\",\n                        \"phone_number\": \"+46555123456\"\n                      }\n                  }\n              ]\n          }\n      }\n  }'",
      "language": "curl",
      "name": "Send standalone rich card message with suggestions on card"
    }
  ]
}
[/block]
#### JSON Model

##### AgentMessage

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"message_id\": string,\n  \"to\": string,\n  \"message\": {\n    \"type\": enum(\n      \"text\",\n      \"file\",\n      \"standalone_rich_card\",\n      \"carousel_rich_card\"\n    ),\n    ... // type specific fields\n  },\n  \"suggestions\": [\n    {\n      \"type\": enum(\n        \"action\",\n        \"reply\"\n      )\n      ... // type specific fields\n    }\n  ],\n  \"expire\": object(ExpireInfo),\n  \"fallback\": object(FallbackInfo)\n}",
      "language": "json",
      "name": "AgentMessage"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>message_id</td>\n<td>string</td>\n<td>Provide a globally unique id for this message</td>\n<td>No</td>\n<td>^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>to</td>\n<td>string</td>\n<td>MSISDN of the recipient</td>\n<td>No</td>\n<td>^(?:00)[1-9][0-9]{8,16}$</td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>message</td>\n<td><dl>\n<dt><em>oneOf:</em></dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">TextMessage</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">FileMessage</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">StandaloneRichCardMessage</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">CarouselRichCardMessage</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>The content of the message</td>\n<td>No</td>\n<td>No</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>suggestions</td>\n<td><dl>\n<dt>arrayOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedAction</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedReply</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>A list of suggestions comprised of suggested replies and suggested actions.</td>\n<td>No</td>\n<td>MaxLength: 11</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>expire</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">ExpireInfo</code>)</td>\n<td>Object describing how the message should expire</td>\n<td>No</td>\n<td>No</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>fallback</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">FallbackInfo</code>)</td>\n<td>Object describing fallback message and under which conditions it should be triggered</td>\n<td>No</td>\n<td>No</td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n\n</div>\n\n<style></style>"
}
[/block]
#### TextMessage

JSON Representation

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"text\",\n  \"text\": string\n}",
      "language": "json",
      "name": "TextMessage"
    }
  ]
}
[/block]
###### Fields

| Field | Type   | Description              | Default | Constraints     | Required |
| ----- | ------ | ------------------------ | ------- | --------------- | -------- |
| type  | string | Static string 'text'     | N/A     | N/A             | Yes      |
| text  | string | The message body content | No      | MaxLength: 2000 | Yes      |

##### FileMessage

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"file\",\n  \"file\": object(FileInfo),\n  \"thumbnail\": object(FileInfo)\n}",
      "language": "json",
      "name": "FileMessage"
    }
  ]
}
[/block]
###### Fields

| Field     | Type               | Description                                                 | Default | Constraints | Required |
| --------- | ------------------ | ----------------------------------------------------------- | ------- | ----------- | -------- |
| type      | string             | Static string 'file'                                        | N/A     | N/A         | Yes      |
| file      | object(`FileInfo`) | Object describing the file                                  | No      | N/A         | Yes      |
| thumbnail | object(`FileInfo`) | Thumbnail of the media, only required for images and videos | No      | N/A         | No       |

##### FileInfo

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"mime_type\": string,\n  \"file_size\": integer,\n  \"file_name\": string,\n  \"file_uri\": string\n}",
      "language": "json",
      "name": "FileInfo"
    }
  ]
}
[/block]
###### Fields

| Field      | Type    | Description                          | Default | Constraints                                                                                                                                       | Required |
| ---------- | ------- | ------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| mime\_type | string  | Mime type of the media               | No      |                                                                                                                                                   | Yes      |
| file\_size | integer | File size in bytes                   | No      |                                                                                                                                                   | Yes      |
| file\_name | string  | Only set for payload (not thumbnail) | No      |                                                                                                                                                   | No       |
| file\_uri  | string  | HTTP(S) URL for the actual resource  | No      | URL - As defined by RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax, amended by RFC 2732: Format for Literal IPv6 Addresses in URLs. | Yes      |

##### StandaloneRichCardMessage

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"standalone_rich_card\",\n  \"orientation\": enum(\n    \"HORIZONTAL\",\n    \"VERTICAL\"\n  ),\n  \"thumbnail_alignment\": enum(\n    \"LEFT\",\n    \"RIGHT\"\n  ),\n  \"content\": object(RichCardContent)\n}",
      "language": "json",
      "name": "StandaloneRichCardMessage"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>type</td>\n<td>string</td>\n<td>Static string 'standalone_rich_card'</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>orientation</td>\n<td>string</td>\n<td>Orientation of the card</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>HORIZONTAL</li>\n<li>VERTICAL</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>thumbnail_alignment</td>\n<td>string</td>\n<td>Image preview alignment for cards with horizontal layout</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>LEFT</li>\n<li>RIGHT</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>content</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">RichCardContent</code>)</td>\n<td>Object describing the content of the rich card.</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### CarouselRichCardMessage

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"carousel_rich_card\",\n  \"width\": enum(\n    \"SMALL\",\n    \"MEDIUM\"\n  ),\n  \"contents\": [\n    object(RichCardContent), ...\n  ]\n}",
      "language": "json",
      "name": "CarouselRichCardMessage"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>type</td>\n<td>string</td>\n<td>Static string 'carousel_rich_card'</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>width</td>\n<td>string</td>\n<td>The width of the cards in the carousel</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>SMALL</li>\n<li>MEDIUM</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>contents</td>\n<td>arrayOf(<code class=\"interpreted-text\" data-role=\"ref\">RichCardContent</code>)</td>\n<td>The list of contents for each card in the carousel. There must be at least 2 and at most 10 cards in a carousel</td>\n<td>No</td>\n<td>MinLength: 2 MaxLength: 10</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### RichCardContent

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  // At least one of title, description and media must be specified\n  \"title\": string,\n  \"description\": string,\n  \"media\": object(RichCardMedia),\n  \"suggestions\": [\n    {\n      \"type\": enum(\n        \"reply\",\n        \"action\"\n      )\n      ... // type specific fields\n    }\n  ]\n}",
      "language": "json",
      "name": "RichCardContent"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>title</td>\n<td>string</td>\n<td>Title of the card</td>\n<td>No</td>\n<td>MaxLength: 200</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>description</td>\n<td>string</td>\n<td>Description of the card</td>\n<td>No</td>\n<td>MaxLength: 2000</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>media</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">RichCardMedia</code>)</td>\n<td>Object describing the media to be included in the card</td>\n<td>No</td>\n<td>N/A</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>suggestions</td>\n<td><dl>\n<dt>arrayOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedAction</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">SuggestedReply</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>List of suggestions to be included within the rich card</td>\n<td>No</td>\n<td>MaxLength: 4</td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### RichCardMedia

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"file\": object(FileInfo),\n  \"thumbnail\": object(FileInfo),\n  \"height\": enum(\n    \"SHORT\",\n    \"MEDIUM\",\n    \"TALL\"\n  )\n}",
      "language": "json",
      "name": "RichCardMedia"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>file</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">FileInfo</code>)</td>\n<td>Object describing the media to be included in the card</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>thumbnail</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">FileInfo</code>)</td>\n<td>Object describing the thumbnail of the media in the card.</td>\n<td>No</td>\n<td>N/A</td>\n<td>No</td>\n</tr>\n<tr class=\"odd\">\n<td>height</td>\n<td>string</td>\n<td>The height of the media within a vertically oriented rich card</td>\n<td>No</td>\n<td><dl>\n<dt>Valid values:</dt>\n<dd><ul>\n<li>SHORT</li>\n<li>MEDIUM</li>\n<li>TALL</li>\n</ul>\n</dd>\n</dl></td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### SuggestedReply

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"reply\",\n  \"display_text\": string,\n  \"postback\": object(Postback)\n}",
      "language": "json",
      "name": "SuggestedReply"
    }
  ]
}
[/block]
###### Fields

| Field         | Type               | Description                                                                    | Default | Constraints                | Required |
| ------------- | ------------------ | ------------------------------------------------------------------------------ | ------- | -------------------------- | -------- |
| type          | string             | Static string 'reply'                                                          | N/A     | N/A                        | Yes      |
| display\_text | string             | The text that will be shown in the suggested reply                             | No      | MinLength: 1 MaxLength: 25 | Yes      |
| postback      | object(`Postback`) | Optional data that will be sent back to the agent when the user taps the reply | No      | N/A                        | No       |

##### SuggestedAction

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"action\",\n  \"display_text\": string,\n  \"postback\": object(Postback),\n  \"action\": {\n    \"type\": enum(\n      \"dial_phone_number\",\n      \"show_location\",\n      \"request_location_push\",\n      \"open_url\",\n      \"create_calendar_event\"\n    )\n    ... // type specific fields\n  }\n}",
      "language": "json",
      "name": "SuggestedAction"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>type</td>\n<td>string</td>\n<td>Static string 'action'</td>\n<td>N/A</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>display_text</td>\n<td>string</td>\n<td>The text that will be shown in the suggested action</td>\n<td>No</td>\n<td>MinLength: 1 MaxLength: 25</td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>postback</td>\n<td>object(<code class=\"interpreted-text\" data-role=\"ref\">Postback</code>)</td>\n<td>Optional data that will be sent back to the agent when the user taps the action</td>\n<td>No</td>\n<td>N/A</td>\n<td>No</td>\n</tr>\n<tr class=\"even\">\n<td>action</td>\n<td><dl>\n<dt>oneOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">DialPhoneNumber</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">ShowLocation</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">RequestLocationPush</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">OpenUrl</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">CreateCalendarEvent</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>Object defining the action</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### DialPhoneNumber

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"dial_phone_number\",\n  \"phone_number\": string\n}",
      "language": "json",
      "name": "DialPhoneNumber"
    }
  ]
}
[/block]
###### Fields

| Field         | Type   | Description                         | Default | Constraints                  | Required |
| ------------- | ------ | ----------------------------------- | ------- | ---------------------------- | -------- |
| type          | string | Static string 'dial\_phone\_number' | N/A     | N/A                          | Yes      |
| phone\_number | string | The phone number to call            | No      | ^(?:00)\[1-9\]\[0-9\]{8,16}$ | Yes      |

##### ShowLocation

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"show_location\",\n  \"latitude\": number,\n  \"longitude\": number,\n  \"label\": string\n}",
      "language": "json",
      "name": "ShowLocation"
    }
  ]
}
[/block]
###### Fields

| Field     | Type   | Description                                                 | Default | Constraints                  | Required |
| --------- | ------ | ----------------------------------------------------------- | ------- | ---------------------------- | -------- |
| type      | string | Static string 'show\_location'                              | N/A     | N/A                          | Yes      |
| latitude  | number | Latitude                                                    | No      | MinValue: -90 MaxValue: 90   | Yes      |
| longitude | number | Longitude                                                   | No      | MinValue: -180 MaxValue: 180 | Yes      |
| label     | string | Optional label to be shown on the map at the given lat/long | No      | MaxLength: 1000              | No       |

##### RequestLocationPush

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"request_location_push\"\n}",
      "language": "json",
      "name": "RequestLocationPush"
    }
  ]
}
[/block]
###### Fields

| Field | Type   | Description                             | Default | Constraints | Required |
| ----- | ------ | --------------------------------------- | ------- | ----------- | -------- |
| type  | string | Static string 'request\_location\_push' | N/A     | N/A         | Yes      |

##### OpenUrl

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"open_url\",\n  \"url\": string\n}",
      "language": "json",
      "name": "OpenUrl"
    }
  ]
}
[/block]
###### Fields

| Field | Type   | Description               | Default | Constraints                                                                                                                                       | Required |
| ----- | ------ | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| type  | string | Static string 'open\_url' | N/A     | N/A                                                                                                                                               | Yes      |
| url   | string | The URL to open           | No      | URL - As defined by RFC 2396: Uniform Resource Identifiers (URI): Generic Syntax, amended by RFC 2732: Format for Literal IPv6 Addresses in URLs. | Yes      |

##### CreateCalendarEvent

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"create_calendar_event\",\n  \"start_time\": timestamp,\n  \"end_time\": timestamp,\n  \"title\": string,\n  \"description\": string\n}",
      "language": "json",
      "name": "CreateCalendarEvent"
    }
  ]
}
[/block]
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
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"data\": string\n}",
      "language": "json",
      "name": "Postback"
    }
  ]
}
[/block]
###### Fields

| Field | Type   | Description                                                                                    | Default | Constraints                  | Required |
| ----- | ------ | ---------------------------------------------------------------------------------------------- | ------- | ---------------------------- | -------- |
| data  | string | Payload (base64 encoded) that will be sent back to the agent when the user taps the suggestion | No      | MinLength: 1 MaxLength: 1024 | Yes      |

##### ExpireInfo

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"timeout\": integer,\n  \"revoke\": boolean\n}",
      "language": "json",
      "name": "ExpireInfo"
    }
  ]
}
[/block]
###### Fields

| Field   | Type    | Description                                                                                                                                                                                                      | Default      | Constraints | Required |
| ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- | -------- |
| timeout | integer | Expire the message after this many seconds. If fallback is configured for expiry, then the fallback message will be sent after this timeout.                                                                     | 172800 (48h) | Minimum: 1  | No       |
| revoke  | boolean | Should the message be revoked when the timeout happens. If not, the message might still be delivered to the handset after the configured timeout. However, no further status updates will be sent by the system. | true         | No          | No       |

##### FallbackInfo

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"message\": object(XmsBatchMessage)\n  \"conditions\": object(FallbackConditions)\n}",
      "language": "json",
      "name": "FallbackInfo"
    }
  ]
}
[/block]
###### Fields

| Field      | Type                         | Description                                        | Default | Constraints | Required |
| ---------- | ---------------------------- | -------------------------------------------------- | ------- | ----------- | -------- |
| message    | object(`XmsBatchMessage`)    | Object describing the SMS fallback message         | No      | No          | Yes      |
| conditions | object(`FallbackConditions`) | Object describing when to use the fallback message | No      | No          | No       |

##### FallbackConditions

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"rcs_unavailable\": {\n    \"enabled\": boolean\n  },\n  \"capability_unsupported\": {\n    \"enabled\": boolean\n  },\n  \"expired\": {\n    \"enabled\": boolean\n  },\n  \"agent_error\": {\n    \"enabled\": boolean\n  }\n}",
      "language": "json",
      "name": "FallbackConditions"
    }
  ]
}
[/block]
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
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": enum(\n    \"mt_text\",\n    \"mt_binary\"\n  )\n  \"from\": string,\n  \"text\": string,\n  \"udh\": string\n  \"campaign_id\": string,\n  \"delivery_report\": enum(\n    \"none\",\n    \"summary\",\n    \"full\",\n    \"per_recipient\"\n  ),\n  \"expire_at\": timestamp,\n  \"callback_url\": string\n}",
      "language": "json",
      "name": "XmsBatchMessage"
    }
  ]
}
[/block]
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
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/messages/2bf270e4-08a4-409b-8e0f-85293f6d1709 \\\n  -X DELETE \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\",
      "language": "curl"
    }
  ]
}
[/block]