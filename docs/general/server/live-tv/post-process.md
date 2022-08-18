---
uid: server-live-tv-post-process
title: Live TV Post Processing
---

# Live TV Post Processing

## Recording Post Processing

Jellyfin supports Post Processing of recorded Live TV shows. This can be used to transcode the recording to a specific format that does not require transcoding on the fly when playing back, extract subtitles, remove commercials, and more.

> [!NOTE]
> There are several different ways to set up your post-processing script, and this largely will need to be changed to your individual use case.
>
>Described below is one way to do post processing, there may be other ways (other ways may be more efficient, too) to run your post-processor.

Mess around with this to change to your needs. Search around, post questions to the [Jellyfin Reddit Forum](https://www.reddit.com/r/jellyfin) or elsewhere, and others may be able to help. Logging is your friend! Make sure your script(s) logs adequately to a file or elsewhere in order to troubleshoot any issues you may encounter, as any output to stdout/stderror will not be seen in the Jellyfin logs.

## Jellyfin Dashboard/DVR/Recording Post Processing Settings

Jellyfin runs the script you specify in the Admin Dashboard DVR settings with a command line parameter of the filepath automatically when recording finishes.

In Jellyfin Dashboard/DVR/Recording Post Processing settings:

Set "Post-processing application" to your shell script which calls your actual post processor (details of this 'actual' post processor script below). In this example, that would be `/path/to/run_post_process.sh`

Set "Post-processor command line arguments" to `"{path}"`.

![Live TV post process DVR Settings](~/images/live-tv-post-process_dvr-settings.png)

With the settings above, the server executes this command when running the post processor:

````bash
"/path/to/run_post_process.sh" "\"/path/to/LiveTV/Shows/Series/Season/Episode.ts\""
````

## Run Post Processor Shell Script (to be run directly by Jellyfin Server)

Quote interpretation is one of the hardest things to manage when using a post-processor script. Because of this, one easy way to run your post-processor is to have Jellyfin start a "runner" shell script, which then calls your actual post-processor script. This shell script then can be put into Jellyfin settings, and have a "clean" shell environment where it is easier to configure, look at logs, and more.

In the sample script below:

- Logging is enabled, and a logfile is created at some location accessible by your Jellyfin instance.
- The first command line argument, `$1` is written to the logfile (majorly for debugging purposes). This argument will be a path to the show to be post-processed. This argument is in the format of `/path/to/LiveTV/Shows/Series/Season/Episode.ts`
- The actual post processor Python script `record_post_process.py` is then called with s command line argument of the file name.

### An example `run_post_processor.sh` script

[GitHub Gist link to `run_post_processor.sh`](https://gist.github.com/AndrewBreyen/0fc36c868486d48583a369b657e22c69)

````bash
#!/bin/sh
exec > "/path/to/logging/directory/logs/$(date +"%Y-%m-%d_%H-%M-%S")-run_post_process-sh.log" 2>&1
echo $1
/usr/local/bin/python3 /path/to/record_post_process.py "$1"
````

## Post Processor Python Script (to be run by `run_post_processor.sh`)

In this example, a python script is where it all goes down. I chose to use Python primarilly because of how adaptable it is, and various third party extensions and packages that make it ideal for a post-processing script. This script can be customized to fit your individual requirements.

In the sample script:

- Logging is enabled, and a logfile is created at some location accessible by your Jellyfin instance.
- Command line arguments are checked, if no argument provided, script exits.
- Variables are determined for things such as the full non-transcoded file path, the basename, the file to be transcoded with extension, transcoded file name and path, and more.
- FFMPEG command is created and ran.
  - In this example, the `h264_videotoolbox` video codec is used, and the audio is copied from source. Change the ffmpeg command to fit your requirements.
- Nontranscoded file is moved out of the Series/Season directory, into a folder not accessible by Jellyfin, called OLDFILES (This portion could also be configured to delete the non-transcoded file)

### An example `record_post_process.py` script

This script is too much to post here, so a link to a GitHub Gist is provided.
Comments are listed that describes what each section does.

[GitHub Gist Link to `record_post_process.py`](https://gist.github.com/AndrewBreyen/1ac109bb485d8523e28fe98b3a222602)

## Diving Deeper

Once you have post processing working in a basic format, there is loads more that can be done!

Some ideas:

- [Commercial Skipping with comskip](https://www.reddit.com/comments/jvzxnd/comment/hh6zwdn/)
- Post transcode progress to a Slack/Discord channel for notifications when transcoding starts/finishes
