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

<a class="edit-on-github" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-url-link-previews.md">Edit on GitHub</a>