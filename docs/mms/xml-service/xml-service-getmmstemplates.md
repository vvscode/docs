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

**getMMSTemplates Request**
```xml
<request>
    <action>getMMSTemplates</action>
    <api-key>qTFkykO9JTfahCOqJ0V2Wf5Cg1t8iWlZ</api-key>
    <start-date>2014-03-31T11:30:00+00:00</start-date>
    <page-number>1</page-number>
    <items-per-page>3</items-per-page>
</request>
```


### Response Examples

**getMMSTemplates Success Response**
```xml
<response>
    <status>Success</status>
    <start-date>2014-03-31T11:30:00+00:00</start-date>
    <page-number>1</page-number>
    <items-per-page>3</items-per-page>
    <total-results>3</total-results>
    <mms-template>
         <mms-id>1234</mms-id>
         <mms-name>MMS-4</mms-name>
         <mms-subject>mms-test-4</mms-subject>
         <date-created>2014-10-31T09:30:00+00:00</date-created>
         <total-slides>2</total-slides>
         <mms-size>2048</mms-size>
    </mms-template>
    <mms-template>
         <mms-id>1233</mms-id>
         <mms-name>MMS-3</mms-name>
         <mms-subject>mms-test-3</mms-subject>
         <date-created>2014-10-30T19:00:00+00:00</date-created>
         <total-slides>4</total-slides>
         <mms-size>4096</mms-size>
    </mms-template>
    <mms-template>
         <mms-id>1230</mms-id>
         <mms-name>MMS-2</mms-name>
         <mms-subject>mms-test-2</mms-subject>
         <date-created>2014-10-30T08:30:00+00:00</date-created>
         <total-slides>2</total-slides>
         <mms-size>5126</mms-size>
    </mms-template>
</response>
```


**getMMSTemplates Failure Response**
```xml
<response>
    <status>Failure</status>
    <error-code>E214</error-code>
    <error-info>start-date is invalid</error-info>
</response>
```

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/xml-service-getmmstemplates.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>