---
title: "Limiting Message Parts"
excerpt: "Learn how to control the number of messages parts that can be sent for a single outbound message from your account"
---
With max number of message parts you can specify whether the message should be dispatched. If a message is split into more parts than `max_number_of_message_parts` then it will not be delivered and status code will be `411`.

A default `max_number_of_message_parts` can be configured at the account level by your account manager. If the `max_number_of_message_parts` parameter is specified when creating a batch, it will override the default value configured by your account manager.

When `max_number_of_message_parts` parameter is set or the default value is configured, `number_of_message_parts` parameter will be included in recipient delivery report.



<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-limiting-message-parts.md"><span class="fab fa-github"></span>Edit on GitHub!</a>