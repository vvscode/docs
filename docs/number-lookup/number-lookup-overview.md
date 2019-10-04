---
title: "Introduction to Number Lookup"
excerpt: ""
---
The core functionality of the Number Lookup Service is to provide information about the MSISDNs queried. MSISDN in - information about the MSISDN out.

In some countries information is accessible via national MNP databases and in some markets the only way to get information about a certain MSISDN is to query the HLR of the network the subscriber is connected to.

To provide data of highest quality we have created a Number Lookup service that combines data sourced directly from local number portability databases with an extensive global HLR coverage powered by our MNO partners. The service is built on a true carrier grade platform developed by our Operator division, ensuring excellent performance in terms of availability, throughput and latency. Just like all Sinch’s services the Number Lookup service is fully redundant. Our Number Lookup service is accessible via two interfaces:
> - ENUM
> - HTTP/HTTPS

The use cases for Number Lookup services are many but most common is to use Number Lookup for Call- and SMS routing optimizing, authentication services and number database cleaning. Knowing which network a subscriber is connected to is key to create a high quality messaging service and information about in which country a subscriber is located in, has proven very useful in authentication services.

## Number Portability Lookup and Real-Time Lookup

Depending on the use case different data about the MSISDN is needed - that’s why we have packaged our Number Lookup services in to two different products: Number Portability Lookup and Real-Time Lookup. The Number Portability Lookup service is optimized for Call and SMS routing and provides you with MCC+MNC of the operator the subscriber belongs to. Data sources used for the service are national MNP databases and HLR queries. The Real-Time Lookup service is based on real-time HLR queries only, and is commonly used for authentication services where additional information in addition to MCC+MNC is needed.

Input for a Number Lookup query is always an MSISDN - the table below illustrates which data is returned when using our Number Lookup services via the two interfaces.

<div class="magic-block-html">
    <div class="marked-table">
        <table>
        <thead>
          <tr>
          <th></th>
            <th>ENUM</th>
            <th>HTTP/HTTPS</th>
          </tr>
        </thead>
            <tbody>
            <tr class="even">
                <td><strong>Number Portability Lookup</strong></td>
                <td>MCC + MNC</td>
                <td>MCC + MNC</td>
            </tr>
            <tr class="odd">
                <td><strong>Real-Time Lookup</strong></td>
                <td>MCC + MNC</td>
                <td>MCC + MNCCountry Code
                Handset Status Code</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/number-lookup/number-lookup-overview.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>