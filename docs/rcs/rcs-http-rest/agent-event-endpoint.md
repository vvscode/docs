---
title: "Agent Event Endpoint"
excerpt: ""
---
The agent event endpoint provides operations for sending events from the agent to the user.

### Sending agent events to user

Send events to a user from the agent. This enables the agent to emulate real user behavior by sending displayed notifications and composing events.

#### HTTP Request

`POST /rcs/v1/{agent_id}/events`

#### Path parameters

| Field     | Type   | Description                | Default | Constraints | Required |
| --------- | ------ | -------------------------- | ------- | ----------- | -------- |
| agent\_id | string | ID of the agent to be used | No      | No          | Yes      |

#### Request Body

The request body contains an instance of `AgentEvent`.

#### Response

**200 OK**

The event was successfully sent.

**502 Bad gateway**

Unable to send event due to issue with service provider / operator, please retry.

##### Examples

###### Sending a composing event
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/events \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n    \"to\": \"46555123456\",\n    \"event_id\": \"ce5f9373-8a77-45fa-a78b-84a931005dc9\",\n    \"event\": {\n      \"type\": \"agent_composing\"\n    }\n  }'",
      "language": "curl",
      "name": "Sending a composing event"
    }
  ]
}
[/block]
###### Sending a read event
[block:code]
{
  "codes": [
    {
      "code": "curl https://api.clxcommunications.com/rcs/v1/my-agent-id/events \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV\" \\\n  -d '{\n    \"to\": \"46555123456\",\n    \"event_id\": \"ce5f9373-8a77-45fa-a78b-84a931005dc9\",\n    \"event\": {\n      \"type\": \"agent_read\",\n      \"message_id\": \"Jsiuh76sJKAhdsiufg86823\"\n    }\n  }'",
      "language": "curl",
      "name": "Sending a read event"
    }
  ]
}
[/block]
#### JSON Model

##### AgentEvent

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"to\": string,\n  \"event_id\": string,\n  \"event\": {\n    \"type\": enum(\n      \"agent_composing\"\n      \"agent_read\"\n    )\n    ... // type specific fields\n  }\n}",
      "language": "json",
      "name": "AgentEvent"
    }
  ]
}
[/block]
###### Fields
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<thead>\n<tr class=\"header\">\n<th>Field</th>\n<th>Type</th>\n<th>Description</th>\n<th>Default</th>\n<th>Constraints</th>\n<th>Required</th>\n</tr>\n</thead>\n<tbody>\n<tr class=\"odd\">\n<td>to</td>\n<td>string</td>\n<td>MSISDN of the recipient</td>\n<td>No</td>\n<td>^(?:00)[1-9][0-9]{8,16}$</td>\n<td>Yes</td>\n</tr>\n<tr class=\"even\">\n<td>event_id</td>\n<td>string</td>\n<td>Globally unique event ID</td>\n<td>No</td>\n<td>^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$</td>\n<td>Yes</td>\n</tr>\n<tr class=\"odd\">\n<td>event</td>\n<td><dl>\n<dt>oneOf:</dt>\n<dd><ul>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">AgentComposingEvent</code>)</li>\n<li>object(<code class=\"interpreted-text\" data-role=\"ref\">AgentReadEvent</code>)</li>\n</ul>\n</dd>\n</dl></td>\n<td>Object describing the event to send to the user</td>\n<td>No</td>\n<td>N/A</td>\n<td>Yes</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
##### AgentComposingEvent

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"agent_composing\"\n}",
      "language": "json",
      "name": "AgentComposingEvent"
    }
  ]
}
[/block]
###### Fields

| Field | Type   | Description                                                                                 | Default | Constraints | Required |
| ----- | ------ | ------------------------------------------------------------------------------------------- | ------- | ----------- | -------- |
| type  | string | Static string 'agent\_composing'. This type notifies the recipient that the agent is typing | N/A     | N/A         | Yes      |

##### AgentReadEvent

JSON Representation
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"type\": \"agent_read\",\n  \"message_id\": string\n}",
      "language": "json",
      "name": "AgentReadEvent"
    }
  ]
}
[/block]
###### Fields

| Field       | Type   | Description                                                                                                                | Default | Constraints | Required |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- | -------- |
| type        | string | Static string 'agent\_read'. This type notifies the recipient that the message sent by the user has been read by the agent | N/A     | N/A         | Yes      |
| message\_id | string | The message id that the agent has read. This is the message id the agent received in object(`UserAgentMessage`)            | N/A     | N/A         | Yes      |