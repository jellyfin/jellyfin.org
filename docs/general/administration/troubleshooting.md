---
uid: admin-troubleshoot
title: Troubleshooting
---

# Troubleshooting

This page outlines some solutions to common issues beginners may encounter when running a Jellyfin server.

## Playback Issues

The easiest way to check for issues is by checking the logs, which can be accessed through the console for the web client or in the log directory on your server.

If media is unable to transcode, first check the ffmpeg logs.

## Networking Issues

If you can access the web interface over HTTP but not HTTPS, then you likely have an error with the certificate.
Jellyfin uses a PFX file to handle HTTPS traffic.
If you created the file with a password, then you will have to enter that value on the **Networking** page in the settings.

If you can access the server locally but not outside of your LAN, then you likely have an issue with the router configuration.
Check the port forwarding settings on your router to ensure the server is visible from outside your local network.
You can also enable the "Enable automatic port mapping" option on the **Networking** page of the server settings to have the server attempt to configure port forwarding on the router automatically if your router supports it.

If there are no logs at all relating to web traffic, even over a LAN connection, then the server hasn't been reached at all yet.
This would indicate either an incorrect address or an issue somewhere else on the network.

## Debug Logging

To enable much more verbose debug logging, it is currently required to manually edit a configuration file, since Jellyfin does not yet have an option to enable debug functionality within the frontend UI.

To make this change, go to the [Jellyfin configuration directory](/docs/general/administration/configuration#configuration-directory) and find the `logging.json` file if it exists, or create the file if it does not. Debug logging is then enabled by changing the minimum logging level to debug as in the example below. If `logging.json` already exists and contains existing keys, the `"MinimumLevel"` key should be added to the `"Serilog"` object as seen in the example. If `logging.json` does not already exist, or if it is empty, a configuration containing only the following example structure will enable debug logging.

```json
{
  "Serilog": {
    "MinimumLevel": "Debug"
  }
}
```

Debug messages appear in the log with the `DBG` tag prefixed to each line.

:::note

If the `logging.json` file existed before the last server start, Jellyfin will automatically reload the new configuration, once the change is made, without needing to restart. If the `logging.json` file was created after the last server start, a server restart will be required before the changes enabling debug logging will take effect.

:::

Once the need for verbose logging has passed, debug logging can be disabled by changing the `"MinimumLevel"` key in `logging.json` to `"Information"`, as in the example below, in order to restore the default logging level. It is not necessary to delete the `logging.json` configuration after debugging is complete.

```json
{
  "Serilog": {
    "MinimumLevel": "Information"
  }
}
```

## Real Time Monitoring

This will let Jellyfin automatically update libraries when files are added or modified.
Unfortunately, this feature is only supported on certain filesystems.

For Linux systems, this is performed by [inotify](https://en.wikipedia.org/wiki/Inotify).
NFS and rclone do not support inotify, but support can be provided by using a union file system such as [mergerfs](https://github.com/trapexit/mergerfs) with your networked file systems.

Due to the library size, you can receive an error such as this:

```log
[2019-12-31 09:11:36.652 -05:00]  [ERR] Error in Directory watcher for: "/media/movies"  System.IO.IOException: The configured user limit (8192) on the number of inotify watches has been reached.
```

If you are running Debian, RedHat, or another similar Linux distribution, run the following in a terminal:

```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl -p
```

If you are running ArchLinux, run the following command instead:

```sh
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```

Then paste it in your terminal and press on enter to run it. For Docker, this needs to be done on the host, not the container.
See [here](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers) for more information.

## Uninstalling Jellyfin on MacOS

To fully remove all data of Jellyfin from MacOS, run these commands:

```bash
rm -Rfv ~/.config/jellyfin
rm -Rfv ~/.cache/jellyfin
rm -Rfv ~/.local/share/jellyfin
```

## Unlock locked user account

When the admin account is locked out and the Forgot Password feature is not working, you have to unlock the user manually.
To do that, you need to find the `jellyfin.db` file on your system.
The default location on Linux is: `/var/lib/jellyfin/data/`.
For paths in other environments, see [server paths](/docs/general/administration/configuration#server-paths).

### Linux CLI

Before continuing, make sure that you have sqlite3 installed.
When sqlite3 is not installed, you can install it under Debian based systems with `apt install sqlite3`.
After that do the following commands/SQL query:

```bash
sqlite3 /PATH/TO/JELLYFIN/DB/jellyfin.db
```

```sql
UPDATE Users SET InvalidLoginAttemptCount = 0 WHERE Username = 'LockedUserName';
UPDATE Permissions SET Value = 0 WHERE Kind = 2 AND UserId IN (SELECT Id FROM Users WHERE Username = 'LockedUserName');
.exit
```

### SQLiteBrowser

It is also possible to use [SQLiteBrowser](https://sqlitebrowser.org) on systems with a desktop environment.
Start by opening the database inside the SQLite Browser.
After opening the database, navigate to the Execute SQL Tab and execute the following query:

```sql
UPDATE Users SET InvalidLoginAttemptCount = 0 WHERE Username = 'LockedUserName';
UPDATE Permissions SET Value = 0 WHERE Kind = 2 AND UserId IN (SELECT Id FROM Users WHERE Username = 'LockedUserName');
```
## Fix Admin User Permissions
If the Permissions for your Admin Account break, you can Restore them using simple SQL Queries.

:::caution
Manual changes to the database can destroy your Instance beyond repair. to prevent this create a copy of your database before executing:
`cp /PATH/TO/JELLYFIN/DB/jellyfin.db  /PATH/TO/JELLYFIN/DB/jellyfin.db.bck`
:::

Before continuing, make sure that you have sqlite3 installed.
When sqlite3 is not installed, you can install it under Debian based systems with `apt install sqlite3`.
After that do the following commands/SQL query:
```bash
sqlite3 /PATH/TO/JELLYFIN/DB/jellyfin.db
```

### Get an Overview
To see all your current permissions for all users, you can run the following Query:

```sql
select Permissions.Value,Permissions.Kind,Users.Username  from Permissions Inner Join Users on Permissions.UserID = Users.Id;
```
To just check Permissions on your Admin Account, run the following Query:
```sql
select Value,Kind from Permissions WHERE UserId IN (SELECT Id FROM Users WHERE Username = 'AdminUsername');
```
<br />

The first row with an value of 1 or 0 shows if the permission is assigned or not. The second row displays the Kind of permission. To get a summary for every permission you can look [here](https://github.com/jellyfin/jellyfin/blob/master/Jellyfin.Data/Enums/PermissionKind.cs)


### Repair Permissions

:::note
Not all permissions are needed, you can remove the unnecessary ones later in the Web UI.
:::
```sql
UPDATE Permissions SET Value = 1 WHERE (Kind = 0 or Kind = 3 or Kind = 4 or Kind = 5 or Kind = 6 or Kind = 7 or Kind = 8 or Kind = 9 or Kind = 10 or Kind = 11 or Kind = 12 or Kind = 13 or Kind = 14 or Kind = 15 or Kind = 16 or Kind = 17 or Kind = 18 or Kind = 19 or Kind = 20 or Kind = 21) AND UserId IN (SELECT Id FROM Users WHERE Username = 'AdminUsername');

.exit
```
