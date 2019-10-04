---
title: "Video Calling - Video API Android"
excerpt: ""
---
## Setting up a video call

Just like audio calls, video calls are placed through the `CallClient` and events are received using the `CallClientListener`. The call client is owned by the SinchClient and accessed using `sinchClient.getCallClient()`. Calling is not enabled by default.
For a more general introduction to calling with the SinchClient, see [here](doc:video-android-calling).

## Showing the video streams

Once you have created a `VideoCallListener` and added it to a call, the `onVideoTrackAdded()` method will be called.
```java
@Override
public void onVideoTrackAdded(Call call) {
    // Get a reference to your SinchClient, in the samples this is done through the service interface:
    VideoController vc = getSinchServiceInterface().getVideoController();
    View myPreview = vc.getLocalView();
    View remoteView = vc.getRemoteView();

    // Add the views to your view hierarchy
    ...
}
```


After the call has ended, don’t forget to remove the views from your view hierarchy again.
```java
@Override
public void onCallEnded(Call call) {
    // Remove Sinch video views from your view hierarchy
}
```


### Pausing video stream

To pause the local video stream, use the `pauseVideo()` method on the call.
```java
// User pause the video stream
call.pauseVideo();
```


### Resuming video stream

To resume the local video stream, use the `resumeVideo()` method on the call.
```java
// User resumes the video stream
call.resumeVideo();
```


### Pausing video stream delegates

Once you have created a `VideoCallListener` and added it to a call, the `onVideoTrackPaused()` method will be called when the remote user pause the video stream.
```java
@Override
public void onVideoTrackPaused(Call call) {
     // Implement what to be done when remote user pause video stream.
}
```


### Resuming video stream delegates

Once you have created a `VideoCallListener` and added it to a call, the `onVideoTrackResumed()` method will be called when the remote user resumes the video stream.
```java
@Override
public void onVideoTrackResumed(Call call) {
     // Implement what to be done when remote user resumes video stream.
}
```


### Video content fitting and aspect ratio

How the remote video stream is fitted into a view can be controller by the `setResizeBehaviour()` method with possible arguments `VideoScalingType.ASPECT_FIT`, `VideoScalingType.ASPECT_FILL` and `VideoScalingType.ASPECT_BALANCED`. The local preview will always use `VideoScalingType.ASPECT_FIT`.

### Switching capturing device

The capturing device can be switched using `videoController.setCaptureDevicePosition(int facing)` with possible values `Camera.CameraInfo.CAMERA_FACING_FRONT` and `Camera.CameraInfo.CAMERA_FACING_BACK`. Use `videoController.toggleCaptureDevicePosition()` to alternate the two.

### Accessing video frames of the remote streams

The Sinch SDK can provide access to raw video frames via a callback function. This callback can be used to achieve rich functionality such as applying filters, adding stickers to the video frames, or saving the video frame as an image.

Your video frame handler needs to implement `VideoFrameListener` interface by implementing the `onFrame()` callback. Note that it is important to explicitly release the video frame by calling `release()`.

Example:
```java
import com.sinch.android.rtc.video.VideoFrame;
import com.sinch.android.rtc.video.VideoFrameListener;

public class YourVideoFrameHandler implements VideoFrameListener {
    public synchronized void onFrame(String callId, VideoFrame videoFrame) {
    ... // Process videoFrame
    videoFrame.release(); // Release videoFrame
    }
}
```


Use `setVideoFrameListener()` to register your video frame handler as the callback to receive video frames.

Example:
```java
YourVideoFrameHandler videoFrameHandler = new YourVideoFrameHandler();
VideoController vc = getSinchServiceInterface().getVideoController();
vc.setVideoFrameListener(videoFrameHandler);
```


### Converting video frame from I420 to NV21

The Sinch SDK provides a helper function to convert the default I420 frame to NV21 Frame, which is handy to work with when you need to save it as an image on Android. Use `VideoUtils.I420toNV21Frame(VideoFrame)` for the conversion. Note that this helper does *NOT* release the original I420 video frame.

Example:
```java
import com.sinch.android.rtc.video.VideoUtils; // To use I420toNV21Frame

VideoFrame videoFrame = ... // Get the video frame from onFrame() callback
VideoFrame nv21Frame = VideoUtils.I420toNV21Frame(videoFrame);

YuvImage image = new YuvImage(nv21Frame.yuvPlanes()[0].array(),
                              ImageFormat.NV21,
                              nv21Frame.width(),
                              nv21Frame.height(),
                              nv21Frame.yuvStrides());
```


<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/video/video-for-android/video-android-video-calling.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>