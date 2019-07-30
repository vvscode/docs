---
title: "MM7_DeliveryReport"
excerpt: ""
---
**Receive Delivery Reports for previously submitted MT**

Sinch sends delivery reports using the MM7 Delivery Report message type i.e., "DeliveryReportReq". The delivery report indicates the current state of the original submit request message. We will send a delivery report to your platform only when the appropriate information is available. If the delivery report message is accepted or rejected then respond with an "DeliveryReportRsp", including a status that indicates why the delivery report was accepted/rejected. For information about the status codes returned for Delivery Reports, please see `mm7_delivery_report_statuses`.

## MM7\_DeliveryReport.REQ

**MM7 delivery report request elements**

|    **Element**    |                **Description**                                                                                                                                                                |      **Returned**                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| TransactionID     | This identifies the DeliveryReportReq/DeliveryReportRsp pair. It is Sinch generated ID.                                                                                                       | Always                                |
| DeliveryReportReq | Identifiesthe message as an MM7 Delivery Report.                                                                                                                                              | the                                   |
| MM7Version        | Identifies the MM7 Version. (Supported versions are ver-5.3.0 and ver-6.8.0)                                                                                                                  | Always                                |
| Recipient         | The mobile phone number of the end user. This must be a valid mobile,number in international format without a leading + symbol; for <example:,12515550123> (US) and 447700900750 (UK).        | Always                                |
| Sender            | Your shortcode. This should match the same information that is,linked in the MT configuration, and generally to the service you are,providing.                                                | Always                                |
| MessageID         | Sinch generated ID linked to the submitted message. This ID was returned,to your system in the initial response (SubmitRsp) to your MT MMS,request.                                           | Always                                |
| Date              | The date and time of the submission of the multimedia message (timestamp). Value is in UTC.                                                                                                   | Always                                |
| MMStatus          | A code that indicates whether the MT message was delivered successful or,failed. For information about the status codes returned for Delivery,Reports, please see `delivery_report_statuses`. | Always                                |
| UACapabilities    | Also known as MMS User Agent capabilities. This describes the capabilities of the MMS User agent of the mobile handset.                                                                       | Only when provided by mobile operator |

See `unsupported_mm7_soap_elements_DeliveryReport`.

**Example**
[block:code]
{
  "codes": [
    {
      "code": "Request\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n<soap-env:Header>\n   <TransactionID soap-env:mustUnderstand=\"1\">10000001</TransactionID>\n</soap-env:Header>\n<soap-env:Body>\n   <DeliveryReportReq>\n      <MM7Version>6.8.0</MM7Version>\n      <MessageID>369500617770864640</MessageID>\n      <Recipient>\n         <Number>16175550123</Number>\n      </Recipient>\n      <Sender>\n         <Number>111122</Number>\n      </Sender>\n      <Date>2015-03-16T14:03:51.749Z</Date>\n      <MMStatus>Retrieved</MMStatus>\n      <StatusText>Success</StatusText>\n      <UACapabilities UAProf=\"Samsung Galaxy\" />\n   </DeliveryReportReq>\n</soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
## MM7\_DeliveryReport.RES

**MM7 delivery report response elements**

Your system should respond to the delivery report request with a delivery report response containing the elements described in the following table.

|      **Element**  |                  **Description**                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TransactionID     | Identifies the DeliveryReportReq/DeliveryReportRsp pair. It is part,of the SOAP header. The value that was provided with the,deliveryReportReq is returned.              |
| DeliveryReportRsp | Identifies the message as an MM7 Delivery Report Response.                                                                                                               |
| MM7Version        | Identifies the MM7 Version.(Supported versions are ver-5.3.0 and ver-6.8.0)                                                                                              |
| StatusCode        | A code that indicates whether you recieved the MO message request successfully. The status code for successful deliver is 1000. See all Status Codes: `mms_status_codes` |
| StatusText        | Description of the status code.                                                                                                                                          |

**Example**
[block:code]
{
  "codes": [
    {
      "code": "Response\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\n\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n<soap-env:Header>\n   <TransactionID xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\" soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n</soap-env:Header>\n<soap-env:Body>\n   <DeliveryReportRsp xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n      <MM7Version>6.8.0</MM7Version>\n      <Status>\n         <StatusCode>1000</StatusCode>\n         <StatusText>Successfully Received MMS.</StatusText>\n      </Status>\n   </DeliveryReportRsp>\n</soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]
## Delivery Report Full Example

**Request**

[block:code]
{
  "codes": [
    {
      "code": "Request\nPOST / HTTP/1.1\nSOAPAction: \"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\"\nContent-Type: multipart/related; type=\"text/xml\";\nHost: api.Mblox.com\nContent-Length: 2546\nX-Mblox-Carrier-Id: 0001890\nConnection: Keep-Alive\n\n\n<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns=\n\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n<soap-env:Header>\n   <TransactionID soap-env:mustUnderstand=\"1\">10000001</TransactionID>\n</soap-env:Header>\n<soap-env:Body>\n   <DeliveryReportReq>\n      <MM7Version>6.8.0</MM7Version>\n      <MessageID>369500617770864640</MessageID>\n      <Recipient>\n         <Number>16175550123</Number>\n      </Recipient>\n      <Sender>\n         <Number>111122</Number>\n      </Sender>\n      <Date>2015-03-16T14:03:51.749Z</Date>\n      <MMStatus>Retrieved</MMStatus>\n      <StatusText>Success</StatusText>\n      <UACapabilities UAProf=\"Samsung Galaxy\" />\n   </DeliveryReportReq>\n</soap-env:Body>\n</soap-env:Envelope>",
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
      "code": "Response\nHTTP/1.1 200 OK\nServer: Apache\nContent-Type: text/xml; charset=utf-8\nContent-Length: 539\nDate: Mon, 16 Mar 2015 14:03:32 GMT\n\n<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n<soap-env:Envelope xmlns:soap-env=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsi=\n\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">\n<soap-env:Header>\n   <TransactionID xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\" soap-env:mustUnderstand=\"1\">1000001</TransactionID>\n</soap-env:Header>\n<soap-env:Body>\n   <DeliveryReportRsp xmlns=\"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4\">\n      <MM7Version>6.8.0</MM7Version>\n      <Status>\n         <StatusCode>1000</StatusCode>\n         <StatusText>Successfully Received MMS.</StatusText>\n      </Status>\n   </DeliveryReportRsp>\n</soap-env:Body>\n</soap-env:Envelope>",
      "language": "xml"
    }
  ]
}
[/block]