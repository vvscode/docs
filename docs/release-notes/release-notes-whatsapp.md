---
title: Sinch WhatsApp API
excerpt: >-
  See how the Sinch WhatsApp API is evolving and find out about new features
  and bug fixes.
---
<h3>2020-02-11</h3>
  - fix issue with missing CDRs and customer callbacks for messages delivered over 14 days after sent
  - upgrade WhatsApp Business API client (dockers) to latest v2.27.8
  - upgrade google libphonenumber library

<h3>2020-01-31</h3>
  - fix bug with dot ('.') prefix in cookies domain
  - fix for making some number admin of chat group when that number is not part of that group
  - use filename like caption for document template messages
  - new API endpoint to list current state of blacklisted numbers for bot
  - fix malfunctioning validation of numbers when adding to and removing from blacklist
  - remove phone number validation for incoming messages
  - add additional MIME type support for media files 
