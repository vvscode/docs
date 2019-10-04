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

**Example Request**
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns=
"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
<soap-env:Header>
   <TransactionID soap-env:mustUnderstand="1">10000001</TransactionID>
</soap-env:Header>
<soap-env:Body>
   <DeliveryReportReq>
      <MM7Version>6.8.0</MM7Version>
      <MessageID>369500617770864640</MessageID>
      <Recipient>
         <Number>16175550123</Number>
      </Recipient>
      <Sender>
         <Number>111122</Number>
      </Sender>
      <Date>2015-03-16T14:03:51.749Z</Date>
      <MMStatus>Retrieved</MMStatus>
      <StatusText>Success</StatusText>
      <UACapabilities UAProf="Samsung Galaxy" />
   </DeliveryReportReq>
</soap-env:Body>
</soap-env:Envelope>
```


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

**Example Response**
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi=
"http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<soap-env:Header>
   <TransactionID xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4" soap-env:mustUnderstand="1">1000001</TransactionID>
</soap-env:Header>
<soap-env:Body>
   <DeliveryReportRsp xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
      <MM7Version>6.8.0</MM7Version>
      <Status>
         <StatusCode>1000</StatusCode>
         <StatusText>Successfully Received MMS.</StatusText>
      </Status>
   </DeliveryReportRsp>
</soap-env:Body>
</soap-env:Envelope>
```


## Delivery Report Full Example

**Request**

```text
POST / HTTP/1.1
SOAPAction: "http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4"
Content-Type: multipart/related; type="text/xml";
Host: api.Mblox.com
Content-Length: 2546
X-Mblox-Carrier-Id: 0001890
Connection: Keep-Alive

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns=
"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
<soap-env:Header>
   <TransactionID soap-env:mustUnderstand="1">10000001</TransactionID>
</soap-env:Header>
<soap-env:Body>
   <DeliveryReportReq>
      <MM7Version>6.8.0</MM7Version>
      <MessageID>369500617770864640</MessageID>
      <Recipient>
         <Number>16175550123</Number>
      </Recipient>
      <Sender>
         <Number>111122</Number>
      </Sender>
      <Date>2015-03-16T14:03:51.749Z</Date>
      <MMStatus>Retrieved</MMStatus>
      <StatusText>Success</StatusText>
      <UACapabilities UAProf="Samsung Galaxy" />
   </DeliveryReportReq>
</soap-env:Body>
</soap-env:Envelope>
```


**Response**
```text
HTTP/1.1 200 OK
Server: Apache
Content-Type: text/xml; charset=utf-8
Content-Length: 539
Date: Mon, 16 Mar 2015 14:03:32 GMT

<?xml version="1.0" encoding="UTF-8" ?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi=
"http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<soap-env:Header>
   <TransactionID xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4" soap-env:mustUnderstand="1">1000001</TransactionID>
</soap-env:Header>
<soap-env:Body>
   <DeliveryReportRsp xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
      <MM7Version>6.8.0</MM7Version>
      <Status>
         <StatusCode>1000</StatusCode>
         <StatusText>Successfully Received MMS.</StatusText>
      </Status>
   </DeliveryReportRsp>
</soap-env:Body>
</soap-env:Envelope>
```

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/mm7-service/mm7-service-mm7_deliveryreport.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>