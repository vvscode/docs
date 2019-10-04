---
title: "Instant Messaging"
excerpt: ""
---
The `MessageClient` is the entry point to Instant Messaging functionality in the Sinch SDK.

Messages are sent through the `MessageClient` and events are received using the `MessageClientListener`. The message client is owned by the `SinchClient` and accessed using `SinchClient.getMessageClient()`. Instant messaging is not enabled by default. To enable instant messaging, `SinchClient.setSupportMessaging(true)` must be set.
```java
sinchClient.setSupportMessaging(true);
sinchClient.start();

...

MessageClient messageClient = sinchClient.getMessageClient();
messageClient.addMessageListener(...);
```


## Send a message

Sending a message with the Sinch SDK is easy. Get hold of a `MessageClient` as described earlier and pass it a `WritableMessage`.
```java
// Create a WritableMessage
WritableMessage message = new WritableMessage(
        "someRecipientUserId",
        "Hello someRecipientUserId! How are you?"); 

// Send it
messageClient.send(message);
```


### Message delivery success

When a message to a recipient is successfully sent, there is an event on the `MessageClientListener`, `onMessageSent`.
```java
@Override
public void onMessageSent(MessageClient client, Message message) {
    // Persist message
    // Update UI
}
```


Updating the UI from the `onMessageSent` callback is especially convenient when a user is logged in into more than one device simultaneously. The `onMessageSent` callback is fired on each device. This aids in keeping the UI consistent across devices.

When the system has confirmed the messages were delivered the listener is notified using the `onMessageDelivered`method. Inspecting the `MessageDeliveryInfo` parameter passed to the callback reveals more details on the specific event.
```java
@Override
public void onMessageDelivered(MessageClient client, MessageDeliveryInfo deliveryInfo) {
  Log.d(TAG, "The message with id "+deliveryInfo.getMessageId()
    +" was delivered to the recipient with id"+ deliveryInfo.getRecipientId());
}
```


### Message delivery failures

Delivering a message to a recipient can fail for various reasons: there might not be a network available, the recipient does not have instant messaging support and so on. When a message failed to reach its destination the listener is notified using the `onMessageFailed` callback. The reason for failing to deliver a message is propagated back as an `MessageFailureInfo` instance.
```java
@Override
public void onMessageFailed(MessageClient client, Message message, MessageFailureInfo failureInfo) {
        Log.d(TAG, "Failed to send to user: "+info.getRecipientId()
                    +" because: "+failureInfo.getSinchError().getMessage());
}
```




> **Note**    
>
> - Messages are persisted internally in the SDK. In case the message was not sent successfully it will be retried automatically at a later point in time. The message will be retried for 12 hours and then fail permanently firing the failure callback.
> - Messages are stored in the backend for 30 days before being removed. If the recipient has not started the app and downloaded the message history within this time frame, the message will be lost and no notification will be received.
> - A message should be retried only in case of network unavailability (use `messageFailureInfo.getSinchError().getErrorType().equals(ErrorType.NETWORK)`). In this case create a new `WritableMessage` (using `new WritableMessage(message)`) and send that instance because the previous message is considered stale.

## Receive a message

Incoming messages (`Message`) are delivered using the method `onIncomingMessage` on the `MessageClientListener`.
```java
@Override
public void onIncomingMessage(MessageClient client, Message message) {
    // Persist message
    // Update UI
}
```


## Send a message to multiple recipients

To send a message to multiple recipients, create the message with the `WriteableMessage(List<String> recipientUserIds, String textBody)` constructor.
```java
// Create a WritableMessage and send to multiple recipients
WritableMessage message = new WritableMessage(
        {"recipient user id 1", "recipient user id 2"},
        "Hello recipients! How are you?");  

// Send it
messageClient.send(message);
```


### Receiving recipient status updates for multi-recipient messages

The recipient’s state transitions for the message are communicated back using the `MessageClientListener` listener the same as in the single recipient case. The listener’s callbacks are triggered for every recipient.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-android/video-android-instant-messaging.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>