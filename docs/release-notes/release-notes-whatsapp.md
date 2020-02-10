---
title: Sinch WhatsApp API
excerpt: >-
  See how the Sinch WhatsApp API is evolving and find out about new features
  and bug fixes.
---
<h3>2020-02-11</h3>
  - Fix issue with missing customer callbacks for messages delivered over 14 days after sent.
  - Upgrade WhatsApp Business API client (dockers) to latest v2.27.8.
  - Upgrade google libphonenumber library.

<h3>2020-01-31</h3>
  - Fix bug with dot ('.') prefix in cookies domain.
  - Add fail message when trying to add a number as admin if that number is not part of that group. 
  - Add support for filename parameter for document template messages.
  - New API endpoint for getting the content of the blacklist.
  - Change validation of numbers when adding to and removing from blacklist.
  - Remove phone number validation for incoming messages.
  - Add additional MIME type support for media files.
