---
title: Receive Messages From Facebook Messenger
excerpt: >-
  Learn how to receive messages from Facebook Messenger
hidden: true
---
# Receive Message via webhook
This guide will show you how to receive a messages from Facebook Messenger. Make sure to have your Facebook account and Conversation App setup before preceding to the next steps.


## Create a simple webhook using Node.js
After creating a new node app, paste this into index.js
```javascript
const express = require("express"),
      bodyParser = require("body-parser"),
      app = express().use(bodyParser.json());
      port = 3000;

app.post("/webhook", (req, res) => {
  let body = req.body;
  let {
    message: {
      contact_message: {
        text_message: { text },
      },
    },
  } = body;
  console.log(text);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening to ${port}..`));
```
This code will allow you to listen for incoming messages and will parse out the text message content.
If you want to see the payload not parsed, add `console.log(JSON.stringify(body, null, 2));`

Before you can handle incoming traffic to your local server, you need to open up a tunnel to your local server, for that you can use [ngrok](https://ngrok.com/) tunnel. Open a terminal/command prompt and type: `ngrok http 3000`

![](https://i.imgur.com/HHpIHIp.png)
## Configure webhook in Conversation App
Go to your Conversation App dashboard and scroll down to **Webhooks**. Then click **Add Webhook**.
![enter image description here](https://i.imgur.com/lPERUIP.png)

Fill in the following:

Set **Target Type** to HTTP

Set **Target URL** as your Ngrok url

Set **Triggers** with only `MESSAGE_INBOUND`

Since we are only dealing with messages coming in, `MESSAGE_INBOUND` will be the only trigger used.

![enter image description here](https://i.imgur.com/D2jrTzc.png)

Now your webhook is setup with Conversation App.

## Initiate Message and reply
Before starting a message, make sure your index.js is running along with ngrok at port 3000 or which port you set as your default.
Send a message on Facebook Messenger.

![enter image description here](https://i.imgur.com/Pfifnvj.png)

![enter image description here](https://i.imgur.com/kuLn8kq.png)

Now that you have a HTTP server listening and receiving a message from Messenger, now we can send a message back using Sinch Conversation Api!


```javascript 

const express = require('express');
      bodyParser = require('body-parser');
      app = express().use(bodyParser.json());
      port = 3000;

// Add the following code
const fetch = require('node-fetch'),
      SINCH_ACCOUNT_ID = 'SINCH_ACCOUNT_ID',
      SINCH_ACCOUNT_TOKEN='SINCH_ACCOUNT_TOKEN',
      SINCH_APP_ID = 'SINCH_APP_ID',

  getAuthToken = () => {
    return Buffer.from(`${SINCH_APP_ID}:${SINCH_ACCOUNT_TOKEN}`).toString(
      'base64',
    );
  },
  sendMessage = (contact_id, text) => {
    const URL = `https://api.conversation-api.prod.sinch.com/v1beta/accounts/${SINCH_ACCOUNT_ID}/messages:send`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${getAuthToken()}`,
      },
      body: JSON.stringify({
        app_id: SINCH_APP_ID,
        recipient: {
          contact_id,
        },
        message: {
          text_message: {
            text,
          },
        },
        channel_priority_order: ['MESSENGER'],
      }),
    };
     return fetch(URL, options);
  };


app.post('/webhook', (req, res) => {
  let body = req.body;
  let {
    message: {
      contact_message: {
        text_message: { text },
      },
    },
  } = body;

    // Add a simple if-else statement here  
  if (text) {
       sendMessage('CONTACT_ID', 'Hello World').then(r => r.json()).then(res => console.log(res));
  } else {
        return null;
  }

    console.log(text);
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening to ${port}..`));

```

Now your webhook is ready to receive and send a message back