---
uid: server-quick-connect
title: Quick Connect
---

# Quick Connect

Starting with Jellyfin server version 10.7.0 and on **clients that support Quick Connect**, you can use it to sign into your account without the need of a password. You need to previously be logged into a supported client, like the default Jellyfin Web Client.

## Enabling Quick Connect

To use Quick Connect, the Jellyfin server admin has to enable this feature in the server dashboard.

Settings > Dashboard > General > Enable Quick Connect on this server

## Using Quick Connect

The sign in page of the client has a "**Use Quick Connect**" button which will generate a 6 digit code, take note of the code.

![image](https://user-images.githubusercontent.com/12074633/115973542-c99ed480-a523-11eb-9d61-17ccd628e123.png)


To sign in to a supported client, you have to enter the Quick Connect code in your user settings where you are already logged on.
Click your profile picture on the top right and the quick connect dialog is the second item on the settings page.

Settings > Quick Connect

![Quick Connect sign in](https://user-images.githubusercontent.com/12074633/115973526-aecc6000-a523-11eb-9ed6-59bee41bac7b.png)

If the code is validated successfully, your new device will be signed in without entering your Jellyfin username or password on the new device.

The client that support Quick Connect will generate a 6 digit code, which you have to enter in the already signed in client in your user settings.