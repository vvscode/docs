---
title: "Max Price Threshold"
excerpt: ""
---
## Max Price Threshold

Max price threshold enables you to define maximum allowed price per message in a batch, if pricing features are enabled.

This is done by defining *max\_price\_per\_message* as in `send_batch_msg` which prevents from sending messages if the price per message is above the provided threshold. If the threshold is exceeded for one or more messages within a batch, then only those messages will be aborted with 409 status code.