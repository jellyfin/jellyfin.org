---
uid: quick-start-windows
title: Windows
---

# Windows Quick Start

## Required Tools and Resources

* A Windows 10/11 PC
* A user account with admin privileges
* An internet connection
* A public IP address
* A text editor (Notepad will work but [Notepad++](https://notepad-plus-plus.org/downloads/) or [VSCode](https://code.visualstudio.com/Download) is recommended)
* A browser that isn't Internet Explorer

## Before you begin

* Connect your PC with ethernet instead of Wi-Fi
* Set your PC to never go to sleep automatically ([Guide](https://support.microsoft.com/en-us/windows/how-to-adjust-power-and-sleep-settings-in-windows-26f623b5-4fcc-4194-863d-b824e5ea7679))
* Show file extensions in Explorer ([Guide](https://www.howtogeek.com/205086/beginner-how-to-make-windows-show-file-extensions/))
* Setup auto login for your user account if you haven't already ([Guide](https://www.lifewire.com/how-do-i-auto-login-to-windows-2626066))
* Make your media files accessible on this computer by this user
* Install latest updates ([Guide](https://support.microsoft.com/en-us/windows/get-the-latest-windows-update-7d20e88c-0568-483a-37bc-c3885390d212))
* Setup remote access (optional). Popular options include [Teamviewer](https://www.teamviewer.com/), [AnyDesk](https://anydesk.com/), [RustDesk](https://rustdesk.com/), [Google Remote Desktop](https://remotedesktop.google.com/) and [Parsec](https://parsec.app/)

## Notes

* How to open a Terminal from current location in Explorer
  * Windows 10
    * Right click on blank space while holding down `Shift`
    * Click `Open PowerShell window here`
  * Windows 11
    * Right click on blank space
    * Click `Open in Windows Terminal` or `Open in Terminal`

## Install Jellyfin

### Install

1. Download installer exe and sha256sum from [the official repo](https://repo.jellyfin.org/releases/server/windows/stable/). The files to download are `installer/jellyfin_x.y.z_windows-x64.exe`.

    ![Windows Download Page](/images/docs/quick-start/windows/jellyfin-0.png)

2. Run and follow the installer. Select `Basic Install` when prompted. Do NOT select `Install as a Service` as it will break certain functions.

    ![Install Option](/images/docs/quick-start/windows/jellyfin-1.png)

3. Close the installer after the install completes.

    ![Installation Complete](/images/docs/quick-start/windows/jellyfin-2.png)

    Installation Complete

4. Look for a Jellyfin icon in your system tray. If it isn't present, search for `Jellyfin Tray App` and run it. No windows will popup after running this application.

    ![Jellyfin Tray App Search](/images/docs/quick-start/windows/jellyfin-3.png)

    Jellyfin Tray App

5. Allow Firewall Access when Prompted

    ![Windows Firewall Prompt](/images/docs/quick-start/windows/jellyfin-4.png)

    Windows Firewall Prompt

6. Open a browser and go to [http://localhost:8096](http://localhost:8096) to finish the setup process. Leave the `Enable automatic port mapping` option unchecked. Jellyfin's automatic port mapping feature uses UPnP, which can be a security risk and may not work on some networks. ([Click here for more about UPnP and security](https://www.upguard.com/blog/what-is-upnp))

    ![Set up Remote Access](/images/docs/quick-start/windows/jellyfin-5.png)

    Remote Access Setup Page

### Hardware Acceleration

Read the dedicated [Hardware Acceleration](/docs/general/administration/hardware-acceleration/) page for how to configure hardware acceleration.

## Reverse Proxy

A reverse proxy is a server that sits in front of other services and forwards client requests to those services according to predefined rules. They are usually used to help increase security, performance and reliability. Some popular options are [Apache](https://httpd.apache.org), [Caddy](https://caddyserver.com), [Haproxy](https://www.haproxy.com), [Nginx](https://www.nginx.com) and [Traefik](https://traefik.io). We are using Caddy in this guide for its simplicity. Info on other reverse proxy solutions can be found at [Running Jellyfin Behind a Reverse Proxy](/docs/general/networking/#running-jellyfin-behind-a-reverse-proxy).

### Router Settings

1. Press `Win + R`, enter `control` and click `OK` to open Control Panel

    ![Run Control](/images/docs/quick-start/windows/router-1.png)

2. Navigate to `Network and Internet > Network and Sharing Center`
3. Click on the `Internet Connection` under `Connections`

    ![Ethernet Connection](/images/docs/quick-start/windows/router-2.png)

4. Click `Details` in the popup and note down the `IPv4 Address` and `IPv4 Default Gateway` values. The `IPv4 Address` is the LAN IP address of your Jellyfin server and the `IPv4 Default Gateway` is usually your Router.

    ![Network Connection Details](/images/docs/quick-start/windows/router-3.png)

5. go to [https://ipv4.icanhazip.com](https://ipv4.icanhazip.com) and note down the IP address

6. Go to the `IPv4 Default Gateway` IP in a browser (for this example, `http://192.168.50.1/`) and Login to your router. If you do not have the credentials, look for them on the bottom of your router or online with the model number of your router

7. Most Routers will show a WAN IP in the index. Check if the WAN IP matches the IP you noted down in step 5. If it doesn't, you do not have a routable IP address. In this case, you should stop following this guide and look for other options for remote access.

    ![ASUS router settings page](/images/docs/quick-start/windows/router-4.png)

    ASUS Router Settings Page

8. Assign your Jellyfin host a static local IP. The option is usually under `LAN` and named `DHCP Server` or `DHCP`. If you assign a different IP than what it currently has, you may need to reconnect the internet of this PC for settings to apply properly. In this case, I am assigning 192.168.50.142 to my PC.

    ![Static DHCP](/images/docs/quick-start/windows/router-5.png)

9. Find `Port Forwarding` settings in your router. This setting is usually under `WAN`, `Firewall`, `Security` or `NAT`and usually named `Port Forwarding` or `Virtual Server`. `Port Trigger` is NOT the setting you are looking for.

10. Forward ports 80 and 443 to the IP you assigned previously

    ![Port Forwarding](/images/docs/quick-start/windows/router-6.png)

### Install Caddy

1. Go to the [official Caddy server download page](https://caddyserver.com/download)
2. Choose `Windows amd64` for the platform and click download. Leave the standard features checkbox checked. You do NOT need any extra features.

    ![Caddy Download](/images/docs/quick-start/windows/caddyinst-1.png)

3. Create a new folder under `C:\Program Files` and name it `caddy`. Confirm the operation if prompted.

    ![Create Caddy folder](/images/docs/quick-start/windows/caddyinst-2.png)

4. move the downloaded exe file to the folder and rename it to `caddy.exe`. Confirm the operation if prompted.

    ![Place Caddy exe](/images/docs/quick-start/windows/caddyinst-3.png)

5. go to `This PC` in Explorer, right click on blank space and click on `properties`

    ![This PC Right Click Menu](/images/docs/quick-start/windows/caddyinst-4.png)

6. Click `Advanced System Settings`. it will be after `Device Specifications` on Windows 11, or in the left sidebar on Windows 10
7. Click on `Environment Variables` in the popup and doubleclick on `Path` under the `User variables for user` in the second popup

    ![Environment Variables](/images/docs/quick-start/windows/caddyinst-5.png)

8. Click on `New` in the popup and enter `C:\Program Files\caddy`, then click `OK` on the bottom right. DO NOT change the other entries as messing with them can result in broken programs and/or a broken system.

    ![New PATH value](/images/docs/quick-start/windows/caddyinst-6.png)

9. Click on `OK` for the other 2 popups to save and apply settings
10. Reboot to make sure settings apply properly

### Test if HTTP is routable

1. Open a terminal and run `caddy respond --body test --listen :80`

    ![Caddy Terminal](/images/docs/quick-start/windows/httptest-1.png)

2. Allow access if prompted by Windows Firewall
3. Your IP may have changed while making the changes in your router. Go to [https://ipv4.icanhazip.com](https://ipv4.icanhazip.com) to get your current public IP address

    ![My IP](/images/docs/quick-start/windows/httptest-2.png)

4. Attempt to access `http://<your IP here>` using another internet connection on another device such as your mobile data. For this case, the IP has changed to `1.171.xxx.xxx` so I will be accessing `http://1.171.xxx.xxx` using my mobile data on my phone.

5. The page should look like the picture below. If it doesn't look this way or fails to connect, your ISP may be blocking incoming http connections or your IP is not routable. In this case, you should stop following this guide and look for other remote access options.

    ![test success ios](/images/docs/quick-start/windows/httptest-3.png)

    Screenshot taken on iOS using Safari

6. Press `Ctrl + C` in the terminal to exit Caddy, then close the terminal.

### DDNS

1. Login to DuckDNS on the top right at the [DuckDNS homepage](https://www.duckdns.org/)
2. Add a new domain in the middle. I am using jellyfintest12345.duckdns.org for this example but you can use anything as long as it hasn't been taken

    ![duckdns dashboard](/images/docs/quick-start/windows/ddns-1.png)

3. Download the latest Windows C# client zip from [its Github releases page](https://github.com/XWolfOverride/DuckDNS/releases)
4. Create a new subfolder under `C:\Program Files` and name it `duckdns`

    ![duckdns folder](/images/docs/quick-start/windows/ddns-2.png)

5. Unzip the downloaded file and move the `DuckDNS.exe` into the folder. Confirm the operation if prompted.

    ![duckdns exe](/images/docs/quick-start/windows/ddns-3.png)

6. Run `DuckDNS.exe`
7. Enter the Domain you just created and the Token from your DuckDNS dashboard, change interval to `5m` and click on `OK`

    ![duckdns client interface](/images/docs/quick-start/windows/ddns-4.png)

8. Make sure that no errors appeared and there is a yellow duck in your system tray. If the duck is red, check your configuration.

9. hit `Win + R`, enter `taskschd.msc` and click `OK`

    ![run task scheduler](/images/docs/quick-start/windows/ddns-5.png)

10. Click on `Create basic task` on the right panel.
11. Enter a descriptive Name and a description, one that you can identify in the future and click next
12. Choose `When I log on` for the Task Trigger and click Next
13. Choose `Start a program` for the Action
14. Enter `C:\Program Files\duckdns\DuckDNS.exe` in the Program/script field

    ![create duckdns task](/images/docs/quick-start/windows/ddns-6.png)

15. Check `Open the Properties dialog` checkbox and click `Finish`

    ![finish wizard](/images/docs/quick-start/windows/ddns-7.png)

16. Go to the `Settings` Pane in the dialog and uncheck the `Stop the task if it runs longer than` checkbox, then click `OK`

    ![duckdns task properties](/images/docs/quick-start/windows/ddns-8.png)

### Reverse Proxy with Caddy

1. Create a text file named `Caddyfile` (Remove the .txt suffix) on your computer. This file is temporary and can be anywhere. You will be asked to confirm if you want to change the file extension, click `Yes`.

    ![file extension change confirmation](/images/docs/quick-start/windows/reverseproxy-1.png)

2. Open the file in a text editor and paste in config from below depending on your needs. Replace `<your (sub)domain here>` with the domain you just created with DuckDNS.
    * if you want your jellyfin instance behind the bare domain (subdomain.example.com / jellyfin.example.com):

        ```Caddyfile
        <your (sub)domain here>
        
        reverse_proxy 127.0.0.1:8096
        ```

    * if you want your jellyfin instance under a subpath (example.com/jellyfin):

        ```Caddyfile
        <your (sub)domain here>

        redir /jellyfin /jellyfin/
        reverse_proxy /jellyfin/* 127.0.0.1:8096
        ```

3. Save the file and close the text editor

4. Copy this file to your caddy folder (the one you created in the Install Caddy section which should be `C:\Program Files\caddy`). Confirm the operation if prompted.

5. If you have chosen to use a subpath for Jellyfin, go to your Jellyfin dashboard (open [http://localhost:8096](http://localhost:8096) on your server, click the 3 bars on the top right then select `Dashboard`) and go to the `Networking` menu on the side bar. Then enter the subpath you have chosen to use and save. Then restart the Jellyfin server (Stop then start the server from the system tray icon)

    ![Networking Settings](/images/docs/quick-start/windows/reverseproxy-2.png)

6. Open a terminal in the caddy folder and run `caddy run`. If there are errors, check your configs and try again. Keep this window running.
7. Go to `http://<your (sub)domain here>` or `http://<your (sub)domain here>/jellyfin` in a browser to test if it is working. You should be able to see the Jellyfin Login Page.
8. hit `Win + R`, enter `taskschd.msc` and click `OK`

    ![run taskschd](/images/docs/quick-start/windows/reverseproxy-3.png)

9. Click on `Create basic task` on the right panel.
10. Enter a descriptive Name and a description, one that you can identify in the future and click next
11. Choose `When I log on` for the Task Trigger and click Next
12. Choose `Start a program` for the Action
13. Enter `"C:\Program Files\caddy\caddy.exe"` in the Program/script field, `run` in the arguments field and `"C:\Program Files\caddy"` in the Start in field, then click Next. The parenthesis are required as the path contains a space.
14. Check Open the Properties dialog checkbox and click Finish

    ![create caddy task](/images/docs/quick-start/windows/reverseproxy-4.png)

15. Go to the Settings Pane in the dialog and uncheck the `Stop the task if it runs longer than` checkbox, then click OK

    ![caddy task propeties](/images/docs/quick-start/windows/reverseproxy-5.png)

16. Reboot to test configuration. There will be a Terminal window open after bootup. This is normal. Keep this window open.

    ![running caddy terminal](/images/docs/quick-start/windows/reverseproxy-6.png)

## External References

* [Official Caddyy Documentation](https://caddyserver.com/docs/)
