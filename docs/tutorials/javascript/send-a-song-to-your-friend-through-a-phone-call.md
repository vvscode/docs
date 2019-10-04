---
title: "Send a Song to Your Friend Through a Phone Call"
excerpt: "Learn how you can send a song to a friend or loved one using the Sinch JS SDK - It's quicker than you think! Sign up today and download the JS SDK now."
---
Last week, we sponsored [The Next Web](https://thenextweb.com/conference/) Hackathon in New York City. We met a developer, Herb, who had an idea to use the Deezer API to send a song to a friend over the phone. We couldn’t get it to work that weekend, but we’ve now figured it out. Here I’ll share with you how to manipulate the AudioStreams in the Sinch JS SDK. So, here you go, [Ivo](https://twitter.com/ilukac)\!

## Preparation

 1.  [Signup](https://portal.sinch.com/#/signup) for a Sinch account
 1.  Download the JS SDK from [here](https://sinch.readme.io/page/downloads)
 1.  Click ‘Create new app’
 1.  Name your app and click ‘Create’
 1.  Take note of your app key and secret as you will need them in a few minutes

## Time to code

First, add your favorite song to the folder. I’m adding [Something New](https://www.youtube.com/watch?v=BhJSsX5AKPI) by Axwell and Ingrosso and naming it `somethingnew.m4a`.

Open up `index.html` and add an audio element to the page just under the incoming tag:

```html
<audio id="song" src='somthingnew.m4a'></audio>
```

Open up the `SinchPSTNsample/PSTNSample.js` and enter your app key on line 24:

```javascript
sinchClient = new SinchClient({
    applicationKey: 'your appkey',
    capabilities: {calling: true},
    //supportActiveConnection: true, /* NOTE: This is only required if application is to receive calls / instant messages. */
    //Note: For additional logging, please uncomment the three rows below
    onLogMessage: function(message) {
        console.log(message);
    },
});
```

## Add mediastream with two channels

I want to play the song and be able to speak to my friend at the same time. The starting point for all HTML5 sound is the audio context, so let’s grab that first:

```javascript
/*** add your own mix stream***/
var audioCtx = new AudioContext();
```

Next, we want to create a dynamics compressor; this will level the volume on the track so you can hear the song and the speech. For more info about this see <http://www.w3.org/TR/webaudio/#DynamicsCompressorNode>.

```javascript
var compressor = audioCtx.createDynamicsCompressor();
```

Next, create a source for the song and the microphone and hook it up to a media destination:

```javascript
//this will be the stream we broadcast in our call.

var destination = audioCtx.createMediaStreamDestination();
var song = audioCtx.createMediaElementSource($('audio#song')[0]);
song.connect(compressor);

// get access to the mic, and connect that to the compressor
navigator.getUserMedia({video: false, audio: true}, function(stream) {
    var mic = audioCtx.createMediaStreamSource(stream);
    mic.connect(compressor);
    compressor.connect(destination);

}, function(error) {
        console.log(error);
});
```

We need to change the call function to broadcast our custom stream instead of just hooking up to the microphone.

Change `call = callClient.callPhoneNumber()` to this:

```javascript
call = callClient.callPhoneNumber($('input#phoneNumber').val(), {}, destination.stream);
```

We want to start playing the song as soon as the other party answers. In `onCallEstablished` add

```javascript
$('audio#song').trigger("play");
```

and in `onCallEnded` add

```javascript
$('audio#song').trigger("stop");
```

When running this, remember to fully quit Chrome and start with `--allow-file-access-from-files` like so:

**Windows**

    path/to/chrome yourfilename.html --allow-file-access-from-files

**Mac**

    open -a path/to/chrome yourfilename.html --args --allow-file-access-from-files

There you have it\! You can now play a song to a friend over the phone.

<div class="magic-block-html"><a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/tutorials/javascript/send-a-song-to-your-friend-through-a-phone-call.md"><span class="icon medium"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg></span>Edit on GitHub!</a></div>