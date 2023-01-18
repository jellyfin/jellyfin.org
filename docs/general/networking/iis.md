---
uid: network-reverse-proxy-iis
title: IIS
---

## IIS

"[Internet Information Services](https://www.iis.net) is an extensible web server software created by Microsoft for use with the Windows NT family. IIS supports HTTP, HTTP/2, HTTPS, FTP, FTPS, SMTP and NNTP. It has been an integral part of the Windows NT family since Windows NT 4.0" - [Wikipedia](https://en.wikipedia.org/wiki/Internet_Information_Services)

## Requirements

IIS with default selections + Application Development->WebSocket Protocol (minimal)

[URL Rewrite 2.1](https://www.iis.net/downloads/microsoft/url-rewrite)

[Application Request Routing 3.0](https://www.iis.net/downloads/microsoft/application-request-routing)

## Configure

```
Set-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/proxy" -name "enabled" -value "True"
Set-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/proxy/cache" -name "enabled" -value "False"
Set-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/proxy" -name "httpVersion" -value "Http11"
Set-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/proxy" -name "preserveHostHeader" -value "True"
Add-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/rewrite/allowedServerVariables" -name "." -value @{name='HTTP_X_FORWARDED_PROTOCOL'}
Add-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/rewrite/allowedServerVariables" -name "." -value @{name='HTTP_X_FORWARDED_PROTO'}
Add-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/rewrite/allowedServerVariables" -name "." -value @{name='HTTP_X_REAL_IP'}
Add-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/rewrite/allowedServerVariables" -name "." -value @{name='HTTP_X_FORWARDED_HOST'}
Add-WebConfigurationProperty -pspath 'MACHINE/WEBROOT/APPHOST'  -filter "system.webServer/rewrite/allowedServerVariables" -name "." -value @{name='HTTP_X_FORWARDED_PORT'}
```
## web.config
```config
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <clear />
                <rule name="Redirect to https" enabled="false" stopProcessing="true">
                    <match url="*" negate="false" />
                    <conditions logicalGrouping="MatchAny" trackAllCaptures="false">
                        <add input="{HTTPS}" pattern="off" />
                    </conditions>
                    <action type="Redirect" url="https://{HTTP_HOST}{REQUEST_URI}" redirectType="Found" />
                </rule><!-- These rules add X-Forwarded-Protocol -->
                <rule name="ForwardedHttps">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
                        <add input="{HTTPS}" pattern="On" />
                    </conditions>
                    <serverVariables>
                        <set name="HTTP_X_FORWARDED_PROTOCOL" value="https" />
                        <set name="HTTP_X_FORWARDED_PROTO" value="https" />
                    </serverVariables>
                </rule>
                <rule name="ForwardedHttp">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
                        <add input="{HTTPS}" pattern="Off" />
                    </conditions>
                    <serverVariables>
                        <set name="HTTP_X_FORWARDED_PROTOCOL" value="http" />
                        <set name="HTTP_X_FORWARDED_PROTO" value="http" />
                    </serverVariables>
                </rule><!-- proxy to Jellyfin -->
                <rule name="Proxy">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false">
                        <add input="/{R:0}" pattern=".well-known" negate="true" />
                    </conditions>
                    <serverVariables>
                        <set name="HTTP_X_REAL_IP" value="{REMOTE_ADDR}" />
                        <set name="HTTP_X_FORWARDED_HOST" value="{HTTP_HOST}" />
                        <set name="HTTP_X_FORWARDED_PORT" value="{SERVER_PORT}" />
                    </serverVariables>
                    <action type="Rewrite" url="http://localhost:8096/{R:0}" logRewrittenUrl="true" />
                </rule>
            </rules>
		  <outboundRules><!-- Add Cache -->
                <rule name="Add Cache" preCondition="images" enabled="true" patternSyntax="ECMAScript">
                    <match serverVariable="RESPONSE_Cache_Control" pattern="(.*)" />
                    <action type="Rewrite" value="max-age=604800" />
                </rule>
             <preConditions><!-- Pre-Condition for images -->
			<preCondition name="images" logicalGrouping="MatchAny">
                        <add input="{REQUEST_URI}" pattern="Items/.+/Images/.*" />
                        <add input="{RESPONSE_CONTENT_TYPE}" pattern="^image/.+" />
			</preCondition>
        </preConditions>
      </outboundRules>
        </rewrite>
        <caching enabled="false" enableKernelCache="false" />
        <httpProtocol>
            <customHeaders>
				<clear />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="X-Content-Type-Options" value="nosniff" />
				<add name="Cache-Control" value="no-cache" />
				<add name="X-Frame-Options" value="SAMEORIGIN" />
				<add name="X-Robots-Tag" value="noindex, nofollow" />
            </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>

```

## SSL

[CertifytheWeb](https://certifytheweb.com/); a very easy to use UI for getting certificates
