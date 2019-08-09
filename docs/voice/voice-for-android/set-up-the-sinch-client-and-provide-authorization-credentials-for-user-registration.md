---
id: "5d403d4c428ba9003d354cdb"
title: "Set up the Sinch client and provide authorization credentials for user registration"
excerpt: ""
---
```java
// Instantiate a SinchClient using the SinchClientBuilder,
// and don't specify the application secret, only the application key.
android.content.Context context = this.getApplicationContext();
SinchClient sinchClient = Sinch.getSinchClientBuilder().context(context)
                                                  .applicationKey("<application key>")
                                                  .environmentHost("sandbox.sinch.com")
                                                  .userId("<user id>")
                                                  .build();

sinchClient.addSinchClientListener(...);

// SinchClientListener implementation
public void onRegistrationCredentialsRequired(SinchClient client, 
                                              ClientRegistration registrationCallback) {
    // This will on the first run for this user call onRegistrationCredentialsRequired on the client listener.
    // Perform API request to server which keeps the Application Secret.
    myApiService.getAuthorizedSignatureForUser("<user id>", new OnCompletedCallback() {
        public void onCompleted(String signature, long sequence) {
            // pass the signature and sequence back to the Sinch SDK
            // via the ClientRegistration interface.
            registrationCallback.register(signature, sequence);
        }
    });
}
```