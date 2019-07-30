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
[block:code]
{
  "codes": [
    {
      "code": "<request>\n    <action>sendMMS</action>\n    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>\n    <to>12399471613</to>\n    <from>28444</from>\n    <operator-id>31062</operator-id>\n    <message-subject>The subject</message-subject>\n    <service-id>32113</service-id>\n    <name>FuelTheFire</name>\n    <slide>\n        <duration>5</duration>\n        <image>\n            <url>http://www.yoursite.com/images/1.jpg</url>\n        </image>\n        <audio>\n            <url>http://www.yoursite.com/audio/1.mp3</url>\n        </audio>\n        <message-text>Here is some text blah blah ...</message-text>\n    </slide>\n    <slide>\n        <message-text>Invitation</message-text>\n        <ical><url>http://www.yoursite.com/cal/2.ics</url></ical>\n        <duration>10</duration>\n    </slide>\n</request>",
      "language": "xml",
      "name": "sendMMS Request"
    }
  ]
}
[/block]
### Response examples
[block:code]
{
  "codes": [
    {
      "code": "<response>\n    <status>Success</status>\n    <to>12399471613</to>\n    <mms-id>35674</mms-id>\n    <tracking-id>MMS_12345</tracking-id>\n    <status-details>MMS request accepted and queued for delivery</status-details>\n</response>",
      "language": "xml",
      "name": "sendMMS Success Response"
    },
    {
      "code": "<response>\n    <status>Failure</status>\n    <error-code>E111</error-code>\n    <to>12399471613</to>\n    <error-info>Invalid shortcode</error-info>\n</response>",
      "language": "xml",
      "name": "sendMMS Failure Response"
    }
  ]
}
[/block]