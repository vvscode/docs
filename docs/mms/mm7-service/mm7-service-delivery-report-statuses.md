---
title: "Delivery Report Statuses"
excerpt: ""
---
The following table lists the responses returned with delivery reports.

|       Status        |     Status text            |          Description                                                                                                                                                                                             |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deferred      | Deferred        | The end user’s handset has retrieved the MMS header, but has not,downloaded the full message from the mobile operator. The end user may,still download the message at a later time.                   |
| Expired       | Expired         | The mobile operator could not contact the handset before reaching the,expiry time. Each mobile operator has their own expiry times after which,they will stop trying to send messages such as an MMS. |
| Forwarded     | Forwarded       | The end user forwarded the MMS to another address without retrieving it.                                                                                                                              |
| Indeterminate | Indeterminate   | The mobile operator could not determine if the message was delivered,correctly. This occurs when the handset cannot return an MMS delivery,report.                                                    |
| NotSupported  | NotSupported    | Request is not supported                                                                                                                                                                              |
| Rejected      | Rejected        | Technical issues/System or Server errors/Content blocked by Mobile Operator/Exceeded MMS Size/ Other errors                                                                                           |
| Retrieved     | Success         | The message was successfully sent to the handset.                                                                                                                                                     |
| Unreachable   | Unreachable     | Server/Endpoint is Unreachable                                                                                                                                                                        |
| Unrecognized  | Unrecognized    | The end user’s handset cannot download the MMS.                                                                                                                                                       |

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/mm7-service/mm7-service-delivery-report-statuses.md"><span class="fab fa-github"></span>Edit on GitHub!</a>