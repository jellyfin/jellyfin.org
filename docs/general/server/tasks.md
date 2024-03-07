---
uid: server-tasks
title: Tasks
---

# Tasks

Tasks are operations that are scheduled to run periodically. They can also be triggered manually by clicking the run button on the right.

## Default Jellyfin Tasks

Below is a list of tasks that Jellyfin runs peoridically by default:

### Libraries

- Download Missing Subtitles
- Refresh Users
- Extract Chapter Images
- Scan Library
- Extract Key Frames

### Application

- Update Plugins

### Maintenance

- Optimize Database
- Clear Log Folder
- Clear Cache Folder
- Clear Activity Logs
- Clear Transcodes Folder

## Plugin Tasks

Plugins can add their own tasks if they include operations that need to be run at specified intervals. These will also show up in the settings for you to configure.
