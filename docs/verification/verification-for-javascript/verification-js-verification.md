---
title: "Verification"
excerpt: ""
---
The Sinch JavaScript SDK supports verification of phone numbers via SMS and Callout. Flash calling verification will be supported in a later release.

## SMS Verification

Verification of a phone number is performed in two steps, a verification SMS is requested and a verification code for that particular verification session is sent to the recipient. It's the responsibility of the developer to ask the end-user to provide the verification code from the SMS.

When the verification code is known, the `verify(code, success, fail)` method is used to verify the number.

When the supplied code is correct, the phone number is considered verified and you will receive this information in the response. If you have configured a callback URL for verification you will also receive confirmation through a callback to your backend.

### Request SMS verification

To initiate a SMS verification, start by creating a SMS verification session. This is done by calling the `createSmsVerification(phoneNumber)` method on your `sinchClient`. This method returns a verification object which can be used to send the verification SMS, and re-send the SMS, per the example below.

```javascript
var sinchClient = new SinchClient({applicationKey: YOUR_APPLICATION_KEY})

var verification = sinchClient.createSmsVerification(PHONE_NUMBER)

verification.initiate(success, fail);
```

The call to `initiate(success, fail)` triggers sending a verification SMS. This method can be called multiple times, in the case another SMS should be sent. Callbacks for success and failure should be supplied to inform the user whether the action succeeded. However, delivery is not guaranteed even if success is called, which is why it is recommended to provide the end-user a user interface to re-send the verification SMS.

### Verify SMS code

To verify the phone number, the resulting code from the SMS should be verified using the `verify()` method. This can be done in the following way:

```javascript
var code = codeFromUser;

verification.verify(code, success, fail);
```

The verify method takes two callbacks (beyond the pin-code), which can be used to inform the user of any issues or of success in verifying the phone number. However, important actions should be performed server-side using the callback on successful verification of a phone number.

### Act on SMS callbacks

As shown earlier, both `initiate` and `verify` take two callbacks as arguments for successful result or failure. These callbacks should be used to progress correctly through the flow:

  - UI to enter phone number
      - Success: Progress to enter verification code
      - Fail: UI to inform user of a problem and/or ask the user to try
        again
  - UI to enter verification code (or re-send SMS)
      - Success: Confirmation of successful verification
      - Fail: UI to inform user of verification problem

### SMS Template

By default, the SMS template used for Sinch verification SMS has a fixed format. Contact us at <dev@sinch.com> to update its content when your app is ready for Production.

## Callout Verification

Verification of a phone number is performed in one step: a PSTN call to the end-user phone is placed and a text-to-speech or recorded voice will instruct the end-user to press a digit.

To initiate a callout verification, start by creating a callout verification session. This is done by calling the `createCalloutVerification(phoneNumber)` method on your `sinchClient`. This method returns a verification object which can be used to initiate the call and act on outcome using callbacks, per the example below.

```javascript
var sinchClient = new SinchClient({applicationKey: YOUR_APPLICATION_KEY})

var verification = sinchClient.createCalloutVerification(PHONE_NUMBER)

verification.initiate(success, fail);
```

The call to `initiate(success, fail)` triggers a PSTN call. This method can be called multiple times. Callbacks for success and failure should be supplied to inform the user whether the verification succeeded.

## Pass data to your backend

For each call to `verification.initiate()`, the Sinch backend can perform a callback to the application backend to allow or disallow an SMS or flashcall being initiated. By using the optional parameter `custom` on `SinchVerification.createFlashCallVerification` and `createSmsVerification`, any unique identifier can be passed from the application to the application backend. The data is passed as a string. If there is a need for a more complex datatype, it needs to be stringified or encoded before being sent.

## Promises

As an alternative to callbacks, the verification session object also supports promises. The execution order is for callbacks to be called first, followed by promises. When using promises, the full flow may look like this:

```javascript
var sinchClient = new SinchClient({applicationKey: YOUR_APPLICATION_KEY})

var verification = sinchClient.createSmsVerification(PHONE_NUMBER)

verification.initiate().then(function(successInfo) {
    // Act on success
    // Display "enter pin" UI
}).fail(function(errorInfo) {
    // Act on error
});

//PIN is retrieved from user
var code = codeFromUser;

verification.verify(code).then(function(successInfo) {
    // Act on success (valid number)
}).fail(function(errorInfo) {
    // Act on error and inform the user / retry
});
```

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-for-javascript/verification-js-verification.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>