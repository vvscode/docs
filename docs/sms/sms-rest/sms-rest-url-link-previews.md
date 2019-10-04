---
title: "URL Link Previews"
excerpt: ""
---
Some mobile devices are capable of displaying previews for links contained in SMS or MMS messages. When messages that contain a URL are received on these devices, they may be rendered in the messaging application with a preview of the linked page. This behaviour is controlled from the phone or its software, and can not be affected by Sinch or the carrier.

## Behaviour on iOS

There are multiple factors that affect whether an iPhone shows a preview for a link received in a message, and what the preview looks like:

### Is the sender saved in the recipient's contacts list?

According to our testing, iOS will only render a preview for links sent in SMS or MMS if the sender is saved in the recipient's contact list. Otherwise, the URL will be displayed in the body of the message.

### Is the URL at the very beginning or the very end of the message?

iPhones will only display a link preview if the URL is at the beginning or the end of the message. iOS will not render a preview for a URL in the middle of a message, or even just surrounded by periods or quotation marks.

## Behaviour on Android

Depending on the device but if the recipient has googles Messages app or Samsung you should be able to see previews if the phone has been updated after June 2018

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-url-link-previews.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>