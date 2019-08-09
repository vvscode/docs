---
id: "5d417c683bdc5d0030e4c043"
title: "Pass data to your backend"
excerpt: ""
---
For each call to `[SINVerification initiateWithCompletionHandler:]`, the Sinch backend performs a callback to the application backend to allow or disallow the initiation of an SMS call or a callout. By using the optional parameter `custom` on `[SINVerification SMSVerificationWithApplicationKey:phoneNumber:custom]` or `[SINVerification calloutVerificationWithApplicationKey:phoneNumber:custom]`, any unique identifier can be passed from the application to the application backend. The data is passed as a string. If there is a need for a more complex datatype, it needs to be stringified or encoded before being sent.