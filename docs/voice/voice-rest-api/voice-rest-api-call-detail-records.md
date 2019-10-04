---
title: "Call Detail Records"
excerpt: ""
---
CDRs can be downloaded from the Sinch portal. CDRs are in a semicolon separated file that contains the following fields:

## Phone-Terminated Calls

| Field          | Type    | Description                                                                                                                                                                   |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CallId         | string  | A unique identifier for a call                                                                                                                                                |
| UserSpaceId    | int     | Internal identifier                                                                                                                                                           |
| CallTime       | time    | Time when call was made                                                                                                                                                       |
| Result         | string  | Result may have one of the following values "ANSWERED" | "BUSY" | "NOANSWER" | "FAILED"                                                                                       |
| Reason         | string  | Reason may have one of the following values "N/A" | "TIMEOUT" | "CALLERHANGUP" | "CALLEEHANGUP" | "BLOCKED" | "MANAGERHANGUP" | "NOCREDITPARTNER" | "GENERALERROR" | "CANCEL" |
| Duration       | int     | Call time in seconds                                                                                                                                                          |
| AnswerTime     | time    | Time when call was answered                                                                                                                                                   |
| From           | string  | CLI displayed on terminating side                                                                                                                                             |
| To             | string  | Terminating side phone number                                                                                                                                                 |
| Amount         | decimal | Cost of call                                                                                                                                                                  |
| Currency       | string  | Currency                                                                                                                                                                      |
| Custom         | object  | Free field for partners to use as custom headers                                                                                                                              |
| ApplicationKey | string  | Application key                                                                                                                                                               |
| UserId         | string  | User Id of the user that initiated the call                                                                                                                                   |
| ToCountryId    | string  | Country Id of the "To" number                                                                                                                                                 |

## Phone-Originated Calls

| Field          | Type    | Description                                                                                                                         |
| -------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| CallId         | string  | A unique identifier for a call                                                                                                      |
| UserSpaceId    | int     | Internal identifier                                                                                                                 |
| CallTime       | time    | Time when call was made                                                                                                             |
| Result         | string  | Result may have one of the following values "ANSWERED" | "NOANSWER" | "FAILED"                                                      |
| Reason         | string  | Reason may have one of the following values "N/A" | "CANCEL" | "CALLERHANGUP" | "CALLEEHANGUP" | "NOCREDITPARTNER" | "GENERALERROR" |
| Duration       | int     | Call time in seconds                                                                                                                |
| From           | string  | Phone number of the caller                                                                                                          |
| To             | string  | Number that the caller has called (Voice DID)                                                                                       |
| Amount         | decimal | Cost of call                                                                                                                        |
| Currency       | string  | Currency                                                                                                                            |
| Custom         | object  | Free field for partners to use as custom headers                                                                                    |
| ApplicationKey | string  | Application key                                                                                                                     |

## App-App Calls

| Field          | Type   | Description                                                                           |
| -------------- | ------ | ------------------------------------------------------------------------------------- |
| CallId         | string | A unique identifier for a call                                                        |
| UserSpaceId    | int    | Internal identifier                                                                   |
| CallTime       | time   | Time when the call was made                                                           |
| Result         | string | Result may be one of the following values "ANSWERED" | "BUSY" | "NOANSWER" | "FAILED" |
| Reason         | string | Reason may be one of the following values "N/A" | "TIMEOUT" | "HANGUP" | "CANCEL"     |
| Duration       | int    | Call duration in seconds                                                              |
| FromUserId     | string | UserId of the caller                                                                  |
| ToUserId       | string | UserId of the callee                                                                  |
| Custom         | object | Free field for partners to use as custom header                                       |
| ApplicationKey | string | Application key                                                                       |

## SIP-Terminated Calls

| Field          | Type   | Description                                                                           |
| -------------- | ------ | ------------------------------------------------------------------------------------- |
| CallId         | string | A unique identifier for a call                                                        |
| UserSpaceId    | int    | Internal identifier                                                                   |
| CallTime       | time   | Time when the call was made                                                           |
| Result         | string | Result may be one of the following values "ANSWERED" | "BUSY" | "NOANSWER" | "FAILED" |
| Reason         | string | Reason why the call ended                                                             |
| Duration       | int    | Call duration in seconds                                                              |
| From           | string | Endpoint that originated the call or CLI to be displayed                              |
| To             | string | Endpoint where the call is terminated                                                 |
| Custom         | object | Custom header that was passed in the call                                             |
| ApplicationKey | string | Application key                                                                       |

The files are generated once every day and will contain the previous days’ CDRs. A day spans from 00:00:00 UTC to 23:59:59 UTC. CDRs are written when the call is ended, though there are some edge cases where an app-app call CDR may be delayed in being written, for example, if there is a network failure before the call is ended.

CDR files can be downloaded from the developer portal. Upon request, the CDR files can also be uploaded to an Amazon S3 bucket that your company provides and to which Sinch has write access.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/voice-rest-api/voice-rest-api-call-detail-records.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>