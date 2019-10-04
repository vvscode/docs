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

**Format**
```html
http://<username>:<password>@<server>:<port>/lookup?msisdn=[&nocache]

```


|         Parameter                  |            Description                      |
| ------------------------- | -------------------------------- |
| \<username\>:\<password\> | Basic authentication parameters  |
| \<server\>                | Authority \[93.158.78.4\]        |
| \<port\>                  | Port number \[3700\]             |
| \<msisdn\>                | MSISDN in international format   |
| nocache                   | Bypass cache function (optional) |

### Response

One of the responses when using Number Portability Lookup service:

**Example 1**
```html
result=<result>;imsi=<imsi>
```


**Example 2**
```html
result=<result>;imsi=<imsi>;location=<location>
```


Response when using the Real-Time Lookup service:
```html
result=<result>;imsi=<imsi>;location=<location>

```


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

**Request**
```shell
http://username:password@93.158.78.4:3700/lookup?msisdn=46708100100

```


**HTTP Request with cache function bypass**

### Successful response, Number Portability Lookup

**Successful response**
```shell
result=OK;imsi=24008

or

result=OK;imsi=24008;location=46
```


### Unsuccessful response

**Unsuccessful response**
```shell
result=UNKNOWN_SUBSCRIBER

```


### Request with successful response, using curl
```curl
$ curl -v -u user:password http://93.158.78.4:3700/lookup?msisdn=46708100200
* About to connect() to 93.158.78.4 port 3700 (#0)
* Trying 93.158.78.4…
* Connected to 93.158.78.4 (93.158.78.4) port 3700 (#0)
* Server auth using Basic with user ‘user’
> GET /lookup?msisdn=46708100200 HTTP/1.1
> Authorization: Basic dXNlcjpwYXNzd29yZA==
> User-Agent: curl/7.30.0
> Host: 93.158.78.4:3700
> Accept: */*
>
< HTTP/1.1 200 OK, Success
< Date: Mon, 12 Feb 2014 11:00:41 +0100
< Content-Length: 20
< Content-Type: text/plain; charset=ISO-8859-1
<
* Connection #0 to host 93.158.78.4 left intact

result=OK;imsi=24004
```

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/number-lookup/number-lookup-http-interface.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>