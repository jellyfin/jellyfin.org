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

### Step one: create the jail

You need to create a jail for Fail2ban. If you're on Ubuntu and use nano as editor, run:

```bash
sudoedit /etc/fail2ban/jail.d/jellyfin.local
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
sudoedit /etc/fail2ban/filter.d/jellyfin.conf
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

---

## Fail2Ban

[Fail2ban](https://github.com/fail2ban/fail2ban) is an intrusion prevention software framework that protects computer servers from brute-force attacks.
Fail2Ban operates by monitoring log files (e.g., `/var/log/auth.log`, `/var/log/apache/access.log`, etc.) for selected entries and running scripts based on their content.

Jellyfin produces logs that can be monitored by Fail2Ban to prevent brute-force attacks on your machine.

### Requirements

- Jellyfin remotely accessible
- Fail2Ban installed and running
- Knowing where the logs for Jellyfin are stored: by default `/var/log/jellyfin/` for desktop and `/config/log/` for docker containers.

---

### Step One: Create the Jail

You need to create a jail for Fail2Ban. If you're on Ubuntu and use nano as an editor, run:

```bash
sudoedit /etc/fail2ban/jail.d/jellyfin.local
```

Add this to the new file, replacing `/path_to_logs` with the path to the log files above, e.g., `/var/log/jellyfin/`:

```ini
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

Save and exit.

**Note:**  
If Jellyfin is running in a Docker container, add the following line to the `jellyfin.local` file to ensure compatibility with Docker's networking:

```bash
action = iptables-allports[name=jellyfin, chain=DOCKER-USER]
```

### Step Two: Create the Filter

The filter contains a set of rules that Fail2Ban will use to identify failed authentication attempts. Create the filter by running:

```bash
sudoedit /etc/fail2ban/filter.d/jellyfin.conf
```

Add:

```ini
[Definition]
failregex = ^.*Authentication request for .* has been denied \(IP: "<ADDR>"\)\.
```

Save and restart Fail2Ban:

```bash
sudo systemctl restart fail2ban
```

Verify Fail2Ban is running:

```bash
sudo systemctl status fail2ban
```

### Step Three: Test

To test this setup with existing logs:

```bash
sudo fail2ban-regex /path_to_logs/*.log /etc/fail2ban/filter.d/jellyfin.conf --print-all-matched
```

---

## Advanced Fail2Ban Setup: Managing Bans on an Upstream Proxy Server

To enhance security, Fail2Ban can manage IP bans on an upstream reverse proxy server instead of directly on the Jellyfin server. This setup allows you to block malicious IPs closer to your network’s entry point, potentially benefiting other services using the same proxy.

This guide offers two configurations for setting up Fail2Ban to manage IP bans on an upstream reverse proxy server:

1. **Dynamic Chains**: Each Fail2Ban jail creates and manages its own `iptables` chain on the upstream server.
2. **Communal Chain**: All Fail2Ban jails share a single `iptables` chain on the upstream server.

### Prerequisites

- **Fail2Ban** is installed on your local server (where services such as Jellyfin, Nginx, etc., are running).
- **SSH key-based access** is set up from your Fail2Ban server to the upstream server.
- **iptables** is configured on the upstream server.

### Step 1: Set Up SSH Key-Based Authentication

Establish SSH access from the Fail2Ban server to the upstream server for automated IP ban/unban actions.

1. **Generate an SSH Key** (if not already created):

   ```bash
   ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa
   ```

2. **Copy the Key to the Upstream Server**:

   ```bash
   ssh-copy-id -i /root/.ssh/id_rsa.pub root@<upstream-server-ip>
   ```

3. **Verify Access**:

   ```bash
   ssh -i /root/.ssh/id_rsa root@<upstream-server-ip>
   ```

---

### Option 1: Dynamic `iptables` Chains for Each Jail

In this approach, each Fail2Ban jail dynamically manages its own `iptables` chain.

#### Configure Fail2Ban for Dynamic Chains

1. **Create the Action File**:

   ```bash
   sudo nano /etc/fail2ban/action.d/proxy-iptables-dynamic.conf
   ```

2. **Define the Action**:

   ```ini
   [Definition]
   actionban = ssh root@<upstream-server-ip> "iptables -N f2b-<name> || true; iptables -I f2b-<name> -s <ip> -j DROP"
   actionunban = ssh root@<upstream-server-ip> "iptables -D f2b-<name> -s <ip> -j DROP"
   ```

   Replace `<upstream-server-ip>` with the IP of your upstream server.

#### Configure Jails for Dynamic Chains

Update `/etc/fail2ban/jail.local`:

```ini
[jellyfin]
action = proxy-iptables-dynamic
```

---

### Option 2: Communal `iptables` Chain for All Jails

In this approach, all jails share a single `iptables` chain.

#### Configure Fail2Ban for Communal Chain

1. **Create the Action File**:

   ```bash
   sudo nano /etc/fail2ban/action.d/proxy-iptables-communal.conf
   ```

2. **Define the Action**:

   ```ini
   [Definition]
   actionban = ssh root@<upstream-server-ip> "iptables -I f2b-communal -s <ip> -j DROP"
   actionunban = ssh root@<upstream-server-ip> "iptables -D f2b-communal -s <ip> -j DROP"
   ```

#### Configure Jails for Communal Chain

Update `/etc/fail2ban/jail.local` for each jail:

```ini
[jellyfin]
action = proxy-iptables-communal
```

---

### Final Steps: Restart and Test

After making changes, restart Fail2Ban and verify functionality as detailed above.
