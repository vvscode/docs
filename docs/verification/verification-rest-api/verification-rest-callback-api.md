---
title: "Verification Callback API"
excerpt: ""
---
## Verification Request Event

This callback event is a POST request to the specified verification callback URL and is triggered when a new verification request is made from the SDK client or the Verification Request API. This callback event is only triggered when a verification callback URL is specified.

### Authorization

You can find more information on callback request signing [here](doc:authorization#section-callback-request-signing).

### Request

    [RequestBody]
    {
        string - id
        string - event
        string - method
        identity - identity
        money - price
        string? - reference
        string? - custom
        string[]? - acceptLanguage
    }

*Example*

```json
{
    "id":"1234567890",
    "event": "VerificationRequestEvent",
    "method": "sms",
    "identity": { "type":"number", "endpoint":"+46700000000" },
    "price": { "amount": 10.5, "currencyId":"USD" }
}
```

### Response

    [ResponseBody]
        RequestEventResponse

    [RequestEventResponse]
    {
        string - action
        Sms? - sms
        FlashCall? - flashCall
        Callout? - callout
    }

    [Sms]
        string - code
        string[]? - acceptLanguage

    [FlashCall]
        string? - cli
        int? - dialTimeout

    [Callout]
        string? - locale
        string? - ttsMenu
        string? - wavFile
        string? - pin

**action** allows or denies the verification to be executed. It can take
these values:

  - allow
  - deny

*Example* - allow

```json
{
    "action": "allow"
}
```

*Example* - deny

```json
{
    "action": "deny"
}
```

### SMS

**code** contains the SMS PIN that should be used. By default, the Sinch dashboard will automatically generate PIN codes for SMS verification. If you want to set your own PIN, you can specify it in the response to the Verification Request Event:

*Example* - SMS with pre-defined PIN

```json
{
    "action": "allow",
    "sms": { "code": "12345" }
}
```

**acceptLanguage** allows to set (or override if provided in the API request) the SMS verification content language.

Please note that the content language specified in the API request or in the callback can be overridden by carrier provider specific templates, due to compliance and legal requirements, such as [US shortcode requirements (pdf)](https://www.wmcglobal.com/storage/us_resources/ctia-short-code-monitoring-handbook-current-Short-Code-Monitoring-Handbook-v1.7.pdf).

*Example - Set the SMS language to Spanish (Spain)*

```json
{
    "action": "allow",
    "sms":
        {
            "code": "12345" ,
            "acceptLanguage": ["es-ES"]
        }
}
```

### Flashcall

**cli** shows the phone number that will be displayed to the user when the flashcall is received on the user's phone. By default, the Sinch dashboard will select randomly the CLI that will be displayed during a flashcall from a pool of numbers. If you want to set your own CLI, you can specify it in the response to the Verification Request Event:

*Example* - Flashcall with pre-defined CLI

```json
{
    "action": "allow",
    "flashCall": { "cli": "+4445874587" }
}
```

Please note that in order to set your own CLI, you need to **own** the number that you will set.

**dialTimeout** shows the maximum time that a flashcall verification will be active and can be completed. If the phone number has not been verified successfully during this time, then the verification request will fail. By default, the Sinch dashboard will automatically optimize dial timeout during a flashcall. If you want to set your own dial time out for the flashcall, you can specify it in the response to the Verification Request Event:

*Example* - Flashcall with pre-defined dial timeout

```json
{
    "action": "allow",
    "flashCall": { "dialTimeout": 10 }
}
```

### Callout

**locale** it is used to indicate the language that should be used for the text-to-speech message. Only "en-US" is supported currently.

**ttsMenu** is the message that can be played to the user when the phone call is picked up. Default value is: "To verify your phone number, please press {pin}. If you didn’t request this call, please hangup."

**wavFile** is the wav file that can be played to the user when the phone call is picked up.

**pin** is the digit that the user should press to verify the phone number. Default value is "1".

**Important:** For the callout verification, if no ttsMenu nor wavFile is specified, then the user hears a text-to-speech message saying: "To verify your phone number, please press {pin}. If you didn’t request this call, please hangup."

Please note that for the callout method you can either select to play a text-to-speech message, or a pre-recorded wav file. If you want to use the wav file, please contact Sinch support for instructions on how to supply the file to Sinch.

*Example* - callout

```json
{
    "action": "allow",
    "callout": {
        "locale": "en-US",
         "ttsMenu": "Please press 1 to verify your phone",
         "pin": "1",
         "timeout": 60
    }
}
```

## Verification Result Event

This callback event is is a POST request to the specified verification
callback URL and triggered when a verification has been completed and
the result is known. It is used to report the verification result to the
developer's backend application. This callback event is only triggered
when the verification callback URL is specified.

### Authorization

You can find more information on callback request signing `here
<callbackrequestsigning>`.

### Request

    [RequestBody]
        ResultEvent

    [ResultEvent]
    {
        string - id
        string - event
        string - method
        identity - identity
        string - status
        string? - reason
        string? - reference
        string? - source
        string? - custom
    }

**id** is the verification id.

**event** contains the callback event that was received. It has the value "VerificationResultEvent".

**method** shows the verification method. It can take the values:

>   - "flashcall"
>   - "sms"
>   - "callout"

**identity** contains the endpoint information that is being verified. It contains a "type" object and an "endpoint" object

```json
"identity": { "type":"number", "endpoint":"+46700000000" }
```

**status** shows the current status of the verification request. It can take the values:

>   - "PENDING": the verification is ongoing
>   - "SUCCESSFUL": the verification was successful
>   - "FAIL": the verification attempt was made, but the number was not verified
>   - "DENIED": the verification attempt was denied by Sinch or your backend
>   - "ABORTED": the verification attempt was aborted by requesting a new verification
>   - "ERROR": the verification could not be completed due to a network error or the number being unreachable.

**reason** shows the reason why a verification has FAILED, was DENIED or was ABORTED. It can take the values:

>   - “Fraud”
>   - "Not enough credit"
>   - "Blocked"
>   - "Denied by callback"
>   - "Invalid callback"
>   - "Internal error"
>   - "Destination denied"
>   - "Network error or number unreachable"
>   - "Failed pending"
>   - "SMS delivery failure"
>   - "Invalid CLI"
>   - "Invalid code"
>   - "Expired"
>   - "Hung up without entering valid code"

**reference** shows the reference Id that was passed (optionally) together with the verification request.

**source** This is free text that the client is sending, but it is used to show if the call/SMS was intercepted or not. Typical values can be:

>   - “intercepted”
>   - "manual"

**custom** displays a custom string that can be passed provided during a verification request.

*Example*

```json
{
    "id":"1234567890",
    "event": "VerificationResultEvent",
    "method": "sms",
    "identity": { "type":"number", "endpoint":"+46700000000" },
    "status": "SUCCESSFUL"
}
```

### Response

*None*

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/verification/verification-rest-api/verification-rest-callback-api.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>