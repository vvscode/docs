---
title: "Call Detail Records"
excerpt: ""
---
Call Detail Records (CDRs) can be downloaded from the Sinch portal. CDRs are in a semicolon-delimited file that contains the following fields

<div class="magic-block-html">
    <div class="marked-table">
        <table>
            <thead>
            <tr class="header">
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr class="odd">
                <td>VerificationId</td>
                <td>int</td>
                <td><blockquote>
                    <p>A unique identifier for the verification request</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>UserSpaceId</td>
                <td><blockquote>
                    <p>int</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Internal identifier</p>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>Method</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Verification method. Can be flashCall, sms or callout</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>StartTimestamp</td>
                <td><blockquote>
                    <p>time</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Time when the request was placed</p>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>EndTimestamp</td>
                <td><blockquote>
                    <p>time</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Time when the request was placed</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>Result</td>
                <td>string</td>
                <td><blockquote>
                    <p>Shows the result of the verification. It can be:</p>
                    <blockquote>
                        <ul>
                            <li>"SUCCESSFUL": Number verified successfully</li>
                            <li>"FAIL": Number was not verified</li>
                            <li>"DENIED": Verification request was blocked (for reasons such as low credit,fraud etc)</li>
                            <li>"ABORTED": Verification request was aborted, by initiating a new request</li>
                            <li>"ERROR": There was an error processing the request, such as network congestions or number unreachable</li>
                        </ul>
                    </blockquote>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>Reason</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Reason for the result of a verification</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>CLI</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>The CLI that was used for a flashcall. Empty for SMS</p>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>IdentityType</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>The identity type of the endpoint verified</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>IdentityEndpoint</td>
                <td><blockquote>
                    <p>number</p>
                </blockquote></td>
                <td><blockquote>
                    <p>The number verified</p>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>Country</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>The country ID (ISO 3166-1 alpha-2) of the number verified</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>Reference</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Partner reference id</p>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>Custom</td>
                <td><blockquote>
                    <p>object</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Free field to be used as custom information</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>ApplicationKey</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Application key</p>
                </blockquote></td>
            </tr>
            <tr class="odd">
                <td>Amount</td>
                <td>decimal</td>
                <td><blockquote>
                    <p>Debited amount for the verification</p>
                </blockquote></td>
            </tr>
            <tr class="even">
                <td>Currency</td>
                <td><blockquote>
                    <p>string</p>
                </blockquote></td>
                <td><blockquote>
                    <p>Currency</p>
                </blockquote></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

The files are generated once daily and contain the previous days' CDRs. A day spans from 00:00:00 UTC to 23:59:59 UTC. CDRs are written when the call is ended, though there are some edge cases where an app-app call CDR may be delayed in being written, for example, if there is a network failure before the call is ended.

CDR files can be downloaded from the developer portal. Upon request, the CDR files can also be uploaded to a S3 bucket that your company provides and to which Sinch has write access.

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-rest-api/verification-rest-call-detail-records.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>