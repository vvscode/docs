---
title: "Reporting API"
excerpt: ""
---
[block:code]
{
  "codes": [
    {
      "code": "[URL] https://reportingapi.sinch.com/[version]\n\nCurrent version is \"v1\"",
      "language": "text"
    }
  ]
}
[/block]
## Call Report Definition
[block:code]
{
  "codes": [
    {
      "code": "[CallReportItem]\n  string - start\n  int - duration\n  int - success\n  int - failed",
      "language": "json"
    }
  ]
}
[/block]
## User Call Report

Gets the aggregated call data for a specific user for a duration of up to 30 days.

### Authorization

This is a protected resource and requires an `application signed request <applicationsignedrequest>`.

### Request
[block:code]
{
  "codes": [
    {
      "code": "https://reportingapi.sinch.com/v1/users/{type}/{endpoint}/calls/{domain}",
      "language": "text"
    }
  ]
}
[/block]
**type**, **endpoint**, **user identity** (see `Calling API documentation <calling-api>`).

**domain** Optional parameter that specifies the terminating domain. Can be data or pstn. Default: **data**
[block:code]
{
  "codes": [
    {
      "code": "* data - Calls that were terminated over data\n* pstn - Calls that were terminated over the phone network\n\nFilters:\n    time - _start\n    time - _stop",
      "language": "text"
    }
  ]
}
[/block]
*Example*
[block:code]
{
  "codes": [
    {
      "code": "[GET] https://reportingapi.sinch.com/v1/users/username/abc123def/calls/pstn?_start=2014-04-28&_stop=2014-04-29",
      "language": "text"
    }
  ]
}
[/block]
### Response
[block:code]
{
  "codes": [
    {
      "code": "CallReportItem\n  string - start\n  int - duration\n  int - success\n  int - failed",
      "language": "json"
    }
  ]
}
[/block]
**duration** is the sum of the duration of all calls in seconds. **success shows the number of successful calls.** failed shows the number of failed calls.

*Example*
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"success\": 2,\n    \"duration\": 623,\n      \"failed\": 0,\n        \"start\": \"2014-04-28T12:00:00Z\"\n}",
      "language": "json"
    }
  ]
}
[/block]
## Counters

Gets current value of a predefined instrumentation counter

### Authorization

This is a protected resource and requires an `application signed request <applicationsignedrequest>`.

### Request
[block:code]
{
  "codes": [
    {
      "code": "https://reportingapi.sinch.com/v1/counters/{id}",
      "language": "text"
    }
  ]
}
[/block]
**id** is a predefined counter id string - this needs to be set up in cooperation with Sinch support team

*Example*
[block:code]
{
  "codes": [
    {
      "code": "[GET] https://reportingapi.sinch.com/v1/counters/currentcalls",
      "language": "text"
    }
  ]
}
[/block]
### Response
[block:code]
{
  "codes": [
    {
      "code": "Counter\n    long - value\n    time - modified",
      "language": "text"
    }
  ]
}
[/block]
**value** is the current value of the counter **modified** shows the date and time value of the last update to the counter

*Example*
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"value\": 12384955,\n    \"modified\": \"2014-04-28T12:00:00Z\"\n}",
      "language": "json"
    }
  ]
}
[/block]
### Supported counters

#### Current Calls

Number of ongoing calls
[block:callout]
{
  "type": "info",
  "body": "The system updates the value of the counter every two minutes. The result value depends on how many calls were ongoing when the system updated the counter, and not when the request to the API was made.",
  "title": "Note"
}
[/block]
*Example*
[block:code]
{
  "codes": [
    {
      "code": "[GET] https://reportingapi.sinch.com/v1/counters/currentcalls",
      "language": "text"
    }
  ]
}
[/block]
## Get Service Status

Gets the current status of a predefined service

### Request
[block:code]
{
  "codes": [
    {
      "code": "https://reportingapi.sinch.com/v1/services/{id}",
      "language": "text"
    }
  ]
}
[/block]
**id** is a predefined service id - this needs to be set up in cooperation with Sinch Noc - please contact Sinch to be able to get the status of a particular service in the platform

*Example*
[block:code]
{
  "codes": [
    {
      "code": "[GET] https://reportingapi.sinch.com/v1/services/rtpproxy",
      "language": "text"
    }
  ]
}
[/block]
### Response
[block:code]
{
  "codes": [
    {
      "code": "ServiceStatus\n    string - status",
      "language": "text"
    }
  ]
}
[/block]
\*\*status\* shows current status of service. It can take these values:

  - “up” = service is available
  - “down” = service is unavailable

*Example*
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"status\": \"up\"\n}",
      "language": "json"
    }
  ]
}
[/block]