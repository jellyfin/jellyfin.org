---
uid: network-fail2ban
title: fail2ban
---

## Fail2ban

Fail2ban is an intrusion prevention software framework that protects computer servers from brute-force attacks.
Fail2ban operates by monitoring log files (e.g. /var/log/auth.log, /var/log/apache/access.log, etc.) for selected entries and running scripts based on their content.

Jellyfin produces logs that can be monitored by Fail2ban to prevent brute-force attacks on your machine.

### Requirements

* Jellyfin remotely accessible
* Fail2ban installed and running
* Knowing where the logs for Jellyfin are stored: by default `/var/log/jellyfin/`

### Step one: create a jail

You need to create a jail for Fail2ban.
If you are on Ubuntu and use nano as editor, type:

```bash
sudo nano /etc/fail2ban/jail.d/jellyfin.local
```

And add this to the file:

```bash
[jellyfin]

backend = auto
enabled = true
port = 80,443
protocol = tcp
filter = jellyfin
maxretry = 3
bantime = 86400
findtime = 43200
logpath = /var/log/jellyfin/jellyfin*.log
```

Save and exit nano.

Note:

1. If jellyfin is running in a docker container, then add the following to jellyfin.local file

    ```bash
    action = iptables-allports[name=jellyfin, chain=DOCKER-USER]
    ```

2. If you are running Jellyfin on a non-standard port, then change the port from 80,443 to the relevant port say 8096 8920

### Step two: create a filter

The filter explains to Fail2ban where to look in the log file. This is the tricky part.

```bash
sudo nano /etc/fail2ban/filter.d/jellyfin.conf
```

And add this to the new file:

```bash
[Definition]
failregex = ^.*Authentication request for ".*" has been denied \(IP: "<ADDR>"\)\.
```

Save and exit, then reload Fail2ban:

```bash
sudo systemctl restart fail2ban
```

You're done.

### Step three: test

You can test this new jail:

```bash
fail2ban-regex /var/log/jellyfin/*.log /etc/fail2ban/filter.d/jellyfin.conf
```

And see the output.
