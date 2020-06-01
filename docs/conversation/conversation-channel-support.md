---
title: Channel Support
excerpt: >-
  Sinch Conversation API channel specific configurations and message transcoding.
hidden: 'true'
---
## Conversation API Channel Support

This document gives detailed description of Conversation API channel support.

### Facebook Messenger

Conversation API supports Facebook Messenger and allows sending messages from Facebook Pages.
Page cannot initiate the conversation, it must be started by a contact. To create and configure 
Facebook Page and connect it to Conversation Api App follow the instructions below

* Go to https://developers.facebook.com/ and login with your personal/developer account
* Click on **My Apps** on the top right corner and select **Create App**
* Fill in the display name for your app and contact email, then click **Create App ID** button
* Once the app is created, you will see a dashboard with various products that you may add to your app.
Click **Set Up** button inside a box with **Messenger** title
* Scroll down to **Access Tokens** section, and click **Create New Page** button
* Provide page name and category, then click **Create Page** button
* Go back to the **Messenger Set Up** page. Now click **Add or Remove pages** in the **Access Tokens** section.
Select previously created page and link it to your app (just **Next**, **Done**, **Ok**)
* You should now see a table row in a table in the **Access Tokens** modal. Click on **Generate Token** for that row. 
Copy this token (from now on referred as **FACEBOOK_PAGE_TOKEN**) and save it somewhere safe. 
This is the access token that you need to specify when setting up a Conversation API App
* Now you need to create an Conversation Api App with `channel_credentials` for Facebook Messenger,
example snippet below
```json
{
    "channel_priority_order": [
        "MESSENGER"
    ],
    "channel_credentials": [
        {
            "channel": "MESSENGER",
            "static_token": {
                "token": "{{FACEBOOK_PAGE_TOKEN}}"
            }
        }
    ],
    "display_name": "App name"
}
```
* Once you have created Conversation Api App, go back to Facebook **Messenger Set Up** page, find 
**Webhooks** section (just below **Access Tokens**), click **Add Callback URL** button and fill in with
the following data (**remember to put your Conversation App ID in the callback url**):  
Callback URL: `https://messenger-adapter.conversation-api.prod.sinch.com/adapter/v1/{{CONVERSATION_APP_ID}}/callback`  
Verify Token: `5651d9fd-5c33-4d7a-aa37-5e3e151c2a92`
* After clicking **Verify and Save**, if no errors occurred, a table in **Webhooks** section will appear,
with your **Facebook Page** listed within. Click **Add Subscriptions** button, check all boxes and click **save**
* Now you need to enable **pages_messaging** for your App. Scroll down to the **App review for Messenger** 
section and click **Add to submission** on the **pages_messaging** row
* Scroll down further and you should see a **Current Submissions** section. You will most likely see
 a little **Additional Information Required** alert notifying you that you need to complete some details before submitting
* Follow the instructions and go to the settings to add the required pieces, which should be:  
    - App Icon
    - Privacy Policy URL (for test and development purposes you may use a generator for it)
    - Category
    - Business Use
* This is enough for test and development purposes, you don't have to fill **Details** section nor 
submit it for review. Now you are able to send messages anyone that has been granted either the Administrator, 
Developer or Tester role for your app
* Add webhook to your Conversation App using Conversation Api, example snippet below
```json
{
	"app_id": "{{APP}}",
	"target": "{{WEBHOOK_URL}}",
	"target_type": "HTTP",
	"triggers": [
		"MESSAGE_DELIVERY",
		"EVENT_DELIVERY",
		"MESSAGE_INBOUND",
		"EVENT_INBOUND",
		"CONVERSATION_START",
		"CONVERSATION_STOP",
		"UNSUPPORTED"
	]
	
}
```
* And finally, visit your Facebook Page as user with proper role granted (preferably the one who created page) 
and try sending a message to it - remember that user has to start the conversation. If everything works
fine, you should receive two callbacks, one with `conversation_start_notification`
```json
{
  "app_id": "01E9DQJFPWGZ2T05XTVZAD0BYB",
  "conversation_start_notification": {
    "conversation": {
      "id": "01E9DV2N8C6CK41XFPGQPN0NWE",
      "app_id": "01E9DQJFPWGZ2T05XTVZAD0BYB",
      "contact_id": "01E9DV2N7TYPJ50V0FYC08110D",
      "last_received": "2020-05-28T14:30:48Z",
      "active_channel": "CHANNEL_UNSPECIFIED",
      "active": true,
      "metadata": "",
      "active_channel_senders": []
    }
  }
}
```
* and one with message you've just sent
```json
{
  "app_id": "01E9DQJFPWGZ2T05XTVZAD0BYB",
  "accepted_time": "2020-05-28T14:30:47.850538Z",
  "message": {
    "id": "01E9DV2N92BMDD034JZ0AQ0VKB",
    "direction": "TO_APP",
    "contact_message": {
      "text_message": {
        "text": "Hello World"
      }
    },
    "channel": "MESSENGER",
    "conversation_id": "01E9DV2N8C6CK41XFPGQPN0NWE",
    "contact_id": "01E9DV2N7TYPJ50V0FYC08110D",
    "metadata": "",
    "accept_time": "2020-05-28T14:30:47.841429Z"
  }
}
```
* Now, with conversation created automatically, you can use received **contact_id** to send a response
 for this user:
```json
{
    "app_id": "{{APP_ID}}",
    "recipient": {
    	"contact_id": "{{CONTACT_ID}}"
    },
    "message": {
        "text_message": {
            "text": "Text message from Sinch Conversation API."
        }
    },
    "channel_priority_order": [
        "MESSENGER"
    ]
}
```
* You should receive callbacks with information that message has been delivered and read. Channel is now configured

#### Rich Message Support

This section provides detailed information about which rich messages are
natively supported by Facebook Messenger channel and what transcoding is applied in
other cases.

#### Sending Messages

Here we give a mapping between Conversation API generic message format
and the Messenger rendering on mobile devices.
Please note that for the sake of brevity the JSON snippets do not include
the __recipient__ and __app_id__ which are both required when sending a message.

##### Text Messages

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "text_message": {
            "text": "Text message from Sinch Conversation API."
        }
    }
}
```

Rendered message:

![Text Message](images/channel-support/messenger/messenger_text.jpg)

##### Media Messages

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "media_message": {
            "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/favicon.png"
        }
    }
}
```

Rendered message:

![Media Message](images/channel-support/messenger/messenger_media.jpg)

##### Choice Messages

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "choice_message": {
            "text_message": {
                "text": "What do you want to do?"
            },
            "choices": [
                {
                    "text_message": {
                        "text": "Suggested Reply Text"
                    }
                },
                {
                    "url_message": {
                        "title": "URL Choice Message:",
                        "url": "https://www.sinch.com"
                    }
                },
                {
                    "call_message": {
                        "title": "Call Choice Message:Q",
                        "phone_number": "46732000000"
                    }
                },
                {
                    "location_message": {
                        "title": "Location Choice Message",
                        "label": "Enriching Engagement",
                        "coordinates": {
                            "latitude": 55.610479,
                            "longitude": 13.002873
                        }
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![Choice Message](images/channel-support/messenger/messenger_choice.jpg)

##### Card Messages

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "card_message": {
            "title": "This is the card title",
            "description": "This is the card description",
            "media_message": {
                "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
            },
            "choices": [
                {
                    "text_message": {
                        "text": "Suggested Reply Text"
                    }
                },
                {
                    "url_message": {
                        "title": "URL Choice Message:",
                        "url": "https://www.sinch.com"
                    }
                },
                {
                    "call_message": {
                        "title": "Call Choice Message:Q",
                        "phone_number": "46732000000"
                    }
                },
                {
                    "location_message": {
                        "title": "Location Choice Message",
                        "label": "Enriching Engagement",
                        "coordinates": {
                            "latitude": 55.610479,
                            "longitude": 13.002873
                        }
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![Card Message](images/channel-support/messenger/messenger_card.jpg)

##### Carousel Messages

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "carousel_message": {
            "cards": [
                {
                    "title": "This is the card 1 title",
                    "description": "This is the card 1 description",
                    "media_message": {
                        "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
                    },
                    "choices": [
                        {
                            "text_message": {
                                "text": "Suggested Reply 1 Text"
                            }
                        },
                        {
                            "text_message": {
                                "text": "Suggested Reply 2 Text"
                            }
                        },
                        {
                            "text_message": {
                                "text": "Suggested Reply 3 Text"
                            }
                        }
                    ]
                },
                {
                    "title": "This is the card 2 title",
                    "description": "This is the card 2 description",
                    "media_message": {
                        "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
                    },
                    "choices": [
                        {
                            "url_message": {
                                "title": "URL Choice Message:",
                                "url": "https://www.sinch.com"
                            }
                        }
                    ]
                },
                {
                    "title": "This is the card 3 title",
                    "description": "This is the card 3 description",
                    "media_message": {
                        "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
                    },
                    "choices": [
                        {
                            "call_message": {
                                "title": "Call Choice Message:Q",
                                "phone_number": "46732000000"
                            }
                        }
                    ]
                },
                {
                    "title": "This is the card 4 title",
                    "description": "This is the card 4 description",
                    "media_message": {
                        "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
                    },
                    "choices": [
                        {
                            "location_message": {
                                "title": "Location Choice Message",
                                "label": "Enriching Engagement",
                                "coordinates": {
                                    "latitude": 55.610479,
                                    "longitude": 13.002873
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```

Rendered message:

![Carousel Message](images/channel-support/messenger/messenger_carousel.jpg)

##### Location Messages

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "location_message": {
            "title": "Location Message",
            "label": "Enriching Engagement",
            "coordinates": {
                "latitude": 55.610479,
                "longitude": 13.002873
            }
        }
    }
}
```

Rendered message:

![Location Message](images/channel-support/messenger/messenger_location.jpg)

### Viber Business Messages

Viber Business Messages (VBM) supports 3 types of business account: 1way, 2way
and session:

* 1way is an account which can send one-way messages only - the contact cannot
enter a reply from the device
* 2way accounts allow contacts to reply
* session accounts cannot initiate the conversation to the contact. Instead,
the conversation must be started by the contact. Session accounts only support
text and image messages.

For all types of accounts the phone number is the contact identifier of the
recipient of the business messages (i.e., channel recipient identity).

Conversation API supports 1way and 2way Viber BM accounts.

#### Channel Configuration

##### Sending Config

To start sending VBM messages you need a Conversation API **app** with
`channel_credentials` for VIBERBM channel. Example, **app** is given in the
following snippet:

```json
{
    "channel_credentials": [
        {
            "channel": "VIBERBM",
            "static_bearer": {
                "claimed_identity": "{{VBM_SERVICE_ID}}"
            }
        }
    ]
}
```

You need to replace `{{VBM_SERVICE_ID}}` with your VBM service ID.

##### Receiving Config

To start receiving contact messages (replies) and delivery receipts for sent
messages your VBM service plan needs to be configured with the callback
URL corresponding to your Conversation API **app**.
Please contact Conversation API support team for help with that.

You also need to configure at least one Conversation API webhook which
will trigger POST callbacks to the given URL.
The triggers which are relevant for VBM channel are:

* MESSAGE_DELIVERY - delivery receipts for business messages
* MESSAGE_INBOUND - inbound messages e.g., contact replies 
* UNSUPPORTED - Conversation API delivers VBM user opt-in/out events as UNSUPPORTED channel notifications 

#### Rich Message Support

This section provides detailed information about which rich messages are
natively supported by VBM channel and what transcoding is applied in
other cases.

##### Sending Messages

Here we give a mapping between Conversation API generic message format
and the VBM rendering on mobile devices.
Please note that for the sake of brevity the JSON snippets do not include
the __recipient__ and __app_id__ which are both required when sending a message.

###### Text Messages

Text messages are natively supported by VBM channel.

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "text_message": {
            "text": "Text message from Sinch Conversation API."
        }
    }
}
```

Rendered message:

![Text Message](images/channel-support/viberbm/Viber_Text_Message.jpg)

###### Media Messages

VBM support Image messages natively:

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "media_message": {
            "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
        }
    }
}
```

Rendered message:

![Media Message](images/channel-support/viberbm/Viber_Media_Message_Image.jpg)

---

Video and other types of media messages render as a link:

![Media Message](images/channel-support/viberbm/Viber_Media_Message_Video.jpg)


###### Choice Messages

VBM channel provides native support for single choice (URL, Call, or Location) **Choice Messages**:

---

__URL Choice__

Conversation API POST `messages:send`

```json
{
    "message": {
        "choice_message": {
            "text_message": {
                "text": "What do you want to do?"
            },
            "choices": [
                {
                    "url_message": {
                        "title": "More info",
                        "url": "https://www.sinch.com"
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![URL Choice Message](images/channel-support/viberbm/Viber_Choice_Message_1_url.jpg)

---

__Call Choice__

Call choice renders a button which opens Viber keypad with the phone
number in the request.

```json
{
    "message": {
        "choice_message": {
            "text_message": {
                "text": "What do you want to do?"
            },
            "choices": [
                {
                    "call_message": {
                        "title": "Call Choice Message",
                        "phone_number": "+46732000000"
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![Call Choice Message](images/channel-support/viberbm/Viber_Choice_Message_1_call_choice.jpg)

---

__Location Choice__

Location choice renders a button which opens Google Maps with the coordinates
of the location.

```json
{
    "message": {
        "choice_message": {
            "text_message": {
                "text": "What do you want to do?"
            },
            "choices": [
                {
                    "location_message": {
                        "title": "Location Choice Message",
                        "label": "Enriching Engagement",
                        "coordinates": {
                            "latitude": 55.610479,
                            "longitude": 13.002873
                        }
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![Location Choice Message](images/channel-support/viberbm/Viber_Choice_Message_1_Location.jpg)

---

__Text Choice or Multiple Choices__

There is no native support for suggested replies or multiple choices in VBM.

```json
{
    "message": {
        "choice_message": {
            "text_message": {
                "text": "What do you want to do?"
            },
            "choices": [
                {
                    "text_message": {
                        "text": "Suggested Reply Text"
                    }
                },
                {
                    "url_message": {
                        "title": "More info",
                        "url": "https://www.sinch.com"
                    }
                },
                {
                    "call_message": {
                        "title": "Call Choice Message",
                        "phone_number": "+46732000000"
                    }
                },
                {
                    "location_message": {
                        "title": "Location Choice Message",
                        "label": "Enriching Engagement",
                        "coordinates": {
                            "latitude": 55.610479,
                            "longitude": 13.002873
                        }
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![Multiple Choices Message](images/channel-support/viberbm/Viber_Choice_Message_Many_Choices.jpg)

###### Card Messages

VBM supports natively Card messages with one URL, Call, or Location choice.
The media message in the Card should point to an image.

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "card_message": {
            "title": "This is the card title",
            "description": "This is the card description",
            "media_message": {
                "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
            },
            "choices": [
                {
                    "url_message": {
                        "title": "More info",
                        "url": "https://www.sinch.com"
                    }
                }
            ]
        }
    }
}
```

Rendered message:

![Card Message With URL Choice](images/channel-support/viberbm/Viber_Card_Message_1_URL_choice.jpg)

---

Card messages with non-image media, multiple choices or a single suggested reply choice render
as text:

![Card Message With Multiple Choices](images/channel-support/viberbm/Viber_Card_Multiple_Choices.jpg)

###### Carousel Messages

VBM does not support natively Carousel messages and this is why they are
transcoded and sent as text message by Conversation API.

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "carousel_message": {
            "cards": [
                {
                    "title": "This is the card 1 title",
                    "description": "This is the card 1 description",
                    "media_message": {
                        "url": "https://techcrunch.com/wp-content/uploads/2017/08/butterfly-bubble.jpg?w=1390&crop=1"
                    },
                    "choices": [
                        {
                            "text_message": {
                                "text": "Suggested Reply Text"
                            }
                        }
                    ]
                },
                {
                    "title": "This is the card 2 title",
                    "description": "This is the card 2 description",
                    "media_message": {
                        "url": "https://www.idus.se/en/wp-content/uploads/files/sites/2/2015/04/Message-150x150.png"
                    },
                    "choices": [
                        {
                            "url_message": {
                                "title": "URL Choice Message:",
                                "url": "https://www.sinch.com"
                            }
                        }
                    ]
                },
                {
                    "title": "This is the card 3 title",
                    "description": "This is the card 3 description",
                    "media_message": {
                        "url": "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png"
                    },
                    "choices": [
                        {
                            "call_message": {
                                "title": "Call Choice Message:",
                                "phone_number": "46732000000"
                            }
                        }
                    ]
                }
            ]
        }
    }
}
```

Rendered message:

![Carousel Message](images/channel-support/viberbm/Viber_carousel_message.jpg)

###### Location Messages

VBM does not support natively Location messages and so they are
transcoded and sent as text message by Conversation API.

---

Conversation API POST `messages:send`

```json
{
    "message": {
        "location_message": {
            "title": "Location Message",
            "label": "Enriching Engagement",
            "coordinates": {
                "latitude": 55.610479,
                "longitude": 13.002873
            }
        }
    }
}
```

Rendered message:

![Location Message](images/channel-support/viberbm/Viber_Location_Message.jpg)

##### Receiving Messages

VBM support only text replies or contact initiated messages.

Conversation API POST to `MESSAGE_INBOUND` webhook:

```json
{
  "app_id": "01E3S8B6YCMRNR0GGM94H80ACX",
  "accepted_time": "2020-04-24T08:02:50.184581Z",
  "message": {
    "id": "01E6NKBV63YG6K01ENEW7S1N80",
    "direction": "TO_APP",
    "contact_message": {
      "text_message": {
        "text": "Hi from contact"
      }
    },
    "channel": "VIBERBM",
    "conversation_id": "01E6K4A8PGZ6MV0GD3C7M901MZ",
    "contact_id": "01E6K4A8N3NANZ05VM0FS80EHD",
    "metadata": "",
    "accept_time": "2020-04-24T08:02:50.179021Z"
  }
}
```

##### Receiving Delivery Receipts

Messages sent on VBM channel have three statuses: DELIVERED, READ and FAILED.
Below is an example for DELIVERED receipt - READ and FAILED differ by the
`status` and `reason` only.
Conversation API POST to `MESSAGE_DELIVERY` webhook:

```json
{
  "app_id": "01E3S8B6YCMRNR0GGM94H80ACX",
  "accepted_time": "2020-04-23T09:55:04.766Z",
  "message_delivery_report": {
    "message_id": "01E6K7CMXY3KHH0AGCTY6D04F2",
    "conversation_id": "01E6JY5HMCADX31SANQ0YE0CH6",
    "status": "DELIVERED",
    "channel": "VIBERBM",
    "reason": "",
    "metadata": ""
  }
}
```

##### Receiving User Opt-In/Out

VBM can at any time opt-in/out of receiving messages by given VBM account.

###### Opt-In

Conversation API POST to `UNSUPPORTED` webhook:

```json
{
  "app_id": "01E3S8B6YCMRNR0GGM94H80ACX",
  "accepted_time": "2020-04-24T08:06:04.078344Z",
  "unsupported_callback": {
    "channel": "VIBERBM",
    "payload": "{\"message_token\":\"5434382642129923939\",\"message_status\":4,\"message_time\":1587715563958,\"phone_number\":\"46702470247\",\"service_id\":111}"
  }
}
```

###### Opt-Out

Conversation API POST to `UNSUPPORTED` webhook:

```json
{
  "app_id": "01E3S8B6YCMRNR0GGM94H80ACX",
  "accepted_time": "2020-04-24T08:06:57.176156Z",
  "unsupported_callback": {
    "channel": "VIBERBM",
    "payload": "{\"message_token\":\"5434382864469978544\",\"message_status\":5,\"message_time\":1587715616968,\"phone_number\":\"46702470247\",\"service_id\":111}"
  }
}
```
