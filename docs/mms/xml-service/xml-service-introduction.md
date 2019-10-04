---
title: "Introduction to XML"
excerpt: ""
---
**Some of the key features of XML API are:**

  - **Sure Route Mobile Terminated Message:** Customer’s don’t have to
    specify the destination network operator while using the XML API,
    they can just specify the telephone number where the message needs
    to be delivered and Sinch with determine the correct network
    operator for this number.

  - **Device Discovery:** Sinch provides Device Discovery feature to our
    customers through our XML API. Device discovery is achieved either
    via carrier database query and discovery message where applicable.

  - **Device Profile:** The device profile, if available, is also
    included along with the delivery receipt and MO MMS message.
    System-wide database of last know device profile per phone number is
    maintained, updated whenever carrier database is queried or delivery
    receipt is received.

  - **Fallback SMS:** Fallback SMS is available thorough our XML API, if
    the rich media file size is larger than the device’s maximum file
    size, a fallback SMS will be sent. Also, also if the device does not
    support rich media content then a fallback SMS is sent. The customer
    can specify the default message text to be delivered to end users.

  - **Transcoding and Content Adaptation:** XML API offers transcoding
    and content adaptation to our customers where adaptation of source
    media is needed to match the destination terminal profile. This
    feature uses device discovery results.

  - **Higher Throughput:** Customers using XML API send messages over
    the MM1 connection thus providing higher throughput

  - **saveMMS/sendSavedMMS:** XML API allow users to save their MMS from
    XML using the saveMMS API, once the MMS is saved, it can be utilized
    by other functions through the mms-id returned. Users can then call
    sendSavedMMS API to send stored content from a specified account.
    This allows user to send a burst of messages with avoids any latency
    and consumes less bandwidth.

**Sinch XML MMS API Methods:**

|         Action         |                      Functionality                                                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `save_mms`       | This API stores an MMS from XML.                                                                                                                                          |
| `send_saved_mms` | This API sends stored content from a specified account using an mms-id to a single mobile number.                                                                         |
| `send_mms`       | Sends an MMS defined in the XML containing slides of embedded with,video, audio, images and/or text to a single or list of mobile numbers,in international number format. |

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/xml-service-introduction.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>