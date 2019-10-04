---
title: "Appendix"
excerpt: ""
---
## Error Code Reference

|   Code       |            Description                                                          |
| -------- | -------------------------------------------------------------------- |
| E100     | Invalid request, please make a valid XML Post request.               |
| E104     | Authentication failed, Invalid API-key.                              |
| E105     | No API access to this user.                                          |
| E106     | Time interval between each API call should be at least X seconds.    |
| E107     | Invalid action. This API user is not allowed to use this action      |
| E108     | Invalid XML. XML parsing failed.                                     |
| E110     | Invalid ‘to’ / receiver number.                                      |
| E111     | Invalid ‘from’ / shortcode.                                          |
| E112     | IP was not whitelisted. API call rejected.                           |
| E113     | Exceeded the allowed throughput for this API action.                 |
| E114     | Phone number is blacklisted. API call rejected.                      |
| E212     | page-number is invalid.                                              |
| E213     | items-per-page is invalid                                            |
| E214     | start-date is invalid.                                               |
| E223     | More than one object is not allowed in the same slide.               |
| E224     | MMS audio/video/image are not allowed with object in the same slide. |
| E225     | Exceeded number of slides allowed for the MMS.                       |
| E226     | MMS audio / video are not allowed in the same slide.                 |
| E227     | MMS video / image are not allowed in the same slide.                 |
| E228     | MMS text cannot exceed X characters.                                 |
| E229     | Content not allowed.                                                 |
| E230     | Invalid / bad slide duration in slide X.                             |
| E241     | Invalid mms-id / MMS do not exist.                                   |
| E311     | Invalid MMS name / name is required.                                 |
| E312     | No slides.                                                           |
| E313     | Slide X is empty.                                                    |
| E314     | Invalid message-subject / message-subject is required.               |
| E331     | Image in slide X is too big.                                         |
| E332     | Audio in slide X is too big.                                         |
| E333     | Video in slide X is too big.                                         |
| E334     | Text in slide X is too long.                                         |
| E335     | vCard in slide X is too big.                                         |
| E336     | iCal in slide X is too big.                                          |
| E337     | PDF in slide X is too big.                                           |
| E338     | Passbook file in slide X is too big.                                 |
| E341     | Image file in slide X is corrupted.                                  |
| E351     | Could not copy Image in slide X.                                     |
| E352     | Could not copy Audio in slide X.                                     |
| E353     | Could not copy Video in slide X.                                     |
| E355     | Could not copy vCard in slide X.                                     |
| E356     | Could not copy iCal in slide X.                                      |
| E357     | Could not copy PDF in slide X.                                       |
| E358     | Could not copy Passbook file in slide X.                             |
| E618     | Carrier lookup failed. Please retry.                                 |
| E619     | Carrier not provisioned.                                             |
| E620     | mms-id is required.                                                  |
| E622     | fallback-sms-text is required.                                       |
| E626     | MMS not available. Encoding in progress, try again later.            |
| E627     | Invalid service-id / service-id is required.                         |
| E628     | Mobile operator / carrier not supported.                             |
| E629     | Unrecognized content type.                                           |
| E650     | Invalid operator-id / operator-id is required.                       |
| E651     | Invalid operator-id / operator-id not found in the system.           |

## Postback Notification Codes

|    Code      |        Description                                                                 |
| -------- | ----------------------------------------------------------------------- |
| E100     | Invalid request, please make a valid XML Post request.                  |
| E002     | Encoding of MMS audio failed. (saveMMS function)                        |
| E003     | Encoding of MMS video failed. (saveMMS function)                        |
| E012     | Encoding of MMS audio failed. (sendMMS function)                        |
| E013     | Encoding of MMS video failed. (sendMMS function)                        |
| E101     | Error occurred. Impossible to send MMS.                                 |
| E102     | Error occurred. MMS Delivery was not successful.                        |
| E202     | Error occurred. MMS as SMS Delivery was not successful.                  |
| E501     | Error occurred. Impossible to send DDM Message.                         |
| E502     | Error occurred. DDM Delivery was not successful.                        |
| E999     | Post Message Sending Queue Processing Errors.                           |
| N101     | Notification that MMS was sent.                                         |
| N102     | Notification that MMS status was updated.                               |
| N202     | Notification that MMS was delivered as SMS.                             |
| N401     | MMS MO received successfully.                                           |
| N501     | Notification that Device Discovery Message is sending.                  |
| N502     | Notification that Device Discovery Message delivery status has changed. |
| E002     | Encoding of MMS audio failed. (saveMMS function)                        |
| E003     | Encoding of MMS video failed. (saveMMS function)                        |
| E012     | Encoding of MMS audio failed. (sendMMS function)                        |
| E013     | Encoding of MMS video failed. (sendMMS function)                        |
| E101     | Error occurred. Impossible to send MMS.                                 |
| E102     | Error occurred. MMS Delivery was not successful.                        |
| E202     | Error occurred. MMS as SMS Delivery was not successful.                  |
| E501     | Error occurred. Impossible to send DDM Message.                         |
| E502     | Error occurred. DDM Delivery was not successful.                        |
| E999     | Post Message Sending Queue Processing Errors.                           |
| N101     | Notification that MMS was sent.                                         |
| N102     | Notification that MMS status was updated.                               |
| N202     | Notification that MMS was delivered as SMS.                             |
| N401     | MMS MO received successfully.                                           |
| N501     | Notification that Device Discovery Message is sending.                  |
| N502     | Notification that Device Discovery Message delivery status has changed. |

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/xml-service-appendix.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>