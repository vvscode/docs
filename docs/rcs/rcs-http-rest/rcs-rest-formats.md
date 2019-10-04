---
title: "RCS Formats"
excerpt: ""
---
This section will take a brief look at some of the formats used in the REST API.

### JSON

JSON (`application/json`) is the content type of both requests and responses if not otherwise specified.

Requests with invalid JSON will be rejected.

Null values can be omitted in requests and will be omitted in responses. In some cases explicitly setting null will overwrite a previously set value with null.

### MSISDN

Only MSISDNs in international format are accepted by the API.

MSISDNs can be sent in with or without a leading `+` (i.e. `+123456789` or `123456789` are equivalent) or with a leading `00`. Any spaces, dashes or brackets, will also be ignored by the API.

All MSISDNs returned by the REST API will be without a `+` or `00` prefix, even if they were originally sent in with one.

### Timestamps

Timestamps are represented using the [ISO-8601 standard](https://en.wikipedia.org/wiki/ISO_8601).

All timestamps returned by the API will be in UTC with millisecond precision.

The time zone can be specified in accordance with ISO-8601. If no time zone offset is specified (local time in ISO-8601) then UTC will be implied.

## HTTP Status Codes

The REST API returns an HTTP status and code each time a request is made.

### HTTP Statuses

The following HTTP status codes are used by the API. Additional codes might be added in the future. If you encounter a code not in this list please consult the [HTTP specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10/) for a definition.

| Status                                    | Description                                                                                                            |
|-- -                                       | ---                                                                                                                  --|
| 200&nbsp;OK                               | The request was successful.                                                                                            |
| 400&nbsp;Bad&nbsp;Request                 | The request does not conform to the API. The request body should provide more information.                             |
| 401&nbsp;Unauthorized                     | The authentication token is invalid for this service plan.                                                             |
| 404&nbsp;Not&nbsp;Found                   | The path is invalid, or no resource exists with the given ID.                                                          |
| 405&nbsp;Method&nbsp;Not&nbsp;Allowed     | The path is valid but not for this method.                                                                             |
| 409&nbsp;Conflict                         | Duplicate message-id provided or trying to revoke an irrevocable message                                               |
| 415&nbsp;Unsupported&nbsp;Media&nbsp;Type | The request `Content-Type` is missing or unsupported. Most operations expect `application/json`.                       |
| 500&nbsp;Internal&nbsp;Server&nbsp;Error  | An unexpected internal error occurred, and the request was not processed.                                              |
| 503&nbsp;Service&nbsp;Unavailable         | The service is unable to perform the request at this point. Most likely due to a required subsystem being unavailable. |

### HTTP Errors

Responses with status `400 Bad Request` and `409 Forbidden` will contain a JSON object explaining the error in the body. This object has the following structure:

#### Error

JSON Representation

**JSON Representation for errors**
```javascript
{
  "error": string,
  "field_errors": [
    object(FieldError), ...
  ]
}
```


| Field         | Type                  | Description                                                   | Default | Constraints | Required |
| ------------- | --------------------- | ------------------------------------------------------------- | ------- | ----------- | -------- |
| error         | string                | Descriptive message of the error                              | No      | N/A         | Yes      |
| field\_errors | arrayOf([`FieldError`](#section-fielderror)) | List of field errors, each element describes a specific field | No      | N/A         | No       |

#### FieldError

JSON Representation

**JSON Representation**
```javascript
{
  "field": string,
  "errors": [
    string, ...
  ]
}
```


| Field  | Type            | Description                                | Default | Constraints | Required |
| ------ | --------------- | ------------------------------------------ | ------- | ----------- | -------- |
| field  | string          | The field for which this error is relevant | No      | N/A         | Yes      |
| errors | arrayOf(string) | List of errors for the field               | No      | N/A         | Yes      |


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/rcs/rcs-http-rest/rcs-rest-formats.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>