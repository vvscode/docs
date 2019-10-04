---
title: "Postback Notifications"
excerpt: ""
---
When an MMS is saved, the system will generate a Postback notification and unlock MMS for further use. If an MMS contain audio/video, Postback will be sent when the encoding of the MMS audio/video is finished, otherwise Postback notification will be sent instantly. Below is an example of Postback notification when an MMS is saved successfully:

**saveMMS Postback notification**
```xml
<POSTBACK>
    <ORIGIN>MMS_MT</ORIGIN>
    <CODE>N003</CODE>
    <MMSID>35674</MMSID>
</POSTBACK>
```


If there was an error encoding the MMS audio/video, the system will generate a notification:

**saveMMS error Postback Notification**
```xml
<POSTBACK>
    <ORIGIN>MMS_MT</ORIGIN>
    <CODE>E002</CODE>
    <MMSID>35674</MMSID>
    <AUDIONAME>http://www.yoursite.com/audio/1.mp3</AUDIONAME>
</POSTBACK>
```


## Special Considerations for saveMMS

  - The API SHALL reformat the content when necessary so that it can be delivered to the end users handset in the best possible way.
  - Delivery success takes precedence over audio and video content quality and occasionally the picture quality will be reduced to fit handset message size requirements.
  - Video SHALL be reduced in quality to fit delivery limitations and if it still does not fit it will be delivered as XHTML/SMS.
  - Each request MUST contain at least one slide which MAY contain text and/or image and/or video and/or audio and/or objects (vcard/ical/pdf/passbook).
  - The API SHALL support up to 80 characters in the MMS subject.
  - The API SHALL support up to 8 slides for each MMS submission.
  - The API SHALL NOT support multiple files of the same MIME type on the same slide.
  - Slides with image SHALL NOT support video but SHALL support audio.
  - Slides with audio SHALL NOT support video. Slides with video SHALL only support text.
  - Slides with text SHALL support up to 5000 characters in any slide.
  - Slide with vcard/ical/pdf/passbook object SHALL NOT support media type audio/video/image and vice-versa.
  - All slides MAY contain a duration for playback.
  - Default slide duration is 10 seconds.
  - Slide duration will be overwritten with the audio/video file duration after encoding is completed.
  - URLs provided MUST contain the full path to the mime files.
  - Slide Duration SHOULD NOT exceed 30 seconds.
  - MMS subject is required.
  - MMS containing audio/video can be used only when audio/video encoding is completed.
  - After submission you will not be given a successful acknowledgement of audio/video encoding when a message is submitted
  - The HTTP status of audio/video encoding after it has been completed will be sent to your Postback URL.
  - Supported Media: TEXT/PLAIN, GIF/JPG/PNG, MP3/WAV, 3GP, MP4, MPEG, MPG, AVI, WMV.
  - There is a maximum source file size for each supported source file submitted.
  - You can find out what the current maximum is by visiting your API settings.
  - MMS messages are delivered in B64 encoding To estimate the final size of Base64-encoded binary data multiply the filesize by 1.37 times the original data size + 814 bytes (for headers).

<a class="gitbutton pill" target="_blank" href="https://github.com/sinch/docs/blob/master/docs/mms/xml-service/postback-notifications.md">
                        <span class="icon medium">
                            <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>GitHub icon</title><path d="M 12 0.297 c -6.63 0 -12 5.373 -12 12 c 0 5.303 3.438 9.8 8.205 11.385 c 0.6 0.113 0.82 -0.258 0.82 -0.577 c 0 -0.285 -0.01 -1.04 -0.015 -2.04 c -3.338 0.724 -4.042 -1.61 -4.042 -1.61 C 4.422 18.07 3.633 17.7 3.633 17.7 c -1.087 -0.744 0.084 -0.729 0.084 -0.729 c 1.205 0.084 1.838 1.236 1.838 1.236 c 1.07 1.835 2.809 1.305 3.495 0.998 c 0.108 -0.776 0.417 -1.305 0.76 -1.605 c -2.665 -0.3 -5.466 -1.332 -5.466 -5.93 c 0 -1.31 0.465 -2.38 1.235 -3.22 c -0.135 -0.303 -0.54 -1.523 0.105 -3.176 c 0 0 1.005 -0.322 3.3 1.23 c 0.96 -0.267 1.98 -0.399 3 -0.405 c 1.02 0.006 2.04 0.138 3 0.405 c 2.28 -1.552 3.285 -1.23 3.285 -1.23 c 0.645 1.653 0.24 2.873 0.12 3.176 c 0.765 0.84 1.23 1.91 1.23 3.22 c 0 4.61 -2.805 5.625 -5.475 5.92 c 0.42 0.36 0.81 1.096 0.81 2.22 c 0 1.606 -0.015 2.896 -0.015 3.286 c 0 0.315 0.21 0.69 0.825 0.57 C 20.565 22.092 24 17.592 24 12.297 c 0 -6.627 -5.373 -12 -12 -12" /></svg>
                        </span>
                        Edit on GitHub!</a>