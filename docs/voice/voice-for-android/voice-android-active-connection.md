---
title: Active connection
excerpt: ''
---
If push notifications are not desired, the alternative is to use `setSupportActiveConnectionInBackground(true)` and then calling `startListeningOnActiveConnection()` to enable incoming calls and instant messages. Don’t forget to call `stopListeningOnActiveConnection()` when the user is no longer available for calls (for example if the application is no longer active).

