---
title: "Instant Messaging"
excerpt: ""
---
The `SINMessageClient` is the entry point to Instant Messaging functionality in the Sinch SDK.

Messages are sent through the `SINMessageClient` and events are received by the `SINMessageClientDelegate`. The message client is owned by the `SINClient` and accessed via `-[SINClient messageClient]`. Instant messaging is not enabled by default. In order to enabled instant messaging, `- [SINClient setSupportMessaging: YES]` must be set.
```objectivec
SINClient sinchClient;
[sinchClient setSupportMessaging: YES];
SINMessageClient messageClient = [sinchClient messageClient];

// Assign a delegate for instant messages events
messageClient.delegate = ...
```


## Sending a message

Messages are created using the static method `+[SINOutgoingMessage messageWithRecipient:text:]`. Once created, sending the message is as simple as calling `-[SINMessageClient sendMessage:]`:
```objectivec
SINOutgoingMessage *message = [SINOutgoingMessage messageWithRecipient:@"<recipient user id> text:@"Hi there!"];

[messageClient sendMessage:message];
```


### Message delivery success

When a message to a recipient is successfully sent, the delegate is notified:
```objectivec
// SINMessageClientDelegate

- (void) messageSent:(id<SINMessage>)message recipientId:(NSString *)recipientId{
  // Persist outgoing message
  // Update UI
```


Updating the UI from the `messageSent:` callback is especially convenient when a user is simultaneously logged into more than one device. The `messageSent:` callback is fired on each device. This aids in keeping the UI consistent across devices.

As soon as the system has confirmed the messages were delivered, the delegate is notified using the `messageDelivered:`method. Inspecting the `info`parameter passed to the callback reveals more details about the event.
```objectivec
- (void) messageDelivered:(id<SINMessageDeliveryInfo>)info {
   NSLog(@"Message with id %@ was delivered to recipient with id  %@",
                                               info.messageId,
                                               info.recipientId);
}
```


### Message delivery failures

Delivering a message can fail for various reasons: there might not be a network available, the recipient does not have instant messaging support, and so on. When a message failed to reach its destination the delegate is notified using the `messageDeliveryFailed:` callback. The reason for failing to deliver a message is propagated back as an array of `SINMessageFailureInfo` instances.
```objectivec
- (void) messageDeliveryFailed:(id<SINMessage>) message info:(NSArray *)messageFailureInfo {
    for (id<SINMessageFailureInfo> reason in messageFailureInfo) {
        NSLog(@"Delivering message with id %@ failed to user %@. Reason %@", 
        reason.messageId, reason.recipientId, [reason.error localizedDescription]);
    }
}
```




> **Note**    
>
> Messages are persisted internally in the SDK. In case the message was not sent successfully it will be retried automatically at a later point in time. The message will be retried for 12 hours and then fail permanently firing the failure callback.



> **Note**    
>
> Messages are stored in the backend for 30 days before being removed. If the recipient has not started the app and downloaded the message history within this time, the message will be lost and no notification received.



> **Note**    
>
> A message should be retried only in case of network unavailability (use `[[failureInfo.error domain] isEqualToString:SINErrorDomainNetwork]`). In this case, create a new instance of `SINOutgoingMessage` (using `+[SINOutgoingMessage messageWithMessage:]`) and send that instance because the previous message is considered stale.

## Receiving a message

Incoming messages are delivered to the delegate:
```objectivec
- (void) messageClient:(id<SINMessageClient>) messageClient 
          didReceiveIncomingMessage:(id<SINMessage>)message {             

  // Present a Local Notification if app is in background
  if([UIApplication sharedApplication].applicationState == UIApplicationStateBackground){

    UILocalNotification* notification = [[UILocalNotification alloc] init];
    notification.alertBody = [NSString stringWithFormat:@"Message from %@",
                                                        [message recipientIds][0]];

    [[UIApplication sharedApplication] presentLocalNotificationNow:notification];
  } else {
    // Update UI in-app
  }

  // Persist incoming message

}
```




> **Note**    
>
> The application handles iOS local notifications for instant messages which is different than how incoming calls are handled. The Sinch SDK manages the local notifications for incoming calls.

## Sending a message to multiple recipients

To send a message to multiple recipients, create the outgoing message with the `+[SINOutgoingMessage messageWithRecipients:text:]`.
```objectivec
NSArray *recipients = @[@"recipient user id 1", @"recipient user id 2"];
SINOutgoingMessage *message = [SINOutgoingMessage messageWithRecipients:recipients text:@"Hi there!"];

[messageClient sendMessage:message];
```


### Receiving status updates for multi-recipient Messages

When a message transitions to a new state it is communicated back using `SINMessageClientDelegate` as the single recipient case. The delegate’s callbacks are triggered once for every recipient.