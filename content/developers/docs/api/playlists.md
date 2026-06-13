---
title: Playlists
sidebar_position: 6
---

# Playlists

Playlists are custom lists of media that users can create. These are mutable; they can be created, updated, shared, and deleted by users of the server.

## Create

To create a playlist, use the [CreatePlaylist](https://api.jellyfin.org/#tag/Playlists/operation/CreatePlaylist) operation. This operation accepts a data transfer object that can populate details of the playlist, including:

- `Name` of the playlist
- `Ids` of items to include in the playlist
- `UserId` of the user who should "own" the playlist
- `MediaType` of the playlist
- `Users` that have access and optionally the ability to edit the playlist
- `IsPublic` - whether or not the playlist is publicly accessible to all users

## Read

To retrieve all playlist items from the library, use the [GetItems](https://api.jellyfin.org/#tag/Items/operation/GetItems) operation from the Items API, specifying the Playlist library's `Id` as the `parentId`.

To retrieve a specific playlist along with it's contents, use the [GetPlaylist](https://api.jellyfin.org/#tag/Playlists/operation/GetPlaylist) operation and specify the `Id` of the desired playlist.

## Update

There are multiple methods available for updating a playlist and it's contents.

The simplest way is by using the [UpdatePlaylist](https://api.jellyfin.org/#tag/Playlists/operation/UpdatePlaylist) operation, of which can facilitate renaming, updating permissions, and updating the playlist contents. This accepts a data transfer object of which the following can be specified:

- `Name` of the playlist
- `Ids` of items to include in the playlist
- `Users` that have access an optionally the ability to edit the playlist
- `IsPublic` - whether or not the playlist is publicly accessible to all users

There are additional endpoints, however, whose functionality is more directed at modifying the contents of the playlist. These are the [RemoveItemFromPlaylist](https://api.jellyfin.org/#tag/Playlists/operation/RemoveItemFromPlaylist) operation and the [MoveItem](https://api.jellyfin.org/#tag/Playlists/operation/MoveItem) operation.

## Delete

To delete a playlist from the library, use the [DeleteItem](https://api.jellyfin.org/#tag/Library/operation/DeleteItem) operation from the Library API.

## Sharing

To see what users have access to a playlist and what permissions they have, use the [GetPlaylistUsers](https://api.jellyfin.org/#tag/Playlists/operation/GetPlaylistUsers) operation. This will return the `Id`s of the users with access, as well as a `CanEdit` value indicating whether they can edit the playlist.

To update a user's permissions for a playlist, use the [UpdatePlaylistUser](https://api.jellyfin.org/#tag/Playlists/operation/UpdatePlaylistUser) operation. This operation accepts a data transfer object with a `CanEdit` field, which will grant edit permissions to the user if set to `true` when sent.

To remove a user's access from a playlist, use the [RemoveUserFromPlaylist](https://api.jellyfin.org/#tag/Playlists/operation/RemoveUserFromPlaylist) operation.
