---
title: REST API
excerpt: ''
next:
  pages:
    - rcs-rest-getting-started
---
The Sinch RCS REST API provides [Universal Profile 2.0](https://www.gsma.com/futurenetworks/rcs/resources-rcs-events/universal-profile/) RCS messaging with granular controls to allow fallback to SMS when a handset is not RCS enabled.

[SMS Fallback](doc:rcs-rest-sms-fallback) and SMS status reporting are facilitated using the [SMS REST API](doc:sms-rest) that allows for the use of existing tools to receive and collect delivery reports and mobile originated messages which should be familiar to existing users.

It is possible to setup the RCS REST API to use an existing SMS account for all fallback SMS traffic. It is also possible to use the RCS REST API without SMS fallback, in this case an SMS account is not needed.

When [SMS Fallback](doc:rcs-rest-sms-fallback) is desired, fine grained control is provided [by configuring fallback conditions](doc:rcs-rest-sms-fallback#section-fallback-conditions).
