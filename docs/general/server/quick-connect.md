---
uid: server-quick-connect
title: Quick Connect
---

# Quick Connect

**Quick Connect** is a feature that allows users to sign in to clients **without entering a username or password**. Instead, a temporary **Quick Connect code** is generated and used to authorize login from an already authenticated client.

This feature streamlines the sign-in process, especially on devices with limited input options (like TVs or set-top boxes). Because it is part of the Jellyfin API, both first- and third-party clients can support it.

## Disabling Quick Connect (Server)

By default, Quick Connect is enabled.
To disable it, follow these steps:

1. Go to the **Admin Dashboard** on your Jellyfin server.  

    `Settings` > `Dashboard`
2. Navigate to the **General** Tab
3. Uncheck the box:  
   ✅ **Enable Quick Connect on this server**

## Supported Clients

Quick Connect functionality is supported in two contexts:

| Client               | Log In | Authorize Others |
|----------------------|--------|------------------|
| JellyCon             | ✅     | ❌               |
| Jellyfin Android     | ✅     | ✅               |
| Jellyfin Android TV  | ✅     | ❌               |
| Jellyfin Kodi        | ❌     | ❌               |
| Jellyfin Media Player| ✅     | ✅               |
| Jellyfin Mobile (iOS)| ✅     | ✅               |
| Jellyfin MPV Shim    | ❌     | ❌               |
| Jellyfin Roku        | ✅     | ❌               |
| Jellyfin UWP         | ✅     | ✅               |
| Jellyfin Vue         | ❌     | ❌               |
| Jellyfin Web         | ✅     | ✅               |
| Jellyfin WebOS       | ✅     | ✅               |
| Swiftfin (iOS)       | ✅     | ✅               |
| Swiftfin (tvOS)      | ✅     | ❌               |

## Using Quick Connect

The Quick Connect process involves two devices:

- **Device A**: A new client where you want to log in.
- **Device B**: An already authenticated client (such as your browser, phone, etc.).

### On Device A (New Device - the one you want to log into)

1. Open the Jellyfin client and choose **Quick Connect** (usually found on the login screen).
    On some clients, you will first need to press **Manual Login**; others may display the quick-connect code directly.
2. A **6-character code** will be displayed. Keep this screen open.

![Quick Connect code example](/images/docs/server/quick-connect/quick-connect-code.png)

### On Device B (Already Logged-In Device)

1. Open Jellyfin and go to:  
   `Settings` > `Quick Connect`
2. Enter the 6-character code from Device A and confirm.
3. If successful, Device A will be logged in automatically—no need to enter a username or password.

![Quick Connect code entry screen](/images/docs/server/quick-connect/quick-connect-entry.png)

> If the code is invalid or expired, you will see an error message and must try again.
