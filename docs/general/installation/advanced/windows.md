---
uid: installation-advanced-windows
title: Windows Service
description: Installing Jellyfin as a Windows Service.
sidebar_position: 5
---

## Installing Jellyfin as a Windows Service

:::note
While a standard installation is recommended for most users, installing Jellyfin as a service is ideal for dedicated servers. This allows Jellyfin to start automatically at boot and remain active even when no users are logged into the system.
:::  

Running as a **Network Service** is preferred over **Local System** for the principle of least privilege. Follow these steps to ensure proper access without over-provisioning permissions.

### Installing as a Service

1. In the Windows installer, select **Install as a Service**.
2. Choose the default install path, `C:\Program Files\Jellyfin\Server`.
3. Choose the default data path, `C:\ProgramData\Jellyfin\Server`.
4. Choose **Use Network Service account** for the account type.
5. Uncheck **Start Service after Install**.
6. Click **Install**.

### Configure Service Account Permissions

The service account needs access to Jellyfin's configuration files.

1. Navigate to `C:\ProgramData\`.
2. Right-click the **Jellyfin** folder, and click **Properties** > **Security** > **Advanced**.
3. Beside **Owner**, click **Change**, and enter `NETWORK SERVICE` in the text box. Click **OK**.
4. Click **Add** under Principal. Click **Select a principal** and enter `NETWORK SERVICE` in the text box. Click **OK**.
5. Under **Basic permissions** for the new principal, choose one of the following based on your security preference, then Click **OK**.
    * **Modify**: Allows Jellyfin to read, write, and delete its own data without granting it the power to change system permissions.
    * **Full Control**: Easiest for setup. Grants all rights, including the ability to change owner and permissions.
6. Check the option **Replace all child object permission entries...**. Click **Apply**.
7. Exit the menu.

### Configure Media Library Permissions

After setting up a media folder, you should grant the service account read & execute access to that folder to prevent "Path not found" errors. 

1. Right-click your media folder, and click **Properties** > **Security** > **Advanced**.
2. Click **Add** under Principal. Click **Select a principal** and enter `NETWORK SERVICE` in the text box. Click **OK**.
3. Under **Basic permissions** for the new principal, choose based on how you want Jellyfin to interact with your files, then Click **OK**.
    * **Read & execute** (Recommended): Allows Jellyfin to see and play your media. This is the safest option as it prevents the server from accidentally deleting or modifying your original movie files.
    * **Modify**: Required only if you want to use `Delete` from within the Jellyfin UI, or if you want Jellyfin to save subtitles and `.nfo` metadata files directly into your movie folders.
    * **Full Control**: Not recommended for media folders. This grants administrative rights that the service does not need for playback.
4. Check the option **Replace all child object permission entries...**. Click **Apply**.
5. Exit the menu.

### Verify and Initialize

1. Press **Windows**+**R** and type "services.msc". Hit **Enter**.
2. Find the **Jellyfin Server** service and verify the "Log On As" column shows **Network Service**.
3. Right-click **Jellyfin Server** service and select **Start**.
4. Navigate to http://localhost:8096 to complete the wizard.

:::tip
If libraries appear empty during the wizard, ensure the `NETWORK SERVICE` has at least "List folder contents" permissions on any parent directories leading to your media folder.
:::

:::info
To allow remote access to Jellyfin server, add a firewall rule that accepts `inbound` traffic for port `8096`.
:::