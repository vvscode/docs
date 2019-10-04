---
title: "sendMMS"
excerpt: ""
---
## Overview
Sends an MMS defined in the XML containing slides of embedded with video, audio, images and/or text to a single or list of mobile numbers in international number format. The sendMMS is a minor extension of the saveMMS function. Note, while elements may be given in any order, the slides are created in the order given in the API call.

While the sendMMS API method allows sending slides containing video elements, it is not recommended as it introduces latency during the call. Therefore, Sinch suggests strongly that you use the saveMMS API call to submit video content and then Sinch MMS service can transcode the contents in advance before you request the sendSavedMMS API call.

If the sendMMS API is used to send the same content to multiple users, at present the Sinch application does not cache this content as such the content will need to be uploaded for each request. This is another reason Sinch suggests that you use combination of saveMMS and sendSavedMMS API calls.

In case of Optimized MMS, there is a mandatory ‘fallback-sms-text’ which is used as the SMS text in the case of MMS is delivered via SMS link. In case of Standard MMS, the ‘fallback-sms-text’ is not required.

MMS "Link Expiration Date’ is used to expire the MMS Link (In the case when MMS fallback to SMS Link). Depending on this expiration date, the content is disabled on this link. By default it expires 365 days from the date the original MMS was created.

**Request Parameters:**  
> Mandatory: action, api\_key, to, from, name, slide, fallback-sms-text, service-id
    
>    Optional: operatorid, campaignRef, subject, image, audio, video, url, text, duration, vcard, ical, pdf, passbook, message-text

**Response Parameters:**  
 >   status, to, mmsId, trackingId, errorCode, errorInfo

**Related Error Codes:**  
>    All saveMMS Error Codes plus E110, E111, E201, E628

### Request Example

**sendMMS Request**
```xml
<request>
    <action>sendMMS</action>
    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>
    <to>12399471613</to>
    <from>28444</from>
    <operator-id>31062</operator-id>
    <message-subject>The subject</message-subject>
    <service-id>32113</service-id>
    <name>FuelTheFire</name>
    <slide>
        <duration>5</duration>
        <image>
            <url>http://www.yoursite.com/images/1.jpg</url>
        </image>
        <audio>
            <url>http://www.yoursite.com/audio/1.mp3</url>
        </audio>
        <message-text>Here is some text blah blah ...</message-text>
    </slide>
    <slide>
        <message-text>Invitation</message-text>
        <ical><url>http://www.yoursite.com/cal/2.ics</url></ical>
        <duration>10</duration>
    </slide>
</request>
```


### Response examples

**sendMMS Success Response**
```xml
<response>
    <status>Success</status>
    <to>12399471613</to>
    <mms-id>35674</mms-id>
    <tracking-id>MMS_12345</tracking-id>
    <status-details>MMS request accepted and queued for delivery</status-details>
</response>
```


**sendMMS Failure Response**
```xml
<response>
    <status>Failure</status>
    <error-code>E111</error-code>
    <to>12399471613</to>
    <error-info>Invalid shortcode</error-info>
</response>
```

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/xml-service-sendmms.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>