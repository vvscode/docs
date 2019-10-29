---
title: Reporting API
excerpt: ''
next:
  pages:
    - voice-rest-api-onprem-call-detail-records
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

This is a protected resource and requires an [application signed request](doc:using-rest#section-application-signed-request).

### Request
```text
https://reportingapi.sinch.com/v1/users/{type}/{endpoint}/calls/{domain}
```


**type**, **endpoint**, **user identity** (see [Calling API documentation](doc:voice-rest-api-onprem-calling-api)).

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

This is a protected resource and requires an [application signed request](doc:using-rest#section-application-signed-request).

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

