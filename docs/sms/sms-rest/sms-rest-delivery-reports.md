---
title: "Delivery Reports"
excerpt: ""
---
The REST API uses message statuses and error codes in delivery reports, which refer to the state of the SMS batch and can be present in either [Retrieve a delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-delivery-report) or sent to a [callback](doc:sms-rest-callback).

This section describes the statuses and codes returned in those delivery reports.

### Delivery Report Statuses

The status field describes which state a particular message is in. Please note that statuses of type Intermediate will only be reported if you request a status per recipient ([Retrieve a recipient delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-recipient-delivery-report)), no callback will be made to report them. The following statuses are available when using the REST API:

| Status     | Type         | Description                                                                                                                                   |
|-- -        | ---          | ---                                                                                                                                         --|
| Queued     | Intermediate | Message is queued within REST API system and will be dispatched according to the rate of the account.                                         |
| Dispatched | Intermediate | Message has been dispatched and accepted for delivery by the SMSC.                                                                            |
| Aborted    | Final        | Message was aborted before reaching the SMSC.                                                                                                 |
| Rejected   | Final        | Message was rejected by the SMSC.                                                                                                             |
| Delivered  | Final        | Message has been delivered.                                                                                                                   |
| Failed     | Final        | Message failed to be delivered.                                                                                                               |
| Expired    | Final        | Message expired before delivery to the SMSC. This may happen if the expiry time for the message was very short.                               |
| Unknown    | Final        | Message was delivered to the SMSC but no Delivery Receipt has been received or a Delivery Receipt that could not be interpreted was received. |

### Delivery Report Error Codes

The delivery report status code provides a more detailed view of what happened with a message. The REST API shares most of its error codes with other SMS services.

These are defined [here](doc:sms-other-cloud-smpp#section-error-codes).

In addition to these standard error codes, the REST API provides an additional set of error codes, all within the 4xx range (vendor specific errors in the range of 0x400 to 0x4FF as referenced in the SMPP specification). These are listed below:

| Status Code (Hex) | Name                         | Status     | Description                                                                                                                         |
| ----------------- | ---------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 400               | Queued                       | Queued     | Message is queued within REST API system and will be dispatched according to the rate of the account.                               |
| 401               | Dispatched                   | Dispatched | Message has been dispatched to SMSC.                                                                                                |
| 402               | Message unroutable           | Aborted    | SMSC rejected message. Retrying is likely to cause the same error.                                                                  |
| 403               | Internal error               | Aborted    | An unexpected error caused the message to fail.                                                                                     |
| 404               | Temporary delivery failure   | Aborted    | Message failed because of temporary delivery failure. Message can be retried.                                                       |
| 405               | Unmatched Parameter          | Aborted    | One or more parameters in the message body has no mapping for this recipient. See [Parameterization](doc:sms-rest-parameterization) |
| 406               | Internal Expiry              | Aborted    | Message was expired before reaching SMSC. This may happen if the expiry time for the message was very short.                        |
| 407               | Canceled                     | Aborted    | Message was canceled by user before reaching SMSC.                                                                                  |
| 408               | Internal Reject              | Aborted    | SMSC rejected the message. Retrying is likely to cause the same error.                                                              |
| 410               | Unmatched default originator | Aborted    | No default originator exists/configured for this recipient when sending message without originator.                                 |
| 411               | Exceeded parts limit         | Aborted    | Message failed as the number of message parts exceeds the defined max number of message parts.                                      |
| 412               | Unprovisioned region         | Aborted    | SMSC rejected the message. The account has not been provisioned for this region.                                                    |

> **Note**    
>
> New error codes may be added over time.


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-delivery-reports.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>