---
uid: network-letsencrypt
title: Let's Encrypt
---

## LetsEncrypt with Certbot

LetsEncrypt is a service that provides free SSL/TLS certificates to users. Certbot is a client that makes this easy to accomplish and automate. In addition, it has plugins for Apache and Nginx that make automating certificate generation even easier.

Installation instructions for most Linux distributions can be found on the [Certbot](https://certbot.eff.org/docs/install.html#operating-system-packages) website.

Once the packages are installed, you're ready to generate a new certificate.

### Apache

#### Certbot Apache Plugin

After installing Certbot and the Apache plugin, certificate generation is accomplished by with the following command.

```sh
certbot certonly --apache --noninteractive --agree-tos --email YOUR_EMAIL -d DOMAIN_NAME
```

Update the 'SSLCertificateFile' and 'SSLCertificateKeyFile' sections, then restart the service.

Add a job to cron so the certificate will be renewed automatically.

```sh
echo "0 0 * * *  root  certbot renew --quiet --no-self-upgrade --post-hook 'systemctl reload apache2'" | sudo tee -a /etc/cron.d/renew_certbot
```

#### Certbot Webroot

##### Debian

If the certbot apache plugin doesn't work with your config, use webroot instead.

Add the following to your <VirtualHost> section after configuring it a reverse proxy:

```conf
DocumentRoot /var/www/html/
#Do not pass the .well-known directory when using certbot and webroot
ProxyPass /.well-known !
```

Run the certbot command as root:

```sh
sudo certbot certonly --webroot -w /var/www/html --agree-tos --email YOUR_EMAIL -d DOMAIN_NAME
```

### HAProxy

HAProxy doesn't currently have a Certbot plugin. To get around this, run Certbot in standalone mode and proxy traffic through your network.

Enable the frontend and backend in the config above, and then run Certbot.

```sh
certbot certonly --standalone --preferred-challenges http-01 --http-01-port 8888 --noninteractive --agree-tos --email YOUR_EMAIL -d DOMAIN_NAME
```

The port can be changed to anything you like, but be sure that the HAProxy config and your Certbot command match.

HAProxy needs to have the certificate and key files concatenated into the same file to read it correctly. This can be accomplished with the following command.

```sh
cat /etc/letsencrypt/live/DOMAIN_NAME/fullchain.pem /etc/letsencrypt/live/DOMAIN_NAME/privkey.pem > /etc/ssl/DOMAIN_NAME.pem
```

Uncomment `bind *:443` and the redirect section in the configuration, then reload the service.

#### Automatic Certificate Renewal

Place the following script in `/usr/local/bin/` to automatically update your SSL certificate.

```sh
SITE=DOMAIN_NAME

# move to the correct let's encrypt directory
cd /etc/letsencrypt/live/$SITE

# cat files to make combined .pem for haproxy
cat fullchain.pem privkey.pem > /etc/ssl/$SITE.pem

# reload haproxy
service haproxy reload
```

Make sure the script is executable.

```sh
chmod u+x /usr/local/bin/letsencrypt-renew.sh
```

Add a job to cron so the certificate will be renewed automatically.

```data
@monthly /usr/bin/certbot renew --renew-hook "/usr/local/bin/letsencrypt-renew.sh" >> /var/log/letsencrypt-renewal.log
```

### Nginx

After installing Certbot and the Nginx plugin with `sudo apt install certbot python3-certbot-nginx`, generate the certificate.

**Note**: For Fedora Linux distributions (e.g. CentOS 8) use `sudo dnf install python3-certbot-nginx` to install the Nginx plugin.

```sh
sudo certbot --nginx --agree-tos --redirect --hsts --staple-ocsp --email YOUR_EMAIL -d DOMAIN_NAME
```

Add the `--rsa-key-size 4096` parameter if you want a 4096 bit key instead.

Copy and paste the whole Nginx sample configuration file from above, changing the parameters according to your setup and uncommenting the lines.

Add a job to cron so the certificate will be renewed automatically.

```sh
echo "0 0 * * *  root  certbot renew --quiet --no-self-upgrade --post-hook 'systemctl reload nginx'" | sudo tee -a /etc/cron.d/renew_certbot
```

### Let's Encrypt and Docker

This section assumes that Jellyfin is running in a Docker container (on Linux). This section also assumes that you wish to run Let's Encrypt in a Docker container as well. The Linuxserver/swag Docker container has a built-in nginx webserver to handle the reverse proxy.

Linuxserver/letsencrypt is deprecated in favor of linuxserver/swag, see [here](https://github.com/linuxserver/docker-swag#migrating-from-the-old-linuxserverletsencrypt-image) for information on how to migrate if needed.

First, you need to determine a few things.

1. **MAKE SURE YOU HAVE A CNAME FOR JELLYFIN WITH YOUR DNS PROVIDER BEFORE PROCEEDING**
2. Where you wish to store information regarding Let's Encrypt (docker calls these "volumes")
3. What subdomain or subfolder you wish to use with Let's Encrypt (ex. jellyfin.example.com)
4. What timezone you wish to use
5. If you'll be using either HTTP-01 or DNS-01 for challenges.
6. What network you'll be running on (I'd recommend the default macvlan network called "br0")
7. What IP you want your container running on
8. What ports you'll be using (ex. 180 for port 80, and 1443 for 443)
9. Make sure ports 80 (if using http validation) and 443 are forwarded to the docker container from your router (instructions vary upon manufacturer)
10. What user will the container be running as (you can determine the PUID and PGID by running `id` (replacing "user" with the username of the user the container will be running as)

List of DNS Plugins [here](https://certbot.eff.org/docs/using.html#dns-plugins) if using DNS-01 challenge.

Then, depending on what those settings are, you'll need to adjust the values below as needed.

For example, the docker create command from the LinuxServer team for the Swag Docker container:

```sh
docker create \
  --name=swag \
  --cap-add=NET_ADMIN \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e URL=example.com \
  -e SUBDOMAINS=www, \
  -e VALIDATION=http \
  -e DNSPLUGIN=cloudflare `#optional` \
  -e DUCKDNSTOKEN=<token> `#optional` \
  -e EMAIL=<e-mail> `#optional` \
  -e DHLEVEL=2048 `#optional` \
  -e ONLY_SUBDOMAINS=false `#optional` \
  -e EXTRA_DOMAINS=<extradomains> `#optional` \
  -e STAGING=false `#optional` \
  -p 443:443 \
  -p 80:80 `#optional` \
  -v </path/to/appdata/config>:/config \
  --restart unless-stopped \
  linuxserver/swag
```

Assuming I follow this template and adjust for my region, ports, and path, it would look like this (with personal information redacted):

```sh
docker create --name=swag --cap-add=NET_ADMIN -e PUID=1000 -e PGID=1000 -e TZ=America/Chicago -e URL=example.com -e SUBDOMAINS=jellyfin -e VALIDATION=http -e EMAIL=email@email.com -e DHLEVEL=2048 -e ONLY_SUBDOMAINS=false -e STAGING=false -p 443:443 -p 80:80 -v /path/to/appdata/swag/:/config --restart unless-stopped linuxserver/swag
```

This will pull down the linuxserver/letsencrypt container, and then create it with the variables specified. You'll then want to start the docker container with `docker start swag`. You can verify this is started by running `docker ps`, which will produce an output like this:

```text
CONTAINER ID        IMAGE                     COMMAND             CREATED             STATUS              PORTS                                      NAMES
09346434b8ea        linuxserver/swag          "/init"             2 minutes ago       Up 5 seconds        0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   swag
```

At this point, navigate to what volume you selected (in my example, it's `/mnt/swag`). You'll then need to navigate to `nginx/proxy-confs` within that directory. If you list the contents of that directory, you'll see a lot of files.

The one we're interested in for jellyfin is `jellyfin.subdomain.conf.sample` (if using a subdomain) or `jellyfin.subfolder.conf.sample` (if using a subfolder). You'll want to copy the file needed, removing the .sample (ex. `cp jellyfin.subdomain.conf.sample jellyfin.subdomain.conf`). Open the file in your text editor of choice.

It should look like this (this file is `jellyfin.subdomain.conf`, although `jellyfin.subfolder.conf` looks very similar):

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name jellyfin.*;

    include /config/nginx/ssl.conf;

    client_max_body_size 0;

    location / {
        include /config/nginx/proxy.conf;
        resolver 127.0.0.11 valid=30s;
        set $upstream_app jellyfin;
        set $upstream_port 8096;
        set $upstream_proto http;
        proxy_pass $upstream_proto://$upstream_app:$upstream_port;

        proxy_set_header Range $http_range;
        proxy_set_header If-Range $http_if_range;
    }

    location ~ (/jellyfin)?/socket/ {
        include /config/nginx/proxy.conf;
        resolver 127.0.0.11 valid=30s;
        set $upstream_app jellyfin;
        set $upstream_port 8096;
        set $upstream_proto http;
        proxy_pass $upstream_proto://$upstream_app:$upstream_port;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $http_connection;
   }
}
```

The lines we're interested in is `set $upstream_app jellyfin`. Now, assuming Jellyfin and Let's Encrypt are on the same network within Docker, it *should* see it and start handling reverse proxy without much issue. If it doesn't however, you'll just need to change `jellyfin` in that line to whatever the IP of your Jellyfin server is. We'll also look at the line `location ~ (/jellyfin)?/socket` and add a slash after socket, so the line should look like this `location ~ (/jellyfin)?/socket/`.

Then, within Jellyfin settings (Dashboard -> Networking), scroll down to "Public HTTP port number" and "Public HTTPS port number", and make sure HTTP Port number is 8096, while HTTPS port number is 8920.

Restart your Let's Encrypt docker container by running `docker restart swag`, and then you can follow the logs with `docker logs -f swag`. Assuming everything works, you should see `Server Ready` at the very end of the logs. This tells you Lets Encrypt is running without issue.
