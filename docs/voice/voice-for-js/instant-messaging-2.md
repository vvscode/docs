---
title: "Instant Messaging"
excerpt: ""
---
The `MessageClient` is the entry point to Instant Messaging functionality in the Sinch SDK.

Messages are sent and incoming messages are received through the `MessageClient`. An instance of `MessageClient` is owned by an instance of `SinchClient` and retrieved using `sinchClient.getMessageClient()`. Instant messaging is not enabled by default. In order to enable instant messaging, pass `messaging: true` in the list of capabilities when instantiating `SinchClient`.

Here is an example for how to set up the sinchClient, messageClient and add listeners for incoming messages and delivered messages.
[block:code]
{
  "codes": [
    {
      "code": "var sinchClient = new SinchClient({\n    applicationKey: '<application_key>',\n    capabilities: {messaging: true},\n});\n\nvar messageClient = sinchClient.getMessageClient();\n\nvar myListenerObj = {\n    onMessageDelivered: function(messageDeliveryInfo) {\n        // Handle message delivery notification\n    },\n    onIncomingMessage: function(message) {\n        // Handle incoming message\n    }\n};\n\nmessageClient.addEventListener(myListenerObj);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "The getMessageClient() requires a sinchClient with the messaging capability set to true",
  "title": "Note"
}
[/block]
## Send a message

Sending a message with the Sinch SDK is easy. First, get hold of a `MessageClient` instance for a particular `SinchClient` instance. This can be done by calling the method `getMessageClient()`. Then use this instance to create a new `Message` object. This object can then be sent using `send()` in your `MessageClient` instance.
[block:code]
{
  "codes": [
    {
      "code": "// Get the messageClient\nvar messageClient = sinchClient.getMessageClient(); \n\n// Create a new Message\nvar message = messageClient.newMessage('Alice', 'Hello World!');\n\n// Send it\nmessageClient.send(message);",
      "language": "javascript"
    }
  ]
}
[/block]
This example will send *‘Hello World’* to the user with username *‘Alice’*.

## Message sent success or failure

The send method returns a promise which can be used to chain a method when message was sent, this is specified using `.then()`. You can also supply two callbacks, one to be invoked on success and one for error.
[block:code]
{
  "codes": [
    {
      "code": "// Create a new Message\nvar message = messageClient.newMessage('Alice', 'Hello World!');\n\n// Success and fail handlers\nvar handleSuccess = function() {...};\nvar handleFail = function() {...};\n\n// Alt 1: Send it with success and fail handler\nmessageClient.send(message, handleSuccess, handleFail)\n\n// Alt 2: Send it and append handlers using the promise returned\nmessageClient.send(message)\n    .then(handleSuccess)\n    .then(some_other_success) \n    .fail(handleFail);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "If both callbacks and promises are used, the execution order is for callbacks to be executed first, followed by the methods in the promise-chain, specified using \\`\\`.then()\\`\\`",
  "title": "Note"
}
[/block]
### Alternative user identity

When sending to other identities than username, supply an object where the key is the identification type and the value is the user identity. For example.
[block:code]
{
  "codes": [
    {
      "code": "// Create a new Message\nvar message = messageClient.newMessage({email: 'alice@example.com'}, 'Hello World')",
      "language": "javascript"
    }
  ]
}
[/block]
Valid identities for users are:

>   - *username* any alphanumeric string
>   - *email* avalid e-mail adress
>   - *number* a phone number
[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "At the moment, sending to other identities than username is not\nimplemented."
}
[/block]
## Delivery receipt

When a client receives a message, it sends an acknowledgement indicating which message was received. You can listen to these delivery receipts and take suitable action, for example, displaying which users have read a particular message.

All delivery receipts are sent to all `onMessageDelivered` listeners in the array of listeners managed by messageClient. In order to add your own listener, use the `addEventListener()` method in your messageClient.
[block:code]
{
  "codes": [
    {
      "code": "// Retrieve messageClient for a particular sinchClient\nvar messageClient = sinchClient.getMessageClient();\n\n// Define custom event listener\nvar myEventListener = {\n    onMessageDelivered: function(messageDeliveryInfo) {\n        // Perform action on message\n        console.log(messageDeliveryInfo);\n    },\n    ...\n}\n\n// Add event listener\nmessageClient.addEventListener(myEventListener);",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "If a recipient is online on one or multiple devices, the delivery report listener will only be called once on the first delivery receipt.",
  "title": "Note"
}
[/block]
In order to remove a specific event listener, use the method `removeEventListener()`
[block:code]
{
  "codes": [
    {
      "code": "// Define a custom event listener object\nvar myEventListener = {...};\n\n// Add listener object\nmessageClient.addEventlistener(myEventListener);\n\n// Remove listener object\nmessageClient.removeEventListener(myEventListener); ",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Several event listeners can be added, and they will be executed in the order which they were added.",
  "title": "Note"
}
[/block]
## Receive a message

In order to receive messages, `SinchClient` must be instantiated either with configuration option `supportActiveConnection` set to true or by invoking `startActiveConnection` after your `SinchClient` object has successfully started.
[block:code]
{
  "codes": [
    {
      "code": "var sinchClient = new SinchClient({\n    applicationKey: '<application_key>',\n    capabilities: {messaging: true},\n    supportActiveConnection: true,\n});",
      "language": "javascript"
    }
  ]
}
[/block]
All incoming messages are sent to all `onIncomingMessage` listeners in the array of listeners managed by an instance of `MessageClient`. In order to add one or more of your own listeners, use the `addEventListener()` method on a particular `MessageClient` instance.
[block:code]
{
  "codes": [
    {
      "code": "// Retrieve messageClient for a particular sinchClient\nvar messageClient = sinchClient.getMessageClient();\n\n// Define custom event listener\nvar myEventListener = {\n    onIncomingMessage: function(message) {\n        // Perform action on message\n        console.log(message);\n    },\n    ...\n}\n\n// Add event listener to an array\nmessageClient.addEventListener(myEventListener);",
      "language": "javascript"
    }
  ]
}
[/block]
In order to remove an event listener, use the method `removeEventListener()`
[block:code]
{
  "codes": [
    {
      "code": "// Define a custom event listener object\nvar myEventListener = {...};\n\n// Add this listener object\nmessageClient.addEventlistener(myEventListener);\n\n// Remove this listener object\nmessageClient.removeEventListener(myEventListener); ",
      "language": "javascript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Several event listeners can be added, they will be executed in the order which they where added.",
  "title": "Note"
}
[/block]
## Send a message to multiple recipients

When creating a new message, it’s possible to define *multiple recipients* by giving an array of recipients instead of a username string or identity object.
[block:code]
{
  "codes": [
    {
      "code": "// Retrieve messageClient for particular sinchClient\nvar messageClient = sinchClient.getMessageClient();\n\n// Create a new message for multiple recipients\nvar message = messageClient.newMessage(['Alice', 'Bob'], 'Hello Alice and Bob');\n\n// Send message\nmessageClient.send(message); ",
      "language": "javascript"
    }
  ]
}
[/block]
Both user *‘Alice’* and *‘Bob’* will receive the message. The success callback will only be called once, but there will be multiple delivery receipt listener callbacks, one for each recipient.

In order to send to multiple recipients with alternative identities, such as e-mail or phone number, supply an array of objects instead of an array with usernames.
[block:code]
{
  "codes": [
    {
      "code": "// Retrieve messageClient for particular sinchClient\nvar messageClient = sinchClient.getMessageClient();\n\n// Create a new message for multiple recipients, using number as their identity\nvar message = messageClient.newMessage([{number: 123456}, {number: 654321}], 'Hello Alice and Bob');\n\n// Send message\nmessageClient.send(message); ",
      "language": "javascript"
    }
  ]
}
[/block]
This will send the same *“Hello World”* message to the users identified by the numbers *123456* and *654321* respectivley.

## Receiving recipient status updates for multi-recipient messages

The recipient’s state transition to delivered for the message is communicated back using the same listener as in the single recipient case. The listener’s callbacks are triggered for every recipient and only, at most, once per recipient.