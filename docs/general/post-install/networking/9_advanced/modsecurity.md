---
uid: network-modsecurity
title: ModSecurity
---

[OWASP ModSecurity](https://github.com/owasp-modsecurity/ModSecurity) ModSecurity is an open source, cross-platform web application firewall (WAF) module. Known as the “Swiss Army Knife” of WAFs, it enables web application defenders to gain visibility into HTTP(S) traffic and provides a power rules language and API to implement advanced protections

[OWASP CRS](https://github.com/coreruleset/coreruleset) The OWASP CRS is a set of generic attack detection rules for use with ModSecurity or compatible web application firewalls. The CRS aims to protect web applications from a wide range of attacks, including the OWASP Top Ten, with a minimum of false alerts

Here some custom rules to add to OWASP CRS to allow Jellyfin to work correctly (tested with the release [v4.23.0](https://github.com/coreruleset/coreruleset/releases/tag/v4.23.0))
```
# Allow /web/config.json
SecRule REQUEST_URI "@streq /web/config.json" \
  "id:6879100,\
  phase:1,\
  t:none,\
  pass,\
  nolog,\
  ctl:ruleEngine=Off,\
  ver:'JELLYFIN_CRS/1.0.0'"

# Allow user image uploads (POST /Users/{id}/Images/Primary)
SecRule REQUEST_URI "@rx ^/Users/[a-f0-9]+/Images/Primary$" \
  "id:6879101,\
  phase:1,\
  t:none,\
  pass,\
  nolog,\
  ctl:ruleEngine=Off,\
  ver:'JELLYFIN_CRS/1.0.0'"

# Allow branding image uploads (POST /Branding/Splashscreen)
SecRule REQUEST_URI "@rx ^/Branding/Splashscreen$" \
  "id:6879102,\
  phase:1,\
  t:none,\
  pass,\
  nolog,\
  ctl:ruleEngine=Off,\
  ver:'JELLYFIN_CRS/1.0.0'"

# Allow /web/node_modules.history.bundle.js
SecRule REQUEST_URI "@rx ^/web/node_modules.history.bundle.js" \
  "id:6879103,\
  phase:1,\
  t:none,\
  pass,\
  nolog,\
  ctl:ruleEngine=Off,\
  ver:'JELLYFIN_CRS/1.0.0'"

# Skip ModSecurity for video segments and manifests
SecRule REQUEST_FILENAME "^/videos/.*\.(ts|m3u8|mp4|mkv|webm)$" \
  "id:6879104,\
  phase:1,\
  t:none,\
  pass,\
  nolog,\
  ctl:ruleEngine=Off,\
  ver:'JELLYFIN_CRS/1.0.0'"
```
