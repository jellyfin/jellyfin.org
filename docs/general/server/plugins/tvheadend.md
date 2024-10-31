---
uid: server-plugins-tvheadend
title: TVHeadend
---

# TVHeadend

The objective of the guide is to configure the Jellyfin TVHeadend plugin to backend a TVHeadend server.

## Requirements

- TVHeadend server
- Jellyfin server
- TVHeadend plugin installed in Jellyfin

## Configuration

<!-- markdownlint-disable MD029 ol-prefix -->

1. Create a user for Jellyfin in TVHeadend: it is convenient to create a specific user for Jellyfin.
   - Go to Configuration > Users > Access Entries > Add
   - Give the user parameters
     - Enabled: ✔
     - Username: _Username_ (for example: Jellyfin)
     - Change parameters: Rights,Channel number range,Channel tags,DVR configurations,Streaming profiles,Connection limits
     - Web interface: ✔
     - Streaming: Basic,Advanced,HTSP
     - Video recoder: Basic,HTSP,View all
     - (Optional) Comment: Comment for the user (for example: User used by Jellyfin)
     - (Optional) Allowed networks: _Network address with network mask to allow_ (for example 127.0.0.1/32)
     - Press Save
   - Go to Configuration > Users > Passwords > Add
   - Give the user parameters
     - Enabled: ✔
     - Username _The user created previously_ (for example: Jellyfin)
     - Password: _The password for the user created previously_ (for example: Jellyfin_password)
     - Press Save

:::note

The parameters Change parameters, Streaming and Video recoder must be marked as shown. Otherwise, Jellyfin can connect to TVHeadend but problems may arise when reproducing the content.

:::

2. Adjust the Jellyfin TVHeadend plugin to establish the connection.
   - Go to Dashboard > Plugins > TVHeadend > Settings
   - Provide creator access data previously:
     - TVHeadend Hostname or IP Address: _IP address of the TVHeadend server_ (for example: 127.0.0.1)
     - Username: _The user created previously_ (for example: Jellyfin)
     - Password: _The password created previously_ (for example: Jellyfin_password)

:::note

By default the _TVHeadend Hostname or IP Address_ section is configured by default with the hostname _localhost_, it is preferable to use the IP address _127.0.0.1_ instead of _localhost_. [Reference](https://emby.media/community/index.php?/topic/55768-tv-headend-plugin-where-does-it-store-data/#entry542181)

:::

3. Configure the channels for viewing in Jellyfin: even if Jellyfin manages to connect to TVHeadend, the guide will not be synchronized because there has to be a number assigned to the channels in TVHeadend. [Reference](https://emby.media/community/index.php?/topic/64583-no-channels-with-tvheadend-plugin/#entry642268)

   - Manual mode
     - Go to Configuration > Channel/EPG > Channels
     - Select the channel to be changed and press Edit
     - In the option _Number_ we enter the number that we are going to assign to the channel (for example: 1), this number must be nonzero
     - Press save
   - Automatic mode
     - Go to Configuration > DVB Inputs > Networks
     - Select the network you want and press Edit
     - In the option _Channel numbers from_ we enter the number so we want the numbering of the channels to start (for example: 1), this number must be nonzero
     - Press save

4. Update the data from the TVHeadend guide to Jellyfin
   - Go to Dashboard > Live TV
   - Refresh guide data

<!-- markdownlint-enable MD029 ol-prefix -->

:::note

If the guide is not updated, restart the Jellyfin server.

:::

Once the update of the guide is finished, the Live TV will already be able to see the guide related to the synchronized channels and will be able to visualize the content.
