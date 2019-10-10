---
title: "Automatic Default Originator"
excerpt: ""
---
Default originator pool of an account is the set of originators for different countries configured by the account manager, if requested it will be used when batch message has no originator specified (missing "from" parameter).

For each MSISDN the originator will be auto selected from its default originator pool based on the country/region of the MSISDN when submitting a batch with missing originator as in `send_batch_msg` operation, if a default originator pool configured for your account. A batch with multiple recipients of different countries can get different originators based on the configured originator pool of that account.

If no default originator exists for the target MSISDN, then the message will be failed only for that MSISDN and not for the rest of the batch.

