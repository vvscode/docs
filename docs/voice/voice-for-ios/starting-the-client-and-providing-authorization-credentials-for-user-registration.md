---
id: "5d3f68e7ad465c01602f1f6d"
title: "Starting the Client and Providing Authorization Credentials for User Registration"
excerpt: ""
---
```objectivec
// Instantiate a client object using the client factory method.
id<SINClient> client = [Sinch clientWithApplicationKey:@"<application key>" 
                                           environmentHost:@"sandbox.sinch.com" 
                                                    userId:@"<user id>"];

client.delegate = ...;

[client start];

// This will on the first run for this user, call 
// -[SINClientDelegate client:requiresRegistrationCredentials:], 
// which implementations could look something like this:

- (void)client:(id<SINClient>)client 
requiresRegistrationCredentials:(id<SINClientRegistration>) registrationCallback {

  // Perform API request to server which keeps the Application Secret
  [myAPIService getAuthorizedSignatureForUser:[client userId]
  onSuccess:^(NSString* signature, long long sequence){

    // Forward the signature and sequence back into Sinch SDK
    [registrationCallback registerWithSignature:signature sequence:sequence];
  }
  onFailure:^(NSError* error) {

    // Forward potential network request error to Sinch SDK, 
    // e.g. failure due to no internet connection.
    [registrationCallback registerDidFail:error];
  }];
}
```