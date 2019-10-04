---
title: "sendSavedMMS"
excerpt: ""
---
## Overview 
This API sends stored content from a specified account using an MMSID to a single mobile number. FROM must be one of the shortcodes allowed for your account. In case the number is from a different country than the FROM shortcode is assigned to the default shortcode for those countries will be used.

### Content Transcoding
Every binary MMS we deliver can be transcoded for the destination handset and every web page we deliver is transcoded for the browsing handset. To transcode a binary MMS we must know what type of handset the user has. We are able to obtain this handset type information from delivery receipts and store the record in a handset cache for later use. We have a database of attributes which we manually match to every new handset in the cache so we can adapt the content during MMS delivery.

Our API allows you to dynamically change the text of each slide by setting up optional CUSTOMTEXT (CUSTOMTEXT must include mandatory fields: value and slide) and MMS Subject by setting CUSTOMSUBJECT.

### Device Discovery Message (DDM)
Device Discovery Message is a short textual MMS message that is sent to the number to discover what handset the end user is using. We store this handset information in our system and reuse it, so a DDM is sent only to new numbers. If the DDM settings are not included within your API call and the number is not in the handset cache we will deliver the MMS with generic settings. If the handset is in the handset cache the DDM will not be sent and the MMS message will be transcoded and delivered immediately. You can force sending of DDM (regardless if number is cached) by setting DDMFORCE to 'true'

Our API allows you to customize DDM by setting 3 parameters:

  - **DDMTITLE:** - This is the DDM title (optional, if not set then "Device Discovery" text will be used).
  - **DDMTEXT:** - This is the DDM body (mandatory).
  - **DDMTIMEOUT** - (in minutes) When we send DDM we wait for the Delivery Report which contain the handset profile. In some cases we do not receive it or it takes very long (handset turned off or out of range). This variable tells the system how long should it wait for DDM Delivery Report before sending actual content using Default parameters. Default value of this parameter is 5 minutes.


**Request Parameters:**

- Mandatory: action, api-key, fallback-sms-text, from, mms-id, service-id, to 
- Optional: custom-subject, custom-text, data, ddm-force, ddm-message-text, ddm-message-subject, ddm-message-timeout, operator-id

**Response Parameters:**  
>  status, to, from, mmsId, trackingId, errorCode, errorInfo

**Related Error Codes:**  
>  E107, E110, E111, E114, E241, E503, E618, E619, E620, E622, E626, E627, E628, E629, E650

### Request Example

**sendSavedMMS Request**
```xml
<request>
    <action>sendSavedMMS</action>
    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>
    <to>14044790000</to>
    <from>28444</from>
    <service-id>12345</service-id>
    <mms-id>35674</mms-id>
    <ddm-message-subject>We are detecting your handset</ddm-message-subject>
    <ddm-message-text>This message is free of charge and will allow us to deliver your content nice and smooth</ddm-message-text>
    <ddm-message-timeout>10</ddm-message-timeout>
    <custom-text>
        <value>My custom text in first slide</value>
        <slide>1</slide>
    </custom-text>
    <custom-subject>My custom subject</custom-subject>
    <data>
        <firstname>Bill</firstname>
        <lastname>Smith</firstname>
        <accountnumber>XYZ23456</accountnumber>
        <pin>13579</pin>
    </data>
</request>
```


### Response Examples

**sendSavedMMS Success Response**
```xml
<response>
    <status>Success</status>
    <mms-id>35674</mms-id>
    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>
    <to>14044790000</to>
    <from>28444</from>
    <status-details>MMS request accepted and queued for delivery</status-details>
</response>
```


**sendSavedMMS Failure Response**
```xml
<response>
    <status>Failure</status>
    <error-code>E713</error-code>
    <to>14044790000</to>
    <error-info>There is billing problem on your account</error-info>
</response>
```


**Postback Notifications For SendSavedMMS** When the MMS delivery is
processed successfully the system will generate a Postback notification.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/xml-service-sendsavedmms.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>