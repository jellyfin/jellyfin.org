---
uid: network-ipban
title: IPBan
---

## IPBan

[IPBan](https://github.com/DigitalRuby/IPBan) is an intrusion prevention much like fail2ban, but multi-platform

Install with one command on windows (elevated powershell prompt)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/DigitalRuby/IPBan/master/IPBanCore/Windows/Scripts/install_latest.ps1'))
```

Config

```config
<LogFile>

        <Source>Jellyfin</Source>
        <PathAndMask>
          C:/ProgramData/Jellyfin/Server/log/log_{year-local}{month-local}{day-local}.log
        </PathAndMask>
        <FailedLoginRegex>
          <![CDATA[
              Authentication\s+request\s+for\s+\S+?(?<username>[^\s]+)\S+\s+has\s+been\s+(?<log>denied)\s+\(IP:\s+"(?<ipaddress>[^,"\s]+)"\)
          ]]>
        </FailedLoginRegex>
        <SuccessfulLoginRegex>
          <![CDATA[
              Authentication\s+request\s+for\s+\S+?(?<username>[^\s]+)\S+\s+has\s+succeeded
          ]]>
        </SuccessfulLoginRegex>
        <PlatformRegex>Windows</PlatformRegex>
        <PingInterval>10000</PingInterval>
        <MaxFileSize>16777216</MaxFileSize>
        <FailedLoginThreshold>0</FailedLoginThreshold>

</LogFile>
```
