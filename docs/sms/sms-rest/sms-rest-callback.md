---
title: "Callback"
excerpt: ""
---
A callback is a HTTP POST request with a notification made by the Sinch SMS REST API to a URI of your choosing. The REST API expects the receiving server to respond with a response code within the `2xx` Success range. If no successful response is received then the REST API will either schedule a retry if the error is expected to be temporary or discard the callback if the error seems permanent. The first initial retry will happen 5 seconds after the first try. The next attempt is after 10 seconds, then after 20 seconds, after 40 seconds, after 80 seconds and so on, doubling on every attempt. The last retry will be at 81920 seconds (or 22 hours 45 minutes) after the initial failed attempt.

The REST API offers the following callback options which can be configured for your account upon request to your account manager.

 * Callback with mutual authentication over TLS (HTTPS) connection by provisioning the callback URL with client keystore and password.
 * Callback with basic authentication by provisioning the callback URL with username and password.
 * Callback with OAuth 2.0 by provisioning the callback URL with username, password and the URL to fetch OAuth access token.
 * Callback using AWS SNS by provisioning the callback URL with an Access Key ID, Secret Key and Region.

### Delivery report callback

A delivery report contains the status and status code for each recipient of a batch. To get a delivery report callback for a message or batch of messages you need to set the `delivery_report` field accordingly when [creating a batch](doc:sms-rest-batches-endpoint#section-send-a-batch-message). The formats of the different types of delivery reports are described in [Retrieve a delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-delivery-report) and in [Retrieve a recipient delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-recipient-delivery-report).

The callback URL can either be provided for each batch in the [Send a batch message](doc:sms-rest-batches-endpoint#section-send-a-batch-message) operation or provisioned globally for your account.

### Inbound message callback

An inbound message or MO (*Mobile Originated*) is a message sent to one of your shortcodes or long numbers from a mobile phone. The format of an inbound callback is described in [Inbounds Endpoint](doc:sms-rest-inbounds-endpoint).

To receive inbound message callbacks, a URL needs to be provisioned for your account. This URL can be specified in the Sinch Dashboard.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-callback.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>