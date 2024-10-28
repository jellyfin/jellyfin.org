---
uid: server-memorydumps
title: Server Memory Dumps
---

# Memory Dumping of the Jellyfin Server

To troubleshoot issues with Jellyfin server related to memory allocation, it is necessary to create a memory dump in a format that developers analyze.

JetBrains dotMemory will be used for dumping memory in this guide.

## Linux Barebones

1. Install the latest dotMemory command line tools. To do this, download the NuGet package and extract it to a folder named `dotMemoryClt`, then set the permissions to make it executable:

```sh
wget -O dotMemoryclt.zip https://www.nuget.org/api/v2/package/JetBrains.dotMemory.Console.linux-x64/2024.2.2
unzip dotMemoryclt.zip -d ./dotMemoryclt
sudo chmod +x -R dotMemoryclt/*
```

Next, determine the process ID (PID) of the Jellyfin server. You will need the `ps` command. If your system doesn't have this command, it can be installed using the package manager of your distribution.

For Ubuntu:

```sh
sudo apt update -y
sudo apt install procps
```

Run this command to determine the PID of the Jellyfin server:

```sh
ps aux
```

The above command will display a list of processes similar to the following:

```cmd
# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  1.8  7.4 276905428 2304952 ?   Ssl  Sep04  17:23 /jellyfin/jellyfin
root       914  0.0  0.0   2480   580 pts/0    Ss   05:33   0:00 sh
root      2171  0.0  0.0   6756  2940 pts/0    R+   12:55   0:00 ps aux
```

Note the process ID (PID) of the Jellyfin server, which is associated with the `jellyfin` command. The left part of the path may differ if you installed Jellyfin in a different directory, but the rightmost part should always be `/jellyfin`.

Run the memory profiler using the following command, replacing `{PID}` with the PID you noted earlier (in this case, it would be `1`):

```sh
sudo ./dotMemoryclt/tools/dotmemory attach --temp-dir=/temp/dotMemoryclt/tmp --timeout=1m --trigger-on-activation -m=1 --save-to-dir=/temp/dotMemoryclt/workspaces --log-file=/temp/dotMemoryclt/tmp/log.txt {PID} --all
```

This command will start the profiler, attach it to the Jellyfin process, and create a memory dump. Wait until you see the output:

```sh
[PID:{PID}] SNAPSHOT #1 READY.
```

Press `CTRL+C` or wait for one minute. You will receive a message indicating that the profiler has ended and where the file was saved:

```sh
Profiler disconnected. PID:{PID}
Saving workspace...
WORKSPACE SAVED
file:///temp/dotMemoryclt/workspaces/[1]-jellyfin.2024-09-05T06-27-14.471.dmw
```

You must upload the created file, in this case `/temp/dotMemoryclt/workspaces/[1]-jellyfin.2024-09-05T06-27-14.471.dmw`, and provide it to the Jellyfin developers.

## Docker

The process for Docker is essentially the same as for Linux barebones, but you will need to install `ps` each time and pull the result file from the container.

First, identify the ID of your Jellyfin process by running:

```sh
docker ps
```

This command will list all your Docker containers:

```sh
CONTAINER ID   IMAGE                                                        COMMAND                  CREATED         STATUS                   PORTS                                                                                                                                               NAMES
31e5d4f30c8b   jellyfin/jellyfin:10.9.9                                     "/jellyfin/jellyfin"     15 hours ago    Up 15 hours (healthy)    8096/tcp
```

Note the `CONTAINER ID`, then attach your console to that container with:

```sh
docker exec -it {CONTAINERID} sh
```

For example: `docker exec -it 31e5d4f30c8b sh`. Follow all the steps from the [Linux Barebones guide](/docs/general/administration/troubleshooting/memory-dumping.md#linux-barebones) above. Afterward, you may want to transfer the result file back to your host. Assuming the same result file from the previous example, you can do this on your host with:

```sh
docker cp {CONTAINERID}:/temp/dotMemoryclt/workspaces/[1]-jellyfin.2024-09-05T06-27-14.471.dmw /opt/[1]-jellyfin.2024-09-05T06-27-14.471.dmw
```

Finally, upload the `/opt/[1]-jellyfin.2024-09-05T06-27-14.471.dmw` result file and provide it to the Jellyfin developers.
