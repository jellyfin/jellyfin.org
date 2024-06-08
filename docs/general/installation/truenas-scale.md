---
uid: installation-truenas-scale
title: TrueNAS SCALE
description: Install on TrueNAS SCALE.
sidebar_position: 5
---

Jellyfin is available as a [TrueNAS SCALE](https://www.truenas.com/truenas-scale/) community app. The source code for the app is available on the TrueNAS [GitHub](https://github.com/truenas/charts/tree/master/community/jellyfin).

### Notes

- For setup/install/network questions, try the [TrueNAS Forums](https://forums.truenas.com/).
    - Seeking help for TrueNAS SCALE on the [Jellyfin Forums](https://forum.jellyfin.org/) will depened on active forum members having experience with SCALE.
- TrueNAS SCALE is a NAS OS built on Debian that provides an interface to deploy apps. TrueNAS is provided and maintained by [iXsystems](https://www.ixsystems.com/).
    - Up until SCALE v24.04 (Dragonfish), Kubernetes was used to deploy apps.
    - According to [an iXsystems staff member's post](https://forums.truenas.com/t/the-future-of-electric-eel-and-apps/5409), starting with SCALE v24.10 (Electric Eel), Kubernetes will be replaced with Docker to deploy apps on SCALE. You'll be able to use Docker Compose on SCALE. The staff member states for those upgrading their SCALE system to v24.10, any installed community apps (only) will be auto-converted to Docker Compose format. This means custom and 3rd party app deployments on SCALE may need user intervention to reconfigure moving forward. Refer to the container installation guide for further assistance with Docker when the time comes.
    - The steps outlined below apply to SCALE v24.04.

---

## Community App Install Steps

1. After a successful SCALE installation, navigate to the `Apps` section on the left sidebar menu.

2. Choose a storage pool to use for the apps system.

3. In the main Apps page, click on the `Discover Apps` button on the top-right of the page.
    - Note that by default, all apps will only be from the community train unless you install a 3rd party's repo.

4. When the discover page opens, use the search bar to search for `Jellyfin`.

5. Click on the Jellyfin app to open it, then click on the `Install` button to be taken to the setup wizard.

6. In the setup wizard, you will need to:
    - Configure the User and Group ID of the app (if needed)
    - Add additional environment variables (if needed)
    - Configure the `Jellyfin Config Storage` and `Jellyfin Cache Storage` locations
    - Link your media storage as `Additional Storage` under `Storage Configuration`
    - Allocate your GPU (if any) in `Resources Configuration`

7. Scroll down to the bottom of the setup wizard, then click on `Install` to install the Jellyfin app.

8. In the main Apps page, you will be able to use the installed Jellyfin app to launch it in a new browser by clicking on the `Web Portal` button. You can also simply open Jellyfin by using the port number assigned during its creation in a browser (ex: your-truenas-ip:port#).

---

## Custom App Install Steps

TrueNAS SCALE also provides access to deploying custom apps not provided by the community charts. You can use this to deploy a Jellyfin app entirely controlled by you.

1. Follow steps 1 & 2 for the previous community app section.

2. In the main Apps page, click on the `Settings` drop-down button on the top-right of the page. Then click on `Manage Container Images`.

3. In the `Manage Container Images` view, click on `Pull Image` on the top-right of the page.
    - For `Image Name`, enter `jellyfin/jellyfin` to auto-pull from the Docker Hub registry.
        - If you want to pull from another image registry like Jellyfin's GitHub Container Image repo, enter: `ghcr.io/jellyfin/jellyfin`
    - For `Image Tag`, enter `latest` or specify the Jellyfin version you want to pull (ex: `10.9.3`)

4. Save the image and wait for it to fully download onto the system.
    - You can see a list of all your downloaded images in the previous `Manage Container Images` view.

5. Go to the main Apps page, click on `Discover Apps` on the top-right of the page. Then click on `Custom App` on the top-right of the page.

6. In the `Install Custom App` setup wizard, fill out all necessary settings.
    - `Application Name`: Give this app a custom name as accepted by the wizard.
    - `Container Images`
        - `Image repository`: Should be either `jellyfin/jellyfin` or `ghcr.io/jellyfin/jellyfin` depending on how you pulled the image previously.
        - `Image Tag`: Enter `latest` or the Jellyfin version number you pulled earlier.
        - `Image Pull Policy`: Choose how you want the app to handle pulling the Jellyfin image specified if it's no longer present on your system.
    - `Container Environment Variables`: Add your timezone environment variable here
        - Timezone Variable (TZ) - [Wikipedia TZ List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)
            - `Env. Variable Name`: `TZ`
            - `Env. Variable Value`: `America/Los_Angeles`
    - `Port Forwarding`: You're only allowed to port forward to values 9000 and above.
        - `Container Port`: `8096`
        - `Node Port`: `9000`
    - `Storage`: Add your host path volumes here (i.e. link your datasets/folders on the SCALE server to the app)
        - Note: You should at least host mount your Jellyfin config folder here so you can have external access to it.
        - Example for a single host path volume:
            - `Host Path`: `/mnt/<your-path-here>/movies`
            - `Mount Path`: `/movies`
        - `Memory Backed Volumes`: A mount path that will be stored on system RAM. Only use for data that's temporary (i.e. transcode folder).
    - `Resource Reservation`: Allocate your GPU to Jellyfin here (if any)

7. When you're done configuring the custom app, scroll down to the bottom of the setup Wizard and install the app. Wait for the app to start running.

8. Custom apps don't have a `Web Portal` button to take you to the app in a browser. You will have to use the system IP and port number you forwarded to earlier.
