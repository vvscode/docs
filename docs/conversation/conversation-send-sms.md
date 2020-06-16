---
title: Send SMS  
excerpt: Learn how to set up and send a message with SMS and Conversation API.
hidden: true
next:
 pages:
  - conversation-receive-a-message
  - conversation-send-a-message-with-fb-messsenger
---


## Add an SMS Channel to your Conversations API App

In this section you will learn how to add an SMS channel to your Sinch Conversations APi Application.  You can an your SMS channel one of two ways, either programatically via Sinch Conversations API or through the [Sinch online portal](https://dashboard.sinch.com).  Before we begin here are a few items you should already have:

1. A text enabled *long code* or a *short code* registered with Sinch.
2. Access to the Sinch dashboard where you manage your long code or short code.
3. An SMS *Service Plan ID* and *Secret* to authorize SMS text message requests.
4. A Conversations *App ID* and *Token*.

If you are missing any of items 1-3 above you should begin by registering online at [*Sinch.com*](https://sinch.com).  We'll show you how to create a *New Conversation App* for item 4 since its a very simple set of steps.

### Create a New Conversations App

To create a new Conversations App simply sign in to your [*Sinch Dashboard account*](https://dashboard.sinch.com) and use the left hand navigation to access Conversations > Apps.

![dashboard image](images/channel-support/sms/sinch_conversations_apps.png))

Click on the *New App* button on the right, "Name" your App and click *Create*.  You will be presented with a *New Token*, copy and store it somewhere safe, you will need it when using the Conversation API.

![token](images/channel-support/sms/sinch_conversations_new_app_token.png)
That's it, you have created a Sinch Conversations API App!

### Add SMS Channel to your Conversations App

In your Sinch Dashboard navigate to Conversations > Apps.  Click on the *"App Name"* you wish to add the SMS Channel to.

![app added](images/channel-support/sms/sinch_conversations_apps_added.png)

Under *Channels* click on *"Add Channel"*.  Use the drop down to select *"SMS"*, add your SMS *Service Plan ID* to the *"Sender ID"* field, and your SMS Service Plan *API Token* to the channel and click *"Save"*.

![new sms channel](images/channel-support/sms/sinch_conversations_new_app_add_sms_channel_form.png)

You have added an SMS Channel to your App.  Just a few more steps to go.

### Send an SMS Message to a Contact

To send an SMS message to a Contact via the Sinch Conversations API App send an HTTP POST with the following JSON:

```shell Curl
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_ACCOUNT_ID}}/messages:send' \
-H 'Content-Type: application/json' \
-u '<app_id:secret>' \
-d '{
    "app_id": "{{YOUR_APP_ID}}",
    "recipient": {
        "identified_by": {
            channel_identities: [
                {
                    channel:"SMS",
                    identity:"+15551231212"
                }
            ]
        }
    },
    "message": {
        "text_message": {
            "text": "Text message from Sinch Conversation API."
        }
    },
}'
```

