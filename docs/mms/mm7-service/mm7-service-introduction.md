---
title: "Introduction to MMS7 Service"
excerpt: ""
---
**Finding your VASPID (API Key)**

You must first request access to the API from your account manager. You can reset the Key at any time to revoke access. Your username and password for your account are seperate from your API key so you do not have to worry about a account password reset affecting your services.

**Finding your VASID**

Your account manager will provide you with a VASID for each shortcode. If you use a dedicated shortcode you can pick your own VASID or we can configure it empty.

**Receiving Delivery Reports and MO's**

Your Delivery Report URL and MO URL is configured by tour account manager. You can update it at any time. SOAP requests will be forwarded to your server every second and require an HTTP STATUS 200 and a proper MM7 SOAP Response or else we will retry.

*We expect your server to accept our postback within 10 seconds by responding with a standard HTTP STATUS 200 header (success) and proper SOAP Response with matching MM7 TransactionID and Status 1000. If establishing a connection to your Postback URL takes longer than 10 seconds, the connection will time out and be dropped. If the connection times out or the HTTP code is not 200 we will retry the notification again five minutes later for a maximum of 5 retries per notification.*

**API Limitations**

You may have a throughput limit on your account. If your API requests exceed the throughput on your account then you may have some latency in the delivery of your messages. There may also be limits on the number of API calls allowed per second/minute/day. These limits will be published in your API Settings page. If you exceed this limit then your message will be rejected and you will be required to retry the request.

**Authentication**

We authenticate your account with your VASPID and we authenticate your short code, service and carrier reach with the VASID. We can optionally whitelist your IP Address or apply a "basic authorization" username and password requirement to your account which adds an additional level of security to your request.

**Special Considerations**

*Always Use International Number Format:*
You must use international format when submitting an MM7 message to Sinch. International format includes both the country code with the phone number. We use the country code to determine routing of the message. There should be no dialing prefixes (eg 00 or 001) or special characters such as the plus symbol when submitting messages. (example: '642111111' not '+642111111'). If you submit a message without a country code the message will likely get routed to the wrong country and you may end up paying for the delivery there.

*For example the US number (774)-319-9144 in international number format would be 17743199144 because the USA country code is 1.*

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/mm7-service/mm7-service-introduction.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>