---
title: "Verify Phone Numbers with the Swift SDK using SMS"
excerpt: "We recently made our first Swift SDK available for the Sinch Verification product range. Before we dig into the Swift parts, let’s talk about verification and why you would want it."
---
We recently made our first Swift SDK available for the [Sinch Verification product range](https://www.sinch.com/products/verification/). Before we dig into the Swift parts, let’s talk about verification and why you would want it.

Our Verification product enables you to ensure that a user is in possession of a phone number by relying on the regular phone network to either send an SMS or make a call.

Why would you use our SDK instead of rolling it yourself as we have showed in previous tutorials?

 - [Rails/Android Authentication](doc:verify-phone-numbers-with-the-swift-sdk-using-sms)
 - [C#/iOS](doc:building-a-c-authentication-system-with-net-part-1)
 - [C#/Web](doc:number-verification-aspnet-identity-and-two-factor-authentication-part-3)
 - [Build Your Own Magic One-Touch Login](doc:verify-phone-numbers-with-the-swift-sdk-using-sms)

## We provide good value with our cloud SDK

 1. We take care of the logic of re-tries
 1. We automatically block spam numbers
 1. We make sure re-tries are handled in a correct way
 1. We are easy to use from you mobile app and just two simple callbacks to your backend to notify you about statuses of a verification
 1. We support multiple ways of authentication (just for Android at the moment, but shortly arriving for iOS)
 1. We are low cost because you don’t need to rent any numbers on your own

Let’s stop talking and do some coding\!

## The code

 1. [Create an account](https://portal.sinch.com/#/signup)
 1. Create an app and change enable verification (set it to public for now)
    ![configureapp.png](images/700bb7b-configureapp.png)

 1. Head over to <https://github.com/sinch/ios-swift-verification> to download the repo.
    ![screenshots2.jpg](images/4729ddb-screenshots2.jpg)

There are some important bits to look at from a verification perspective in this app. One is the *EnterPhoneNumberViewController.swift* function:

```swift
@IBAction func startVerification(sender: AnyObject) {
    self.verification = SMSVerification(
            applicationKey:"<yourkey>",
            phoneNumber: phoneNumber.text)
    self.verification!.initiate {
        (success: Bool, error: NSError?)
            -> Void in
            if (success)
            {
                self.performSegueWithIdentifier("verifySeg", sender:self)
            }
        }
    }
```

This function initiates an [SMS verification request](https://www.sinch.com/products/verification/sms/) to the specified phone number (from the *viewcontroller*) and straight away gives you an indication if it’s on its way. In this case, I display an *EnterCodeViewController* and prompt the user to enter the code received in the SMS.

```swift
@IBAction func verifyCode(sender: AnyObject) {
    verification?.verify(
        code.text,
        completion: {
            (success:Bool, error:NSError?) -> Void in
            if (success)
            {
                self.navigationController?.popToRootViewControllerAnimated(true)
            }
            else
            {
                //display some error message here
            }

        })
    }
```

In this simple sample app, I just pop to the root view controller, but you get an idea of how simple it is to integrate.

For more information about using our Swift SDK, read about our [verification product](doc:verification-for-ios).

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ios/verify-phone-numbers-with-the-swift-sdk-using-sms.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>