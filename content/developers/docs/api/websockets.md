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
