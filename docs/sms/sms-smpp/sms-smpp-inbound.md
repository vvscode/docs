---
title: "Inbound SMS SMPP"
excerpt: ""
---
### How To Connect

Please find the host and port number used to connect to our inbound service via SMPP in the table below. Username and Password will be found in the CAD (Client Account Details) document provided to you by your account manager.

| Server              | Host:Port                           | Location      |
| ------------------- | ----------------------------------- | ------------- |
| Primary SMPP Server | sms1.clxnetworks.net:3600           | Stockholm, SE |
| Backup SMPP Server  | inbound01-ash1.clxnetworks.com:3600 | Virginia, US  |

### How To Receive Messages

#### Encoding

Default encoding used for the mobile originated messages is GSM-7. If message content contains characters not included in the GSM-7 table, USC-2 will be used.

#### Parameters

Inbound messages will be delivered to your platform as a "DELIVER\_SM". The table below shows which parameters you will receive for each mobile originated SMS sent to your number.

| Parameter                  | Description                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| command\_id                | Will always be DELIVER\_SM                                                                              |
| service\_type              | Will always be 0                                                                                        |
| source\_addr\_ton          | TON for the source address, will be INTERNATIONAL (1) for all mobile originated messages                |
| source\_addr\_npi          | NPI for the source address, will be MSISDN (1) for all mobile originated messages                       |
| source\_addr               | Source address - the MSISDN the SMS was sent from                                                       |
| dest\_addr\_ton            | TON for the destination address, will be INTERNATIONAL (1) Long numbers and NATIONAL (2) for Short code |
| dest\_addr\_npi            | NPI for the destination address, will always be MSISDN (1)                                              |
| destination\_addr          | Destination address - the MSISDN the SMS was sent to (your Long Number or Short Code)                   |
| esm\_class                 | Will always be 0                                                                                        |
| protocol\_id               | Will always be 0                                                                                        |
| priority\_flag             | Will always be 0                                                                                        |
| schedule\_delivery\_time   | Will always be 0                                                                                        |
| validity\_period           | Will always be 0                                                                                        |
| registered\_delivery       | Will always be 0                                                                                        |
| replace\_if\_present\_flag | Will always be 0                                                                                        |
| data\_coding               | Encoding used. Default is GSM-7 (0), UCS-2 for messages containing characters outside GSM-7 (8)         |
| sm\_default\_msg\_id       | Will always be 0                                                                                        |
| sm\_length                 | Short Message Length - number of characters in message content                                          |
| short\_message             | Message content                                                                                         |

### Examples

#### Inbound SMS sent to a Long Number

| Parameter                  | Example     |
| -------------------------- | ----------- |
| command\_id                | DELIVER\_SM |
| service\_type              | 0           |
| source\_addr\_ton          | 1           |
| source\_addr\_npi          | 1           |
| source\_addr               | 46706160585 |
| dest\_addr\_ton            | 1           |
| dest\_addr\_npi            | 1           |
| destination\_addr          | 46737494630 |
| esm\_class                 | 0           |
| protocol\_id               | 0           |
| priority\_flag             | 0           |
| schedule\_delivery\_time   | 0           |
| validity\_period           | 0           |
| registered\_delivery       | 0           |
| replace\_if\_present\_flag | 0           |
| data\_coding               | 0           |
| sm\_default\_msg\_id       | 0           |
| sm\_length                 | 4           |
| short\_message             | Test        |

#### Inbound SMS sent to a Short Code

| Parameter                  | Example     |
| -------------------------- | ----------- |
| command\_id                | DELIVER\_SM |
| service\_type              | 0           |
| source\_addr\_ton          | 1           |
| source\_addr\_npi          | 1           |
| source\_addr               | 46706160585 |
| dest\_addr\_ton            | 2           |
| dest\_addr\_npi            | 1           |
| destination\_addr          | 71630       |
| esm\_class                 | 0           |
| protocol\_id               | 0           |
| priority\_flag             | 0           |
| schedule\_delivery\_time   | 0           |
| validity\_period           | 0           |
| registered\_delivery       | 0           |
| replace\_if\_present\_flag | 0           |
| data\_coding               | 0           |
| sm\_default\_msg\_id       | 0           |
| sm\_length                 | 4           |
| short\_message             | Test        |

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/sms/sms-smpp/sms-smpp-inbound.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>