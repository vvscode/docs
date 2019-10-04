---
title: "Getting Started"
excerpt: "The most feature-rich API Sinch offers. It allows for single messages, scheduled batch send-outs using message templates and more."
---
### Service plan

To use the REST API you first need to create an HTTP REST Service using the [web dashboard](https://dashboard.sinch.com/#/signup). You can have multiple service plans and each one will see their messages, groups or other resources isolated from each other. 

### Authentication

You will be provided with an authentication token for each service plan. 

The token is sent in the `Authorization` header preceded by `Bearer`. It is required for all requests made to the REST API.

**Example request with token**

``` shell
$ curl -H "Authorization: Bearer {token}" \
"https://api.clxcommunications.com/xms/v1/{service_plan_id}/batches
```

### Rate Limits

Each service plan comes with a rate limit which sets the maximum number of messages that can be sent per second. The rate limit is calculated from all messages sent via the API, so a batch with 10 recipients will count as 10 messages for rate limiting purposes.

Each service plan gets it's own message queue served in First-In-First-Out order. This means that new batches will be accepted immediately but might be delayed if earlier batches are still on queue.

<a class="edit-on-github" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-rest/sms-rest-getting-started.md">Edit on GitHub</a>