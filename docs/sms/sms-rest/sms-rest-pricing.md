---
title: "Pricing & Price Threshold"
excerpt: ""
---
## Pricing Per Country

Pricing per country enables you to send messages to different countries at different prices. A service plan can be enabled with these pricing features by configuring the following, if requested:

 * Default price of the service plan.
 * Currency (such as USD, EUR, etc., see [ISO-4217](https://www.iso.org/iso-4217-currency-codes.html) ).
 * Different prices for different countries.

When sending the batch, the pricing will be made using the configured price for the country each MSISDN recipient belongs to, if the pricing features are enabled. If no price is configured for a given country, then the message will be priced according to the configured default price.

The pricing details can be retrieved for a submitted batch in `retrieve_delivery_report` and for the specific message as in `retrieve_recipient_delivery_report`.

**NB: Note that the price in delivery report is subject to change until the messages reach their final state.**

## Max Price Threshold

Max price threshold enables you to define a maximum allowed price per message in a batch, if pricing features are enabled.

This is done by defining `max_price_per_message` in `send_batch_msg` which prevents from sending messages if the price per message is above the provided threshold. If the threshold is exceeded for one or more messages within a batch, then only those messages will be aborted with 409 status code.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-pricing.md"><span class="fab fa-github"></span>Edit on GitHub</a>