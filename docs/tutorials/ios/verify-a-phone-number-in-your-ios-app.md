---
title: "Verify a Phone Number in Your iOS App"
excerpt: "In this tutorial, we are going to explore our Verification SDK for iOS. As of this writing, the method we support for iOS is SMS verification. With our Verification SDK, you won’t need any backend yourself, or you can implement a simple endpoint to receive that a number is verified."
---
In this tutorial, we are going to explore our Verification SDK for iOS. As of this writing, the method we support for iOS is [SMS verification](doc:verification-ios-sms-verification), which we wrote about in [earlier tutorials](doc:building-an-ios-client-for-number-verification-part-2). With our Verification SDK, you won’t need any backend yourself, or you can implement a simple endpoint to receive that a number is verified. .. You can check out more [Verification Tutorials](https://www.sinch.com/tutorials/?tags%5B%5D=verification&utm_source=sinch&utm_medium=xlink&utm_campaign=verifyall)

## Setup

I created a start project that contains the framework and a couple of screens you can download [here](https://github.com/sinch/ios-verification-tutorial). If you prefer to add it to your app directly, here is how you set it up:

> 1.  Download the SDK [here](https://sinch.readme.io/page/downloads)
> 2.  Add the `SinchVerification.Framework` to your app, OR
> 3.  Use [CocoaPods](http://cocoapods.org) -`pod 'SinchVerification', '0.9-beta1'`

## Verifying a phone number

First off, we need to collect the user’s phone number as we do in the starter project “EnterPhonenumberViewController” and request to send an SMS to that number. Open the **EnterPhonenumberViewController.m** and find the **requestCode** method. Then find the row `[self performSegueWithIdentifier:@"verifyCodeSeg" sender:nil];` and replace it with this code:

*EnterPhonenumberViewController.m*

```objectivec
//start the verification process with the phone number in the field
_verification = [SINVerification
                    SMSVerificationWithApplicationKey:@"YOURKEY"
                    phoneNumber:_phoneNumber.text];
//set up the initiate the process
[_verification initiateWithCompletionHandler:^(BOOL success, NSError *error) {
   [spinner stopAnimating];
   if (success) {
      [self performSegueWithIdentifier:@"verifyCodeSeg" sender:nil];
   }
   else {
      _status.text = [error description];
   }
}];
```

In the code above, we are creating a verification object and starting the two step process of verifying a number. If it fails, display an error message, otherwise continue to the **EnterCode** screen. In the starter project, I also prepared the **prepareForSegue:** method to pass the verification object to the EnterCode controller.

```objectivec
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    VerifyCodeViewController* vc = [segue destinationViewController];
    vc.verification = _verification;
}
```

Here we set the verification object to the current verification. Next up, verify the code sent to the phone. Open up **VerifyCodeViewController.m**, find the method **verifyCode:**, and replace the line `[self performSegueWithIdentifier:@"verifyCodeSeg" sender:nil];` with

**VerifyCodeViewController.m**

```objectivec
[self.verification
 verifyCode:code.text
 completionHandler:^(BOOL success, NSError* error) {
     if (success) {
         [_spinner stopAnimating];
         [self performSegueWithIdentifier:@"confirmedSeg" sender:nil];
         // Phone number was successfully verified, you should
         //probably notify your backend or use the callbacks to store that the phone is
         //verified.
     } else {
         // Ask user to re-attempt verification
         status.text = [error description];
     }
 }];
```

With a few lines of code, you can implement a solid solution to verify phone numbers of your users in iOS. Next up is implementing the callbacks on your server side.
![sms-input.jpg](images/83d24a7-sms-input.jpg)

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ios/verify-a-phone-number-in-your-ios-app.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>