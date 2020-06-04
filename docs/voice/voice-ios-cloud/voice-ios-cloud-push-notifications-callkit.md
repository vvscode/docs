---
title: Push Notifications and CallKit
excerpt: >-
  Using VoIP push notifications and _CallKit_ with the Sinch SDK.
hidden: false
next:
  pages:
    - voice-ios-cloud-playing-ringtones
---

Use the Sinch SDK toghether with Apple _VoIP_ push notifications and [CallKit](https://developer.apple.com/documentation/callkit) to provide the best possible end user experience. _VoIP_ push notifications are a special type of push notifications that Apple support as part of _Apple Push Notification service_ (_APNs_) which enables fast and high-priority notifications. [CallKit]((https://developer.apple.com/documentation/callkit)) is an iOS framework that lets you integrate the Sinch VoIP calling functionality with a iOS native system look and feel.

To fully enable VoIP push notifications in your application, the following steps are required, and this document will guide you through these in more detail:

- Configure your iOS app to use VoIP push notifications and CallKit.
- Upload an _APNs Signing Key_.
- Configure Sinch client to let Sinch manage push notifications (both client-side and server-side).
- Integrate use of Sinch APIs with CallKit.
- Ensure APNs environment is matching the app entitlements and codesigning.


> ❗️Important
> For iOS apps built using the iOS 13 SDK or later, using _PushKit_ requires you to use _CallKit_ when handling VoIP calls.


## Configure iOS App with Push Notifications Capability

Apps must have the proper entitlements to use push notifications. To add these entitlements to your app, enable the _Push Notifications_ capability in your Xcode project. See Apple documentation [here](https://developer.apple.com/documentation/usernotifications/registering_your_app_with_apns?language=objc#overview) for details on this particular step.


## Acquiring a Push Device Token

`SINManagedPush` is a component used to simplify acquiring a push device token and registering the token with a `SINClient`. `SINManagedPush` will make use of _PushKit_ to acquire a push device token, and will automatically register the token with the `SINClient` when a client is created (later in the application life-cycle). `SINManagedPush` should be created as early as possible in the application’s life-cycle.

```objectivec
@interface AppDelegate () <SINManagedPushDelegate>
@property (nonatomic, readwrite, strong) id<SINManagedPush> push;
@end

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)options {

    self.push = [Sinch managedPushWithAPSEnvironment:SINAPSEnvironmentAutomatic];
    self.push.delegate = self;

    [self.push setDesiredPushType:SINPushTypeVoIP];
}
```

> 📘
>
> When creating the `SINManagedPush` instance, the _Apple Push Notification service Environment_ must be specified and it must __match__ how your application is code signed and provisioned. Please see the section [APS Environments and Provisioning](doc:voice-ios-cloud-push-notifications-callkit#apple-push-service-environments-and-provisioning) for details.

> 👍
>
> `SINManagedPush` is a very lightweight component and its lifecycle can be independent of the life-cycle of a `SINClient`. It should be created once, and should not be disposed (that would prevent receiving push notifications via _PushKit_).


## Apple Push Service Environments and Provisioning

When an iOS application is code signed, the embedded _Provisioning Profile_ will have to match the _Apple Push Notification service Environment_ (also refered to as _APS Environment_) specified in the app [_Entitlements_](https://developer.apple.com/documentation/bundleresources/entitlements/aps-environment?language=objc).

This means how the the app is code signed and what _Provisioning Profile_ is used has an effect on what value should be passed to `+[Sinch managedPushWithAPSEnvironment:]`.

For example, if your application is signed with a _Development_ provisioning profile it will be bound to the APS _Development_ environment. If it’s code signed with a _Distribution_ provisioning profile it will be bound to the APS _Production_ environment.

Typically a _Debug_ build will be code signed with a _Development_ provisioning profile and thus `SINAPSEnvironmentDevelopment` should be used. And typically a _Release_ build will be code signed with a _Distribution_ provisioning profile and thus `SINAPSEnvironmentProduction` should be used. Instead of changing this manually for each build, the macro `SINAPSEnvironmentAutomatic` is available which automatically expands to _Development_ for _Debug_ builds and _Production_ for _Release_ builds.

## Relevant Apple Resources

For more details on Apple _PushKit_ and _CallKit_, see following _Apple Developer Documentation_:

* [PushKit](https://developer.apple.com/documentation/pushkit)
* [CallKit](https://developer.apple.com/documentation/callkit)
* [Responding to VoIP Notifications from PushKit](https://developer.apple.com/documentation/pushkit/responding_to_voip_notifications_from_pushkit)

## SINManagedPush and SINClient Interaction

This section covers details on how `SINManagedPush` and `SINClient` interacts toghether (automatically).

`SINManagedPush` will make use of `PKPushRegistry` to acquire a push device token. If any `SINClient` instances exist, it will register the token via `-[SINClient registerPushNotificationDeviceToken:type:apsEnvironment:]`, which will in turn register the token with the Sinch backend platform. If no instance of `SINClient` exists when `SINManagedPush` initially acquire the token, it will hold on to the token (in-process memory only) and register it with any `SINClient` that is created later during the whole application life-cycle.
