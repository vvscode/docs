---
title: "Introduction"
excerpt: ""
---
The core functionality of the Number Lookup Service is to provide information about the MSISDNs queried. MSISDN in - information about the MSISDN out.

In some countries information is accessible via national MNP databases and in some markets the only way to get information about a certain MSISDN is to query the HLR of the network the subscriber is connected to.

To provide data of highest quality we have created a Number Lookup service that combines data sourced directly from local number portability databases with an extensive global HLR coverage powered by our MNO partners. The service is built on a true carrier grade platform developed by our sister company Symsoft (www.symsoft.com), ensuring excellent performance in terms of availability, throughput and latency. Just like all Sinch’s services the Number Lookup service is fully redundant. Our Number Lookup service is accessible via two interfaces:
> - ENUM
> - HTTP/HTTPS

The use cases for Number Lookup services are many but most common is to use Number Lookup for Call- and SMS routing optimizing, authentication services and number database cleaning. Knowing which network a subscriber is connected to is key to create a high quality messaging service and information about in which country a subscriber is located in, has proven very useful in authentication services.

## Number Portability Lookup and Real-Time Lookup

Depending on the use case different data about the MSISDN is needed - that’s why we have packaged our Number Lookup services in to two different products: Number Portability Lookup and Real-Time Lookup. The Number Portability Lookup service is optimized for Call and SMS routing and provides you with MCC+MNC of the operator the subscriber belongs to. Data sources used for the service are national MNP databases and HLR queries. The Real-Time Lookup service is based on real-time HLR queries only, and is commonly used for authentication services where additional information in addition to MCC+MNC is needed.

Input for a Number Lookup query is always an MSISDN - the table below illustrates which data is returned when using our Number Lookup services via the two interfaces.
[block:html]
{
  "html": "<div class=\"marked-table\">\n<table>\n<colgroup>\n<col style=\"width: 44%\" />\n<col style=\"width: 16%\" />\n<col style=\"width: 36%\" />\n</colgroup>\n<tbody>\n<tr class=\"odd\">\n<td></td>\n<td><strong>ENUM</strong></td>\n<td><strong>HTTP/HTTPS</strong></td>\n</tr>\n<tr class=\"even\">\n<td><strong>Number Portability Lookup</strong></td>\n<td>MCC + MNC</td>\n<td>MCC + MNC</td>\n</tr>\n<tr class=\"odd\">\n<td><strong>Real-Time Lookup</strong></td>\n<td>MCC + MNC</td>\n<td><div class=\"line-block\">MCC + MNCCountry Code<br />\nHandset Status Code</div></td>\n</tr>\n</tbody>\n</table>\n\n</div>\n\n<style></style>"
}
[/block]