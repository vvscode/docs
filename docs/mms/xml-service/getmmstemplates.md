---
title: "getMMSTemplates"
excerpt: ""
---
## Overview

List all the previously created MMS templates (mms-ids) created using the saveMMS API. Note, deleted templates are not included in this listing. All the MMS templates will be listed in the descending order of date (i.e., latest to the oldest). If no “start-date” is specified in the API request then by default all mms templates are listed. The default “page-number” is taken as 1 whereas the default “items-per-page” is 100, if not specified. GMT/UTC timestamps are accepted for “start-date”.

**Request Parameters:**

> Mandatory: action, api\_key
> 
> Optional: start-date, page-number, items-per-page

**Related Error Codes:**

> E104, E105, E108, E112, E113, E120, E212, E213, E214

### Request Example
[block:code]
{
  "codes": [
    {
      "code": "<request>\n    <action>getMMSTemplates</action>\n    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>\n    <start-date>2014-03-31T11:30:00+00:00</start-date>\n    <page-number>1</page-number>\n    <items-per-page>3</items-per-page>\n</request>",
      "language": "xml",
      "name": "getMMSTemplates Request"
    }
  ]
}
[/block]
### Response Examples
[block:code]
{
  "codes": [
    {
      "code": "<response>\n    <status>Success</status>\n    <start-date>2014-03-31T11:30:00+00:00</start-date>\n    <page-number>1</page-number>\n    <items-per-page>3</items-per-page>\n    <total-results>3</total-results>\n    <mms-template>\n         <mms-id>1234</mms-id>\n         <mms-name>MMS-4</mms-name>\n         <mms-subject>mms-test-4</mms-subject>\n         <date-created>2014-10-31T09:30:00+00:00</date-created>\n         <total-slides>2</total-slides>\n         <mms-size>2048</mms-size>\n    </mms-template>\n    <mms-template>\n         <mms-id>1233</mms-id>\n         <mms-name>MMS-3</mms-name>\n         <mms-subject>mms-test-3</mms-subject>\n         <date-created>2014-10-30T19:00:00+00:00</date-created>\n         <total-slides>4</total-slides>\n         <mms-size>4096</mms-size>\n    </mms-template>\n    <mms-template>\n         <mms-id>1230</mms-id>\n         <mms-name>MMS-2</mms-name>\n         <mms-subject>mms-test-2</mms-subject>\n         <date-created>2014-10-30T08:30:00+00:00</date-created>\n         <total-slides>2</total-slides>\n         <mms-size>5126</mms-size>\n    </mms-template>\n</response>",
      "language": "xml",
      "name": "getMMSTemplates Success Response"
    },
    {
      "code": "<response>\n    <status>Failure</status>\n    <error-code>E214</error-code>\n    <error-info>start-date is invalid</error-info>\n</response>",
      "language": "xml",
      "name": "getMMSTemplates Failure Response"
    }
  ]
}
[/block]