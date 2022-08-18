---
uid: quick-start
title: Quick Start
---

# Quick Start

1. Install Jellyfin on [your system](xref:admin-installing) with the installation method for your platform.

1. Edit the [web configuration](xref:clients-web-config) and adjust the options to fit your desired privacy level.

    * Our defaults sacrifice some absolute self-hosting for often requested features.
    * If this is concerning, please review the documentation and edit accordingly.

1. Browse to `http://SERVER_IP:8096` to access the included web client.

1. Follow the initial setup wizard.

    * Libraries and users can always be added later from the dashboard.
    * Remember the username and password so you can login after the setup.

1. Secure the server with a method of your choice.

    * Create an SSL certificate and add it on the **Networking** page.
    * Put your server behind a [reverse proxy](networking/index.md#running-jellyfin-behind-a-reverse-proxy).
    * Only allow local connections and refrain from forwarding any ports.

1. Enjoy your media!
