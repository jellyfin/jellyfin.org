## Fail2Ban Setup for Using `iptables` Chains on an Upstream Server

This guide provides two options for setting up Fail2Ban to manage IP bans on an upstream reverse proxy server:

1. **Dynamic Chains**: Each Fail2Ban jail dynamically creates and manages its own `iptables` chain on the upstream server.
2. **Communal Chain**: All Fail2Ban jails share a single communal `iptables` chain on the upstream server.

### Prerequisites

- **Fail2Ban** is installed and configured on your local server (where services such as Jellyfin, Nginx, etc. are running).
- **SSH key-based access** is configured from your Fail2Ban server to the upstream server, which will execute the `iptables` rules.
- **iptables** is installed and configured on the upstream reverse proxy server.

### Step 1: Set Up SSH Key-Based Authentication

Ensure the Fail2Ban server can SSH into the upstream server without needing a password. This is crucial for automating the IP ban/unban process.

1. **Generate SSH Key (if not already done):**

   ```bash
   ssh-keygen -t rsa -b 4096 -f /root/.ssh/id_rsa
   ```

2. **Copy the SSH Key to the Upstream Server:**

   ```bash
   ssh-copy-id -i /root/.ssh/id_rsa.pub root@<upstream-server-ip>
   ```

   Replace `<upstream-server-ip>` with the actual IP address of the upstream server.

3. **Test SSH Access:**

   Ensure the SSH connection works without needing a password:

   ```bash
   ssh -i /root/.ssh/id_rsa root@<upstream-server-ip>
   ```

---

### Option 1: Dynamic `iptables` Chains for Each Jail

This approach dynamically creates, manages, and removes separate `iptables` chains for each Fail2Ban jail on the upstream server.

#### Step 2: Configure Fail2Ban for Dynamic Chains

1. **Create the Fail2Ban Action File**:

   On the Fail2Ban server, create a new action file:

   ```bash
   sudo nano /etc/fail2ban/action.d/proxy-iptables-dynamic.conf
   ```

2. **Add the Following Configuration**:

   This action dynamically creates, manages, and removes `iptables` chains per jail:

   ```ini
   [Definition]

   # Option: actionban
   # 1. Create the chain if it doesn't exist
   # 2. Add the banned IP to the dynamic chain based on the jail name
   # 3. Log the result
   actionban = ssh -i /root/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@<upstream-server-ip> \
                   'iptables -N f2b-<name> 2>/dev/null || true; \
                    iptables -C INPUT -j f2b-<name> 2>/dev/null || iptables -I INPUT -j f2b-<name>; \
                    iptables -I f2b-<name> 1 -s <ip> -j DROP' && \
                    echo "Banned <ip> from jail <name> via upstream proxy" >> /var/log/fail2ban.log
   
   # Option: actionunban
   # 1. Remove the banned IP from the dynamic chain
   # 2. Remove the chain if it becomes empty (cleanup)
   # 3. Log the result
   actionunban = ssh -i /root/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@<upstream-server-ip> \
                   'iptables -D f2b-<name> -s <ip> -j DROP; \
                    if ! iptables -L f2b-<name> | grep -q "DROP"; then \
                        iptables -D INPUT -j f2b-<name>; \
                        iptables -F f2b-<name>; \
                        iptables -X f2b-<name>; \
                    fi' && \
                    echo "Unbanned <ip> from jail <name> via upstream proxy and cleaned up chain if empty" >> /var/log/fail2ban.log
   ```

   Replace `<upstream-server-ip>` with the actual IP address of your upstream server.

#### Step 3: Configure Fail2Ban Jails to Use Dynamic Chains

1. **Edit Jail Configuration**:

   Open your jail configuration file, usually located at `/etc/fail2ban/jail.local`:

   ```bash
   sudo nano /etc/fail2ban/jail.local
   ```

2. **Update the Jails to Use the Dynamic Chain Action**:

   Here’s an example configuration for two jails:

   ```ini
   [jellyfin]
   enabled  = true
   filter   = jellyfin
   logpath  = /path/to/jellyfin/log
   maxretry = 3
   bantime  = 3600
   action   = proxy-iptables-dynamic

   [nginx-http-auth]
   enabled  = true
   filter   = nginx-http-auth
   logpath  = /var/log/nginx/error.log
   maxretry = 5
   bantime  = 600
   action   = proxy-iptables-dynamic
   ```

---

### Option 2: Communal `iptables` Chain

This approach uses a single communal `iptables` chain shared by all Fail2Ban jails on the upstream server.

#### Step 2: Create a Communal `iptables` Chain on the Upstream Server

1. **Log in to the Upstream Server:**

   ```bash
   ssh root@<upstream-server-ip>
   ```

2. **Create the Communal Chain:**

   Create the chain and ensure it is linked to the `INPUT` chain:

   ```bash
   iptables -N f2b-communal
   iptables -C INPUT -j f2b-communal || iptables -I INPUT -j f2b-communal
   ```

3. **Automate Chain Creation at Boot (Cron Job):**

   To ensure the chain is created and linked after every reboot, add the following cron job:

   ```bash
   sudo crontab -e
   ```

   Add this line:

   ```bash
   @reboot sleep 30 && ( /usr/sbin/iptables -N f2b-communal 2>/dev/null; /usr/sbin/iptables -C INPUT -j f2b-communal || /usr/sbin/iptables -I INPUT -j f2b-communal )
   ```

#### Step 3: Configure Fail2Ban for the Communal Chain

1. **Create the Fail2Ban Action File**:

   On the Fail2Ban server, create a new action file:

   ```bash
   sudo nano /etc/fail2ban/action.d/proxy-iptables-communal.conf
   ```

2. **Add the Following Configuration**:

   ```ini
   [Definition]

   # Option: actionban
   actionban = ssh -i /root/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@<upstream-server-ip> "iptables -I f2b-communal 1 -s <ip> -j DROP" && echo "Banned <ip>" >> /var/log/fail2ban.log

   # Option: actionunban
   actionunban = ssh -i /root/.ssh/id_rsa -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@<upstream-server-ip> "iptables -D f2b-communal -s <ip> -j DROP" && echo "Unbanned <ip>" >> /var/log/fail2ban.log
   ```

#### Step 4: Configure Fail2Ban Jails to Use the Communal Chain

1. **Edit Jail Configuration**:

   Open your jail configuration file, usually located at `/etc/fail2ban/jail.local`:

   ```bash
   sudo nano /etc/fail2ban/jail.local
   ```

2. **Update the Jails to Use the Communal Chain**:

   Here’s an example configuration for two jails:

   ```ini
   [jellyfin]
   enabled  = true
   filter   = jellyfin
   logpath  = /path/to/jellyfin/log
   maxretry = 3
   bantime  = 3600
   action   = proxy-iptables-communal

   [nginx-http-auth]
   enabled  = true
   filter   = nginx-http-auth
   logpath  = /var/log/nginx/error.log
   maxretry = 5
   bantime  = 600
   action   = proxy-iptables-communal
   ```

---

### Step 5: Restart Fail2Ban and Test the Setup

1. **Restart Fail2Ban**:

   After making the configuration changes, restart Fail2Ban to apply the new settings:

   ```bash
   sudo systemctl restart fail2ban
   ```

2. **Check Jail Status**:

   Verify the status of your jails:

   ```bash
   sudo fail2ban-client status jellyfin
   sudo fail2ban-client status nginx-http-auth
   ```

3. **Test a Ban**:

   Trigger a ban by performing invalid login attempts or by manually banning an IP. For example:

   ```bash
   sudo fail2ban-client set jellyfin banip 192.168.1.100
   ```

4. **Verify on Upstream Server**:

   Check if the IP is banned in the communal or dynamic chain on the upstream server:

   ```bash
   ssh root@<upstream-server-ip> "iptables -L f2b-communal"
   ```

   or

   ```bash
   ssh root@<upstream-server-ip> "iptables -L f2b-jellyfin"
   ```

5. **Test Unbanning**:

   To test unbanning, manually unban the IP:

   ```bash
   sudo fail2ban-client set jellyfin unbanip 192.168.1.100
   ```

6. **Verify Unban**:

   Verify that the IP is removed from the chain on the upstream server:

   ```bash
   ssh root@<upstream-server-ip> "iptables -L f2b-communal"
   ```

---

### Step 6: Monitor Logs

You can monitor the Fail2Ban log to ensure everything is working as expected:

```bash
tail -f /var/log/fail2ban.log
```

This log will show messages whenever an IP is banned or unbanned, ensuring the actions are being executed properly.
