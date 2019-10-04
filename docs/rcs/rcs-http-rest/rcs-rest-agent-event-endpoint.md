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

**Sending a composing event**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
    "to": "46555123456",
    "event_id": "ce5f9373-8a77-45fa-a78b-84a931005dc9",
    "event": {
      "type": "agent_composing"
    }
  }'
```


###### Sending a read event

**Sending a read event**
```curl
curl https://api.clxcommunications.com/rcs/v1/my-agent-id/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV" \
  -d '{
    "to": "46555123456",
    "event_id": "ce5f9373-8a77-45fa-a78b-84a931005dc9",
    "event": {
      "type": "agent_read",
      "message_id": "Jsiuh76sJKAhdsiufg86823"
    }
  }'
```


#### JSON Model

##### AgentEvent

JSON Representation

**AgentEvent**
```json
{
  "to": string,
  "event_id": string,
  "event": {
    "type": enum(
      "agent_composing"
      "agent_read"
    )
    ... // type specific fields
  }
}
```


###### Fields

<div class="magic-block-html">
    <div class="marked-table">
        <table>
            <thead>
            <tr class="header">
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
                <th>Default</th>
                <th>Constraints</th>
                <th>Required</th>
            </tr>
            </thead>
            <tbody>
            <tr class="odd">
                <td>to</td>
                <td>string</td>
                <td>MSISDN of the recipient</td>
                <td>No</td>
                <td>^(?:00)[1-9][0-9]{8,16}$</td>
                <td>Yes</td>
            </tr>
            <tr class="even">
                <td>event_id</td>
                <td>string</td>
                <td>Globally unique event ID</td>
                <td>No</td>
                <td>^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$</td>
                <td>Yes</td>
            </tr>
            <tr class="odd">
                <td>event</td>
                <td><dl>
                    <dt>oneOf:</dt>
                    <dd><ul>
                        <li>object(<code class="interpreted-text" data-role="ref">AgentComposingEvent</code>)</li>
                        <li>object(<code class="interpreted-text" data-role="ref">AgentReadEvent</code>)</li>
                    </ul>
                    </dd>
                </dl></td>
                <td>Object describing the event to send to the user</td>
                <td>No</td>
                <td>N/A</td>
                <td>Yes</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>


##### AgentComposingEvent

JSON Representation

**AgentComposingEvent**
```json
{
  "type": "agent_composing"
}
```


###### Fields

| Field | Type   | Description                                                                                 | Default | Constraints | Required |
| ----- | ------ | ------------------------------------------------------------------------------------------- | ------- | ----------- | -------- |
| type  | string | Static string 'agent\_composing'. This type notifies the recipient that the agent is typing | N/A     | N/A         | Yes      |

##### AgentReadEvent

JSON Representation

**AgentReadEvent**
```json
{
  "type": "agent_read",
  "message_id": string
}
```


###### Fields

| Field       | Type   | Description                                                                                                                | Default | Constraints | Required |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- | -------- |
| type        | string | Static string 'agent\_read'. This type notifies the recipient that the message sent by the user has been read by the agent | N/A     | N/A         | Yes      |
| message\_id | string | The message id that the agent has read. This is the message id the agent received in object(`UserAgentMessage`)            | N/A     | N/A         | Yes      |

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/rcs/rcs-http-rest/rcs-rest-agent-event-endpoint.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>