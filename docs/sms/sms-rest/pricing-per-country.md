---
title: "Pricing Per Country"
excerpt: ""
---
## Pricing Per Country

Pricing per country enables you to send messages to different countries at different prices. A service plan can be enabled with these pricing features by configuring the following, if requested

>   - Default price of the service plan.
>   - Currency ISO (such as USD, EUR, etc., see [ISO-4217](https://www.iso.org/iso-4217-currency-codes.html) ).
>   - Different prices for different countries.

When sending the batch, the pricing will be made using the configured price for the country which targeted MSISDN belongs to, if the pricing features are enabled. If no price configured for the country which target MSISDN belongs to, then the pricing will be made using the configured default price.

The Pricing details can be retrieved for the submitted batch as in `retrieve_delivery_report` and for the specific message as in `retrieve_recipient_delivery_report`.

**NB: Note that the price in delivery report is subject to change until the messages reach final state.**

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/pricing-per-country.md"><span class="fab fa-github"></span>Edit on GitHub</a>