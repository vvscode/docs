---
title: "Receive an SMS with the Sinch .NET server-side SDK - Pt. 2"
excerpt: "Use Sinch .NET server-side SDK to receive SMS to your Web API application."
---
In this second part of the tutorial, we’ll be using the Sinch .Net server-side SDK to receive SMS to your Web API application. If you haven’t already, [check out the first part here](doc:send-an-sms-with-the-sinch-net-server-side-sdk).

## Rent number

Your application will need a phone number for the SMS to be sent to. You can rent numbers through the Sinch dashboard.

Rent a number and make sure the Type is SMS:
![numbers.png](images/36e0fe0-numbers.png)

Assign this number to the application that should receive the SMS. Click the Pen symbol, then SMS, and select the number you’ve just rented. Click Save.
![set-number.png](images/f9f908f-set-number.png)

## Visual Studio

Next, we’ll create a new ASP.NET Web Application in Visual Studio.
![new-project2.png](images/fd8768e-new-project2.png)

Select the Empty ASP.NET 4.5 Template, and select the checkbox for a core reference to Web API:
![template.png](images/71e2699-template.png)

Right click on References in Solution Explorer and select **“Manage NuGet Packages…”**.

If you’re using an older version of Visual Studio and don’t see this, you’ll need to add it to your Visual Studio from here: <http://docs.nuget.org/consume/installing-nuget>

##Code 
Now, we want to install the Sinch Callback.WebApi package, as well as the Sinch Server SDK NuGet package. Search for `Sinch.ServerSdk.Callback.WebApi` and click **“Install”** for `Sinch.ServerSdk.Callback.WebApi`.
![nugget2.png](images/afb68f7-nugget2.png)

Then, we’ll add a new Controller using the “Web API 2 Controller – Empty” scaffold. Name it **“IncomingMessagesController”**.
![scaffold.png](images/0d3437a-scaffold.png)

Import the following namespace:

`using Sinch.ServerSdk.Messaging.Models;`

Next, we’ll add a post method. Within this method is where you action the SMS sent to the rented number.

The Web API template will make the default route for this method `[POST] /api/incomingmessages`.

Mark the controller as needing validation by adding the “SinchCallback” attribute:

```csharp
[SinchCallback]
public void Post([FromBody]IncomingMessageEvent value)
{
}
```

If this application were hosted now, and the callback URL set on the Sinch dashboard, it would work as expected. However, it would be insecure because anyone could post to that endpoint and mimic an SMS to the number.

## Add validation

To validate that the messages received are only from Sinch and haven’t been tampered with in any way, we’ll add the following to the Global.asax.cs file:

```csharp
using Sinch.ServerSdk;
using Sinch.ServerSdk.Callback.WebApi;
```

Then, append this to the end of the `Application_Start()` method, replacing the application key and secret with your own.

```csharp
var factory = new SinchFactory("00000000-0000-0000-0000-000000000000", "AAAAAAAAAAAAAAAAAAAAAA==");
GlobalConfiguration.Configuration.MessageHandlers.Add(new CallbackMessageHandler(factory));
```

The final step is to register this method as the SMS callback URL on the Sinch dashboard. Host the web application somewhere (AWS, Azure, self-host etc.), and then add the route to the API endpoint as the **“Callback URL”**.
![callbacks.png](images/2c5803a-callbacks.png)

## Chill

And that’s it. Now any request to this Web API application will be validated by the Sinch CallbackMessageHandler to ensure that they are legitimate.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/net/receive-an-sms-with-the-sinch-net-server-side-sdk-pt-2.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>