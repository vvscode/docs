---
title: deleteMMSID
excerpt: ''
next:
  pages:
    - xml-service-getmmstemplates
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

**deleteMMSID request**
```xml
<request>
    <action>deleteMMSID</action>
    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>
    <mms-id>35674</mms-id>
</request>
```


### Response examples

**deleteMMSID request Success**
```xml
<response>
    <status>Success</status>
    <mms-id>35674</mms-id>
</response>
```


**deleteMMSID request Failure**
```xml
<response>
    <status>Failure</status>
    <error-code>E241</error-code>
    <error-info>Invalid mms-id / MMS do not exist</error-info>
</response>
```

