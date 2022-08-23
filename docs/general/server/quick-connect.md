---
uid: server-quick-connect
title: Quick Connect
---

# Quick Connect

Starting with Jellyfin server version 10.7.0 and supported clients, you can use Quick Connect to sign in to your account without the need of a password. You need to previously be logged into a supported client, like the default Jellyfin Web Client.

## Enabling Quick Connect

To use Quick Connect, the Jellyfin server admin has to enable this feature in the server dashboard.

Settings > Dashboard > General > Enable Quick Connect on this server

## Using Quick Connect

To sign in to a supported client, you have to enter the Quick Connect code in your user settings.

Settings > Quick Connect

![image](https://user-images.githubusercontent.com/12074633/115973526-aecc6000-a523-11eb-9ed6-59bee41bac7b.png)

If the code is validated successfully, your new device will be signed in without entering your Jellyfin username or password on the new device.

The client will generate a 6 digit code, which you have to enter in the already signed in client in your user settings.

![image](https://user-images.githubusercontent.com/12074633/115973542-c99ed480-a523-11eb-9d61-17ccd628e123.png)
