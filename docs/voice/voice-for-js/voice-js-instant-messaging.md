---
title: "Instant Messaging"
excerpt: ""
---
The `MessageClient` is the entry point to Instant Messaging functionality in the Sinch SDK.

Messages are sent and incoming messages are received through the `MessageClient`. An instance of `MessageClient` is owned by an instance of `SinchClient` and retrieved using `sinchClient.getMessageClient()`. Instant messaging is not enabled by default. In order to enable instant messaging, pass `messaging: true` in the list of capabilities when instantiating `SinchClient`.

Here is an example for how to set up the sinchClient, messageClient and add listeners for incoming messages and delivered messages.
```javascript
var sinchClient = new SinchClient({
    applicationKey: '<application_key>',
    capabilities: {messaging: true},
});

var messageClient = sinchClient.getMessageClient();

var myListenerObj = {
    onMessageDelivered: function(messageDeliveryInfo) {
        // Handle message delivery notification
    },
    onIncomingMessage: function(message) {
        // Handle incoming message
    }
};

messageClient.addEventListener(myListenerObj);
```




> **Note**    
>
> The getMessageClient() requires a sinchClient with the messaging capability set to true

## Send a message

Sending a message with the Sinch SDK is easy. First, get hold of a `MessageClient` instance for a particular `SinchClient` instance. This can be done by calling the method `getMessageClient()`. Then use this instance to create a new `Message` object. This object can then be sent using `send()` in your `MessageClient` instance.
```javascript
// Get the messageClient
var messageClient = sinchClient.getMessageClient(); 

// Create a new Message
var message = messageClient.newMessage('Alice', 'Hello World!');

// Send it
messageClient.send(message);
```


This example will send *‘Hello World’* to the user with username *‘Alice’*.

## Message sent success or failure

The send method returns a promise which can be used to chain a method when message was sent, this is specified using `.then()`. You can also supply two callbacks, one to be invoked on success and one for error.
```javascript
// Create a new Message
var message = messageClient.newMessage('Alice', 'Hello World!');

// Success and fail handlers
var handleSuccess = function() {...};
var handleFail = function() {...};

// Alt 1: Send it with success and fail handler
messageClient.send(message, handleSuccess, handleFail)

// Alt 2: Send it and append handlers using the promise returned
messageClient.send(message)
    .then(handleSuccess)
    .then(some_other_success) 
    .fail(handleFail);
```




> **Note**    
>
> If both callbacks and promises are used, the execution order is for callbacks to be executed first, followed by the methods in the promise-chain, specified using \`\`.then()\`\`

### Alternative user identity

When sending to other identities than username, supply an object where the key is the identification type and the value is the user identity. For example.
```javascript
// Create a new Message
var message = messageClient.newMessage({email: 'alice@example.com'}, 'Hello World')
```


Valid identities for users are:

>   - *username* any alphanumeric string
>   - *email* avalid e-mail adress
>   - *number* a phone number

> **Note**    
>
> At the moment, sending to other identities than username is not
> implemented.

## Delivery receipt

When a client receives a message, it sends an acknowledgement indicating which message was received. You can listen to these delivery receipts and take suitable action, for example, displaying which users have read a particular message.

All delivery receipts are sent to all `onMessageDelivered` listeners in the array of listeners managed by messageClient. In order to add your own listener, use the `addEventListener()` method in your messageClient.
```javascript
// Retrieve messageClient for a particular sinchClient
var messageClient = sinchClient.getMessageClient();

// Define custom event listener
var myEventListener = {
    onMessageDelivered: function(messageDeliveryInfo) {
        // Perform action on message
        console.log(messageDeliveryInfo);
    },
    ...
}

// Add event listener
messageClient.addEventListener(myEventListener);
```




> **Note**    
>
> If a recipient is online on one or multiple devices, the delivery report listener will only be called once on the first delivery receipt.

In order to remove a specific event listener, use the method `removeEventListener()`
```javascript
// Define a custom event listener object
var myEventListener = {...};

// Add listener object
messageClient.addEventlistener(myEventListener);

// Remove listener object
messageClient.removeEventListener(myEventListener); 
```




> **Note**    
>
> Several event listeners can be added, and they will be executed in the order which they were added.

## Receive a message

In order to receive messages, `SinchClient` must be instantiated either with configuration option `supportActiveConnection` set to true or by invoking `startActiveConnection` after your `SinchClient` object has successfully started.
```javascript
var sinchClient = new SinchClient({
    applicationKey: '<application_key>',
    capabilities: {messaging: true},
    supportActiveConnection: true,
});
```


All incoming messages are sent to all `onIncomingMessage` listeners in the array of listeners managed by an instance of `MessageClient`. In order to add one or more of your own listeners, use the `addEventListener()` method on a particular `MessageClient` instance.
```javascript
// Retrieve messageClient for a particular sinchClient
var messageClient = sinchClient.getMessageClient();

// Define custom event listener
var myEventListener = {
    onIncomingMessage: function(message) {
        // Perform action on message
        console.log(message);
    },
    ...
}

// Add event listener to an array
messageClient.addEventListener(myEventListener);
```


In order to remove an event listener, use the method `removeEventListener()`
```javascript
// Define a custom event listener object
var myEventListener = {...};

// Add this listener object
messageClient.addEventlistener(myEventListener);

// Remove this listener object
messageClient.removeEventListener(myEventListener); 
```




> **Note**    
>
> Several event listeners can be added, they will be executed in the order which they where added.

## Send a message to multiple recipients

When creating a new message, it’s possible to define *multiple recipients* by giving an array of recipients instead of a username string or identity object.
```javascript
// Retrieve messageClient for particular sinchClient
var messageClient = sinchClient.getMessageClient();

// Create a new message for multiple recipients
var message = messageClient.newMessage(['Alice', 'Bob'], 'Hello Alice and Bob');

// Send message
messageClient.send(message); 
```


Both user *‘Alice’* and *‘Bob’* will receive the message. The success callback will only be called once, but there will be multiple delivery receipt listener callbacks, one for each recipient.

In order to send to multiple recipients with alternative identities, such as e-mail or phone number, supply an array of objects instead of an array with usernames.
```javascript
// Retrieve messageClient for particular sinchClient
var messageClient = sinchClient.getMessageClient();

// Create a new message for multiple recipients, using number as their identity
var message = messageClient.newMessage([{number: 123456}, {number: 654321}], 'Hello Alice and Bob');

// Send message
messageClient.send(message); 
```


This will send the same *“Hello World”* message to the users identified by the numbers *123456* and *654321* respectivley.

## Receiving recipient status updates for multi-recipient messages

The recipient’s state transition to delivered for the message is communicated back using the same listener as in the single recipient case. The listener’s callbacks are triggered for every recipient and only, at most, once per recipient.