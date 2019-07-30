---
title: "MM7_Deliver"
excerpt: ""
---
*Receive MMS MO submitted by end users to your platform**

Sinch delivers messages from end users to your platform by supplying the MMS as the payload of the request message. The deliver request is made using MM7 SOAP "DeliverReq". Message include identification of the request that is used by your platform to correlate a response to the message. Your platform must reply with a SOAP response "DeliverRsp", indicating that the message was successfully received and will be processed. If you cannot identify the requested content or if the delivered content does not fulfill the conditions you'd expect, then your platform should indicate a failure in the "DeliverRsp" status field.

## MM7\_Deliver.REQ

**MM7 MO deliver request elements**

**1. HTTP header elements**
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<colgroup>\n<col style=\"width: 25%\" />\n<col style=\"width: 54%\" />\n<col style=\"width: 19%\" />\n</colgroup>\n<tbody>\n<tr class=\"odd\">\n<td><strong>Header Name</strong></td>\n<td><strong>Description</strong></td>\n<td><strong>Mandatory</strong></td>\n</tr>\n<tr class=\"even\">\n<td>X-Mblox-Carrier-Id</td>\n<td><div class=\"line-block\">Sinch Mobile Operator ID.<br />\nExamples: AT&amp;T=0001470, Verizon=0001890.<br />\nSee all <code class=\"interpreted-text\" data-role=\"ref\">mblox_operator_ids</code></div></td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
**2. Elements in the SOAP header and body**

|   **Element**  |     *Description**                                                                                                                                                                     |                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| TransactionID  | It is a Sinch generated transaction ID.Identifies the DeliverReq/DeliverRsp pair.                                                                                                      | Always                                |
| DeliverReq     | Identifies the message as an MM7 deliver request.                                                                                                                                      | Always                                |
| MM7Version     | Identifies the MM7 Version.(Supported versions are ver-5.3.0 and ver-6.8.0)                                                                                                            | Always                                |
| Sender         | The mobile phone number of the end user. This must be a valid mobile,number in international format without a leading + symbol; for <example:,12515550123> (US) and 447700900750 (UK). | Always                                |
| Recipients     | The address of the message recipients i.e., Shortcode/Longcode                                                                                                                         | Always                                |
| LinkedID       | Identifier for the MO message. This is a Sinch generated ID.                                                                                                                           | Always                                |
| TimeStamp      | The date and time of the submission of the MO message. This value is in UTC.                                                                                                           | Always                                |
| Priority       | The priority (importance) of the message. Possible values: High, Normal, Low                                                                                                           | Only when provided by mobile operator |
| Subject        | Title of the whole multimedia message.                                                                                                                                                 | Only when provided by mobile operator |
| Content        | A reference to the content of the MM7 message. Contains an “href:cid”,attribute that links to the content ID of the first attachment in the,MM7 message.                               | Only when provided by mobile operator |
| UACapabilities | Information about the capabilities of the MMS user agent that originated,the multimedia message. In this context, the associated timestamp is,not populated.                           | Only when provided by mobile operator |

See unsupported elements: `unsupported_MM7_SOAP_Elements_Deliver`

**Example**
[block:code]
{
  "codes": [
    {
      "code": "Request\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:ns1=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n<soap-env::Header>\n   <TransactionID soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n</soap-env::Header>\n<soap-env::Body>\n   <DeliverReq>\n      <MM7Version>6.8.0</MM7Version>\n      <LinkedID>1000001</LinkedID>\n      <Sender>\n         <Number>1617423433</Number>\n      </Sender>\n      <Recipients>\n         <To>\n         <Number displayOnly=\"false\">111122</Number>\n         </To>\n      </Recipients>\n      <TimeStamp>2014-04-14T16:15:23.414Z</TimeStamp>\n      <Priority>Normal</Priority>\n      <Content href=\"cid:default.cid\" allowAdaptations=\"true\"/>\n   </DeliverReq>\n</soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
## MM7\_Deliver.RES

**MM7 MO deliver response elements**

Your system should respond to the deliver request with a deliver response containing the elements described in the following table.

| **Element**   |         **Description**                                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TransactionID | Identifies the DeliverReq/DeliverRsp pair. It is part of the SOAP header. The value returned is the one provided in the request.                                        |
| DeliverRsp    | Identifies the message as a MM7 Deliver Response.                                                                                                                       |
| MM7Version    | Identifies the MM7 Version.(Supported versions are ver-5.3.0 and ver-6.8.0)                                                                                             |
| StatusCode    | A code that indicates whether you recieved the MO message request successfully. The status code for successful deliver is 1000.See all Status Codes: `mms_status_codes` |
| StatusText    | Description of the status code.                                                                                                                                         |

**Example**
[block:code]
{
  "codes": [
    {
      "code": "Response\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\n\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n<soap-env:Header>\n   <TransactionID xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\" soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n</soap-env:Header>\n<soap-env:Body>\n   <DeliverRsp xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n      <MM7Version>6.8.0</MM7Version>\n      <Status>\n         <StatusCode>1000</StatusCode>\n         <StatusText>Successfully received MMS</StatusText>\n      </Status>\n   </DeliverRsp>\n</soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
## Receive MMS MO Full Example

**Request**
[block:code]
{
  "codes": [
    {
      "code": "Request\nPOST / HTTP/1.1\nSOAPAction: \"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\"\nContent-Type: multipart/related; start=\"soap-start\"; type=\"text/xml\";\n        boundary=\"----=_Part_139078_1411587550.1397492135426\"\nHost: api.Mblox.com\nContent-Length: 2546\nX-Mblox-Carrier-Id: 0001890\nConnection: Keep-Alive\n\n------=_Part_139078_1411587550.1397492135426\nContent-Type: text/xml\nContent-ID: <soap-start>\n\n\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:ns1=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n<soap-env::Header>\n   <TransactionID soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n</soap-env::Header>\n<soap-env::Body>\n   <DeliverReq>\n      <MM7Version>6.8.0</MM7Version>\n      <LinkedID>1000001</LinkedID>\n      <Sender>\n         <Number>1617423433</Number>\n      </Sender>\n      <Recipients>\n         <To>\n         <Number displayOnly=\"false\">111122</Number>\n         </To>\n      </Recipients>\n      <TimeStamp>2014-04-14T16:15:23.414Z</TimeStamp>\n      <Priority>Normal</Priority>\n      <Content href=\"cid:default.cid\" allowAdaptations=\"true\"/>\n   </DeliverReq>\n</soap-env:Body>\n</soap-env:Envelope>\n\n------=_Part_139078_1411587550.1397492135426\nContent-Type: multipart/mixed;\n        boundary=\"----=_Part_139079_1300104441.1397492135426\"\nContent-ID: <default.cid>\n\n------=_Part_139079_1300104441.1397492135426\nContent-Type: image/jpeg\nContent-Transfer-Encoding: binary\nContent-ID: image_0.jpg\n<Binary contents>\n\n------=_Part_139079_1300104441.1397492135426\nContent-Type: text/plain\nContent-Transfer-Encoding: binary\nContent-ID: text_0.txt\nTest MO message!\n\n------=_Part_139079_1300104441.1397492135426--\n\n------=_Part_139078_1411587550.1397492135426--",
      "language": "xml"
    }
  ]
}
[/block]
**Response**
[block:code]
{
  "codes": [
    {
      "code": "Response\nHTTP/1.1 200 OK\nServer: Apache\nContent-Type: application/xml; charset=utf-8\nContent-Length: 715\nDate: Mon, 16 Mar 2015 17:46:59 GMT\n\n\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\n\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n<soap-env:Header>\n   <TransactionID xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\" soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n</soap-env:Header>\n<soap-env:Body>\n   <DeliverRsp xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n      <MM7Version>6.8.0</MM7Version>\n      <Status>\n         <StatusCode>1000</StatusCode>\n         <StatusText>Successfully received MMS</StatusText>\n      </Status>\n   </DeliverRsp>\n</soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]