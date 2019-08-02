---
title: "Video Calling"
excerpt: ""
---
## Setting up a video call

Just like audio calls, video calls are placed through the `SINCallClient` and events are received using the `SINCallClientDelegate`. The call client is owned by the SinchClient and accessed using `[sinchClient callClient]`. Calling is not enabled by default. For a more general introduction to calling with the SinchClient, see `Calling <callingios>`.

## Showing the video streams

The following examples for showing video streams will be based on the assumption of a view controller having the following properties:
[block:code]
{
  "codes": [
    {
      "code": "@interface MyViewController : UIViewController\n\n@property (weak, nonatomic) IBOutlet UIView *remoteVideoView;\n@property (weak, nonatomic) IBOutlet UIView *localVideoView;\n\n@end",
      "language": "objectivec"
    }
  ]
}
[/block]
### Showing a preview of the local video stream
[block:code]
{
  "codes": [
    {
      "code": "- (void)viewDidLoad {\n  [super viewDidLoad];\n\n  id<SINVideoController> videoController = ... // get video controller from SINClient.\n\n  [self.localVideoView addSubview:[self.videoController localView]];\n}",
      "language": "objectivec"
    }
  ]
}
[/block]
### Showing remote video streams

Once you have created a `SINCallClientDelegate` and added it to a call, the method `callDidAddVideoTrack:` will be called.
[block:code]
{
  "codes": [
    {
      "code": "- (void)callDidAddVideoTrack:(id<SINCall>)call {\n  id<SINVideoController> videoController = ... // get video controller from SINClient.\n\n  // Add the video views to your view hierarchy\n  [self.remoteVideoView addSubview:[videoController remoteView]];\n}",
      "language": "objectivec"
    }
  ]
}
[/block]
### Pausing video stream

To pause the local video stream, use the `pauseVideo` method on the call.
[block:code]
{
  "codes": [
    {
      "code": "// Pause the video stream.\n[call pauseVideo];",
      "language": "objectivec"
    }
  ]
}
[/block]
### Resuming video stream
To resume the local video stream, use the `resumeVideo` method on the call.
[block:code]
{
  "codes": [
    {
      "code": "// Resume the video stream.\n[call resumeVideo];",
      "language": "objectivec"
    }
  ]
}
[/block]
### Pausing video stream delegates

Once you have created a `SINCallClientDelegate` and added it to a call, the method `callDidPauseVideoTrack:` will be called when the remote user pause the video stream.
[block:code]
{
  "codes": [
    {
      "code": "- (void)callDidPauseVideoTrack:(id<SINCall>)call {\n  // Implement what to be done when remote user pause video stream.",
      "language": "objectivec"
    }
  ]
}
[/block]
### Resuming video stream delegates

Once you have created a `SINCallClientDelegate` and added it to a call, the method `callDidResumeVideoTrack:` will be called when the remote user resumes the video stream.
[block:code]
{
  "codes": [
    {
      "code": "- (void)callDidResumeVideoTrack:(id<SINCall>)call {\n  // Implement what to be done when remote user resumes video stream.",
      "language": "objectivec"
    }
  ]
}
[/block]
### Video content fitting and aspect ratio

How the rendered video stream is fitted into a view can be controlled by the regular `-[UIView contentMode]` property. I.e. assigning `contentMode` on a view returned by `-[SINVideoController remoteView]` or `-[SINVideoController localView]` will affect how the video content is laid out. Note though that only `UIViewContentModeScaleAspectFit` and `UIViewContentModeScaleAspectFill` will be respected.
[block:code]
{
  "codes": [
    {
      "code": "id<SINVideoController> videoController;\nvideocontroller.remoteView.contentMode = UIViewContentModeScaleAspectFill;",
      "language": "objectivec",
      "name": "Example"
    }
  ]
}
[/block]
### Full screen

The Sinch SDK provides helper functions to transition a video view into fullscreen mode. These are provided as Objective-C category methods for the `UIView` class and are defined in `SINUIView+Fullscreen.h` (*SINUIViewFullscreenAdditions*).
[block:code]
{
  "codes": [
    {
      "code": "- (IBAction)toggleFullscreen:(id)sender {\n    id<SINVideoController> videoController = ... // get video controller from SINClient.\n\n    UIView *view = videoController.remoteView;\n\n    if ([view sin_isFullscreen]) {\n      view.contentMode = UIViewContentModeScaleAspectFit;\n      [view sin_disableFullscreen:YES]; // Pass YES to animate the transition\n    } else {\n      view.contentMode = UIViewContentModeScaleAspectFill;\n      [view sin_enableFullscreen:YES];  // Pass YES to animate the transition\n    }\n  }",
      "language": "objectivec",
      "name": "Example"
    }
  ]
}
[/block]
### Accessing video frames of the remote streams

The Sinch SDK provides developers a callback to access the video frames of the remote streams. So you can process the video frames with your own implementation to achieve rich functionalities, e.g., applying filters, adding stickers to the video frames, or saving the video frame as an image.

Your video frame handler needs to conform `SINVideoFrameCallback` protocol by implementing the `onFrame:` callback. Note that you need to explicitly release the video frame by calling `[videoFrame releaseFrame]`.
[block:code]
{
  "codes": [
    {
      "code": "// YourVideoFrameHandler.h\n// Conform SINVideoFrameCallback protocol\n@interface YourVideoFrameHandler : NSObject<SINVideoFrameCallback>\n    ... // Handler specific declarations\n@end\n```\n\n``` sourceCode objectivec\n// YourVideoFrameHandler.m\n// Implement onFrame: callback\n@implementation YourVideoFrameHandler\n- (void)onFrame:(id<SINVideoFrame>)videoFrame callId:(NSString *)callId {\n  ... // Process videoFrame\n  [videoFrame releaseFrame]; // Release videoFrame\n}\n@end",
      "language": "objectivec",
      "name": "Example"
    }
  ]
}
[/block]
Use `-[SINVideoController setVideoFrameCallback:]` to register your video frame handler as the callback to receive video frames.

[block:code]
{
  "codes": [
    {
      "code": "YourVideoFrameHandler* videoFrameHandler;\nid<SINVideoController> videoController = ... // Get video controller from SINClient.\n[videoController setVideoFrameCallback: videoFrameHandler];",
      "language": "objectivec"
    }
  ]
}
[/block]
### Converting video frame to UIImage

The Sinch SDK provides helper functions to convert `id<SINVideoFrame>` to `UIImage*`. It is handy to get the `UIImage` representation of `SINVideoFrame` by calling function `SINUIImageFromVideoFrame()`. Note that the helper function will *NOT* release the video frame.
[block:code]
{
  "codes": [
    {
      "code": "#import \"SINVideoController.h\" // To use SINUIImageFromVideoFrame()\n\nid<SINVideoFrame> videoFrame = ... // Get SINVideoFrame from onFrame: callback\nUIImage *image = SINUIImageFromVideoFrame(videoFrame);",
      "language": "objectivec"
    }
  ]
}
[/block]