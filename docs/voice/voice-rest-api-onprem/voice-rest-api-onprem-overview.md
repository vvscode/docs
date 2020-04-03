---
title: Overview
excerpt: ''
hidden: 'true'
next:
  pages:
    - voice-rest-api-onprem-callback-api
---
When using Sinch for voice calling, the Sinch dashboard can be seen as a big telephony switch. It receives incoming phone calls (also known as *incoming call “legs”*), sets up outgoing phone calls (also known as *outgoing call “legs”*), and bridges the two. The incoming call leg may come in over a data connection (from a smartphone or web application using the Sinch SDKs) or through a local phone number (from the PSTN network). Similarly, the outgoing call leg can be over data (to another smartphone or web application using the Sinch SDKs) or the PSTN network.

For most call scenarios, you can use the Sinch SDKs on a smartphone or on web client to establish calls without the need of backend integration. For additional control or flexibility of the calls, you can use the Sinch REST APIs to manage the calls.

Controlling a call from your application backend is done by responding to callbacks from the Sinch dashboard and/or by calling REST APIs in the Sinch dashboard from your application backend. For more details on the callbacks triggered from the Sinch dashboard see the [Callback API](doc:voice-rest-api-onprem-callback-api).

For more details on the REST APIs to that can be used to manage calls see the [Calling API](doc:voice-rest-api-onprem-calling-api).

These are the typical call scenarios that you can control with the Sinch Callback and Calling APIs:

  - App to app calls
  - App to phone calls
  - Phone to phone calls
  - Text to speech calls
  - Conference calls
  - SIP trunking calls

## API Quick Reference

### Callback API

To use callback events you need to assign a callback URL in the Sinch portal under your app settings.

| Event  | HTTP Verb | Functionality                                                                                                         |
|--------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| ICE    | POST      | [Incoming Call Event callback](doc:voice-rest-api-onprem-callback-api#section-incoming-call-event-callback-ice-)      |
| ACE    | POST      | [Answered Call Event callback](doc:voice-rest-api-onprem-callback-api#section-answered-call-event-callback-ace-)      |
| DiCE   | POST      | [Disconnect Call Event callback](doc:voice-rest-api-onprem-callback-api#section-disconnect-call-event-callback-dice-) |
| PIE    | POST      | [Prompt Input Event callback](doc:voice-rest-api-onprem-callback-api#section-prompt-input-event-callback-pie-)        |
| Notify | POST      | [Notify Event callback](doc:voice-rest-api-onprem-callback-api#section-notify-event-callback-notify-)                 |

### Calling API

    https://callingapi.sinch.com/v1

| URL                                                    | HTTP Verb | Functionality                                                                                                          |
|--------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------|
| /configuration/numbers/                                | GET       | [Get a list of your numbers](doc:voice-rest-api-onprem-calling-api#section-get-numbers)                                |
| /configuration/numbers/                                | POST      | [Assign numbers to an app](doc:voice-rest-api-onprem-calling-api#section-update-numbers)                               |
| /configuration/callbacks/applications/{applicationkey} | GET       | [Get callback URLs of your app](doc:voice-rest-api-onprem-calling-api#section-get-callbacks)                           |
| /configuration/callbacks/applications/{applicationkey} | POST      | [Update the callback URLs of your app](doc:voice-rest-api-onprem-calling-api#section-update-callbacks)                 |
| /calling/query/number/{number}                         | GET       | [Query a number](doc:voice-rest-api-onprem-calling-api#section-query-number)                                           |
| /calls/id/{callId}                                     | PATCH     | [Manage Call](doc:voice-rest-api-onprem-calling-api#section-manage-call)                                               |
| /calls/id/{callId}                                     | GET       | [Get call result](doc:voice-rest-api-onprem-calling-api#section-get-call-result)                                       |
| /conferences/id/{conferenceId}                         | GET       | [Get conference info](doc:voice-rest-api-onprem-calling-api#section-get-conference-info)                               |
| /conferences/id/{conferenceId}/{callId}                | PATCH     | [Mute/Unmute conference participant](doc:voice-rest-api-onprem-calling-api#section-mute-unmute-conference-participant) |
| /conferences/id/{conferenceId}/{callId}                | DELETE    | [Kick conference participant](doc:voice-rest-api-onprem-calling-api#section-kick-conference-participant)               |
| /conferences/id/{conferenceId}                         | DELETE    | [Kick all conference participants](doc:voice-rest-api-onprem-calling-api#section-kick-all-conference-participants)     |
| /callouts                                              | POST      | [Place text-to-speech or conference call](doc:voice-rest-api-onprem-calling-api#section-text-to-speech)                |

### Reporting API

    https://reportingapi.sinch.com/v1

| URL                                     | HTTP Verb | Functionality                                                                            |
|-----------------------------------------|-----------|------------------------------------------------------------------------------------------|
| /users/{type}/{endpoint}/calls/{domain} | GET       | [User call report](doc:voice-rest-api-onprem-reporting-api#section-user-call-report)     |
| /counters/{id}                          | GET       | [Get counter](doc:voice-rest-api-onprem-reporting-api#section-counters)                  |
| /services/{id}                          | GET       | [Get service status](doc:voice-rest-api-onprem-reporting-api#section-get-service-status) |

## App to app calls

In this scenario, calls are originated from and terminated to an app using the iOS, Android or Javascript SDK. Both call legs are established over the data connection of the smartphone or computer (VoIP). For additional call control, you can specify a callback URL where Sinch will send call-related events. By capturing and responding to these events from your backend, you can allow, deny and control the calls. You can configure the call back URL under your app’s voice settings in the Sinch [dashboard](https://www.sinch.com/dashboard/).

For more information please check the [Callback API](doc:voice-rest-api-onprem-callback-api). The callback event that is used in app to app calls is the Incoming Call Event callback.

## App to phone calls

In this scenario, calls are originated from an app using the iOS, Android or Javascript SDK and are terminated to the fixed or mobile phone network. For additional call control, you can configure a callback URL under your app’s voice settings in the Sinch dashboard, where Sinch will send call-related events. By capturing and responding to these events from your backend, you can allow or deny calls to go through. Events will also be triggered when the calls will be answered or disconnected.

For more information please check the [Callback API](doc:voice-rest-api-onprem-callback-api). The callback events that are used in app to phone calls are the Incoming Call Event callback, the Answer Call Event callback and the Disconnect Call Event callback. You can also manage an ongoing call from your backend with the Manage Call API, which is part of the [Calling API](doc:voice-rest-api-onprem-calling-api).

## Phone to phone calls

In this scenario, calls are originated from a voice number and are terminated to the fixed or mobile phone network. You can rent and configure voice numbers from the Sinch [dashboard](https://www.sinch.com/dashboard/) by following these steps:
> 1.  Rent a Voice number from the Sinch [dashboard](https://portal.sinch.com/#/login), under the tab “Numbers”.
> 2.  Assign the number to your application. Under the “Apps” tab, select your app and assign the number under the app Voice settings. Alternatively, you can rent and configure numbers with REST APIs. For more information please check the [Number Administration documentation](doc:number-administration).
> 3.  Configure a callback URL under your app’s Voice settings, where Sinch will send call-related events.

When a user calls your configured voice number, the Sinch dashboard will trigger an Incoming Call Event callback towards your callback URL. The destination number - where the call will be connected to - has to be specified in your response to the Incoming Call Event callback. Similarly to app to phone calls, the Sinch dashboard will trigger additional events for call control.

For more information please check the [Callback API](doc:voice-rest-api-onprem-callback-api). The callback events that are used in phone to phone calls are the Incoming Call Event callback, the Answer Call Event callback and the Disconnect Call Event callback. You can also manage an ongoing call from your backend with the Manage Call API, which is part of the [Calling API](doc:voice-rest-api-onprem-calling-api).

## Conference calls

The Sinch dashboard supports a variety of different ways of initiating a conference call and connecting participants.

### Calling in a conference from an app

By using the Sinch Voice SDKs, you can allow your users to call in a conference from a mobile or web app. For more information please check the Voice SDKs documentation.

If you have not specified a callback URL under your app settings for voice, the participants will be directly added to the conference that is uniquely identified by the conference Id specified in the SDK client method.

If you have specified a callback URL under your app settings for voice, an Incoming Call Event callback will be triggered towards your URL, containing information on the conference Id that the caller wants to connect to. By responding to this event you can allow or deny the connection to the conference, or even specify a different conference Id.

For more information check the Incoming Call Event callback and the ConnectConf action.

### Calling in a conference from a phone number

You can also allow users to dial in a conference by calling a fixed phone number. To do this, first follow the steps mentioned in [Phone to phone calls](#section-phone-to-phone-calls) to configure a number in your app and set a callback URL. Every time a user calls your configured number, an Incoming Call Event callback will be triggered towards your URL. By responding to this event with the ConnectConf action, you can connect the call to a conference.

For more information check the Incoming Call Event callback and the ConnectConf action.

### Calling out to a participant

By using the conference callout API, you can trigger calls to fixed or mobile phones and connect them all to the same conference room.

For more information please check the [Callouts](doc:voice-rest-api-onprem-calling-api#section-conference-and-text-to-speech-callouts) API.

### Conference management

The Sinch dashboard allows you to control an ongoing conference through REST APIs. There are several conference-control options available, such as muting/unmuting participants or kicking out a participant or all participants from the conference when the conference ends.

For more information check the conferencing APIs that are available under the [Calling API](doc:voice-rest-api-onprem-calling-api).

### Conference recording

The Sinch dashboard allows recording of conference calls. The recorded files are stored in your own Amazon S3 bucket. For more information on how to record a conference, please check the ConnectConf action in the [Callback API](doc:voice-rest-api-onprem-callback-api).

Conference recording is disabled by default. To enable conference recording for your account please contact Sinch support, providing your Amazon S3 bucket information, where the recordings will be stored.

## Text to speech calls

With the text-to-speech REST API, you can trigger a call to be placed to a fixed or mobile phone number and play a synthesized text message.

For more information please check the [Callouts](doc:voice-rest-api-onprem-calling-api#section-conference-and-text-to-speech-callouts) API.

## SIP trunking

The Sinch dashboard allows you to connect calls from and to your SIP infrastructure (IP-PBX,SBC,etc).

### SIP origination

SIP-originated calls can be routed from your SIP server to the Sinch platform through a SIP trunk. You need to authentivate your SIP infrastructure to making outbound calls via Sinch SIP trunk you use:

Host: sip.sinch.com Username/Authenticationname: Your Sinch Application Key Password: Your Sinch Application Secret

If you prefer a other way of authenticate, please contact [Sinch support](mailto:support@sinch.com).

Once the call arrives in the Sinch dashboard, your backend will get an Incoming Call Event callback, notifying of the incoming call. You can control how you would like the call to be connected by responding to this event.

### SIP termination

You can route any type of call from the Sinch dashboard to your SIP server. If your calls are originated from an Android, iOS or Javascript client, you can route calls to your SIP server simply by calling the respective method that initiates calls towards SIP. If your calls are originated towards a PSTN inbound number, you can automatically forward calls to your SIP server using the SIP forwarding option in the Sinch Portal (setting available under Apps \>\> Voice and Video \>\> Connect Calls). For any other origination method or if you need more control, you can instruct a call to be connected to your SIP server by responding to the Incoming Call Event callback with the [ConnectSIP](doc:voice-rest-api-onprem-callback-api#section-connectsip-beta) action.

#### IP Whitelisting

You need to allow your SIP server to receive traffic from this IP:

>    213.242.88.200

#### Ports

RTP ports used: 10000 - 20000

#### Codecs

Sinch currently supports G.711u, G.711a, iLBC and G.729


