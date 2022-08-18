---
uid: network-reverse-proxy-caddy
title: Caddy
---

# Caddy

"[Caddy](https://caddyserver.com/), sometimes clarified as the Caddy web server, is an open source, HTTP/2-enabled web server written in Go. It uses the Go standard library for its HTTP functionality." - [Wikipedia](https://en.wikipedia.org/wiki/Caddy_(web_server))

You can reverse proxy to Jellyfin either with or without a config file, and either method offers automatic HTTPS if you want to use your public domain name.

**If you want HTTPS, make sure your domain name's A/AAAA records are pointed at your public IP address.**

If you aren't familiar with Caddy yet, check out its [Getting Started](https://caddyserver.com/docs/getting-started) guide.

## One-liners

The easiest way to reverse proxy to Jellyfin is with the `reverse-proxy` command:

```bash
caddy reverse-proxy --from :5001 --to 127.0.0.1:8096
```

That is a simple but production-ready plaintext HTTP reverse proxy.

If you have:

- permission to bind to low ports, and
- a public domain name's DNS records pointed at your machine,

then you can serve over HTTPS just as easily:

```bash
caddy reverse-proxy --from example.com --to 127.0.0.1:8096
```

You will see Caddy provision a TLS certificate for your site and if it succeeds, you can then access your Jellyfin server over HTTPS with your domain name.

## Caddyfile

If you want to use a config file, create a file called `Caddyfile` for the configuration.
The first `reverse-proxy` command above is equivalent to the following options.

```txt
:5001

reverse_proxy 127.0.0.1:8096
```

To get HTTPS, simply change the first line to your domain name.

```txt
example.com

reverse_proxy 127.0.0.1:8096
```

### Subpath

You can serve Jellyfin only at a particular base path and not proxy all other requests.

To do this, first configure Jellyfin to use a base path.
If you already have access to the web interface, go to `Admin > Networking` and enter a path like `/jellyfin` in the Base URL field.
If not, you may instead go to `<Configuration Directory>/network.xml` and modify the value of `<BaseUrl>` according to your needs. For information on the directory location, please consult the [configuration documentation](https://jellyfin.org/docs/general/administration/configuration.html#configuration-directory).
You might have to restart the Jellyfin server for this to take effect.
Then simply give the `reverse_proxy` directive a path matcher.

```txt
example.com

reverse_proxy /jellyfin/* 127.0.0.1:8096
```

With that config, Caddy will only proxy requests that start with `/jellyfin/`.
Note the trailing slash - that is optional, but recommended.

## Community Links

- [Windows Guide for Caddy v2](https://www.reddit.com/r/jellyfin/comments/gdwe0s/windows_and_caddy_v2_reverse_proxy_guide)
- [Windows Guide for Caddy v1](https://www.reddit.com/r/jellyfin/comments/ek8ugr/windows_reverse_proxy_guide)
