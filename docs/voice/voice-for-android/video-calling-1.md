---
title: "Video Calling"
excerpt: ""
---
## Setting up a video call

Just like audio calls, video calls are placed through the `CallClient` and events are received using the `CallClientListener`. The call client is owned by the SinchClient and accessed using `sinchClient.getCallClient()`. Calling is not enabled by default. For a more general introduction to calling with the SinchClient, see `here <androidcalling>`.

## Showing the video streams

Once you have created a `VideoCallListener` and added it to a call, the `onVideoTrackAdded()` method will be called.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onVideoTrackAdded(Call call) {\n    // Get a reference to your SinchClient, in the samples this is done through the service interface:\n    VideoController vc = getSinchServiceInterface().getVideoController();\n    View myPreview = vc.getLocalView();\n    View remoteView = vc.getRemoteView();\n\n    // Add the views to your view hierarchy\n    ...\n}",
      "language": "java"
    }
  ]
}
[/block]
After the call has ended, don’t forget to remove the views from your view hierarchy again.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onCallEnded(Call call) {\n    // Remove Sinch video views from your view hierarchy\n}",
      "language": "java"
    }
  ]
}
[/block]
### Pausing video stream

To pause the local video stream, use the `pauseVideo()` method on the call.
[block:code]
{
  "codes": [
    {
      "code": "// User pause the video stream \ncall.pauseVideo();",
      "language": "java"
    }
  ]
}
[/block]
### Resuming video stream

To resume the local video stream, use the `resumeVideo()` method on the call.
[block:code]
{
  "codes": [
    {
      "code": "// User resumes the video stream \ncall.resumeVideo();",
      "language": "java"
    }
  ]
}
[/block]
### Pausing video stream delegates

Once you have created a `VideoCallListener` and added it to a call, the `onVideoTrackPaused()` method will be called when the remote user pause the video stream.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onVideoTrackPaused(Call call) {\n     // Implement what to be done when remote user pause video stream.\n}",
      "language": "java"
    }
  ]
}
[/block]
### Resuming video stream delegates

Once you have created a `VideoCallListener` and added it to a call, the `onVideoTrackResumed()` method will be called when the remote user resumes the video stream.
[block:code]
{
  "codes": [
    {
      "code": "@Override\npublic void onVideoTrackResumed(Call call) {\n     // Implement what to be done when remote user resumes video stream.\n}",
      "language": "java"
    }
  ]
}
[/block]
### Video content fitting and aspect ratio

How the remote video stream is fitted into a view can be controller by the `setResizeBehaviour()` method with possible arguments `VideoScalingType.ASPECT_FIT`, `VideoScalingType.ASPECT_FILL` and `VideoScalingType.ASPECT_BALANCED`. The local preview will always use `VideoScalingType.ASPECT_FIT`.

### Switching capturing device

The capturing device can be switched using `videoController.setCaptureDevicePosition(int facing)` with possible values `Camera.CameraInfo.CAMERA_FACING_FRONT` and `Camera.CameraInfo.CAMERA_FACING_BACK`. Use `videoController.toggleCaptureDevicePosition()` to alternate the two.

### Accessing video frames of the remote streams

The Sinch SDK can provide access to raw video frames via a callback function. This callback can be used to achieve rich functionality such as applying filters, adding stickers to the video frames, or saving the video frame as an image.

Your video frame handler needs to implement `VideoFrameListener` interface by implementing the `onFrame()` callback. Note that it is important to explicitly release the video frame by calling `release()`.

Example:
[block:code]
{
  "codes": [
    {
      "code": "import com.sinch.android.rtc.video.VideoFrame;\nimport com.sinch.android.rtc.video.VideoFrameListener;\n\npublic class YourVideoFrameHandler implements VideoFrameListener {\n    public synchronized void onFrame(String callId, VideoFrame videoFrame) {\n    ... // Process videoFrame\n    videoFrame.release(); // Release videoFrame\n    }\n}",
      "language": "java"
    }
  ]
}
[/block]
Use `setVideoFrameListener()` to register your video frame handler as the callback to receive video frames.

Example:
[block:code]
{
  "codes": [
    {
      "code": "YourVideoFrameHandler videoFrameHandler = new YourVideoFrameHandler();\nVideoController vc = getSinchServiceInterface().getVideoController();\nvc.setVideoFrameListener(videoFrameHandler);",
      "language": "java"
    }
  ]
}
[/block]
### Converting video frame from I420 to NV21

The Sinch SDK provides a helper function to convert the default I420 frame to NV21 Frame, which is handy to work with when you need to save it as an image on Android. Use `VideoUtils.I420toNV21Frame(VideoFrame)` for the conversion. Note that this helper does *NOT* release the original I420 video frame.

Example:
[block:code]
{
  "codes": [
    {
      "code": "import com.sinch.android.rtc.video.VideoUtils; // To use I420toNV21Frame\n\nVideoFrame videoFrame = ... // Get the video frame from onFrame() callback\nVideoFrame nv21Frame = VideoUtils.I420toNV21Frame(videoFrame);\n\nYuvImage image = new YuvImage(nv21Frame.yuvPlanes()[0].array(),\n                              ImageFormat.NV21,\n                              nv21Frame.width(),\n                              nv21Frame.height(),\n                              nv21Frame.yuvStrides());",
      "language": "java"
    }
  ]
}
[/block]