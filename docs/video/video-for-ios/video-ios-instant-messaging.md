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

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-ios/video-ios-instant-messaging.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>