---
title: "Authentication"
excerpt: ""
---
## Authentication by your backend

It is possible to integrate Sinch with your existing user management solution. With this method, you get full control of your user database and can authenticate users in whichever way you see best fit; it may even be a third party solution.

This solution requires you to generate an authentication ticket using your application key and application secret on your Application Server. See the [Reference Documentation](http://www.sinch.com/docs/javascript/reference/) for more information about generating this ticket.

The authentication ticket is then sent to Sinch, using the `.start()` method in the `SinchClient` instance. The ticket is exchanged into a Sinch session, and the rest of the process is identical to when Sinch manages your users.

> **Note**    
>
> Included with the Sinch JS SDK are samples for getting you started with the integration of your authentication scheme with Sinch.


![authentication_papi_partner.png](images/d4a29ad-authentication_papi_partner.png)
Authentication Supported by Partner
Backend

This method, where you authenticate users with your backend, may look like this:
```javascript
var sinchClient = new SinchClient({
        applicationKey: 'MY_APPLICATION_KEY',
        capabilities: {messaging: true},
    });

// This jQuery call is just an example how you might authenticate users and pass the ticket to Sinch.
$.post('https://example.com/auth',
    {username: 'alice', password: 'somethingSecure'},
    function(authTicket) {
        sinchClient.start(authTicket)
            .then(function() {
                // Handle successful start, like showing the UI
            })
            .fail(function(error) {
                // Handle Sinch error
            });
    }, 
    function(error) {
        // Handle application server error
    });
```


This code will first instantiate the sinchClient with your application key. In this example, jQuery is used to perform an ajax request to your application server for authenticating the user *Alice*. jQuery will parse the json object and pass it to `sinchClient.start()`.

When `sinchClient.start()` has successfully started the client, the success callback is executed, which may display the UI, or enable some buttons, or other actions you now want to take.

## Authentication by Sinch

The Sinch JavaScript SDK allows for an easy authentication process requiring no backend, in order to get started quickly. Note however that we do not recommend to use this authentication model when launching your app live since you have no control over user creation. When going live, Sinch JS authentication can be disabled in the “App setting” section within the Dashboard.

Sinch JS authentication involves authenticating end-users by passing a user identity and password to `sinchClient.start()` when starting Sinch. In this scenario only the application key is needed; the application secret is not used and the authentication of individual users will be managed by us based on supplied user identity and password.
![authentication_papi_sinch.png](images/d8619f6-authentication_papi_sinch.png)
Authentication Supported by
Sinch

Authentication using this method is very straight forward, as you only have to make one method call. The Sinch SDK will take care of the rest under the hood. Implementing Sinch user authentication in your app may look something like this:
```javascript
var sinchClient = new SinchClient({
        applicationKey: 'MY_APPLICATION_KEY',
        capabilities: {messaging: true},
    });

sinchClient.start({username: 'alice', password: 'somethingSecure'})
    .then(function() {
        // Perform actions to do when authenticated, such as displaying user interface
    });
```


This code will instantiate SinchClient, and will start the client using the username *‘Alice’*.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/voice/voice-for-js/voice-js-authentication.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>