---
title: "HTTP Interface"
excerpt: ""
---
## How To Connect

Please find the hosts and port numbers for our Number Lookup HTTP/HTTPS server in the table below. Your username and password is available in the CAD (Client Account Details) document provided to you by your account manager.

### For servers in Europe

|               Server                     |         Host:Port                            |
| ---------------------------------- | ----------------------------------- |
| Primary Number Lookup HTTP Server  | http-eu3.clxcommunications.com:3700 |
| Backup Number Lookup HTTP Server   | http-eu1.clxcommunications.com:3700 |
| Primary Number Lookup HTTPS Server | http-eu3.clxcommunications.com:3701 |
| Backup Number Lookup HTTPS Server  | http-eu1.clxcommunications.com:3701 |

### For servers in the U.S.

|              Server                      |         Host:Port                            |
| ---------------------------------- | ----------------------------------- |
| Primary Number Lookup HTTP Server  | http-us3.clxcommunications.com:3700 |
| Backup Number Lookup HTTP Server   | http-us2.clxcommunications.com:3700 |
| Primary Number Lookup HTTPS Server | http-us3.clxcommunications.com:3701 |
| Backup Number Lookup HTTPS Server  | http-us2.clxcommunications.com:3701 |

## Query Specification

### Request

The request has the format:
[block:code]
{
  "codes": [
    {
      "code": "http://<username>:<password>@<server>:<port>/lookup?msisdn=[&nocache]\n",
      "language": "html",
      "name": "Format"
    }
  ]
}
[/block]
|         Parameter                  |            Description                      |
| ------------------------- | -------------------------------- |
| \<username\>:\<password\> | Basic authentication parameters  |
| \<server\>                | Authority \[93.158.78.4\]        |
| \<port\>                  | Port number \[3700\]             |
| \<msisdn\>                | MSISDN in international format   |
| nocache                   | Bypass cache function (optional) |

### Response

One of the responses when using Number Portability Lookup service:
[block:code]
{
  "codes": [
    {
      "code": "result=<result>;imsi=<imsi>",
      "language": "html",
      "name": "Example 1"
    },
    {
      "code": "result=<result>;imsi=<imsi>;location=<location>",
      "language": "html",
      "name": "Example 2"
    }
  ]
}
[/block]
Response when using the Real-Time Lookup service:
[block:code]
{
  "codes": [
    {
      "code": "result=<result>;imsi=<imsi>;location=<location>\n",
      "language": "html"
    }
  ]
}
[/block]
|      Parameter         |                    Description                                                        |
| ------------- | -------------------------------------------------------------------------- |
| \<result\>    | Lookup result (Response Code)                                              |
| \<imsi\>      | MCC+MNC corresponding to the MSISDN (only included when result is OK)      |
| \<location\>  | Country Code of current handset location (only included when result is OK) |

## Response Codes

|      Result                                |              Description                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------- |
| OK                                   | The request was successful                                                                  |
| DATA\_MISSING                        | The data was missing                                                                        |
| UNKNOWN\_SUBSCRIBER                  | The subscriber is unknown                                                                   |
| CALL\_BARRED                         | The service is restricted by the destination network                                        |
| ABSENT\_SUBSCRIBER\_SM               | The subscriber is absent                                                                    |
| UNEXPECTED\_DATA\_VALUE              | An unexpected data value in the request                                                     |
| SYSTEM\_FAILURE                      | A system failure occurred in the HLR                                                        |
| FACILITY\_NOT\_SUPPORTED             | Short message facility is not supported                                                     |
| TELE\_SERVICE\_NOT\_PROVISIONED      | SMS teleservice is not provisioned                                                          |
| HLR\_REJECT                          | The HLR request was rejected                                                                |
| HLR\_ABORT                           | The HLR (or some other entity) aborted the request. No response to the request was received |
| HLR\_LOCAL\_CANCEL                   | No response for the HLR request was received                                                |
| TIMEOUT                              | No response to the request was received                                                     |
| REQUEST\_THROTTLED                   | Maximum ongoing requests exceeded                                                           |
| IMSI\_LOOKUP\_BLOCKED                | Request is blocked                                                                          |
| Mandatory parameter msisdn not found | Some mandatory parameter are missing in the request                                         |
| MSISDN range is not accepted         | The number are not allowed on this service                                                  |
| msisdn is invalid                    | Wrong format of the MSISDN parameter                                                        |

## Examples

### HTTP Request
[block:code]
{
  "codes": [
    {
      "code": "http://username:password@93.158.78.4:3700/lookup?msisdn=46708100100\n",
      "language": "shell",
      "name": "Request"
    }
  ]
}
[/block]
**HTTP Request with cache function bypass**

### Successful response, Number Portability Lookup
[block:code]
{
  "codes": [
    {
      "code": "result=OK;imsi=24008\n\nor\n\nresult=OK;imsi=24008;location=46",
      "language": "shell",
      "name": "Successful response"
    }
  ]
}
[/block]
### Unsuccessful response
[block:code]
{
  "codes": [
    {
      "code": "result=UNKNOWN_SUBSCRIBER\n",
      "language": "shell",
      "name": "Unsuccessful response"
    }
  ]
}
[/block]
### Request with successful response, using curl
[block:code]
{
  "codes": [
    {
      "code": "$ curl -v -u user:password http://93.158.78.4:3700/lookup?msisdn=46708100200\n* About to connect() to 93.158.78.4 port 3700 (#0)\n* Trying 93.158.78.4…\n* Connected to 93.158.78.4 (93.158.78.4) port 3700 (#0)\n* Server auth using Basic with user ‘user’\n> GET /lookup?msisdn=46708100200 HTTP/1.1\n> Authorization: Basic dXNlcjpwYXNzd29yZA==\n> User-Agent: curl/7.30.0\n> Host: 93.158.78.4:3700\n> Accept: */*\n>\n< HTTP/1.1 200 OK, Success\n< Date: Mon, 12 Feb 2014 11:00:41 +0100\n< Content-Length: 20\n< Content-Type: text/plain; charset=ISO-8859-1\n<\n* Connection #0 to host 93.158.78.4 left intact\n\nresult=OK;imsi=24004",
      "language": "curl"
    }
  ]
}
[/block]