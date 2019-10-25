---
title: Call Detail Records
excerpt: ''
next:
  pages:
    - voice-rest-api-test-numbers
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

