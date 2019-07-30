---
title: "deleteMMSID"
excerpt: ""
---
## Overview
Deletes an MMS template whose mms-id is defined in the XML. All contents in the MMS template will be deleted immediately. In the case of Optimized MMS, the transcoded files will be also deleted.

**Request Parameters:**

> Mandatory: action, api\_key, mms-id

**Response Parameters:**

> status, mmsId, errorCode, errorInfo

**Related Error Codes:**

> E104, E105, E108, E112, E113, E120, E241, E620

### Request Example
[block:code]
{
  "codes": [
    {
      "code": "<request>\n    <action>deleteMMSID</action>\n    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>\n    <mms-id>35674</mms-id>\n</request>",
      "language": "xml",
      "name": "deleteMMSID request"
    }
  ]
}
[/block]
### Response examples
[block:code]
{
  "codes": [
    {
      "code": "<response>\n    <status>Success</status>\n    <mms-id>35674</mms-id>\n</response>",
      "language": "xml",
      "name": "deleteMMSID request Success"
    },
    {
      "code": "<response>\n    <status>Failure</status>\n    <error-code>E241</error-code>\n    <error-info>Invalid mms-id / MMS do not exist</error-info>\n</response>",
      "language": "xml",
      "name": "deleteMMSID request Failure"
    }
  ]
}
[/block]