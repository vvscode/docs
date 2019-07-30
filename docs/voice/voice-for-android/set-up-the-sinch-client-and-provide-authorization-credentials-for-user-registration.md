---
title: "Set up the Sinch client and provide authorization credentials for user registration"
excerpt: ""
---
[block:code]
{
  "codes": [
    {
      "code": "// Instantiate a SinchClient using the SinchClientBuilder,\n// and don't specify the application secret, only the application key.\nandroid.content.Context context = this.getApplicationContext();\nSinchClient sinchClient = Sinch.getSinchClientBuilder().context(context)\n                                                  .applicationKey(\"<application key>\")\n                                                  .environmentHost(\"sandbox.sinch.com\")\n                                                  .userId(\"<user id>\")\n                                                  .build();\n\nsinchClient.addSinchClientListener(...);\n\n// SinchClientListener implementation\npublic void onRegistrationCredentialsRequired(SinchClient client, \n                                              ClientRegistration registrationCallback) {\n    // This will on the first run for this user call onRegistrationCredentialsRequired on the client listener.\n    // Perform API request to server which keeps the Application Secret.\n    myApiService.getAuthorizedSignatureForUser(\"<user id>\", new OnCompletedCallback() {\n        public void onCompleted(String signature, long sequence) {\n            // pass the signature and sequence back to the Sinch SDK\n            // via the ClientRegistration interface.\n            registrationCallback.register(signature, sequence);\n        }\n    });\n}",
      "language": "java"
    }
  ]
}
[/block]