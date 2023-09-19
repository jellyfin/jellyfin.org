---
uid: network-fail2ban
title: fail2ban
---

## Fail2ban

[Fail2ban](https://github.com/fail2ban/fail2ban) is an intrusion prevention software framework that protects computer servers from brute-force attacks.
Fail2ban operates by monitoring log files (e.g. /var/log/auth.log, /var/log/apache/access.log, etc.) for selected entries and running scripts based on their content.

Jellyfin produces logs that can be monitored by Fail2ban to prevent brute-force attacks on your machine.

### Requirements

- Jellyfin remotely accessible
- Fail2ban installed and running
- Knowing where the logs for Jellyfin are stored: by default `/var/log/jellyfin/` for desktop and `/config/log/` for docker containers.
- For systemd or nftables users (Debian, Ubuntu) there are some additional steps needed, see *optional steps for systemd and nftables* at the end of this document.

### Step one: create the jail

You need to create a jail for Fail2ban. If you're on Ubuntu and use nano as editor, run:

```bash
sudo nano /etc/fail2ban/jail.d/jellyfin.local
```

Add this to the new file, replacing `/path_to_logs` with the path to the log files above, e.g. `/var/log/jellyfin/`:

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
logpath = /path_to_logs/jellyfin*.log
```

Save and exit nano.

Note:

1. If Jellyfin is running in a docker container, add the following to the `jellyfin.local` file:

   ```bash
   action = iptables-allports[name=jellyfin, chain=DOCKER-USER]
   ```

2. If you're running Jellyfin on a non-standard port, then change the port from `80,443` to the relevant port say `8096,8920`

### Step two: create the filter

The filter contains a set of rules which Fail2ban will use to identify a failed authentication attempt. Create the filter by running:

```bash
sudo nano /etc/fail2ban/filter.d/jellyfin.conf
```

Paste:

```bash
[Definition]
failregex = ^.*Authentication request for .* has been denied \(IP: "<ADDR>"\)\.
```

Save and exit, then reload Fail2ban:

```bash
sudo systemctl restart fail2ban
```

Check fail2ban is running:

```bash
sudo systemctl status fail2ban
```

### Step three: test

Assuming you've at least one failed authentication attempt, you can test this new jail with `fail2ban-regex`:

```bash
sudo fail2ban-regex /path_to_logs/*.log /etc/fail2ban/filter.d/jellyfin.conf --print-all-matched
```

### Optional steps for systemd and nftables

Systemd users like Debian or Ubuntu currently require some additional configs for fail2ban to work.
Change the file /etc/fail2ban/jail.d/defaults-debian.conf to:

```bash
[sshd]
enabled = true
backend=systemd

[DEFAULT]
banaction = nftables
banaction_allports = nftables[type=allports]
```

Without the telling the sshd jail to use systemd as a backend, fail2ban won't even start. The banaction is to send the bans to nftables instead of unused iptables.
In a similar manner, without adding the `banaction` default, fail2ban will try to use iptables that got replaced by nftables.

You also have to enable nftables to start at boot.

```bash
sudo systemctl enable nftables
sudo systemctl start nftables
```
