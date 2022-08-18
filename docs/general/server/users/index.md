---
uid: server-users-index
title: Users
---

# Users

Many features are configurable for each user individually to allow administrators more granular control over a Jellyfin server. Keep in mind that Jellyfin users are entirely local and no information or metadata will ever be sent to remote servers during the login process.

## Basic Overview

### Administrators

To add another administrator you can simply check the box labeled `allow this user to manage the server` at the top of the user options. This will give someone full access to all pages and features on the site so be careful who gets access.

### Playback

You can allow transcoding for audio and video individually to prevent certain people from using too much system resources. There is also an option to enable video playback that doesn't require encoding. This is much less CPU intensive and will often fix playback issues on devices that don't support newer video formats.

### Deletion

Users can delete media from the library with this option, which will also remove them from the filesystem. If your server doesn't have write permission to the media files they will be removed temporarily but picked up on the next library scan. You can also enable this option for individual libraries.

### Locking/Unlocking

You can set a maximum of failed login attempts before a user gets locked out. This means that if a user tries to login but fails an x amount of times. The user will no longer be able to login until the server administrator manually unlocks the account.

### Other

If you disable a user they will be kicked off the server immediately and unable to login until the option is deselected. This is useful if you don't want to expose unused credentials on a public server but might want to keep the account around for a while. You can also hide a user from the login screen and require manual entry of both the username and password. This will prevent users from knowing what accounts have been created on the server when they login.

## Advanced Overview

For more in-depth information on all user settings, see [Managing Users](xref:server-users-managing).
