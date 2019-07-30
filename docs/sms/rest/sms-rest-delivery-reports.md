---
title: "Delivery Reports"
excerpt: ""
---
The REST API uses message statuses and error codes in delivery reports, which refer to the state of the SMS batch and can be present in either [Retrieve a delivery report](doc:batches-endpoint#section-retrieve-a-delivery-report) or sent to a [callback](doc:sms-rest-callback).

This section describes the statuses and codes returned in those delivery reports.

### Delivery Report Statuses

The status field describes which state a particular message is in. Please note that statuses of type Intermediate will only be reported if you request a status per recipient ([Retrieve a recipient delivery report](doc:batches-endpoint#section-retrieve-a-recipient-delivery-report)), no callback will be made to report them. The following statuses are available when using the REST API:
[block:parameters]
{
  "data": {
    "h-0": "Status",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "Queued",
    "1-0": "Dispatched",
    "2-0": "Aborted",
    "3-0": "Rejected",
    "4-0": "Delivered",
    "5-0": "Failed",
    "6-0": "Expired",
    "7-0": "Unknown",
    "0-1": "Intermediate",
    "1-1": "Intermediate",
    "2-1": "Final",
    "3-1": "Final",
    "4-1": "Final",
    "5-1": "Final",
    "6-1": "Final",
    "7-1": "Final",
    "0-2": "Message is queued within REST API system and will be dispatched according to the rate of the account.",
    "1-2": "Message has been dispatched and accepted for delivery by the SMSC.",
    "2-2": "Message was aborted before reaching the SMSC.",
    "3-2": "Message was rejected by the SMSC.",
    "4-2": "Message has been delivered.",
    "5-2": "Message failed to be delivered.",
    "6-2": "Message expired before delivery to the SMSC. This may happen if the expiry time for the message was very short.",
    "7-2": "Message was delivered to the SMSC but no Delivery Receipt has been received or a Delivery Receipt that could not be interpreted was received."
  },
  "cols": 3,
  "rows": 8
}
[/block]
### Delivery Report Error Codes

The delivery report status code provides a more detailed view of what happened with a message. The REST API shares most of its error codes with other SMS services.

These are defined [here](doc:cloud-smpp#section-error-codes).

In addition to these standard error codes, the REST API provides an additional set of error codes, all within the 4xx range (vendor specific errors in the range of 0x400 to 0x4FF as referenced in the SMPP specification). These are listed below:
[block:parameters]
{
  "data": {
    "h-0": "Status code (Hex)",
    "h-1": "Name",
    "h-2": "Status",
    "h-3": "Description",
    "0-0": "400",
    "0-1": "Queued",
    "0-2": "Queued",
    "0-3": "Message is queued within REST API system and will be dispatched according to the rate of the account.",
    "1-0": "401",
    "1-1": "Dispatched",
    "1-2": "Dispatched",
    "1-3": "Message has been dispatched to SMSC.",
    "2-0": "402",
    "2-1": "Message unroutable",
    "2-2": "Aborted",
    "2-3": "SMSC rejected message. Retrying is likely to cause the same error.",
    "3-0": "403",
    "3-1": "Internal error",
    "3-2": "Aborted",
    "3-3": "An unexpected error caused the message to fail.",
    "4-0": "404",
    "4-1": "Temporary delivery failure",
    "4-2": "Aborted",
    "4-3": "Message failed because of temporary delivery failure. Message can be retried.",
    "5-0": "405",
    "5-1": "Unmatched Parameter",
    "5-2": "Aborted",
    "5-3": "One or more parameters in the message body has no mapping for this recipient. See [Parameterization](doc:parameterization)",
    "6-0": "406",
    "6-1": "Internal Expiry",
    "6-2": "Aborted",
    "6-3": "Message was expired before reaching SMSC. This may happen if the expiry time for the message was very short.",
    "7-0": "407",
    "7-1": "Canceled",
    "7-2": "Aborted",
    "7-3": "Message was canceled by user before reaching SMSC.",
    "8-0": "408",
    "8-1": "Internal Reject",
    "8-2": "Aborted",
    "8-3": "SMSC rejected the message. Retrying is likely to cause the same error.",
    "9-0": "409",
    "9-1": "Price threshold exceeded",
    "9-2": "Aborted",
    "9-3": "Message failed as the price of the message exceeds the defined threshold.",
    "10-0": "410",
    "10-1": "Unmatched default originator",
    "10-2": "Aborted",
    "10-3": "No default originator exists/configured for this recipient when sending message without originator.",
    "11-0": "411",
    "11-1": "Exceeded parts limit",
    "11-2": "Aborted",
    "11-3": "Message failed as the number of message parts exceeds the defined max number of message parts."
  },
  "cols": 4,
  "rows": 12
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "New error codes may be added over time."
}
[/block]