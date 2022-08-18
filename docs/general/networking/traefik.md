---
uid: network-reverse-proxy-traefik
title: Traefik v1.x
---

## Traefik v1.x

[Traefik](https://traefik.io/) is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy. Traefik integrates with your existing infrastructure components (Docker, Swarm mode, Kubernetes, Marathon, Consul, Etcd, Rancher, Amazon ECS, ...) and configures itself automatically and dynamically. Pointing Traefik at your orchestrator should be the only configuration step you need. This configuration is A+. Test your setup here at [SSLlabs](https://www.ssllabs.com/ssltest/).

Create docker-compose.yml, traefik.toml and acme.json in the **same** directory or change their paths in the volume section.

> [!NOTE]
> Ensure you enable Basic Auth protection for Traefik or disable its Dashboard. Otherwise your Dashboard will be accessible from the internet.

```bash
sudo apt install apache2-utils
echo $(htpasswd -nb username mystrongpassword) | sed -e s/\\$/\\$\\$/g
```

This command automatically escapes all $ inside the password for the YML file. If using an environment file, it does not need the $ escaped since it will not be interpreted by the shell.

Create the docker network for traefik.

```bash
sudo docker network create traefik
```

### docker-compose.yml

```yml
version: '3.5'
networks:
  traefik:
    name: traefik
services:
  traefik:
    container_name: traefik
    image: traefik:v1.7
    networks:
      - traefik
    ports:
      - 80:80
      - 443:443
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik.toml:/traefik.toml
      - ./acme.json:/acme.json
    labels:
      traefik.enable: "true"
      traefik.backend: traefik
      traefik.docker.network: traefik
      traefik.port: 8080
      traefik.frontend.rule: Host:traefik.example.com,
      traefik.frontend.entryPoints: https
      traefik.frontend.passHostHeader: "true"
      traefik.frontend.headers.SSLForceHost: "true"
      traefik.frontend.headers.SSLHost: traefik.example.com
      traefik.frontend.headers.SSLRedirect: "true"
      traefik.frontend.headers.browserXSSFilter: "true"
      traefik.frontend.headers.contentTypeNosniff: "true"
      traefik.frontend.headers.forceSTSHeader: "true"
      traefik.frontend.headers.STSSeconds: 315360000
      traefik.frontend.headers.STSIncludeSubdomains: "true"
      traefik.frontend.headers.STSPreload: "true"
      traefik.frontend.headers.customResponseHeaders: X-Robots-Tag:noindex,nofollow,nosnippet,noarchive,notranslate,noimageindex
      traefik.frontend.headers.frameDeny: "true"
      traefik.frontend.headers.customFrameOptionsValue: 'allow-from https://example.com'
#     traefik.frontend.auth.basic.users: xxx:xxx
    restart: unless-stopped

  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    network_mode: "host"
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - /path/to/media:/media
    restart: unless-stopped
```

This TOML file can't support environment variables, so don't attempt to use variables.

> [!WARNING]
> Due to a [bug](https://github.com/containous/traefik/issues/5559) in Traefik, you cannot dynamically route to containers when network_mode=host, so we have created a static route to the docker host (172.17.0.1:8096) in `traefik.toml`. Using host networking (or macvlan) is required to use DLNA or an HdHomeRun as it supports multicast networking.

### traefik.toml

```toml
logLevel = "WARN"
defaultEntryPoints = ["http", "https"]

[entryPoints]
  [entryPoints.http]
  address = ":80"
    [entryPoints.http.redirect]
    entryPoint = "https"
  [entryPoints.https]
  address = ":443"
    [entryPoints.https.tls]
    minVersion = "VersionTLS12"
    cipherSuites = [
      "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
      "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
      "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305",
      "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305",
      "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
      "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
      "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256",
      "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256"
    ]

[retry]

[api]

[acme]
acmeLogging = true
email = "user@example.com"
storage = "acme.json"
entryPoint = "https"
  [acme.dnsChallenge]
    provider = "provider"
    delayBeforeCheck = "60"

[[acme.domains]]
  main = "*.example.com"

[docker]
domain = "example.com"
network = "traefik"
exposedbydefault = false

[file]
[backends]
  [backends.backend-jellyfin]
    [backends.backend-jellyfin.servers]
      [backends.backend-jellyfin.servers.server-1]
        url = "http://172.17.0.1:8096"
[frontends]
  [frontends.jellyfin]
    backend = "backend-jellyfin"
    passHostHeader = true
    [frontends.jellyfin.routes]
      [frontends.jellyfin.routes.route-jellyfin-ext]
        rule = "Host:jellyfin.example.com"
    [frontends.jellyfin.headers]
      SSLRedirect = true
      SSLHost = "jellyfin.example.com"
      SSLForceHost = true
      STSSeconds = 315360000
      STSIncludeSubdomains = true
      STSPreload = true
      forceSTSHeader = true
      frameDeny = true
      contentTypeNosniff = true
      browserXSSFilter = true
      customResponseHeaders = "X-Robots-Tag:noindex,nofollow,nosnippet,noarchive,notranslate,noimageindex"
      customFrameOptionsValue = "allow-from https://example.com"
```

Finally, create an empty acme.json file to handle the certificate.

```bash
touch acme.json
chmod 600 acme.json
```

> [!WARNING]
> Change example.com to your domain name and update the acme.json file with your email address. Let's Encrypt does not require a valid email but example.com will be flagged as fake.

Launch the Traefik and Jellyfin services.

```bash
docker-compose up -d
```

Congratulations, your stack with Traefik and Jellyfin is running!

Go to the domain you used earlier in the config file and your Jellyfin server will be running with HTTPS (AES 256) enabled.
