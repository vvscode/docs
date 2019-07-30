---
title: "HTTP Status Codes"
excerpt: "The REST API returns an HTTP status and code each time a request is made."
---
### HTTP Statuses

The following HTTP status codes are used by the API. Additional codes might be added in the future and if you encounter a code not in this list please consult the [HTTP specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10/) for a definition.
[block:parameters]
{
  "data": {
    "h-0": "Status",
    "h-1": "Description",
    "0-0": "200&nbsp;OK",
    "0-1": "The request was successful.",
    "1-0": "201&nbsp;Created",
    "1-1": "The `POST` request was successful and a new resource was created.",
    "2-0": "400&nbsp;Bad&nbsp;Request",
    "2-1": "The request does not conform to the API. The response body should provide more information.",
    "3-0": "401&nbsp;Unauthorized",
    "3-1": "Authentication token is invalid for this service plan.",
    "4-0": "403&nbsp;Forbidden",
    "4-1": "The request syntax is valid but cannot be performed. This could for example be because a referenced resource doesn't exist.",
    "5-0": "404&nbsp;Not&nbsp;Found",
    "5-1": "The path is invalid or no resource exists with the given ID.",
    "6-0": "405&nbsp;Method&nbsp;Not&nbsp;Allowed",
    "6-1": "The path is valid but not for this method.",
    "8-0": "429&nbsp;Too&nbsp;Many&nbsp;Requests",
    "8-1": "The user or path has too many outstanding requests.",
    "9-0": "500&nbsp;Internal&nbsp;Server&nbsp;Error",
    "9-1": "An unexpected internal error occurred and the request was not processed.",
    "10-0": "503&nbsp;Service&nbsp;Unavailable",
    "10-1": "The service is unable to perform the request at this point. Most likely due to a required subsystem being unavailable.",
    "7-0": "415&nbsp;Unsupported&nbsp;Media&nbsp;Type",
    "7-1": "The `Content-Type` header is missing or unsupported. Most operations expect `application/json`."
  },
  "cols": 2,
  "rows": 11
}
[/block]
### HTTP Errors

Responses with status `400 Bad Request` and `403 Forbidden` will present a JSON object in the body explaining the error. It has the following structure:
[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-2": "JSON Type",
    "h-1": "Description",
    "0-0": "`code`",
    "1-0": "`text`",
    "0-1": "A code that can be used to programmatically recognize the error. See [below](#section-error-codes) for possible values.",
    "0-2": "`String`",
    "1-2": "`String`",
    "1-1": "Human readable description of the error. Can be used for debugging."
  },
  "cols": 3,
  "rows": 2
}
[/block]
### Error codes

The following error codes can be returned as values for the `code` field:
[block:parameters]
{
  "data": {
    "0-0": "400",
    "1-0": "400",
    "2-0": "400",
    "3-0": "403",
    "4-0": "403",
    "5-0": "403",
    "h-0": "HTTP Status",
    "h-1": "Code",
    "h-2": "Description",
    "0-1": "`syntax_invalid_json`",
    "1-1": "`syntax_invalid_parameter_format`",
    "2-1": "`syntax_constraint_violation`",
    "3-1": "`unknown_group`",
    "4-1": "`unknown_campaign`",
    "5-1": "`missing_callback_url`",
    "0-2": "The JSON in the request is invalid or does not conform to the API specification.",
    "1-2": "The format of a field value is invalid. For example if a MSISDN is not correctly formatted.",
    "2-2": "The request body doesn't fulfill all of the constraints set by the API. For example if a required field is missing.",
    "3-2": "A referenced group ID is unknown. This could happen if the ID is invalid or if the group has been deleted.",
    "4-2": "The campaign ID does not match the specified originator.",
    "5-2": "Callback has been requested but no URL is provided."
  },
  "cols": 3,
  "rows": 6
}
[/block]