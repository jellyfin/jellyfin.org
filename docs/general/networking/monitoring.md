---
uid: monitoring
title: Monitoring
---

## Monitoring

Jellyfin has two monitoring and metrics endpoints built-in: a basic health check endpoint and a Prometheus-compatible metrics endpoint.

### Health check endpoint

Jellyfin exposes the `/health` endpoint designated for checking the status of the underlying service. Currently this will verify HTTP and database connectivity and return a `200 OK` response if successful. You can see this for yourself by using `curl`:

```sh
curl -i http://myserver:8096/health
```

The `-i` option tells `curl` to also print the HTTP response code and headers.

### Prometheus metrics

Jellyfin can make [Prometheus](https://prometheus.io/) metrics available at `/metrics`, but this is turned off by default to avoid unintentionally leaking this information on the public internet. To enable it, you will need to edit `/etc/jellyfin/system.xml` and change this line from `false` to `true`:

```xml
<EnableMetrics>false</EnableMetrics>
```

If you have a [reverse proxy](xref:network-index#running-jellyfin-behind-a-reverse-proxy) configured, you can configure it to block access to the `/metrics` endpoint except for your internal network.
