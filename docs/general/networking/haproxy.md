---
uid: network-reverse-proxy-haproxy
title: HAProxy
---

## HAProxy

"[Haproxy](https://www.haproxy.com/) is a free, open source software that provides a high availability load balancer and proxy server for TCP and HTTP-based applications that spreads requests across multiple servers.[1] It is written in C[2] and has a reputation for being fast and efficient (in terms of processor and memory usage)." - [Wikipedia](https://en.wikipedia.org/wiki/HAProxy)

```txt
frontend jellyfin_proxy
    bind *:80

# Note that haproxy requires you to concatenate the certificate and key into a single file
# Uncomment the appropriate lines after you have acquired a SSL Certificate
#
#  HAProxy <1.7
#    bind *:443 ssl crt /etc/ssl/DOMAIN_NAME.pem
#
#  HAProxy >1.8
#    bind *:443 ssl crt /etc/ssl/DOMAIN_NAME.pem alpn h2,http/1.1
#    redirect scheme https if !{ ssl_fc }
#
# Uncomment these lines to allow LetsEncrypt authentication
#    acl letsencrypt_auth path_beg /.well-known/acme-challenge/
#    use_backend letsencrypt if letsencrypt_auth

    acl jellyfin_server hdr(host) -i DOMAIN_NAME
    use_backend jellyfin if jellyfin_server

backend jellyfin
    http-request set-header X-Forwarded-Port %[dst_port]
    http-request add-header X-Forwarded-Proto https if { ssl_fc }
    server jellyfin SERVER_IP_ADDRESS:8096

# Uncomment these lines to allow LetsEncrypt authentication
#
#backend letsencrypt
#    server letsencrypt 127.0.0.1:8888
```
