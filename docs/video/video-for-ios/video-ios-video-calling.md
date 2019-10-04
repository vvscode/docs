---
title: "Video Calling - Video API iOS"
excerpt: ""
---
## Setting up a video call

Just like audio calls, video calls are placed through the `SINCallClient` and events are received using the `SINCallClientDelegate`. The call client is owned by the SinchClient and accessed using `[sinchClient callClient]`. Calling is not enabled by default.
For a more general introduction to calling with the SinchClient, see [Calling](doc:video-ios-calling).

## Showing the video streams

The following examples for showing video streams will be based on the assumption of a view controller having the following properties:
```objectivec
@interface MyViewController : UIViewController

@property (weak, nonatomic) IBOutlet UIView *remoteVideoView;
@property (weak, nonatomic) IBOutlet UIView *localVideoView;

@end
```


### Showing a preview of the local video stream
```objectivec
- (void)viewDidLoad {
  [super viewDidLoad];

  id<SINVideoController> videoController = ... // get video controller from SINClient.

  [self.localVideoView addSubview:[self.videoController localView]];
}
```


### Showing remote video streams

Once you have created a `SINCallClientDelegate` and added it to a call, the method `callDidAddVideoTrack:` will be called.
```objectivec
- (void)callDidAddVideoTrack:(id<SINCall>)call {
  id<SINVideoController> videoController = ... // get video controller from SINClient.

  // Add the video views to your view hierarchy
  [self.remoteVideoView addSubview:[videoController remoteView]];
}
```


### Pausing video stream

To pause the local video stream, use the `pauseVideo` method on the call.
```objectivec
// Pause the video stream.
[call pauseVideo];
```


### Resuming video stream
To resume the local video stream, use the `resumeVideo` method on the call.
```objectivec
// Resume the video stream.
[call resumeVideo];
```


### Pausing video stream delegates

Once you have created a `SINCallClientDelegate` and added it to a call, the method `callDidPauseVideoTrack:` will be called when the remote user pause the video stream.
```objectivec
- (void)callDidPauseVideoTrack:(id<SINCall>)call {
  // Implement what to be done when remote user pause video stream.
```


### Resuming video stream delegates

Once you have created a `SINCallClientDelegate` and added it to a call, the method `callDidResumeVideoTrack:` will be called when the remote user resumes the video stream.
```objectivec
- (void)callDidResumeVideoTrack:(id<SINCall>)call {
  // Implement what to be done when remote user resumes video stream.
```


### Video content fitting and aspect ratio

How the rendered video stream is fitted into a view can be controlled by the regular `-[UIView contentMode]` property. I.e. assigning `contentMode` on a view returned by `-[SINVideoController remoteView]` or `-[SINVideoController localView]` will affect how the video content is laid out. Note though that only `UIViewContentModeScaleAspectFit` and `UIViewContentModeScaleAspectFill` will be respected.

**Example**
```objectivec
id<SINVideoController> videoController;
videocontroller.remoteView.contentMode = UIViewContentModeScaleAspectFill;
```


### Full screen

The Sinch SDK provides helper functions to transition a video view into fullscreen mode. These are provided as Objective-C category methods for the `UIView` class and are defined in `SINUIView+Fullscreen.h` (*SINUIViewFullscreenAdditions*).

**Example**
```objectivec
- (IBAction)toggleFullscreen:(id)sender {
    id<SINVideoController> videoController = ... // get video controller from SINClient.

    UIView *view = videoController.remoteView;

    if ([view sin_isFullscreen]) {
      view.contentMode = UIViewContentModeScaleAspectFit;
      [view sin_disableFullscreen:YES]; // Pass YES to animate the transition
    } else {
      view.contentMode = UIViewContentModeScaleAspectFill;
      [view sin_enableFullscreen:YES];  // Pass YES to animate the transition
    }
  }
```


### Accessing video frames of the remote streams

The Sinch SDK provides developers a callback to access the video frames of the remote streams. So you can process the video frames with your own implementation to achieve rich functionalities, e.g., applying filters, adding stickers to the video frames, or saving the video frame as an image.

Your video frame handler needs to conform `SINVideoFrameCallback` protocol by implementing the `onFrame:` callback. Note that you need to explicitly release the video frame by calling `[videoFrame releaseFrame]`.

**Example**
```objectivec
// YourVideoFrameHandler.h
// Conform SINVideoFrameCallback protocol
@interface YourVideoFrameHandler : NSObject<SINVideoFrameCallback>
    ... // Handler specific declarations
@end
```

``` sourceCode objectivec
// YourVideoFrameHandler.m
// Implement onFrame: callback
@implementation YourVideoFrameHandler
- (void)onFrame:(id<SINVideoFrame>)videoFrame callId:(NSString *)callId {
  ... // Process videoFrame
  [videoFrame releaseFrame]; // Release videoFrame
}
@end
```


Use `-[SINVideoController setVideoFrameCallback:]` to register your video frame handler as the callback to receive video frames.

```objectivec
YourVideoFrameHandler* videoFrameHandler;
id<SINVideoController> videoController = ... // Get video controller from SINClient.
[videoController setVideoFrameCallback: videoFrameHandler];
```


### Converting video frame to UIImage

The Sinch SDK provides helper functions to convert `id<SINVideoFrame>` to `UIImage*`. It is handy to get the `UIImage` representation of `SINVideoFrame` by calling function `SINUIImageFromVideoFrame()`. Note that the helper function will *NOT* release the video frame.
```objectivec
#import "SINVideoController.h" // To use SINUIImageFromVideoFrame()

id<SINVideoFrame> videoFrame = ... // Get SINVideoFrame from onFrame: callback
UIImage *image = SINUIImageFromVideoFrame(videoFrame);
```


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-ios/video-ios-video-calling.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>