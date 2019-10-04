---
title: "Sinch MMS MO Postbacks"
excerpt: ""
---
> **Note**    
>
> MO MMS functionality is limited to Verizon, Sprint and T-Mobile initially. MO MMS for AT\&T will be supported shortly after commercial launch.

The MMS MO postback API notifies you that a customer has replied to your message, or interacted to one of your keywords.

## MMS MO Information
To receive MMS MO postback you need to work with your Sinch Account Manager to provision with your account. Once the MMS MO postback is enabled you will start receiving postbacks for each MMS MO received on the MMS MO Keyword or Short Code.

## The MMS MO
This postback notifies you when an MMS MO is received.

|     Variable            |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    Description   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| code            | N401                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| origin          | MMS\_MO                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| from            | The phone number, including the country code of the sender                                                                                                                                                                                                                                                                                                                                                                                                                           |
| to              | The recipient shortcode                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| keyword         | If a keyword was recognized in the first word of the subject or the,first word body of the message and it matched to a MMS Inbox Keyword,campaign that keyword will be passed in this node                                                                                                                                                                                                                                                                                           |
| tracking-id     | A tracking ID, Sinch has assigned this message                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| operator-id     | The operator-id of the sender’s carrier                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| timestamp       | The timestamp that our system received the MMS MO                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| message-subject | The subject sent in the MMS MO                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| content         | Contains the file nodes sent in the MMS MO                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| file            | A series of sub-nodes that contains a single URL to a picture,,video, audio or text file sent in the MMS MO within each node. The URL,points to the location of the content on our servers. For those,developing the back-end handling of the postback URL, you may choose to,download/store these content files for whatever purpose you see fit. You,may also choose to store the URLs for download at a future time. The,file will be removed based on the terms of your contract |

### MMS MO Example

**MMS MO**
```xml
<postback>
    <origin>MMS_MO</origin>
    <code>N401</code>
    <from>14082257140</from>
    <to>28444</to>
    <keyword>all</keyword>
    <tracking-id>MMS_MO_iLnCRrL6</tracking-id>
    <operator-id>31002</operator-id>
    <timestamp>2014-02-03T11:19:49-05:00</timestamp>
    <message-subject></message-subject>
    <content>
        <file>URL of Content Here</file>
        <file>URL of Content Here</file>
        <file>URL of Content Here</file>
    </content>
</postback>
```

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/xml-service-mms-mo-postbacks.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>