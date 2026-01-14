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

If there are no logs at all relating to web traffic, even over a LAN connection, then the server hasn't been reached at all yet.
This would indicate either an incorrect address or an issue somewhere else on the network.

## Debug Logging

Debug logging can be very useful when troubleshooting issues. To enable debug logging, manually editing a configuration file is required as Jellyfin does not control this from the frontend UI.

Logging options can be configured in the file `logging.json` in the [Jellyfin configuration directory](/docs/general/administration/configuration#configuration-directory). On some platforms, there is also `logging.default.json` which provides default values which can then be overridden by a custom `logging.json`.

:::caution

Enabling debug logging will create a **very** large amount of output; as an example, simply loading the homepage will generate over 4000 lines of logs with the debug configuration below. Leaving debug logging enabled on a productive Jellyfin instance for a long period of time is not recommended, and it should be enabled only during troubleshooting.

:::

:::note

If you are requested to provide extensive debug logs in an issue or during troubleshooting (e.g. more than just a few lines), please compress the resulting log files if possible as they will be very large otherwise.

:::

To enable debug logging, create the `logging.json` file and add the following contents to it:

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Debug"
    }
  }
}
```

If a `logging.json` file already exists, edit the `Serilog` `MinimumLevel` section to match the above but do not change any other values in the file.

Debug messages will appear in the log with the `DBG` tag prefixed to each line, though some components will also log additional details at `INF` with this configuration.

:::note

If the `logging.json` file existed before the last server start, Jellyfin will automatically reload the new configuration, once the change is made, without needing to restart. If the `logging.json` file was created after the last server start, a server restart will be required before the changes enabling debug logging will take effect.

:::

To restore normal logging, you can remove the override `logging.json` (if you created a new file above) or restore the `logging.json` `Serilog` `MinimumLevel` section to its default values of:

```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    }
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

Then paste it in your terminal and press Enter to run it. For Docker, this needs to be done on the host, not the container.  
See the [Guard Listen README on increasing inotify watchers](https://github.com/guard/listen/blob/master/README.md#increasing-the-amount-of-inotify-watchers) for more information.

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

If the permissions for your admin account break, you can restore them using simple SQL queries.

:::caution
Manual changes to the database can destroy your instance beyond repair. to prevent this create a copy of your database before executing:
`cp /PATH/TO/JELLYFIN/DB/jellyfin.db  /PATH/TO/JELLYFIN/DB/jellyfin.db.bck`
:::

Before continuing, make sure that you have sqlite3 installed.
When sqlite3 is not installed, you can install it under Debian based systems with `apt install sqlite3`.
After that do the following commands/SQL query:  
You can find a list of default paths in the [configuration directory documentation](/docs/general/administration/configuration#configuration-directory).

```bash
sqlite3 /PATH/TO/JELLYFIN/DB/jellyfin.db
```

### Get an Overview

To see the current permissions for all users, you can run the following query:

```sql
SELECT Permissions.Value,Permissions.Kind,Users.Username  FROM Permissions INNER JOIN Users ON Permissions.UserID = Users.Id;
```

To just check permissions on your admin account, run the following query:  
_Please change `AdminUsername` to the username of your admin account_

```sql
SELECT Value,Kind FROM Permissions WHERE UserId IN (SELECT Id FROM Users WHERE Username = 'AdminUsername');
```

<br />
The first row with an value of 1 or 0 shows if the permission is assigned or not. For a summary of each permission type, see the [PermissionKind enumeration in the Jellyfin source code](https://github.com/jellyfin/jellyfin/blob/master/src/Jellyfin.Database/Jellyfin.Database.Implementations/Enums/PermissionKind.cs)

### Repair Permissions

:::note
Not all permissions are needed, you can remove the unnecessary ones later in the Web UI.
:::

```sql
UPDATE Permissions SET Value = 1 WHERE (Kind = 0 OR Kind = 3 OR Kind = 4 OR Kind = 5 OR Kind = 6 OR Kind = 7 OR Kind = 8 OR Kind = 9 OR Kind = 10 OR Kind = 11 OR Kind = 12 OR Kind = 13 OR Kind = 14 OR Kind = 15 OR Kind = 16 OR Kind = 17 OR Kind = 18 OR Kind = 19 OR Kind = 20 OR Kind = 21) AND UserId IN (SELECT Id FROM Users WHERE Username = 'AdminUsername');

.exit
```

## Text Not Rendering Properly

Text may show up as boxes ☐☐☐☐☐☐ if fonts for the characters are not available. Installing fonts for the affected languages can solve the problem. For library cover images, please install system fonts on the server system. For subtitles, the source of fonts depends on the client. Please refer to [Fonts](/docs/general/administration/configuration#fonts) on where to install them.

## Not Showing Active Devices

If your active devices section in the dashboard is not showing progress of the content being played by any devices, this may be because your system clock is out of sync. To resolve this on systemd based Linux systems, you can run the following command to enable syncing with an online NTP server (which in turn will start and enable either the `chronyd` or `ntpd` service). Make sure to restart Jellyfin afterwards.

```bash
timedatectl set-ntp true
```

## Database Locked Errors

When encountering issues with failed scans or inconsistent data, check your log file(s) for errors like "Database Locked". If you encounter those you should first check your parallel scan task limit in your admin dashboard and set that lower. If its set to 0 set it to 1/2 your cores. If that does not help, you can set the locking mode instead (keep the task limit to a reasonable low number too).

You have 3 options to set the locking mode to:

- `NoLock` - This is the default mode which should work for most users
- `Optimistic` - Defines that all writes should be attempted and should be retried when they fail.
- `Pessimistic` - Defines a behavior that always blocks all reads while any one write is done.

Stop your Jellyfin server and navigate to its config directory. There are a lot of xml files, look for the `database.xml` file and edit the `LockingBehavior` option:

```xml
<?xml version="1.0" encoding="utf-8"?>
<DatabaseConfigurationOptions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <DatabaseType>Jellyfin-SQLite</DatabaseType>
  // highlight-start
  <LockingBehavior>Optimistic</LockingBehavior>
  // highlight-end
</DatabaseConfigurationOptions>
```

then start your Jellyfin instance again. If this still does not help with the issues, you can try setting the `LockingBehavior` to `Pessimistic` instead but this comes with a significant performance impact so it is only recommended when `Optimistic` does not help with the issues.

### LXC specific issues

It has been brought to the team's attention that there are issues with LXC specifically. If you are getting such errors on LXC after setting lock mode to `Optimistic`, it is recommended that you migrate to full virtualization (virtual machines) or Docker. There is unlikely to be a solution for LXC any time soon, and we will be unable to provide any support for database locked problems on LXC.
