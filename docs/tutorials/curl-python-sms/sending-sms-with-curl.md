---
title: "Sending SMS With cURL"
excerpt: "In this tutorial, you will use cURL to send an SMS message to a mobile phone. We’ve also made a video tutorial to guide you through the process. Find out more."
---
In this tutorial, you will use cURL to send an SMS message to a mobile phone.

For [SMS API](https://www.sinch.com/products/messaging/sms/) pricing by destination, visit our [pricing pages](https://www.sinch.com/products/messaging/sms/).

We’ve also made a video tutorial to guide you through the process.

## Setup

> 1.  Create a [Sinch developer account](https://portal.sinch.com/#/signup)
> 2.  In the dashboard, click “Apps” in the left-hand menu
> 3.  Click “Create new app”
> 4.  Give your app a name and click “Create”
> 5.  Keep your app key and secret safe as you will need this in a minute
> 6.  Open your terminal

## Sending the SMS via the API

Then, in the cURL command, add the phone number and message you want to send, and add your app key and secret. Once you are finished, you should have something that looks like this:

```shell
curl --user "application\\your_app_key:your_app_secret" --data '{"message":"your_message"}' -H 'Content-Type: application/json' https://messagingapi.sinch.com/v1/sms/the_phone_number
```

Copy and paste this into your terminal, wait a few seconds, and you should receive the SMS message to the phone number you added in the command.

## What’s next?

This is just a basic demo of our [SMS API](https://www.sinch.com/products/messaging/sms/), but read [our documentation <sms-classic-sinch>` and other `tutorials](doc:tutorials-introduction) to see how you can integrate this with your own backend. Have questions? Just email the team [here](mailto:hello@sinch.com).

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/curl-python-sms/sending-sms-with-curl.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>