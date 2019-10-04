---
title: "iOS App to Phone Tutorial"
excerpt: "In this tutorial you will learn how to use the Sinch SDK to make a voice call from an iOS app from to a regular phone number."
---
In this tutorial, you’ll learn how to use the Sinch SDK to make a voice call from an iOS app to a regular phone number. This will take about 20 minutes to build and will require:

>   - Xcode
>   - An understanding of Objective-C
>   - Another phone to call (any mobile with a standard phone number)

## Start

To begin, sign up for a Sinch account [here](https://portal.sinch.com/#/signup). Set up a new application using the dashboard and take note of your application key and secret.
Next:

>   - Launch Xcode and create a new project (File\>New\>Project)
>   - Select Single View Application and click Next
>   - Name the project “CallingApp” and save it

The easiest way to add the Sinch SDK is to use CocoaPods. Open a terminal window in your Xcode project directory and create a Podfile with the content below:

`pod init`

Open the Podfile and add the following:

    pod 'SinchRTC'

Save the file and in the terminal window type:

`pod install`


> **Note**
>
> If you are new to CocoaPods, go to* [cocoapods.org](http://cocoapods.org/) to learn how to install it.

Lastly, set the architectures on your project and the pod project to `armv7` and `armv7s`.

Setting up the client Open the **Main.storyboard** in Xcode and add a textfield and a button. Set the text of the button to “Call.”
![callscreen.png](images/705b075-callscreen.png)

Add outlets and actions in **ViewController.h** like this:

```objectivec
@property (weak, nonatomic) IBOutlet UITextField *phoneNumber;
@property (weak, nonatomic) IBOutlet UIButton *callButton;
- (IBAction)call:(id)sender;
```

Also add an import to the Sinch client in your ViewController.h:

`#import <Sinch/Sinch.h>`

Then, in ViewController.m, find `- (void)viewDidLoad` and add `[super viewDidLoad];` after. Here is what your code should look like:

```objectivec
- (void)viewDidLoad
{
    [super viewDidLoad];
    [self initSinchClient];
}
```

Add instance variables to ViewController.m:

```objectivec
@interface ViewController ()
{
    id<SINClient> _client;
    id<SINCall> _call;
}
@end
```

Next, synthesize the properties by adding `@synthesize phoneNumber,
callButton;`.

Create a method called `initSinchClient`, add your application key and secret, and choose a username. In this tutorial we are not going to have any login functionality because this is just a basic calling app skeleton.

```objectivec
-(void)initSinchClient
{
    _client = [Sinch clientWithApplicationKey:@"your_key"
                            applicationSecret:@"your_secret"
                              environmentHost:@"clientapi.sinch.com"
                                       userId:@"anything you want"];
    _client.callClient.delegate = self;
    [_client setSupportCalling:YES];
    [_client start];}
```

As you can see, you now have a warning. Let’s fix that by adding the `SINCallClientDelegate` to the `ViewController.h` file:

```objectivec
@interface ViewController : UIViewController <SINCallClientDelegate>
```

If you have followed the [iOS app-to-app calling tutorial](doc:build-an-ios-facebook-app-to-call-your-friends), you might notice that we are not listening to active connections with `[_client startListeningOnActiveConnection]`. That’s because it’s unnecessary when you only want to make PSTN and outgoing calls.

Also, not starting an active connection will save you money.

This all the setup needed to make PSTN (app-to-phone) calls. Next, we will implement a “placing the call” functionality.

## Making a call

Change the `call:` action to look like this:

```objectivec
- (IBAction)call:(id)sender {
    if (_call == nil)
    {
        _call = [[_client callClient] callPhoneNumber:phoneNumber.text];
        [callButton setTitle:@"Hangup" forState:UIControlStateNormal];
    }
    else
    {
        [_call hangup];
        [callButton setTitle:@"Call" forState:UIControlStateNormal];
    }

}
```

This changes the functionality either to call or hang up.

And there you have it. For a production app, your next steps will be to implement the `SINCallDelegate` protocol so you can make UI changes on `callDidEnd` or `callDidEstablish`, for example.

Happy coding\!

If you enjoyed this tutorial, read our other iOS and [app-calling tutorials](doc:tutorials-introduction).

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ios/ios-app-to-phone-tutorial.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>