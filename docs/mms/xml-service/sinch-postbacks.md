---
title: "Sinch Postbacks"
excerpt: ""
---
## MMS MT Delivery Report Postbacks Overview 
The MMS MT postback API notifies you of the delivery status of each message you send. There are two methods for delivering content; Binary and HTML. Following are postback notification formats depending on which method is used.

## MMS MT Postback Types

  - MMS Delivery status
  - saveMMS Encoding Status

## MMS MT Delivery Status 
A postback notification called N101 is immediately sent after we begin to process the MMS. Upon receiving Delivery Report (DLR) from the carrier, the system generates postback notification N102 with the handset information. The N101 and N102 notifications are linked by tracking-id.

When the mobile network operator does not support MMS or the destination handset does not support the size of the content within the MMS, in case of Optimized MMS we fall back to SMS/HTML to deliver the message. In this method we deliver the MMS as an SMS containing a link to an HTML page with the content.

The fallback-sms-text is included in the SMS message text. The possible MMS status code that you may receive for the delivery status is one of following: N101, N102, E101, E102.

If you specified to send a Device Discovery Message then you may receive one of the following status codes regarding the delivery status of the Device Discovery Message: N501, N502, E501, E502.
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<colgroup>\n<col style=\"width: 9%\" />\n<col style=\"width: 90%\" />\n</colgroup>\n<tbody>\n<tr class=\"odd\">\n<td><strong>Variable</strong></td>\n<td><strong>Description</strong></td>\n</tr>\n<tr class=\"even\">\n<td>origin</td>\n<td>The notification origin, for example, MMS_MT means an MMS terminated on a mobile.</td>\n</tr>\n<tr class=\"odd\">\n<td>code</td>\n<td>The postback notification code.</td>\n</tr>\n<tr class=\"even\">\n<td>sent-as</td>\n<td>Indicates if the MMS was delivered as MMS (binary) or SMS (HTML).</td>\n</tr>\n<tr class=\"odd\">\n<td>mms-id</td>\n<td>Id of the MMS Template.</td>\n</tr>\n<tr class=\"even\">\n<td>status</td>\n<td><div class=\"line-block\">For N101 and N501, notification status can be “Message Sent”.<br />\nFor N102 and N502, notification status can be “Message Sent/Delivered”.<br />\nFor E101 and E501, notification status can be “Message Failed”.<br />\nFor E102 and E502, notification status can be “Message,Sent/Expired”, “Message Sent/Rejected”, “Message Sent/Failed” or,“Message Sent/Not Supported”.</div></td>\n</tr>\n<tr class=\"odd\">\n<td>from</td>\n<td>The shortcode the message is sent from</td>\n</tr>\n<tr class=\"even\">\n<td>handset</td>\n<td>Handset profile returned inside Delivery Receipt. This is present only in N102 notification.</td>\n</tr>\n<tr class=\"odd\">\n<td>to</td>\n<td>The recipient of the message.</td>\n</tr>\n<tr class=\"even\">\n<td>tracking-id</td>\n<td>The ID to correlate API requests, and delivery receipts.</td>\n</tr>\n<tr class=\"odd\">\n<td>operator-id</td>\n<td>Carrier Identification.</td>\n</tr>\n<tr class=\"even\">\n<td>timestamp</td>\n<td>The timestamp the MMS was sent (N101) or when the MMS was delivered (N102).</td>\n</tr>\n<tr class=\"odd\">\n<td>status-details</td>\n<td>Any additional information passed back from the carrier.</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
## Postback Schema

### N101 Status Code Examples
[block:code]
{
  "codes": [
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N101</code>\n    <sent-as>MMS</sent-as>\n    <status>Message Sent</status>\n    <mms-id>39597</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>\n    <operator-id>31003</operator-id>\n    <timestamp>2014-06-07T07:27:29-05:00</timestamp>\n</postback>",
      "language": "xml",
      "name": "N101 (Binary)"
    },
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N101</code>\n    <sent-as>SMS</sent-as>\n    <status>Message Sent</status>\n    <mms-id>39755</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>\n    <operator-id>31004</operator-id>\n    <timestamp>2014-06-07T07:27:34-05:00</timestamp>\n    <status-details>Handset setting: mms with pass via HTML</status-details>\n</postback>",
      "language": "xml",
      "name": "N101 (HTML)"
    }
  ]
}
[/block]
### N102 Status Code Examples
[block:code]
{
  "codes": [
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N102</code>\n    <sent-as>MMS</sent-as>\n    <status>Message Sent/Delivered</status>\n    <mms-id>39597</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>\n    <operator-id>31003</operator-id>\n    <timestamp>2014-06-07T07:27:34-05:00</timestamp>\n    <handset>moto17c</handset>\n</postback>",
      "language": "xml",
      "name": "N102 (Binary)"
    },
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N102</code>\n    <sent-as>SMS</sent-as>\n    <status>Message Sent/Delivered</status>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>\n    <operator-id>31004</operator-id>\n    <timestamp>2014-06-07T07:28:09-05:00</timestamp>\n</postback>",
      "language": "xml",
      "name": "N102 (HTML)"
    }
  ]
}
[/block]
### Error Status Code Examples
#### E101
> When the system is unable to send an MMS we return a postback E101
#### E102
> When the MMS delivery fails due to various reasons we return a postback E102
[block:code]
{
  "codes": [
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>E101</code>\n    <status>Message Failed</status>\n    <mms-id>39755</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>\n    <operator-id>31004</operator-id>\n    <status-details>Error fetching dynamic content</status-details>\n</postback>",
      "language": "xml",
      "name": "E101"
    },
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>E102</code>\n    <status>Message Sent/Rejected</status>\n    <mms-id>39755</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>\n    <operator-id>31004</operator-id>\n    <status-details>Recipient blocked by mobile operator</status-details>\n</postback>",
      "language": "xml",
      "name": "E102"
    }
  ]
}
[/block]
### Device Discovery Message Status Code Examples
[block:code]
{
  "codes": [
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N501</code>\n    <sent-as>MMS</sent-as>\n    <status>Message Sent</status>\n    <mms-id>39755</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3Nw==</tracking-id>\n    <operator-id>31004</operator-id>\n    <timestamp>2014-06-07T07:27:34-05:00</timestamp>\n    <status-details></status-details>\n</postback>",
      "language": "xml",
      "name": "N501"
    },
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N502</code>\n    <sent-as>MMS</sent-as>\n    <status>Message Sent/Delivered</status>\n    <mms-id>39597</mms-id>\n    <from>28444</from>\n    <to>12399471613</to>\n    <tracking-id>TU1TXzU5Nzg3OQ==</tracking-id>\n    <operator-id>31003</operator-id>\n    <timestamp>2014-06-07T07:27:34-05:00</timestamp>\n    <handset>moto17c</handset>\n</postback>",
      "language": "xml",
      "name": "N502"
    }
  ]
}
[/block]
## saveMMS Encoding status

When MMS is saved, we generate postback notification. When saving and encoding of the content is successful we generate N003. If encoding of the content failed we generate postback E002 containing mms-id and audio-name/video-name pointing to the content that failed to encode properly. When E002 is returned the mms-id should be considered corrupted. Note: The image-name is not included since image encoding is not supported.

|       Variable       |                 Description                                         |
| ------------ | -------------------------------------------------------- |
| code         | N003 or E002 based on the success of the content coding. |
| origin       | MMS\_MT for saving MMS content.                          |
| mms-id       | ID of the MMS.                                           |
| audio-name   | URL to audio content that failed to encode properly.     |
| video-name   | URL to video content that failed to encode properly.     |

### Status code examples
[block:code]
{
  "codes": [
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>N003</code>\n    <mms-id>35674</mms-id>\n</postback>",
      "language": "xml",
      "name": "N003 (Success)"
    },
    {
      "code": "<postback>\n    <origin>MMS_MT</origin>\n    <code>E002</code>\n    <mms-id>35674</mms-id>\n    <audio-name>http://www.yoursite.com/audio/1.mp3</audio-name>\n</postback>",
      "language": "xml",
      "name": "E002 (Failure)"
    }
  ]
}
[/block]