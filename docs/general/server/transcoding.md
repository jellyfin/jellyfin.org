---
uid: server-transcoding
title: Transcoding
---

# Transcoding

These settings will relate to backend options that modify how the server transcodes media. Some improve or change the media quality while others reduce the resources required to transcode the media from its original format.

## Hardware Acceleration

If your hardware supports this you can enable [hardware acceleration](xref:admin-hardware-acceleration) for much faster transcoding. Some of the supported methods are listed below.

* VAAPI
* NVENC

## Thread Count

This option will manually set the amount of threads to use when transcoding. If you're not using the server for anything else it's best to leave this option alone.

## Types of Transcoding

There are three types of transcoding. The type being used will be listed in the dashboard when playing a file. They are ordered below from lowest to highest load on the server:

* Direct Play: Delivers the file with no modifications. Almost no additional load on the server.
* Remux: Changes the container but leaves both audio and video streams untouched.
* Direct Stream: Transcodes audio but leaves original video untouched.
* Transcode: Transcodes the video stream.
