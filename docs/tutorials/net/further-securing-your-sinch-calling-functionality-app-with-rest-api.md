---
title: "Further Securing Your Sinch Calling Functionality App With REST API"
excerpt: "The callback APIs are a really powerful way to get information about your calls and further secure them. This is the final step before you allow calls to be connected."
---
The callback APIs are a really powerful way to get information about your calls and further secure them. This is the final step before you allow calls to be connected. If you have followed our other tutorials, you are likely familiar with the different states of a call: progressing, established, and ended. With the callback API, you get the same events, enabling you to make decisions just before you connect the call to the server.

For detailed information, see our [documentation](doc:voice-rest-api-callback-api).

## Prerequisites

> 1.  Complete [this tutorial](doc:using-delegated-security-with-your-own-application-server-using-c-and-the-sinch-sdk).
> 2.  Deploy the solution to a public accessible web server. This is necessary because the Sinch backend needs to be able to post to your callback handler.

## Setup

> 1.  To receive callbacks, open your [dashboard](http://portal.sinch.com/#/login) and add the URL that should get callbacks.
> 2.  Add a new WebAPI controller named CallbackController to your backend project.

## Responding to callbacks

If you have configured your callback URL, you **must** to respond to callbacks for the call to be connected. The Sinch service expects a response containing **Svaml** to make it easier to work with. In your C\# project, create a couple of classes to help out:

```csharp
public class Svaml {
    public Instruction[] Instructions { get; set; }
    public Action Action { get; set; }
}
public class Instruction {
    public string Name { get; set; }
    public string Ids { get; set; }
    public string Locale { get; set; }
}
public class ICEAction:Action {
    public string Number { get; set; }
    public string locale { get; set; }
    public int maxDuration { get; set; }
    public bool callback { get; set; }
    public string cli { get; set; }
}
public class SimpleICEAction : Action {
    public int maxDuration { get; set; }
    public bool callback { get; set; }
}
public class Action {
    public string Name { get; set; }
}
```

Svaml contains instructions and actions. For example, an instruction is playing a sound file to a user, and an action is connecting to a call. For a complete list of instructions and actions, see the [documentation](doc:voice-rest-api).

Next, create this method in your **callbackcontroller**:

```csharp
[HttpPost]
public async Task<Svaml> Post(HttpRequestMessage message) {
}
```

This method is called for all callback events; they all look slightly different, but they all contain a JSON request an event.

### Incoming call event (ICE)

This event is triggered right before you get the in progress event in a call client. I think this is the most interesting callback because you can change the call that is about to happen. Here, you can decide if a user has enough credit to make a call, or if the phone number is one you want to connect to, and then make decisions based on that. In case you are using Sinch to make click-to-call buttons, you may want to check the dialed phone number against a database. That’s exactly what we are going to do in this tutorial. I don’t want to connect any phone calls unless you are trying to call me. In the **post** method, add:

```csharp
public async Task<Svaml> Post(HttpRequestMessage message) {
    //read the response
    String body = await message.Content.ReadAsStringAsync();
    var json = JsonConvert.DeserializeObject<JObject>(body);
    //create a new respone object
    var svaml = new Svaml();
    if (json["event"].ToString() == "ice") {
        //only calls to my personal phone is allowed with this app
        if (json["to"].ToString() == "+15612600684") {
            svaml.Action = new SimpleICEAction() {
                Name = "ConnectPSTN",
                callback = true,
                maxDuration = 600
            };
        } else {
            //else hangup
            svaml.Action = new Action {
                Name = "hangup"
            };
        }
    }
}
```

### Answered call event (ACE)

Since you are using callbacks, you also need to take care of the ACE event, otherwise the call will not connect. In this case, you are going to just let it continue. At the end of the **post**, add:

```csharp
if (json["event"].ToString() == "ace") {
    svaml.Action = new Action() {
    Name = "continue",
   };
}
var svamljson = JsonConvert.SerializeObject(svaml, Formatting.Indented,
    new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
return svaml;
```

### Disconnected call event (DiCE)

This event is a notification event, where you could adjust the balance of your users’ accounts, post duration to a CRM system, etc. No response is needed.

You can find the finished code for this tutorial [here](https://github.com/sinch/net-backend-sample).

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/net/further-securing-your-sinch-calling-functionality-app-with-rest-api.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>