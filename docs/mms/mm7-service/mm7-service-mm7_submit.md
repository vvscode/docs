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

<div class="magic-block-html">
    <div class="marked-table">
        <table>
        <thead>
          <tr>
            <th>Header Name</th>
            <th>Description</th>
            <th>Mandatory</th>
          </tr>
        </thead>
            <tbody>
            <tr class="even">
                <td>X-Mblox-Carrier-Id</td>
                <td><div class="line-block">Sinch Mobile Operator ID.<br />
                    Examples: AT&amp;T=0001470, Verizon=0001890.<br />
                    See all <code class="interpreted-text" data-role="ref">mblox_operator_ids</code></div></td>
                <td>No</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

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
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
    <soap-env:Header>
        <TransactionID xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4" soap-env:mustUnderstand="1">1000001</TransactionID>
    </soap-env:Header>
    <soap-env:Body>
        <SubmitReq xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
            <MM7Version>6.8.0</MM7Version>
            <SenderIdentification>
                <VASPID>skfdjslkjfdslkfj434das</VASPID>
                <VASID>126273</VASID>
                <SenderAddress>
                    <ShortCode>111122</ShortCode>
                </SenderAddress>
            </SenderIdentification>
            <Recipients>
                <To>
                    <Number>16172383232</Number>
                </To>
            </Recipients>
            <Subject>My first MM7 Message</Subject>
            <Content allowAdaptations="false" href="cid:generic" />
        </SubmitReq>
    </soap-env:Body>
</soap-env:Envelope>
```


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
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns=
"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
   <soap-env:Header>
      <TransactionID soap-env:mustUnderstand="1">1000001</TransactionID>
   </soap-env:Header>
   <soap-env:Body>
      <SubmitRsp>
         <MM7Version>6.8.0</MM7Version>
         <Status>
            <StatusCode>1000</StatusCode>
            <StatusText>Successfully parsed and validated request</StatusText>
         </Status>
         <MessageID>369500617770864640</MessageID>
      </SubmitRsp>
   </soap-env:Body>
</soap-env:Envelope>
```


**Example: Failure**
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns=
"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
   <soap-env:Header>
      <TransactionID soap-env:mustUnderstand="1">1000001</TransactionID>
   </soap-env:Header>
   <soap-env:Body>
       <soap-env:Fault>
            <faultcode>soap-env:Client</faultcode>
            <faultstring>Client error</faultstring>
            <detail>
                  <RSErrorRsp>
                    <MM7Version>6.8.0</MM7Version>
                    <Status>
                        <StatusCode>2007</StatusCode>
                        <StatusText>Unable to parse request</StatusText>
                        <Details>Message format corrupt</Details>
                    </Status>
                  </RSErrorRsp>
            </detail>
        </soap-env:Fault>
   </soap-env:Body>
</soap-env:Envelope>
```


## MT Submit Full Example

**Request:**
```text
POST /mm7/v1 HTTP/1.1
Authorization: Basic dW5pdmyc2FsLXZhcj2YWwtdmFzcC1wd2Q=
Host: api.Mblox.com
Accept: */*
Content-Type: multipart/related; boundary="mainBoundary"; type="text/xml"; start="<mm7-start>"
SOAPAction: "http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4"
Content-Length: 45454
X-Mblox-Carrier-Id: 0001890
Expect: 100-continue

--mainBoundary
Content-Type: text/xml; charset=utf-8
Content-ID: <mm7-start>

<?xml version="1.0" encoding="utf-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
    <SOAP-ENV:Header>
        <TransactionID xmlns="http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4" SOAP-ENV:mustUnderstand="1">555e29f8879be</TransactionID>
    </SOAP-ENV:Header>
    <SOAP-ENV:Body>
        <SubmitReq>
            <MM7Version>6.8.0</MM7Version>
            <DeliveryReport>true</DeliveryReport>
            <SenderIdentification>
                <VASPID>spUsdstW2u6GbvnMOsdseXrBa7NNLwTdKL</VASPID>
                <VASID>61295</VASID>
                <SenderAddress>
                    <ShortCode>111122</ShortCode>
                </SenderAddress>
            </SenderIdentification>
            <Recipients>
                <To>
                    <Number>16179593069</Number>
                </To>
            </Recipients>
            <Subject>My first MM7 Message</Subject>
            <ExpiryDate>2015-05-24T18:54:48+00:00</ExpiryDate>
            <TimeStamp>2015-05-21T18:54:48+00:00</TimeStamp>
            <Content allowAdaptations="false" href="cid:generic_content_id"/>
        </SubmitReq>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>

--mainBoundary
Content-Type: multipart/related; start="<mms.smil>";
         boundary="subBoundary"; type="text/xml"
Content-ID: <generic_content_id>

--subBoundary
Content-Type: text/plain; charset=utf-8
Content-ID: <132c4ca56a209475>

MM7 Test Text
--subBoundary
Content-Type: application/smil; charset=utf-8
Content-ID: <mms.smil>

<?xml version="1.0" encoding="UTF-8"?><smil><head><layout><root-layout width="100%" height="100%"/><region id="Text" top="50%" left="0" height="50%" width="100%" fit="hidden"/></layout></head><body><par><text src="cid:132c4ca56a209475" region="Text"/></par></body></smil>
--subBoundary--

--mainBoundary--
```


**Response:**
```text
HTTP/1.1 200 OK
Content-Type: application/xml; charset=utf-8
Date: Mon, 16 Mar 2015 17:46:59 GMT
Server: Apache
Vary: Accept-Encoding,User-Agent
Content-Length: 715
Connection: keep-alive

<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/" xmlns=
"http://www.3gpp.org/ftp/Specs/archive/23_series/23.140/schema/REL-6-MM7-1-4">
   <soap-env:Header>
      <TransactionID soap-env:mustUnderstand="1">1000001</TransactionID>
   </soap-env:Header>
   <soap-env:Body>
      <SubmitRsp>
         <MM7Version>6.8.0</MM7Version>
         <Status>
            <StatusCode>1000</StatusCode>
            <StatusText>Successfully parsed and validated request</StatusText>
         </Status>
         <MessageID>369500617770864640</MessageID>
      </SubmitRsp>
   </soap-env:Body>
</soap-env:Envelope>
```

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/mm7-service/mm7-service-mm7_submit.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>