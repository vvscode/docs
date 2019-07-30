---
title: "MM7_Submit"
excerpt: ""
---
**Send MMS MT to end users**

To send a multimedia message, you send an MT message as a submit request to Sinch and supply the multimedia message as the payload. When Sinch accepts your MT message, we respond to you with a success status using "SubmitRsp" response. This indicates that your message was accepted for delivery. It does not, however, indicate that your message was delivered to the device. If the MT message was received in error, we respond to you with a failure status using SOAP fault "RSErrorRsp" response.

**Using the mobile operator ID in an MM7 request**

You can supply the mobile operator details as an ID in the request header of an MM7 "SubmitReq" request. If you do not supply the mobile operator, Sinch would look it up (this may be a separately charged fee, depending on your contract). The same mobile operator ID is returned in the HTTP header of delivery reports and MO requests. For the best throughput performance, you should include the mobile operator ID in each request, otherwise an operator lookup is needed before we can forward the message to the mobile operator.

**SMIL is Required**

SMIL is required in all the SubmitReq MM7 Requests. It's an XML based language to write interactive multimedia presentations. More information about SMIL can be found here: <http:www.w3.org/TR/SMIL/>.
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<colgroup>\n<col style=\"width: 25%\" />\n<col style=\"width: 54%\" />\n<col style=\"width: 19%\" />\n</colgroup>\n<tbody>\n<tr class=\"odd\">\n<td><strong>Header Name</strong></td>\n<td><strong>Description</strong></td>\n<td><strong>Mandatory</strong></td>\n</tr>\n<tr class=\"even\">\n<td>X-Mblox-Carrier-Id</td>\n<td><div class=\"line-block\">Sinch Mobile Operator ID.<br />\nExamples: AT&amp;T=0001470, Verizon=0001890.<br />\nSee all <code class=\"interpreted-text\" data-role=\"ref\">mblox_operator_ids</code></div></td>\n<td>No</td>\n</tr>\n</tbody>\n</table>\n</div>\n\n<style></style>"
}
[/block]
## MM7\_Submit.REQ

**Supported MM7 SOAP envelope request elements**

|                  |                                                                                                                                                                                                                                                                                                                                                                                                                                             |               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Element**      | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                             | **Mandatory** |
| TransactionID    | The identification of the MM7 SubmitReq/SubmitRsp pair. It is located in,the SOAP header. You supply this in the MM7 SubmitReq and Sinch returns,it in the corresponding SubmitRsp.                                                                                                                                                                                                                                                         | Yes           |
| SubmitReq        | Identifies the message as an MMS MT submit. This is the message type for an MT request.                                                                                                                                                                                                                                                                                                                                                     | Yes           |
| MM7Version       | Identifies the MM7 Version.(Supported versions are ver-5.3.0 and ver-6.8.0)                                                                                                                                                                                                                                                                                                                                                                 | Yes           |
| VASPID           | Sinch provides an API key after your account is provisioned which is your VASPID.                                                                                                                                                                                                                                                                                                                                                           | Yes           |
| VASID            | Your account manager will provide you with a VASID for each,shortcode. It is mandatory for accounts using shared shortcodes,,otherwise optional.                                                                                                                                                                                                                                                                                            | No            |
| SenderAddress    | This is your shortcode. Should be provisioned and configured to your account and service.                                                                                                                                                                                                                                                                                                                                                   | Yes           |
| Recipients       | The mobile phone number of the end user. This must be a valid mobile,number in international format without a leading + symbol; for <example:,12515550123> (US) and 447700900750 (UK). Multiple numbers are NOT,supported.                                                                                                                                                                                                                  | Yes           |
| Subject          | Title of the whole multimedia message. Recommended size is 80 characters.                                                                                                                                                                                                                                                                                                                                                                   | No            |
| Content          | Content of the multimedia message. href:cid attribute links to attachment.                                                                                                                                                                                                                                                                                                                                                                  | Yes           |
| allowAdaptations | Indicates if you wish to allow the mobile operator to re-encode,(transcode) the content to make the content more suitable to the target,handset. Each mobile operator may choose to obey or ignore this field;,for example, some mobile operators assume or require by default the,option to transcode content. AllowAdaptations is an attribute of Content,element. The value must be Boolean (either true or false). The default,is true. | No            |

See unsupported elements for MM7\_Submit:
`unsupported_MM7_SOAP_Elements_Submit`.

**Example**
[block:code]
{
  "codes": [
    {
      "code": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <soap-env:Header>\n        <TransactionID xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\" soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n    </soap-env:Header>\n    <soap-env:Body>\n        <SubmitReq xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n            <MM7Version>6.8.0</MM7Version>\n            <SenderIdentification>\n                <VASPID>skfdjslkjfdslkfj434das</VASPID>\n                <VASID>126273</VASID>\n                <SenderAddress>\n                    <ShortCode>111122</ShortCode>\n                </SenderAddress>\n            </SenderIdentification>\n            <Recipients>\n                <To>\n                    <Number>16172383232</Number>\n                </To>\n            </Recipients>\n            <Subject>My first MM7 Message</Subject>\n            <Content allowAdaptations=\"false\" href=\"cid:generic\" />\n        </SubmitReq>\n    </soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
## MM7\_Submit.RES

**Supported MM7 SOAP envelope response elements**

|               |                                                                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Element**   | **Description**                                                                                                                                                                                   |
| TransactionID | The identification of the MM7 SubmitReq/SubmitRsp pair. It is,located in the SOAP header. You supply this in the MM7 SubmitReq and, Sinch returns it in the corresponding SubmitRsp.              |
| SubmitRsp     | Identifies the message as a MM7 Submit Response. This is the message type for an MT response.                                                                                                     |
| MM7Version    | Identifies the MM7 Version.(Supported versions are ver-5.3.0 and ver-6.8.0)                                                                                                                       |
| StatusCode    | MT message submit acception/rejection is based on Success/Failure status,code. “Success” response does not mean the message was delivered to the,handset.See all Status Codes: `mms_status_codes` |
| StatusText    | Description of the status code.                                                                                                                                                                   |
| MessageId     | If the MT message submit is successful then this contains the Sinch,generated ID of the submitted message. This ID is expected in the,delivery reports relating to this message.                  |

**Example: Success**
[block:code]
{
  "codes": [
    {
      "code": "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n   <soap-env:Header>\n      <TransactionID soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n   </soap-env:Header>\n   <soap-env:Body>\n      <SubmitRsp>\n         <MM7Version>6.8.0</MM7Version>\n         <Status>\n            <StatusCode>1000</StatusCode>\n            <StatusText>Successfully parsed and validated request</StatusText>\n         </Status>\n         <MessageID>369500617770864640</MessageID>\n      </SubmitRsp>\n   </soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
**Example: Failure**
[block:code]
{
  "codes": [
    {
      "code": "Failure\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n   <soap-env:Header>\n      <TransactionID soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n   </soap-env:Header>\n   <soap-env:Body>\n       <soap-env:Fault>\n            <faultcode>soap-env:Client</faultcode>\n            <faultstring>Client error</faultstring>\n            <detail>\n                  <RSErrorRsp>\n                    <MM7Version>6.8.0</MM7Version>\n                    <Status>\n                        <StatusCode>2007</StatusCode>\n                        <StatusText>Unable to parse request</StatusText>\n                        <Details>Message format corrupt</Details>\n                    </Status>\n                  </RSErrorRsp>\n            </detail>\n        <soap-env:Fault>\n   </soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
## MT Submit Full Example

**Request:**
[block:code]
{
  "codes": [
    {
      "code": "Request\nPOST /mm7/v1 HTTP/1.1\nAuthorization: Basic dW5pdmyc2FsLXZhcj2YWwtdmFzcC1wd2Q=\nHost: api.Mblox.com\nAccept: */*\nContent-Type: multipart/related; boundary=\"mainBoundary\"; type=\"text/xml\"; start=\"<mm7-start>\"\nSOAPAction: \"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\"\nContent-Length: 45454\nX-Mblox-Carrier-Id: 0001890\nExpect: 100-continue\n\n--mainBoundary\nContent-Type: text/xml; charset=utf-8\nContent-ID: <mm7-start>\n\n<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\n    <SOAP-ENV:Header>\n        <TransactionID xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\" SOAP-ENV:mustUnderstand=\"1\">555e29f8879be</TransactionID>\n    </SOAP-ENV:Header>\n    <SOAP-ENV:Body>\n        <SubmitReq>\n            <MM7Version>6.8.0</MM7Version>\n            <DeliveryReport>true</DeliveryReport>\n            <SenderIdentification>\n                <VASPID>spUsdstW2u6GbvnMOsdseXrBa7NNLwTdKL</VASPID>\n                <VASID>61295</VASID>\n                <SenderAddress>\n                    <ShortCode>111122</ShortCode>\n                </SenderAddress>\n            </SenderIdentification>\n            <Recipients>\n                <To>\n                    <Number>16179593069</Number>\n                </To>\n            </Recipients>\n            <Subject>My first MM7 Message</Subject>\n            <ExpiryDate>2015-05-24T18:54:48+00:00</ExpiryDate>\n            <TimeStamp>2015-05-21T18:54:48+00:00</TimeStamp>\n            <Content allowAdaptations=\"false\" href=\"cid:generic_content_id\"/>\n        </SubmitReq>\n    </SOAP-ENV:Body>\n</SOAP-ENV:Envelope>\n\n--mainBoundary\nContent-Type: multipart/related; start=\"<mms.smil>\";\n         boundary=\"subBoundary\"; type=\"text/xml\"\nContent-ID: <generic_content_id>\n\n--subBoundary\nContent-Type: text/plain; charset=utf-8\nContent-ID: <132c4ca56a209475>\n\nMM7 Test Text\n--subBoundary\nContent-Type: application/smil; charset=utf-8\nContent-ID: <mms.smil>\n\n<?xml version=\"1.0\" encoding=\"UTF-8\"?><smil><head><layout><root-layout width=\"100%\" height=\"100%\"/><region id=\"Text\" top=\"50%\" left=\"0\" height=\"50%\" width=\"100%\" fit=\"hidden\"/></layout></head><body><par><text src=\"cid:132c4ca56a209475\" region=\"Text\"/></par></body></smil>\n--subBoundary--\n\n--mainBoundary--",
      "language": "xml"
    }
  ]
}
[/block]
**Response:**
[block:code]
{
  "codes": [
    {
      "code": "Response\nHTTP/1.1 200 OK\nContent-Type: application/xml; charset=utf-8\nDate: Mon, 16 Mar 2015 17:46:59 GMT\nServer: Apache\nVary: Accept-Encoding,User-Agent\nContent-Length: 715\nConnection: keep-alive\n\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n   <soap-env:Header>\n      <TransactionID soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n   </soap-env:Header>\n   <soap-env:Body>\n      <SubmitRsp>\n         <MM7Version>6.8.0</MM7Version>\n         <Status>\n            <StatusCode>1000</StatusCode>\n            <StatusText>Successfully parsed and validated request</StatusText>\n         </Status>\n         <MessageID>369500617770864640</MessageID>\n      </SubmitRsp>\n   </soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]