---
title: "HTTP Status Codes"
excerpt: "The REST API returns an HTTP status and code each time a request is made."
---
### HTTP Statuses

The following HTTP status codes are used by the API. Additional codes might be added in the future and if you encounter a code not in this list please consult the [HTTP specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10/) for a definition.

| Status                                    | Description                                                                                                                 |
|-- -                                       | ---                                                                                                                       --|
| 200&nbsp;OK                               | The request was successful.                                                                                                 |
| 201&nbsp;Created                          | The `POST` request was successful and a new resource was created.                                                           |
| 400&nbsp;Bad&nbsp;Request                 | The request does not conform to the API. The response body should provide more information.                                 |
| 401&nbsp;Unauthorized                     | Authentication token is invalid for this service plan.                                                                      |
| 403&nbsp;Forbidden                        | The request syntax is valid but cannot be performed. This could for example be because a referenced resource doesn't exist. |
| 404&nbsp;Not&nbsp;Found                   | The path is invalid or no resource exists with the given ID.                                                                |
| 405&nbsp;Method&nbsp;Not&nbsp;Allowed     | The path is valid but not for this method.                                                                                  |
| 415&nbsp;Unsupported&nbsp;Media&nbsp;Type | The `Content-Type` header is missing or unsupported. Most operations expect `application/json`.                             |
| 429&nbsp;Too&nbsp;Many&nbsp;Requests      | The user or path has too many outstanding requests.                                                                         |
| 500&nbsp;Internal&nbsp;Server&nbsp;Error  | An unexpected internal error occurred and the request was not processed.                                                    |
| 503&nbsp;Service&nbsp;Unavailable         | The service is unable to perform the request at this point. Most likely due to a required subsystem being unavailable.      |


### HTTP Errors

Responses with status `400 Bad Request` and `403 Forbidden` will present a JSON object in the body explaining the error. It has the following structure:

| Name   | Description                                                                                                             | JSON Type |
|-- -    | ---                                                                                                                     | ---     --|
| `code` | A code that can be used to programmatically recognize the error. See [below](#section-error-codes) for possible values. | `String`  |
| `text` | Human readable description of the error. Can be used for debugging.                                                     | `String`  |

### Error codes

The following error codes can be returned as values for the `code` field:

| HTTP Status | Code                              | Description                                                                                                         |
|-- -         | ---                               | ---                                                                                                               --|
| 400         | `syntax_invalid_json`             | The JSON in the request is invalid or does not conform to the API specification.                                    |
| 400         | `syntax_invalid_parameter_format` | The format of a field value is invalid. For example if a MSISDN is not correctly formatted.                         |
| 400         | `syntax_constraint_violation`     | The request body doesn't fulfill all of the constraints set by the API. For example if a required field is missing. |
| 403         | `unknown_group`                   | A referenced group ID is unknown. This could happen if the ID is invalid or if the group has been deleted.          |
| 403         | `unknown_campaign`                | The campaign ID does not match the specified originator.                                                            |
| 403         | `missing_callback_url`            | Callback has been requested but no URL is provided.                                                                 |

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-http-status-codes.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>