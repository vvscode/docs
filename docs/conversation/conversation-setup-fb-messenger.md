---
title: Conversation Facebook Getting Started
excerpt: >-
  Learn how to set up, send and receive messages using Conversation API.
hidden: true
---

## Setup an FB App with Messenger Chat

In this quick start guide we will show you how to create and configure a basic FB Business Page with Messenger chat feature. Once you complete the steps below you will have an FB App, FB Business Page with Messenger Chat button, a Messenger Token, and a configured Messenger Webhook to use with the Sinch Conversations API.

### Sign up for an FB Developer Account or Sign In and Create your Messenger App

To register for an FB Developer account go to **[Facebook Developer Account](https://developers.facebook.com)** and click **"Get Started"** on the upper right menu.

<p align="center">
<img src="images/channel-support/messenger/fb_for_developers.png" width="75%" border="2px" />
</p>

> If you have an existing FB Developer Account and an FB App, log in and skip to adding and configuring Messenger.

Once you have created your Facebook developer account you can choose to **"Create First App"**
![Create App Form](images/channel-support/messenger/fb_create_first_app.png)

> Your new _APP ID_ will be displayed at the top left of your FB App Dashboard.

### Add Messenger Product to your FB App

From your FB Developer Dashboard, under _Add Product_, click on Messenger **"Setup"** button.

![Facebook App Dashboard](images/channel-support/messenger/fb_app_dashboard.png)

### Create an FB Business Page

Now that you have added Messenger Product to your FB App we can build your first FB Business Page. Within your Dasboard under Products > Messenger > Settings page scroll down to **Access Tokens** and click **"Create New Page"** on the upper right.

![Create New Page](images/channel-support/messenger/fb_create_new_page.png)

Next choose to create a **"Business or Brand"** and fill out the ensuing page name and contact form.

![Create Business Page](images/channel-support/messenger/fb_create_business_page.png)

You can choose to **"Skip"** adding 'Profile' and 'Background' pictures as well as **"Not Now"** for the option to 'Add online booking'. You have now completed creating your Facebook Business Page. Remember while your FB App is 'In development' the FB Business Page is not visible to anyone except you and other developers you invite to your FB developer account.

> Make sure to bookmark your FB Business Page , we will return to it later to add a Messenger chat button.

![Business Page](images/channel-support/messenger/fb_business_page.png)

### Generate your Messenger API Token

To generate your Messenger API Token we'll need to add the new FB Page you created to the Messenger product settings. Under Within your Dashboard under Products > Messenger > Settings page scroll down to **Access Tokens** and this type choose to **"Add or Remove Pages"**.

![Add Remove Page](images/channel-support/messenger/fb_add_remove_page.png)

Now follow the prompts and choose the new FB Page you just created. Make sure that you leave default setting **Manage and access Page conversations in Messenger** set to YES.

![Manage and Access Conversations](images/channel-support/messenger/fb_manage_and_access_conversations.png)

You will should see your FB Page listed under **Access Tokens**, click on the **"Generate Token"** button.

> Copy and store your Messenger Token somewhere safe, we will need it to add the Messenger Channel to your **Sinch Conversations App**.

![Generate Messenger Token](images/channel-support/messenger/fb_generate_messenger_token.png)

### Configure your FB Messenger Channel on Sinch Conversations API

Create and send a POST to **Patch** your Sinch Conversations App with the newly created **Messenger Token**, this will allow Sinch Conversations App to respond to inbound messages posted by visitors of your FB Page.

```javascript Curl
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_SINCH_ACCOUNT_ID}}/apps' \
--header 'Content-Type: application/json' \
--data-raw '{
    "channel_credentials": [
        {
            "channel": "MESSENGER",
            "static_token": {
                "claimed_identity": "{{YOUR_FB_APP_NAME}}",
                "token": "{{YOUR_FB_PAGE_MESSENGER_TOKEN}}"
            }
        }
    ],
    "display_name": "Messages"
}'
```

### Add a Messenger Chat Button to your FB Business Page

Lets return to your FB Page and add a Messenger button. Click on **"+ Add Button"**.

![Facebook Page Add Button](images/channel-support/messenger/fb_page_add_button.png)

Choose **Send Message** and click **"Next"**.

![Fb Add Send Message Button](images/channel-support/messenger/fb_add_send_message_button.png)

Click on **"Messenger"** and then click **"Finish"**.

![Fb Add Button Messenger](images/channel-support/messenger/fb_add_button_messenger.png)

### Configure the Messenger Webhook

The Messenger Webhook Settings configuration forwards message events posted on your **FB Page** to your **Sinch Conversations App**. To set the configuration click on **"Add Callback URL"** in FB App Dashboard > Products > Messenger > Settings **Webhooks**.

![Facebook Messenger Webhooks](images/channel-support/messenger/fb_messenger_webhooks.png)

Then add the following **Callback URL** and **Verify Token**:

> Callback URL: https://messenger-adapter.conversation-api.staging.sinch.com/adapter/v1/{{YOUR_SINCH_CONVERSATION_APP_ID}}/callback
>
> Verify Token: 5651d9fd-5c33-4d7a-aa37-5e3e151c2a92

![Facebook Messenger Edit Webhook](images/channel-support/messenger/fb_messenger_edit_webhook.png)

To complete your **Webhooks** configuration click on **"Add Subscriptions"**. Select **"messages"** and **"message_deliveries"** fields and click on **"Save"**.

![Facebook Webhook Subscription](images/channel-support/messenger/fp_messenger_webhook_subscriptions.png)

Great! We are almost there. Just a couple of more steps.

### Initiate an FB Messenger Chat and Respond with Sinch Conversations API

OK, we are ready for some action! Visit your FB Page, click on **"Send Message"** and choose **"Test Button"**.

![Facebook test send message button](images/channel-support/messenger/fb_page_test_send_message_button.png)

Enter a message into the **Messenger** chat window and **Send**.

![Facebook Messenger Pop up](images/channel-support/messenger/fb_page_messenger_pop_up.png)

Use **Sinch Conversations API** to **List Contacts**, you should now see a new contact entry generated when the **Messenger Message** was posted from your FB Page.

```
{
    "contacts": [
        {
            "id": "J69H07BDS8G11RDF01E96CW660",
            "channel_identities": [
                {
                    "channel": "MESSENGER",
                    "channel_recipient_identity": "7746490198930851",
                    "app_id": "3FDS0PWWERGN1QX101E75WGS3Y"
                }
            ],
            "channel_priority": [
                "MESSENGER",
            ],
            "display_name": "",
            "email": "",
            "external_id": "",
            "metadata": ""
        }
    ],
    "next_page_token": ""

```

Use your newly created Sinch **Contact** to send a **Text Message** response using the **message:send** function.

```javascript Curl
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_SINCH_ACCOUNT_ID}}/messages:send' \
--header 'Content-Type: application/json' \
--data-raw '{
	"app_id": "{{YOUR_SINCH_APP_ID}}",
    "recipient": {
    	"contact_id": "{{YOUR_SINCH_CONTACT_ID}}"
    },
    "message": {
        "text_message": {
            "text": "Greetings from Sinch Conversation API!"
        }
    },
    "channel_priority_order": [
        "MESSENGER"
    ]
}'
```

```javascript Raw Java
RequestBody body =
    RequestBody.create(
        mediaType,
        "{\n"
            + "\t\n"
            + "\t\"app_id\": \"your_app_id\",\n"
            + "    \"recipient\": {\n"
            + "    \t\"contact_id\": \"your_contact_id\"\n"
            + "    },\n"
            + "    \"message\": {\n"
            + "        \"text_message\": {\n"
            + "            \"text\": \"Text message from Sinch Conversation API.\"\n"
            + "        }\n"
            + "    },\n"
            + "    \"channel_priority_order\": [\n"
            + "        \"SMS\"\n"
            + "    ]\n"
            + "}");
Request request =
    new Request.Builder()
        .url(
            "https://api.conversation-api.prod.sinch.com/v1beta/accounts/your_account_id/messages:send")
        .method("POST", body)
        .addHeader("Content-Type", "application/json")
        .addHeader(
            "Authorization",
            "Basic your_token")
        .build();
Response response = client.newCall(request).execute();
```

````
```javascript Java
public static void main(String[] args) {

    // Init the Sinch Api Client to hold the auth
    SinchApiClient sinchApiClient = SinchApiClient.getDefaultConfig();

    // Build the Message APi which holds all messages capabilities
    MessageApi messageApi = new MessageApi(sinchApiClient);

    // Send Text Message
    MessageResponse messageResponse =
        messageApi.sendTextMessage("your_contact_id", "Greetings from Sinch Conversation API!");

    // Print out the Message id for the record
    System.out.println(messageResponse.getMessageId());
}
````

![Facebook Message Text](images/channel-support/messenger/fb_message_text.jpg)

**ALRIGHT!! CONGRATULATIONS**, you have just sent your first Sinch Conversations Messenger Message!

> 1.  Learn how to receive messages
> 2.  Want more? [Advance messages for facebook messenger](./conversation-fb-advance-messages.md).
