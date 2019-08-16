---
title: "Improving verification performance with a great UI"
excerpt: ""
---
For better verification performance, it should be straightforward and easy for users to enter their phone phone numbers. To simplify this step and build a UI that accurately captures the correct input from the users, the Sinch SDK provides some utility APIs.

## PhoneNumberFormattingTextWatcher

The Sinch SDK provides a `PhoneNumberFormattingTextWatcher` class that behaves exactly like the system android version [PhoneNumberFormattingTextWatcher](http://developer.android.com/reference/android/telephony/PhoneNumberFormattingTextWatcher.html), but allows specifying a region other than the system one when using APIs before 21. This watcher can be added as a text changed listener to a text field and will format it automatically if a phone number is entered in local or international format.

## Viable phone number check

The `isPossibleNumber` method in `PhoneNumberUtils` can be used to give the user a hint whether the entered phone number is a viable one in the specified region by for example highlighting the text field with a different color.