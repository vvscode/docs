---
title: "Send your first WhatsApp message"
excerpt: "By following this step-by-step tutorial you will learn how to send your first WhatsApp Business Message. Read more."
---
To help take some of the burden away when sending messages, Sinch provisions and manages the required cloud compute, storage and database environments of WhatsApp Business, while offering high availability and throughput. This API is the first of many planned channels in our Multichannel Messaging API suite, so watch this space\!

To help you evaluate our WhatsApp Business beta API, we’ve created a sandbox environment which enables you to send messages to your phone.

## Preparation

> 1.  Sign-up with Sinch [here](https://dashboard.sinch.com/signup) to get an account if you don’t already have one.
> 2.  Send the word “tutorial” via SMS, to +13253059420 for US, or +447537453580 for UK and follow the instructions.

## About WhatsApp setup and templates

Sending your first message to WhatsApp Business is like provisioning a US Short Code, but in some ways it’s stricter.

If you reach out to your customer first, you’ll need to choose a defined message template from one of 10 categories. There is no limit to the number of templates you can submit, but approvals take up to 72 hours. In this tutorial you’ll be using a pre-made bot that’s had templates approved already, so you can start right way.

**WhatsApp message flow**
![whatsapp-msg-flow.png](../images/804d38f-whatsapp-msg-flow.png)

> 1.  Customer opt-in is essential before sending any messages. In our sandbox environment you can only opt in on your phone, so in this tutorial just follow the instructions in the SMS messages you receive to enroll.
> 2.  Businesses can only start a conversation with a defined message template.
> 3.  Once you get a reply from your customer, a “conversation” starts. You can then send “session” rich content messages for 24 hours.
> 4.  Every time a customer replies to one of your messages, a new 24-hour cycle starts.
> 5.  If a “session” expires, you’ll need to re-initiate a conversation, starting with a defined message template again.
> 6.  Customers can start a rich content conversation with a business at any time   - this opens up a new 24-hour session.

Right, that’s all the boring stuff out of the way, lets send some messages\!

## The code

### 1. Opt-in

> **Note**
>
>  - In our sandbox environment, we use WhatsApp to provision a key for you. With our sandbox app you can only send messages to your phone.
>  - If you have not already done so, send the word “tutorial”via SMS, to +13253059420 for US, or +447537453580 for UK, and follow the instructions. At the end of the opt-in process you will receive the API-key needed to send messages to WhatsApp.

### 2. Send a templated message to your number

Now you’re ready to start a conversation by sending a templated message, in this case it’s a simple “hello from Sinch”.

```javascript
var botId = 'your-received-bot-id';
var phoneNbr = 'your-phone-number-which-is-whatsapp-enabled';
var bearerToken = 'your-received-bearer-token';

var url = 'https://us1.whatsapp.api.sinch.com/whatsapp/v1/' + botId + '/messages';
var data = {
  to: [phoneNbr],
  message: {
    type: 'template',
    template_name: 'sinch_tutorial',
    params: ['<recipient_name>']
  }
};

var postReq = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
  json: true
};

fetch(url, postReq)
  .then(data => {
    return data.json()
  })
  .then(res => {
    console.log(res)
  })
  .catch(error => console.log(error));
```

### 3. Receive a reply to your message

In a real-world scenario, you’d have a web-hook setup connected to a bot framework or call center to react to any incoming messages, but for the sake of simplicity in this tutorial, reply to the message that just landed in your WhatsApp app.

### 4. Send a custom message to your phone

With WhatsApp there’s a few different message types, you can read more about them [here](https://www.sinch.com/docs/whatsapp/index.html#message).

#### Send a text message

```javascript
var botId = 'your-received-bot-id';
var phoneNbr = 'your-phone-number-which-is-whatsapp-enabled';
var bearerToken = 'your-received-bearer-token';

var url = 'https://us1.whatsapp.api.sinch.com/whatsapp/v1/' + botId + '/messages';
var data = {
  to: [phoneNbr],
  message: {
    type: 'text',
    text: 'Greetings from Sinch'
  }
};

var postReq = {
  method: "POST",
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
  json: true
};


fetch(url, postReq)
  .then(data => {
    return data.json()
  })
  .then(res => {
    console.log(res)
  })
  .catch(error => console.log(error));
```

#### Send an image message

This example shows you how to send an image. Please note that images / videos can be a maximum of 5MB in size and gif files are not supported.

```javascript
var botId = 'your-received-bot-id';
var phoneNbr = 'your-phone-number-which-is-whatsapp-enabled';
var bearerToken = 'your-received-bearer-token';

var url = 'https://us1.whatsapp.api.sinch.com/whatsapp/v1/' + botId + '/messages';
var data = {
  to: [phoneNbr],
  message: {
    type: 'image',
    url: 'https://banner2.kisspng.com/20180602/ocl/kisspng-cats-and-the-internet-lolcat-rage-comic-pet-crazy-cat-5b1287743fec89.5449465715279409802619.jpg'
  }
};

var postReq = {
  method: "POST",
  headers: {
    'Authorization': 'Bearer ' + bearerToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data),
  json: true
};


fetch(url, postReq)
  .then(data => {
    return data.json()
  })
  .then(res => {
    console.log(res)
  })
  .catch(error => console.log(error));
```

If you enjoyed this tutorial and would like to start sending messages to your customers, please email <sales@sinch.com> and we’ll help you set up a full business account where you’ll be able to specify more templates and receive replies.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/javascript/send-your-first-whatsapp-message.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>