---
id: "5d348c0476411300e20b368c"
title: "SMS Fallback"
excerpt: ""
---
The RCS REST API enables robust support for SMS fallback based on a range of configurable conditions.

When fallback occurs, the message is handed over to [Sinch SMS API](doc:rest) and further status updates are available in accordance with [Delivery Reports](doc:sms-rest-delivery-reports) and SMS REST API [Callbacks](doc:sms-rest-callback).

Fallback is indicated by receiving a `StatusReportFallbackDispatched` on the agent's webhook endpoint as described in [RCS Callback Request](doc:receiving-updates-callbacks#section-callback-request). The status report includes the `external_ref` field referencing a `batch_id` provided by the SMS REST API [Batches Endpoint](doc:batches-endpoint#section-send-a-batch-message).

Fallback SMS service plan is configured during provisioning of the RCS REST API.

Fallback and condition configuration is controlled in detail by providing [`FallbackInfo`](doc:messages-endpoint#section-fallbackinfo) in [Send a message API Endpoint](doc:messages-endpoint#section-send-a-message).

### Fallback conditions

| Condition              | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                  |
|------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| rcs_unavailable        | *enabled*  | Fallback to SMS when the targeted MSISDN is not reachable by RCS. This will happen immediately after the user agent’s capabilities have been established.                                                                                                                                                                                                                                                    |
| capability_unsupported | *disabled* | NOTE: Not currently enabled. Fallback to SMS if the specific capability needed to deliver the provided message payload is not supported by the receiving MSISDN, e.g., the device does not support media messages.                                                                                                                                                                                           |
| expire                 | *enabled*  | Fallback to SMS if the per message provided (See ExpireInfo) or RCS REST API system wide(48h) message expiry happens.<br><br>  This means that a delivered notification was not received before the message expired. The RCS message will be revoked before sending the fallback SMS. Revocation is also configurable in the FallbackInfo object.                                                            |
| agent_error            | *disabled* | Fallback to SMS if a fatal agent error occurs with a RCS supplier or within the RCS REST API platform.<br><br>  Enabling SMS fallback on agent error guarantees that an SMS is sent instead of potentially delaying a message because of unexpected issues in the RCS delivery pipeline.<br><br>  Agent errors should not occur as RCS matures, but is useful if delivery using any channel is the priority. |