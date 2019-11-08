---
title: Send SMS in Ruby
hidden: 'true'
excerpt: Learn how to use the sinch_sms gem to send an SMS with Sinch.
---
In this tutorial, you will use the sinch\_sms gem to send an sms with Sinch. For pricing information about our [SMS API](https://www.sinch.com/sms-api/) by destination, visit [sms-prices](http://www.sinch.com/pricing/sms-prices/).

## Set up

> 1.  Create a Sinch developer account at [sinch.com/signup](https://portal.sinch.com/#/signup)
> 2.  In your developer dashboard, click **Apps** in the left menu
> 3.  Click **create new app**
> 4.  Name your app, and click **create**
> 5.  Take note of your app key and secret, you will need them in a few minutes
> 6.  Install the gem using `gem install sinch_sms`

## Send an SMS via the API

To require the gem, use:

```ruby
require 'sinch_sms'
```

To send an SMS:

```ruby
SinchSms.send('app-key', 'app-secret', 'message', 'to-phone-number')
```

The send method returns a json with the messageId, like so:

```json
{
    "MessageId": 123456789
}
```

You can use this result to check the status of this message like so:

```ruby
SinchSms.status('app-key', 'app-secret', '123456789')
```

Checking the status of a message will return one of four values:

>   - Unknown - The status if the provided message id is not known
>   - Pending - The message is in the process of being delivered
>   - Successful - The message has been delivered to the recipient
>   - Faulted - The message has not been delivered, this can be due to an invalid number for instance.

That’s all\! If you have any questions about our SMS API, feel free to comment below, email us at <dev@sinch.com>, or tweet us at [@SinchDev](http://www.twitter.com/sinchdev).
