---
title: "Sinch Auth Ruby Gem for the JavaScript SDK"
excerpt: "This tutorial shows how you can use the gem sinch_auth to generate a user ticket that authenticates users through the Sinch JavaScript SDK."
---
You can use the gem `sinch_auth` to generate a user ticket that authenticates users through the Sinch JavaScript SDK. First, install the gem:

```ruby
$ gem install sinch_auth
```

To use:

```ruby
sinchAuth = SinchAuth.new
ticket = sinchAuth.get_auth_ticket(username, expires_in, key, secret)
```

Where username is a string that uniquely identifies the current user, expires\_in is the number of seconds the ticket expires in, and key and secret are your app key and secret from the Sinch dashboard.

If you do not yet have a key and secret, sign up for a [free Sinch developer account](https://portal.sinch.com/#/signup). Once logged in, you will see a button to create a new app. This generates a key and secret for you.

## Use the ticket

In the view where you want to use the Sinch client, you will create a new Sinch client and start it with the ticket you just generated. Make sure to use the same app key that you used to generate the ticket.

```ruby
<script>
  sinchClient = new SinchClient({
    applicationKey: "your_app_key",
    capabilities: {messaging: true, calling: true},
    startActiveConnection: true,
    onLogMessage: function(message) {
      console.log(message.message);
    },
  });

  sinchClient.start({"userTicket":ticket});
</script>
```

Once the client is started, you can use it to make browser-to-browser phone calls, browser-to-phone calls, and send web-to-web instant messages. Follow the tutorials below to build these features:

>   - [Browser-to-Browser Calling](doc:using-sinch-js-sdk-to-call-a-phone-number)
>   - [Browser-to-Phone Calling](doc:turn-your-browser-into-a-phone-with-the-sinch-js-sdk)

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/ruby/sinch-auth-ruby-gem-for-the-javascript-sdk.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>