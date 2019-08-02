---
title: "Instant Messaging"
excerpt: ""
---
The `MessageClient` is the entry point to Instant Messaging functionality in the Sinch SDK.

Messages are sent through the `MessageClient` and events are received using the `MessageClientListener`. The message client is owned by the `SinchClient` and accessed using `SinchClient.getMessageClient()`. Instant messaging is not enabled by default. To enable instant messaging, `SinchClient.setSupportMessaging(true)` must be set.
[block:code]
{
  "codes": [
    {
      "code": "sinchClient.setSupportMessaging(true);\nsinchClient.start();\n\n...\n\nMessageClient messageClient = sinchClient.getMessageClient();\nmessageClient.addMessageListener(...);",
      "language": "java"
    }
  ]
}
[/block]
## Send a message

Sending a message with the Sinch SDK is easy. Get hold of a `MessageClient` as described earlier and pass it a `WritableMessage`.
[block:code]
{
  "codes": [
    {
      "code": "// Create a WritableMessage\nWritableMessage message = new WritableMessage(\n        \"someRecipientUserId\",\n        \"Hello someRecipientUserId! How are you?\"); \n\n// Send it\nmessageClient.send(message);",
      "language": "java"
    }
  ]
}
[/block]
### Message delivery success

When a message to a recipient is successfully sent, there is an event on the `MessageClientListener`, `onMessageSent`.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onMessageSent(MessageClient client, Message message) {\n    // Persist message\n    // Update UI\n}",
      "language": "java"
    }
  ]
}
[/block]
Updating the UI from the `onMessageSent` callback is especially convenient when a user is logged in into more than one device simultaneously. The `onMessageSent` callback is fired on each device. This aids in keeping the UI consistent across devices.

When the system has confirmed the messages were delivered the listener is notified using the `onMessageDelivered`method. Inspecting the `MessageDeliveryInfo` parameter passed to the callback reveals more details on the specific event.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onMessageDelivered(MessageClient client, MessageDeliveryInfo deliveryInfo) {\n  Log.d(TAG, \"The message with id \"+deliveryInfo.getMessageId()\n    +\" was delivered to the recipient with id\"+ deliveryInfo.getRecipientId());\n}",
      "language": "java"
    }
  ]
}
[/block]
### Message delivery failures

Delivering a message to a recipient can fail for various reasons: there might not be a network available, the recipient does not have instant messaging support and so on. When a message failed to reach its destination the listener is notified using the `onMessageFailed` callback. The reason for failing to deliver a message is propagated back as an `MessageFailureInfo` instance.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onMessageFailed(MessageClient client, Message message, MessageFailureInfo failureInfo) {\n        Log.d(TAG, \"Failed to send to user: \"+info.getRecipientId()\n                    +\" because: \"+failureInfo.getSinchError().getMessage());\n}",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "- Messages are persisted internally in the SDK. In case the message was not sent successfully it will be retried automatically at a later point in time. The message will be retried for 12 hours and then fail permanently firing the failure callback.\n- Messages are stored in the backend for 30 days before being removed. If the recipient has not started the app and downloaded the message history within this time frame, the message will be lost and no notification will be received.\n- A message should be retried only in case of network unavailability (use `messageFailureInfo.getSinchError().getErrorType().equals(ErrorType.NETWORK)`). In this case create a new `WritableMessage` (using `new WritableMessage(message)`) and send that instance because the previous message is considered stale.",
  "title": "Note"
}
[/block]
## Receive a message

Incoming messages (`Message`) are delivered using the method `onIncomingMessage` on the `MessageClientListener`.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onIncomingMessage(MessageClient client, Message message) {\n    // Persist message\n    // Update UI\n}",
      "language": "java"
    }
  ]
}
[/block]
## Send a message to multiple recipients

To send a message to multiple recipients, create the message with the `WriteableMessage(List<String> recipientUserIds, String textBody)` constructor.
[block:code]
{
  "codes": [
    {
      "code": "// Create a WritableMessage and send to multiple recipients\nWritableMessage message = new WritableMessage(\n        {\"recipient user id 1\", \"recipient user id 2\"},\n        \"Hello recipients! How are you?\");  \n\n// Send it\nmessageClient.send(message);",
      "language": "java"
    }
  ]
}
[/block]
### Receiving recipient status updates for multi-recipient messages

The recipient’s state transitions for the message are communicated back using the `MessageClientListener` listener the same as in the single recipient case. The listener’s callbacks are triggered for every recipient.