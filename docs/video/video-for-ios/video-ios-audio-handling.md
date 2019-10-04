---
title: "Audio handling - Video iOS"
excerpt: ""
---
If the application plays audio that does not originate from the Sinch SDK, certain guidelines should be followed. Additional information on audio session-related topics is available in the [Audio Session Programming Guide](http://developer.apple.com/library/ios/#documentation/Audio/Conceptual/AudioSessionProgrammingGuide/Introduction Introduction.html).

## Audio sessions
 When a call is established, the Sinch client activates the shared audio session. When the call is disconnected, the Sinch client deactivates the shared audio session. If the application wants to play audio in any other context, it needs to reactivate the shared audio session. This applies after each finished call.

When started, the Sinch SDK client sets itself as the audio session delegate. If the application wishes to override this behavior, the application needs to reset the delegate after the client has started but before any call has been started. (Doing this is not recommended.)

## Audio session categories

When the Sinch client is started, it sets the audio session category to `PlayAndRecord`. The reason the Sinch client only sets the audio category once, is to avoid interfering with what the hosting application may want to do with the audio session.

If the application changes the audio session category, it is responsible for changing the category back to `PlayAndRecord` after the application has performed its audio task so that the category is correctly setup for calls.

The Sinch SDK applies the audio session category mode `AVAudioSessionModeVoiceChat` for improved voice quality. Please see [Apple’s AVAudioSession documentation](https://developer.apple.com/library/ios/documentation/AVFoundation/Reference/AVAudioSession_ClassReference/Reference Reference.html) for further details.

## Audio session interruptions

When the users are in the midst of a Sinch SDK call, someone might call users using the PSTN network, thus interrupting the application and make iOS play the regular native ringtone. If the native phone call ends within 30 seconds, the application will start running again. If not, the Sinch SDK call will be terminated.

## Playing ringtones

The `SINAudioController` object provides a convenience method `startPlayingSoundFile:loop:` for playing sounds that are related to a call, such as ringtones and busy tones. Details on how to use it can be found in the [Reference](reference/html/Protocols/SINAudioController.html) documentation.

The sound file must be a mono (1 channel), 16-bit, uncompressed (PCM) `.wav` file with a sample rate of 8kHz, 16kHz, or 32kHz.
```objectivec
- (void)callReceivedOnRemoteEnd:(id<SINCall>)call {
    NSString* soundFilePath = [[NSBundle mainBundle] pathForResource:@"progresstone" ofType:@"wav"];
    // get audio controller from SINClient
    id<SINAudioController> audioController = [self.client audioController];
    [audioController startPlayingSoundFile:soundFilePath loop:NO];
}
```


Applications that prefer to use their own code for playing sounds are free to do so, but they should follow the guidelines for [Audio Sessions](#section-audio-sessions) and [Audio Session Categories](#section-audio-session-categories) above.


<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-ios/video-ios-audio-handling.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>