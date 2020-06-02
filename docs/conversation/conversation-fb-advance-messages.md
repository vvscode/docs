---
title: Advance Facebook Messenger
excerpt: >-
  Learn and see how different kind of messages render on Facebook Messenger.
hidden: true
---

## Advance Facebook Messages

In this blog, we will show you how you can send advance messages such as media, choice, card, carousel, and location messages using Conversation API.

## Sending Media Message

```javascript Curl
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_ACCOUNT_ID}}/messages:send' \
-H 'Content-Type: application/json' \
-H 'Authorization: Basic {{YOUR_TOKEN}}' \
 -d '{
    "app_id": "{{YOUR_APP_ID}}",
    "recipient": {
        "contact_id": "{{YOUR_CONTACT_ID}}"
    },
    "message": {
        "text_message": {
            "text": "Text message from Sinch Conversation API."
        }
    },
    "channel_priority_order": [
        "MESSENGER"
    ]
}'
```

```javascript Java
public static void main(String[] args) {
    // Init the Sinch Api Client to hold the auth
    SinchApiClient sinchApiClient = SinchApiClient.getDefaultConfig();

    // Build the Message APi which holds all messages capabilities
    MessageApi messageApi = new MessageApi(sinchApiClient);

    // Send Image Message
    MessageResponse messageResponse =
        messageApi.sendMediaMessage(
            "01E9GXGK5Y4CKK1VTNJYAN0BAT",
            "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2018/12/favicon.png");

    // Print out the Message id for the record
    System.out.println(messageResponse.getMessageId());
  }
```

![Facebook Media Message](images/channel-support/messenger/fb_message_media.jpg)

## Sending Choice Message

```javascript Curl

curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_ACCOUNT_ID}}/messages:send' \

-H 'Content-Type: application/json' \
-H 'Authorization: Basic {{YOUR_TOKEN}}' \
-d '{
    "app_id": "{{YOUR_APP_ID}}",
    "recipient": {
    	"contact_id": "{{YOUR_CONTACT_ID}}"
    },
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
    },
    "channel_priority_order": [
        "MESSENGER"
    ]
}'
```

```javascript Java
public static void main(String[] args) {
    // Init the Sinch Api Client to hold the auth
    SinchApiClient sinchApiClient = SinchApiClient.getDefaultConfig();

    // Build the Message APi which holds all messages capabilities
    MessageApi messageApi = new MessageApi(sinchApiClient);

    // Set up Choice Message
    ChoiceMessage choiceMessage =
        ChoiceMessage.newBuilder()
            .text("Sinch can offer these following channels")
            .addTextChoice("RCS")
            .addUrlChoice("Visit us", "https://www.sinch.com/")
            .addCallChoice("Call us", "155544422")
            .addLocationChoice(44.3, 66.4, "Location Choice Message", "Enriching Message")
            .build();

    MessageResponse messageResponse =
        messageApi.sendChoiceMessage("01E9GXGK5Y4CKK1VTNJYAN0BAT", choiceMessage);

    // Print out the Message id for the record
    System.out.println(messageResponse.getMessageId());
  }

```

![Facebook Message Choice](images/channel-support/messenger/fb_message_choice.jpg)

## Sending Card Message

```javascript
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_ACCOUNT_ID}}/messages:send' \
-H 'Content-Type: application/json' \
-H 'Authorization: Basic {{YOUR_TOKEN}}' \
 -d '{
    "app_id": "{{YOUR_APP_ID}}",
    "recipient": {
        "contact_id": "{{YOUR_CONTACT_ID}}"
    },
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
    },

    "channel_priority_order": [
        "MESSENGER"
    ]
}'
```

```javascript Java
public static void main(String[] args) {
    // Init the Sinch Api Client to hold the auth
    SinchApiClient sinchApiClient = SinchApiClient.getDefaultConfig();

    // Build the Message APi which holds all messages capabilities
    MessageApi messageApi = new MessageApi(sinchApiClient);

    // Set up Card Message
    CardMessage cardMessage =
        CardMessage.newBuilder()
            .title("Hello World")
            .description("This is a rich card")
            .media(
                "https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png")
            .build();

    MessageResponse messageResponse =
        messageApi.sendCardMessage("01E9GXGK5Y4CKK1VTNJYAN0BAT", cardMessage);

    // Print out the Message id for the record
    System.out.println(messageResponse.getMessageId());
  }
```

![Facebook Card Message](images/channel-support/messenger/fb_message_card.jpg)

## Sending Carousel Message

```javascript
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_ACCOUNT_ID}}/messages:send' \
-H 'Content-Type: application/json' \
-H 'Authorization: Basic {{YOUR_TOKEN}}' \
 -d '{
    "app_id": "{{YOUR_APP_ID}}",
    "recipient": {
        "contact_id": "{{YOUR_CONTACT_ID}}"
    },
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
    },
    "channel_priority_order": [
        "MESSENGER"
    ]
}'
```

```javascript Java
  public static void main(String[] args) {

    // Init the Sinch Api Client to hold the auth
    SinchApiClient sinchApiClient = SinchApiClient.getDefaultConfig();

    // Build the Message APi which holds all messages capabilities
    MessageApi messageApi = new MessageApi(sinchApiClient);

    // Set up Card Message
    CardMessage cardMessage =
        CardMessage.newBuilder()
            .title("Hello World")
            .description("This is a rich card")
            .media("https://1vxc0v12qhrm1e72gq1mmxkf-wpengine.netdna-ssl.com/wp-content/uploads/2019/05/Sinch-logo-Events.png")
            .addTextChoice("First Button")
            .addCallChoice("Call us", "233123123")
            .addUrlChoice("Visit us", "https://www.sinch.com")
            .build();

    // Number of Cards in the carousel. Ideally from 2 to 10
    int MAX_CARDS = 5;

    CarouselMessage carouselMessage = new CarouselMessage();
    for (int i = 0; i < MAX_CARDS; ++i) {
      carouselMessage.addCard(cardMessage);
    }

    // Optional - Choice buttons
    carouselMessage.addTextChoice("Hello").addTextChoice("Something good");

    MessageResponse messageResponse =
        messageApi.sendCarouselMessage("01E9GXGK5Y4CKK1VTNJYAN0BAT", carouselMessage);

    // Print out the Message id for the record
    System.out.println(messageResponse.getMessageId());
  }
```

![Facebook Carousel Message](images/channel-support/messenger/fb_message_carousel.jpg)

## Sending Location Message

```javascript
curl --location --request POST 'https://api.conversation-api.prod.sinch.com/v1beta/accounts/{{YOUR_ACCOUNT_ID}}/messages:send' \
-H 'Content-Type: application/json' \
-H 'Authorization: Basic {{YOUR_TOKEN}}' \
 -d '{
    "app_id": "{{YOUR_APP_ID}}",
    "recipient": {
        "contact_id": "{{YOUR_CONTACT_ID}}"
    },
    "message": {
        "location_message": {
            "title": "Location Message",
            "label": "Enriching Engagement",
            "coordinates": {
                "latitude": 55.610479,
                "longitude": 13.002873
            }
        }
    },
    "channel_priority_order": [
        "MESSENGER"
    ]
}'
```

```javascript Java
public static void main(String[] args) {

    // Init the Sinch Api Client to hold the auth
    SinchApiClient sinchApiClient = SinchApiClient.getDefaultConfig();

    // Build the Message APi which holds all messages capabilities
    MessageApi messageApi = new MessageApi(sinchApiClient);

    // Send Text Message
    MessageResponse messageResponse =
        messageApi.sendLocationMessage(
            "01E9GXGK5Y4CKK1VTNJYAN0BAT", 55.610479, 13.002873, "Location Message");

    // Print out the Message id for the record
    System.out.println(messageResponse.getMessageId());
  }
```

![Facebook Location Message](images/channel-support/messenger/fb_message_location.jpg)
