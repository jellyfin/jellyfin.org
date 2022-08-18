---
uid: server-live-tv-index
title: Live TV
---

# Live TV

Jellyfin allows you to watch and record live television using supported hardware.  The first step is setting up a tuner to send data to Jellyfin, and then configure a source for the program guide data.

[Click here](xref:server-live-tv-setup-guide) for the general setup guide.

## Tuner

Jellyfin has support for the following tuners:

* HDHomeRun
* M3U

HDHomeRun is a special case because they will usually get detected automatically by the server. Otherwise you can manually add tuners by navigating to **Live TV** in the settings and adding one there.

> [!NOTE]
> Docker users using HDHomeRun devices should set networking to host mode as Jellyfin needs to connect to a changing UDP port.

M3U allows you to add IPTV channel playlists which you can view and record.

Additional tuner types are available via plugins.

## Guide

Guide data will need to be mapped to their corresponding channels after a guide data provider is configured. The guide data formats below are included with the server:

* Schedules Direct
* XMLTV

[Schedules Direct](http://www.schedulesdirect.org) is a paid service providing electronic program guide data to the United States and Canada.

[XMLTV](http://wiki.xmltv.org/index.php/Main_Page) is "... an XML based file format for describing TV listings. IPTV providers use XMLTV as the base reference template in their systems, and extend it internally according to their business needs."

## Status

You can view the status of each tuner connected to the server in the settings. There are also buttons to manually refresh the tuners if they experience problems.

The guide data can be refreshed manually if you run into problems. This isn't normally required since the data is refreshed periodically.
