---
title: "Unsupported MM7 SOAP Elements"
excerpt: ""
---
## MM7\_Submit.REQ

|       **Element**     |     **Behavior**       |      **Description**                                                                                                                                                                                                                                                                          |
| --------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApplicID              | Stripped               | This information element contains the identification of the,destination application. Upon reception, the recipient MMS VAS,Application shall provide this MM7\_retrieve.REQ to the specified,destination application                                                                          |
| AuxApplicInfo         | Stripped               | If present, this information element indicates additional application/implementation specific control information                                                                                                                                                                             |
| ChargedParty          | Error                  | An indication which party is expected to be charged for an MM submitted,by the VASP, e.g. the sending, receiving, both parties third party or,neither. Possible values are “Sender”, “Recipient”, “Both”, “Neither”                                                                           |
| ChargedPartyID        | Error                  | The address/id of the third party which is expected to pay for the MM                                                                                                                                                                                                                         |
| ContentClass          | Stripped               | Classifies the content of the MM to the smallest content class to which,the MM belongs. Possible values are “text”, “image-basic”, “image-rich”,,“video-basic”, “video-rich”, “megapixel”, “content-basic”,,“content-rich”                                                                    |
| DeliveryCondition     | Stripped               | If the condition is met the MM shall be delivered to the recipient MMS,User Agent, otherwise the MM shall be discarded. The initial values are:,MMS capable only; HPLMN only; any other values can be added based on,bilateral agreements between the MMS Relay/Server operator and the VASP. |
| DeliveryReport        | Default to true        | A request for delivery report. Boolean value true/false. Ask your account manager to turn off delivery reports.                                                                                                                                                                               |
| DistributionIndicator | Stripped               | If set to ‘false’ the VASP has indicated that content of the MM is,not intended for redistribution. If set to ‘true’ the VASP has indicated,that content of the MM can be redistributed. Boolean value true/false                                                                             |
| DRMContent            | Stripped               | Indicates if the MM contains DRM-protected content. Boolean value true/false                                                                                                                                                                                                                  |
| EarliestDeliveryTime  | Stripped               | The earliest desired time of delivery of the MM to the recipient (time stamp). Date format is absolute or relative                                                                                                                                                                            |
| ExpiryDate            | Default to 3 days      | The desired time of expiry for the MM (time stamp). Date format is absolute.                                                                                                                                                                                                                  |
| LinkedID              | Stripped               | This identifies a correspondence to a previous valid message delivered to the VASP.                                                                                                                                                                                                           |
| MessageClass          | Pass Through           | Class of the MM (e.g. “Informational”, “Advertisement”, “Auto”)                                                                                                                                                                                                                               |
| Priority              | Pass Through           | The priority (importance) of the message. Possible values are “High”, “Normal”, “Low”                                                                                                                                                                                                         |
| ReadReply             | Stripped               | A request for confirmation via a read report to be delivered. Boolean,true/false value. Set it ‘true’ to receive MM7 Read Replies.                                                                                                                                                            |
| ReplyApplicID         | Stripped               | If present, this information element indicates a “reply path”. It,contains the application identifier which shall be used by the recipient,MMS VAS Application when a reply-MM or a read-reply report is created                                                                              |
| ReplyCharging         | Error                  | A request for reply-charging. No value. Presence implies true                                                                                                                                                                                                                                 |
| replyChargingSize     | Error                  | In case of reply-charging the maximum size for reply-MM(s) granted to,the recipient(s). Optional attribute of ReplyCharging element. Positive,integer value                                                                                                                                   |
| replyDeadline         | Error                  | In case of reply-charging the latest time of submission of replies,granted to the recipient(s) (time stamp). Optional attribute of,ReplyCharging element. Date format is absolute or relative                                                                                                 |
| ServiceCode           | Pass Through           | Information supplied by the VASP which may be included in,charging/billing information. The syntax and semantics of the content of,this information are out of the scope of this specification.                                                                                               |
| TimeStamp             | Default to Submit time | The time and date of the submission of the MM (time stamp)                                                                                                                                                                                                                                    |

## MM7\_Deliver.REQ

|    **Element**   |    **Description**                                                                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApplicID         | The presence of this information element indicates that this abstract,message shall be provided to an application residing on an MMS User,Agent. It contains the identification of the destination application |
| AuxApplicInfo    | If present, this information element indicates additional application/implementation specific control information                                                                                              |
| MMSRelayServerID | Identifier of the MMS Relay/Server                                                                                                                                                                             |
| RecipientSPI     | The SPI of the intended MM recipient, in case the MM was delivered to VASP based on the recipient address                                                                                                      |
| ReplyApplicID    | If present, this information element indicates a “reply path”, i.e. the,identifier of the application to which delivery reports, read-reply,reports and reply-MMs are addressed if any                         |
| ReplyChargingID  | In case of reply-charging when the reply-MM is submitted within the,MM7\_deliver.REQ this is the identification of the original MM that is,replied to.                                                         |
| SenderSPI        | The SPI of the MM originator                                                                                                                                                                                   |

## MM7\_DeliveryReport.REQ

<div class="magic-block-html">
    <div class="marked-table">
        <table>
        <thead>
          <tr>
            <th>Element</th>
            <th>Description</th>
          </tr>
        </thead>
            <tbody>
            <tr class="even">
                <td>ApplicID</td>
                <td>This information element indicates the identification of the application,that the delivery report is intended for. If a Reply-Applic-ID was,indicated in the corresponding original MM, the recipient MMS,Relay/Server shall set its value to that Reply-Applic-ID value. Otherwise, the recipient MMS Relay/Server shall set its value to the,Applic-ID value that was indicated in the corresponding original MM</td>
            </tr>
            <tr class="odd">
                <td>AuxApplicInfo</td>
                <td>If present, this information element indicates additional,application/implementation specific control information. The recipient,MMS Relay/Server shall insert it if Aux-Applic-Info was indicated in the,corresponding original MM, in which case its value shall equal that Aux-Applic-Info value</td>
            </tr>
            <tr class="even">
                <td>MMSRelayServerID</td>
                <td>Identifier of the MMS Relay/Server</td>
            </tr>
            <tr class="odd">
                <td>ReplyApplicID</td>
                <td>If present, this information element indicates a “reply path” to,this delivery report, i.e. the identification of an application to which,reply-MMs are addressed.
                    The recipient MMS Relay/Server shall insert it, into the MM1_DeliveryReport.REQ if the values of Applic-ID and,Reply-Applic-ID in the corresponding original MM differ, in which case,its value shall equal the Applic-ID value that was indicated in the,corresponding original MM</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/mm7-service/unsupported-mm7-soap-elements.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>