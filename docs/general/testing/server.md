---
uid: testing-server
title: Testing Jellyfin Server
---

# Testing Jellyfin Server

:::caution Backups!

Unstable often makes irreversible changes to existing Jellyfin setups. Please make regular backups of Jellyfin files. [Read More](/docs/general/administration/configuration#server-paths)

:::

## Weekly Unstable Build

The weekly unstable builds are generated every Monday 5:00 AM UTC. Testing using the Unstable builds can not only test Jellyfin itself, but also help identify issues with packaging.

To install them, navigate to our [downloads page](/downloads/server) and choose `Server`, choose your platform, then choose `Unstable`. The choices have to be made in this order. After choosing, scroll down and find the installation method you would like to use.

![Downloads Page](/images/docs/testing/server/weekly-1.png)

## Testing from Master Branch

For the absolute bleeding edge, you can test directly from the Master branch of the server. To test from the master branch, a few extra tools are needed:

- [git](https://git-scm.com/downloads)
- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

### Downloading Source Code

Open a terminal where you would like to store the server files. For this step on Windows, you may need to open a git BASH window instead of the normal powershell window depending on how git is installed / configured. Please do not create a subdirectory for Jellyfin as git will automatically create a subdirectory for the project. Use the following commands to download the Jellyfin master branch and navigate to the directory.

```shell
git clone https://github.com/jellyfin/jellyfin
cd jellyfin
```

### Updating

Open a terminal in the server subdirectory. For this step on Windows, you may need to open a git BASH window instead of the normal powershell window depending on how git is installed / configured. Run the following command to fetch the latest commits.

```shell
git pull
```

### Running

Open a terminal in the server subdirectory. Run the following commands to start the server.

```shell
dotnet run -c Release --project Jellyfin.Server
```

Note that this starts the server without a web client, and requires the web client to be hosted separately or the use of another client.
