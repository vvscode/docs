---
title: "MMS Status Codes"
excerpt: ""
---
|     **StatusCode**            |            **StatusText**                                                   |  **Details**                                                                                                                            |
| -------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1000           | Success                                                       | Successfully parsed and validated request.                                                                                   |
| 2000           | Client error                                                  | Invalid IP Address or Protocol                                                                                               |
| 2002           | Address Error                                                 | Invalid Address                                                                                                              |
| 2004           | Multimedia refused                                            | Carrier refuses content                                                                                                      |
| 2007           | Unable to parse request                                       | Message format corrupt                                                                                                       |
| 2550           | Account disabled                                              | Your account is no longer provisioned for MMS                                                                                |
| 2551           | Account not Provisioned for MM7                               | Your account is not provisioned for MM7 API                                                                                  |
| 2560           | Content length exceeded maximum supported request size        | Reduce the size of the content you are sending.                                                                              |
| 2561           | Invalid sender identification                                 | Sender identification invalid or missing.                                                                                    |
| 2562           | Invalid VASID                                                 | The VASID is your ServiceID                                                                                                  |
| 2563           | Invalid source address                                        | The Shortcode may be incorrect or not provisioned                                                                            |
| 2564           | Invalid VASPID                                                | The VASPID is your API Key                                                                                                   |
| 2565           | Message rejected, reply charging not supported                | Message rejected, reply charging not supported                                                                               |
| 2566           | Invalid carrier                                               | Invalid carrier ID.                                                                                                          |
| 2567           | Missing carrier ID                                            | Carrier ID is required to be passed                                                                                          |
| 2568           | Unable to authenticate                                        | Ensure the HTTP username and password you have specified are correct and formatted properly within the Authorization header. |
| 2500           | Missing or Invalid HTTP header Content-Length or Content-Type | Ensure the HTTP Content-Length and Content Type header are included and valid.                                               |
| 2502           | Missing destination address                                   | Ensure the recipient is specified correctly for the MM7 version that is used.                                                |
| 2503           | Multiple destination addresses not supported                  | Multiple recipients not supported. Instead, create multiple messages                                                         |
| 2504           | Missing source address                                        | Ensure source address is specified correctly for the MM7 version that is used                                                |
| 2505           | Missing or unsupported MM7 Version                            | Ensure specified MM7 version is on the list of supported versions, and is in the format x.y.z                                |

|        StatusCode        |             StatusText                                |            Details                                                                                             |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 2506           | Missing XML element - Content               | Ensure the Content element is included in the SubmitRequest.                                            |
| 2507           | Unsupported namespace                       | Ensure that all the namespaces specified are on the list of supported namespaces.                       |
| 2510           | Missing or Invalid SOAP header              | Ensure the SOAP envelope contains a SOAP header with only the TransactionID element                     |
| 2511           | Missing or Invalid SOAP body                | Ensure the SOAP envelope contains a SOAP body with the SubmitReq                                        |
| 2512           | Unsupported operation                       | SubmitReq is the only supported operation                                                               |
| 2513           | Unable to parse attachment                  | Ensure your attachment is specified, and encoded properly                                               |
| 2514           | Invalid SOAP attachment header Content-Type | Ensure the Content-Type headers of all the attachments are formatted properly                           |
| 2515           | Invalid SOAP body part Content-Type         | Ensure the Content-Type header of the SOAP body part, aka the SOAP envelope part, is formatted properly |
| 3000           | System error                                | Internal system/service error.                                                                          |
| 3001           | Number blacklisted                          | Phone number is blacklisted for receiving messages do not retry                                         |
| 3002           | Charged party not supported                 | Charged Party not supported                                                                             |
| 3003           | Multimedia download failed                  | Using URLs in the MM7 the fetch of content failed or took too long                                      |
| 3510           | Throughput exceeded                         | Throughput exceeded please retry later                                                                  |
| 3520           | Provisioning issue                          | Provisioning problem, please contact your account manager                                               |
| 3500           | Timeout                                     | Carrier gateway timeout                                                                                 |
| 4000           | General service error                       | Carrier rejects the message due to a general service error                                              |
| 4002           | Unsuported MM7 version                      | The carrier does not support this MM7 version                                                           |
| 4003           | Unsupported operation                       | Carrier rejects the message due to unsupported operation or format                                      |
| 4004           | Validation error                            | Validation error                                                                                        |
| 4006           | Service unavailable                         | Carrier capacity reached. Retry later                                                                   |
| 4007           | Service denied                              | Carrier denies service for the recipient address                                                        |

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/mm7-service/mm7-service-mms-status-codes.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>