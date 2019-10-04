---
title: "Using Delegated Security With Your Own Application Server Using C# and the Sinch SDK"
excerpt: "Our recommended way for authenticating with Sinch is by using delegated security. This is especially important when you are using the WebSDK, since there is no good way of hiding your application security."
---
Our recommended way for authenticating with Sinch is by using delegated security. This is especially important when you are using the WebSDK, since there is no good way of hiding your application security.

Sinch delegated security means that we will trust you to authenticate your users with your preferred method and that you are protecting your own backend API.

## User flow for signing a request using delegated security

![](http://www.websequencediagrams.com/files/render?link=2_0NhaiEPua84ebt97-F)

As you can see here, Sinch will trust that you protect your secret on your backend. As a developer, there are a couple of great benefits to doing it this way:

> 1.  No user sync is required to add Sinch services to your backend
> 2.  You are free to use any service or roll your own for user storage
> 3.  You keep your customer data and authentication in one place without disclosing any information to a third party

## Implementing the sign request in C#

For this tutorial, you are going to use a C\# backend and WebAPI endpoint that will verify your user and return a userToken. In this example, I am using a vanilla MVC 5 project with all the latest updates and WebAPI enabled. The implementation is pretty straightforward, and you will implement an API call that accepts a username and password and returns a Sinch token.

If you are new to MVC 5, check out this tutorial on how to get started: [MVC 5 App with Facebook, Twitter, LinkedIn and Google OAuth2 Sign-on](http://www.asp.net/mvc/tutorials/mvc-5/create-an-aspnet-mvc-5-app-with-facebook-and-google-oauth2-and-openid-sign-on). It is not necessary to add the external providers; you just need the internal provider for this tutorial.

## Prepare the project

If you don’t have it already, add the `owin` package for WebAPI by running this command in the package manager console: `Install-Package Microsoft.AspNet.WebApi.Owin` Then, run it and register a user. Add a new empty WebAPI controller and call it **SinchAuthController**.

Create the following method and return type to secure the access to the chat and ensure the identity you need to:

```csharp
[HttpPost]
public async Task<LoginObject> Sign(string username, string password) {}
public class LoginObject {
    [JsonProperty("userTicket")]
    public string UserTicket { get; set; }
}
```

Next, verify the username and password and create a loginObject with an authTicket:

```csharp
[HttpPost]
public async Task<LoginObject> AuthUser(string username, string password) {
    ///1. Verfiy user
    var signinManager = Request.GetOwinContext().Get<ApplicationSignInManager>();
    var result = await signinManager
        .PasswordSignInAsync(username, password, false, shouldLockout: false);
    if (result == SignInStatus.Success) {
        /// 2. Create return type and sign the request
        LoginObject loginObject = new LoginObject();
        loginObject.UserTicket = Signature(username);
        return loginObject;
    } else {
        ///wrong username and password
        throw new HttpResponseException(HttpStatusCode.Forbidden);
    }
}
```

## Create the assigned UserTicket

A valid UserTicket consists of a base64 encoded UserTicket (described below), and a hash signed with the application secret of that data in the format: `UserTicket = TicketData + ":" + TicketSignature`. First, add the following classes:

```csharp
public class UserTicket {
    [JsonProperty("identity")]
    public Identity Identity { get; set; }
    [JsonProperty("applicationkey")]
    public string ApplicationKey { get; set; }
    [JsonProperty("created")]
    public string Created { get; set; }
}

public class Identity {
    [JsonProperty("type")]
    public string Type { get; set; }
    [JsonProperty("endpoint")]
    public string Endpoint { get; set; }
}
```

You could of course use JSON directly, but I prefer my objects in this format. Most properties are self explanatory, but I want to point out that the type in the Identity type can be email, username, or a phone number. For this example, I am going to use email. The email must be a valid email format, and the same goes if you specify a phone number ([E.164 number formatting](http://en.wikipedia.org/wiki/E.164)).

```csharp
public string Signature(string userId) {
    UserTicket userTicket = new UserTicket();
    userTicket.Identity = new Identity { Type = "username", Endpoint = userId };
    userTicket.ApplicationKey = "<yourkey>";
    userTicket.Created = DateTime.UtcNow.ToString("O", CultureInfo.InvariantCulture);
    Debug.WriteLine(DateTime.UtcNow.ToString("O", CultureInfo.InvariantCulture));
    var json = JsonConvert.SerializeObject(userTicket);
    var ticketData = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(json));
    var sha256 = new HMACSHA256(Convert.FromBase64String(<yoursecret>));
    var signature = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(json)));
    Debug.WriteLine(json);
    return ticketData + ":" + signature;
}
```

## Try it out

To try it out, add the files from our [JS calling tutorial](doc:using-sinch-js-sdk-to-call-a-phone-number) to a folder named `SinchCalling`.
![addsinchcalling.PNG](images/4d3fb41-addsinchcalling.PNG)

Open up the index.html and find:

```javascript
//Use Sinch SDK to authenticate a user
sinchClient.start(signInObj, function () {
    //On success, show the UI
    showUI();
}).fail(handleError);
});
```

Remove that and change it to:

```javascript
$.post('http://localhost/SinchBackend/Api/Auth/?username=' +
        signInObj.username +
        '&password='+signInObj.password,
        function(authTicket) {
            sinchClient.start(authTicket, function () {
    //On success, show the UI
    showUI();
}).fail(handleError);
});
```

Now, launch a browser and give it a go.

Download our demo backend [here](https://github.com/sinch/net-backend-sample).

**Read more:**

>   - [Using Sinch JS SDK to call a phone number](doc:using-sinch-js-sdk-to-call-a-phone-number)

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/net/using-delegated-security-with-your-own-application-server-using-c-and-the-sinch-sdk.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>