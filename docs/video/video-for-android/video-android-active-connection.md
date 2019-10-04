---
title: "Active connection"
excerpt: ""
---
If push notifications are not desired, the alternative is to use `setSupportActiveConnectionInBackground(true)` and then calling `startListeningOnActiveConnection()` to enable incoming calls and instant messages. Don’t forget to call `stopListeningOnActiveConnection()` when the user is no longer available for calls (for example if the application is no longer active).

<a class="edit-on-github" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-android/video-android-active-connection.md">Edit on GitHub</a>