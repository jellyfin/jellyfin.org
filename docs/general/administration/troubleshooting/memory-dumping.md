---
uid: server-memorydumps
title: Server Memory Dumps
---

# Memory Dumping of the Jellyfin server

To troubleshoot a Jellyfin server that keeps allocating system memory it is necessary to dump the memory in a format that the developers then can later analyze.

To dump the memory we will use the dotMemory tools from JetBrains.

## Linux Barebones

First, we need to install the latest dotMemory command line tooling.
To do this, pull the nuget package and extract it to a folder named `dotMemoryClt` and then set the permissions to be executable:

```sh
apt-get update -y && apt-get install -y wget && \
wget -O dotMemoryclt.zip https://www.nuget.org/api/v2/package/JetBrains.dotMemory.Console.linux-x64/2024.2.2 && \
apt-get install -y unzip && \
unzip dotMemoryclt.zip -d ./dotMemoryclt && \
chmod +x -R dotMemoryclt/*
```

afterwards we need to figure out the process ID of the Jellyfin server:

```sh
ps aux
```

If the ps command is not available in your Linux distribution, install it with:

```sh
apt-get update && apt-get install procps
```

This will show us a number of processes like this:

```cmd
# ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  1.8  7.4 276905428 2304952 ?   Ssl  Sep04  17:23 /jellyfin/jellyfin
root       914  0.0  0.0   2480   580 pts/0    Ss   05:33   0:00 sh
root      2171  0.0  0.0   6756  2940 pts/0    R+   12:55   0:00 ps aux
```

Note the process ID (PID) of the Jellyfin server. That is the process that has the `/jellyfin/jellyfin` command. The left part of the path might differ if you have installed Jellyfin in a different directory, but the right most part of the path should always be `/jellyfin`.

Then we run the memory profiler via this command with the `{PID}` replaced by the pid we noted earlier (In this case it would be 1):

```sh
/dotMemoryclt/tools/dotmemory attach --temp-dir=/temp/dotMemoryclt/tmp --timeout=1m  --trigger-on-activation -m=1 --save-to-dir=/temp/dotMemoryclt/workspaces --log-file=/temp/dotMemoryclt/tmp/log.txt {PID} --all
```

This will then start the profiler, attach it to the Jellyfin process, make a memory dump and wait. After you see the output of:

```sh
[PID:{PID}] SNAPSHOT #1 READY.
```

Press `CTRL+C` or wait for 1 minute. You will then get the information that the profiler ended and where the file was saved like this:

```sh
Profiler disconnected. PID:{PID}
Saving workspace...
WORKSPACE SAVED
file:///temp/dotMemoryclt/workspaces/[1]-jellyfin.2024-09-05T06-27-14.471.dmw
```

You must now upload the created file, in this case `/temp/dotMemoryclt/workspaces/[1]-jellyfin.2024-09-05T06-27-14.471.dmw` and provide it to the jellyfin developers.

## Docker

The docker process is essentially the same as the Linux barebones, plus you need to install `ps` every time and you need to pull the result file from the container.

First, you need to figure out the ID of your jellyfin process by running:

```sh
docker ps
```

This will show you all your docker containers:

```sh
CONTAINER ID   IMAGE                                                        COMMAND                  CREATED         STATUS                   PORTS                                                                                                                                               NAMES
31e5d4f30c8b   jellyfin/jellyfin:10.9.9                                     "/jellyfin/jellyfin"     15 hours ago    Up 15 hours (healthy)    8096/tcp
```

Note the `CONTAINER ID` and then attach your current console to that container via

```sh
docker exec -it {CONTAINERID} sh
```

For example: `docker exec -it 31e5d4f30c8b sh`. Then follow all the steps from the Linux Barebones guide above. After that you might want to transfer the result file back to your host, assuming the same result file from the above example you can do that on your host by calling:

```ps
docker cp {CONTAINERID}:/temp/dotMemoryclt/workspaces/[1]-jellyfin.2024-09-05T06-27-14.471.dmw /opt/[1]-jellyfin.2024-09-05T06-27-14.471.dmw
```

You can then proceed to upload the `/opt/[1]-jellyfin.2024-09-05T06-27-14.471.dmw` result file and provide it to the jellyfin developers.
