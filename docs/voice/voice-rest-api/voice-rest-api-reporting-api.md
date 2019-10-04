---
title: "Reporting API"
excerpt: ""
---
```text
[URL] https://reportingapi.sinch.com/[version]

Current version is "v1"
```


## Call Report Definition
```json
[CallReportItem]
  string - start
  int - duration
  int - success
  int - failed
```


## User Call Report

Gets the aggregated call data for a specific user for a duration of up to 30 days.

### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request).

### Request
```text
https://reportingapi.sinch.com/v1/users/{type}/{endpoint}/calls/{domain}
```


**type**, **endpoint**, **user identity** (see [Calling API documentation](doc:voice-rest-api-calling-api)).

**domain** Optional parameter that specifies the terminating domain. Can be data or pstn. Default: **data**
```text
* data - Calls that were terminated over data
* pstn - Calls that were terminated over the phone network

Filters:
    time - _start
    time - _stop
```


*Example*
```text
[GET] https://reportingapi.sinch.com/v1/users/username/abc123def/calls/pstn?_start=2014-04-28&_stop=2014-04-29
```


### Response
```json
CallReportItem
  string - start
  int - duration
  int - success
  int - failed
```


**duration** is the sum of the duration of all calls in seconds. **success shows the number of successful calls.** failed shows the number of failed calls.

*Example*
```json
{
  "success": 2,
    "duration": 623,
      "failed": 0,
        "start": "2014-04-28T12:00:00Z"
}
```


## Counters

Gets current value of a predefined instrumentation counter

### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request).

### Request
```text
https://reportingapi.sinch.com/v1/counters/{id}
```


**id** is a predefined counter id string - this needs to be set up in cooperation with Sinch support team

*Example*
```text
[GET] https://reportingapi.sinch.com/v1/counters/currentcalls
```


### Response
```text
Counter
    long - value
    time - modified
```


**value** is the current value of the counter **modified** shows the date and time value of the last update to the counter

*Example*
```json
{
  "value": 12384955,
    "modified": "2014-04-28T12:00:00Z"
}
```


### Supported counters

#### Current Calls

Number of ongoing calls

> **Note**    
>
> The system updates the value of the counter every two minutes. The result value depends on how many calls were ongoing when the system updated the counter, and not when the request to the API was made.

*Example*
```text
[GET] https://reportingapi.sinch.com/v1/counters/currentcalls
```


## Get Service Status

Gets the current status of a predefined service

### Request
```text
https://reportingapi.sinch.com/v1/services/{id}
```


**id** is a predefined service id - this needs to be set up in cooperation with Sinch Noc - please contact Sinch to be able to get the status of a particular service in the platform

*Example*
```text
[GET] https://reportingapi.sinch.com/v1/services/rtpproxy
```


### Response
```text
ServiceStatus
    string - status
```


\*\*status\* shows current status of service. It can take these values:

  - “up” = service is available
  - “down” = service is unavailable

*Example*
```json
{
  "status": "up"
}
```

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/voice-rest-api/voice-rest-api-reporting-api.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>