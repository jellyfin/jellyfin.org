---
uid: network-reverse-proxy-caddy
title: Caddy
sidebar-position: 1
---

> **Note:** For HTTP/3 support, ensure UDP port 443 is forwarded/opened on your firewall, as HTTP/3 uses UDP.

"[Caddy](https://caddyserver.com/), sometimes clarified as the Caddy web server, is an open source, HTTP/2-enabled web server written in Go. It uses the Go standard library for its HTTP functionality." - [Wikipedia](<https://en.wikipedia.org/wiki/Caddy_(web_server)>)

You can reverse proxy to Jellyfin either with or without a config file, and either method offers automatic HTTPS if you want to use your public domain name.

**If you want HTTPS, make sure your domain name's A/AAAA records are pointed at your public IP address.**

If you aren't familiar with Caddy yet, check out its [Getting Started](https://caddyserver.com/docs/getting-started) guide.

:::caution
There are a some guides that have a Caddyfile which includes a `tls` section with the DNS provider's API key as shown in the following example.

```Caddyfile
example.com {
    reverse_proxy 127.0.0.1:8096
    // highlight-start
    tls {
        dns <DNS Provider> <API Token>
    }
    // highlight-end
}
```

Please proceed with caution when using this option:

- This will **NOT** automatically update your DNS records if you have a dynamic IP.
- This is **NOT** required for automatic HTTPS to work in most cases.
- Misconfiguration can lead to **compromised domains and/or accounts**.
- API keys should only be granted the least permissions required for the application to function.

Please read the [Let's Encrypt documentation](https://letsencrypt.org/docs/challenge-types/) for more info.
:::

### One-liners

The easiest way to reverse proxy to Jellyfin is with the `reverse-proxy` command:

If you have:

- permission to bind to low ports, and
- a public domain name's DNS records pointed at your machine,

then you can serve over HTTPS easily:

```bash
caddy reverse-proxy --from example.com --to 127.0.0.1:8096
```

You will see Caddy provision a TLS certificate for your site and if it succeeds, you can then access your Jellyfin server over HTTPS with your domain name.

### Caddyfile

If you want to use a config file, create a file called `Caddyfile` for the configuration.
The following config is equivalent to the command above.

```txt
example.com

reverse_proxy 127.0.0.1:8096
```

### Subpath

You can serve Jellyfin only at a particular base path and not proxy all other requests.

To do this, first configure Jellyfin to use a base path.
If you already have access to the web interface, go to `Admin > Networking` and enter a path like `/jellyfin` in the Base URL field.
If not, you may instead go to `<Configuration Directory>/network.xml` and modify the value of `<BaseUrl>` according to your needs. For information on the directory location, please consult the [configuration documentation](/docs/general/administration/configuration#configuration-directory).
You might have to restart the Jellyfin server for this to take effect.
Then simply give the `reverse_proxy` directive a path matcher. The path should be the same as the `Base URL` you entered into Jellyfin's settings. The following example is for a server that is accessible at `example.com/jellyfin`.

```txt
example.com

redir /jellyfin /jellyfin/
reverse_proxy /jellyfin/* 127.0.0.1:8096
```

With that config, Caddy will only proxy requests that start with `/jellyfin/`.
Note the trailing slash - that is optional, but recommended.
