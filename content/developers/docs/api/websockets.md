---
title: WebSockets
sidebar_position: 4
---

# WebSockets

Jellyfin uses WebSockets to enable real-time communication to clients. Messages will flow 'outbound', from the server to the connected client(s). Developers will need to establish a `KeepAlive` interval to keep the WebSocket connection alive, and will need to send 'start' messages to the server depending on the message type they are interested in.

## Keep Alive

When a WebSocket connection is established, the server will send a `ForceKeepAlive` message that contains a `Data` field. This `Data` field is the interval in which a `KeepAlive` message should be sent back to the server by the client.

It is simple enough to send `KeepAlive` messages at half the interval indicated by the server (`interval / 2`).

## Start Messages

Some WebSocket message types will require a 'start' message be sent before messages to the client will be delivered. These message types include:

- `Sessions`
- `ActivityLogEntry`
- `ScheduledTasksInfo`

The 'start' message should have a `Data` field indicating the interval in which messages should be delivered to the client. The format for this is `<initialDelay>,<interval>`, where the `initialDelay` is the number of milliseconds the server will delay sending the first outbound message, and the `interval` is the number of milliseconds in between outbound messages to the client.

## WebSocket Message Types

The following message types can be received via WebSocket subscription. Each message type has a specific payload structure, typically with a `Data` field containing the relevant information. Some types require a 'start' message to begin receiving updates (see above).

| MessageType                   | Description                                                      | Data Field Type                |
|-------------------------------|------------------------------------------------------------------|-------------------------------|
| `ActivityLogEntry`            | Activity log entries (requires start message)                    | Array of ActivityLogEntry      |
| `ForceKeepAlive`              | Server requests client to send keep-alive messages               | Number (interval ms)           |
| `GeneralCommand`              | General commands sent to clients                                 | GeneralCommand                 |
| `KeepAlive`                   | Keep-alive ping/pong                                             | None or heartbeat              |
| `LibraryChanged`              | Library items added/removed/updated                              | LibraryUpdateInfo              |
| `PackageInstallationCancelled`| Plugin package installation cancelled                            | InstallationInfo               |
| `PackageInstallationCompleted`| Plugin package installation completed                            | InstallationInfo               |
| `PackageInstallationFailed`   | Plugin package installation failed                               | InstallationInfo               |
| `PackageInstalling`           | Plugin package is being installed                                | InstallationInfo               |
| `PackageUninstalled`          | Plugin package uninstalled                                       | InstallationInfo               |
| `Play`                        | Play command sent to clients                                     | PlayRequest                    |
| `Playstate`                   | Playstate changes (pause, stop, etc.)                            | PlaystateRequest               |
| `RefreshProgress`             | Library or metadata refresh progress                             | Object (progress info)         |
| `RestartRequired`             | Server restart required                                          | RestartRequiredMessage         |
| `ScheduledTaskEnded`          | Scheduled task finished                                          | TaskResult                     |
| `ScheduledTasksInfo`          | Scheduled tasks status (requires start message)                  | Array of TaskInfo              |
| `SeriesTimerCancelled`        | Series timer cancelled                                           | SeriesTimerCancelledMessage    |
| `SeriesTimerCreated`          | Series timer created                                             | SeriesTimerCreatedMessage      |
| `ServerRestarting`            | Server is restarting                                             | ServerRestartingMessage        |
| `ServerShuttingDown`          | Server is shutting down                                          | ServerShuttingDownMessage      |
| `Sessions`                    | Active sessions (requires start message)                         | Array of SessionInfoDto        |
| `SyncPlayCommand`             | SyncPlay command sent to group                                   | SendCommand                    |
| `SyncPlayGroupUpdate`         | SyncPlay group state update                                      | GroupUpdate                    |
| `TimerCancelled`              | Timer cancelled                                                  | TimerCancelledMessage          |
| `TimerCreated`                | Timer created                                                    | TimerCreatedMessage            |
| `UserDataChanged`             | User data (e.g. watched status) changed                          | UserDataChangeInfo             |
| `UserDeleted`                 | User deleted                                                     | string (user id)               |
| `UserUpdated`                 | User updated                                                     | UserDto                        |
