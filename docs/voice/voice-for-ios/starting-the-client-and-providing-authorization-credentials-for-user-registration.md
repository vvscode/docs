---
title: "Starting the Client and Providing Authorization Credentials for User Registration"
excerpt: ""
---
[block:code]
{
  "codes": [
    {
      "code": "// Instantiate a client object using the client factory method.\nid<SINClient> client = [Sinch clientWithApplicationKey:@\"<application key>\" \n                                           environmentHost:@\"sandbox.sinch.com\" \n                                                    userId:@\"<user id>\"];\n\nclient.delegate = ...;\n\n[client start];\n\n// This will on the first run for this user, call \n// -[SINClientDelegate client:requiresRegistrationCredentials:], \n// which implementations could look something like this:\n\n- (void)client:(id<SINClient>)client \nrequiresRegistrationCredentials:(id<SINClientRegistration>) registrationCallback {\n\n  // Perform API request to server which keeps the Application Secret\n  [myAPIService getAuthorizedSignatureForUser:[client userId]\n  onSuccess:^(NSString* signature, long long sequence){\n\n    // Forward the signature and sequence back into Sinch SDK\n    [registrationCallback registerWithSignature:signature sequence:sequence];\n  }\n  onFailure:^(NSError* error) {\n\n    // Forward potential network request error to Sinch SDK, \n    // e.g. failure due to no internet connection.\n    [registrationCallback registerDidFail:error];\n  }];\n}",
      "language": "objectivec"
    }
  ]
}
[/block]