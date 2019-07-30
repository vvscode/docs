---
title: "Introduction"
excerpt: "WhatsApp for Bussiness messaging"
---
## Introduction
The Sinch WhatsApp Business Messaging API provides a rich, enterprise-grade messaging solution for clients who wish to communicate with their customers via WhatsApp.

With over 1.5bn users globally using WhatsApp regularly to communicate with friends and family, it does represent the digital extension of the users living room. It’s the inner circle of your customer’s communication, so bringing your trusted brand communications to that inner circle has huge potential.

Integrating the Sinch WhatsApp Business Messaging API with your own backend systems enables Rich, High fidelity, contextual conversations via the WhatsApp channel.

This API specification covers the range of features available.

## Authentication
The Sinch WhatsApp API securely authenticates via a bot identifier and bearer token pair. During the initial client onboarding process, these will are by your account manager.

For all WhatsApp end-points it is required that you set the bearer token in the Authorization HTTP header:

Authorization: Bearer AbCdEf123456. 

Where the string "AbCdEf123456" is the bearer authorization token.

## BearerAuth
[block:parameters]
{
  "data": {
    "0-0": "Security scheme type:",
    "1-0": "HTTP Authorization Scheme",
    "0-1": "HTTP",
    "1-1": "bearer"
  },
  "cols": 2,
  "rows": 2
}
[/block]