---
uid: installation-windows
title: Windows
description: Installing on Windows.
sidebar_position: 1
---

<!-- markdownlint-disable MD036 no-emphasis-as-heading -->

## Installing on Windows

1. Download the latest version installer from [the downloads page](/downloads/windows).
2. Run the installer.
3. (Optional) When installing as a service (not recommended), pick the service account type.
4. If everything was completed successfully, Jellyfin is now running.
5. Open your browser at [http://your_local_IP_address:8096](http://your_local_IP_address:8096) to finish setting up Jellyfin.

## Updating on Windows

1. Download the latest version installer from [the downloads page](/downloads/windows).
2. Close or Stop Jellyfin from the tray app if it is running.
3. Run the installer.
4. If everything was completed successfully, the new version is installed.

## Uninstalling on Windows

1. Go to [Add or remove programs](https://support.microsoft.com/en-us/windows/uninstall-or-remove-apps-and-programs-in-windows-4b55f974-2cc6-2d2b-d092-5905080eaf98) in Windows settings.
2. Search for Jellyfin.
3. Click Uninstall.

## Installing Jellyfin as a Windows Service (Advanced)

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
5. Under **Basic permissions** for the new principal, select the **Full Control** option. Click **OK**.
6. Check the option **Replace all child object permission entries...**. Click **Apply**.
7. Exit the menu.

### Configure Media Library Permissions

After setting up a media folder, you should grant the service account read-only access to that folder to prevent "Path not found" errors. 

1. Right-click your media folder > **Properties** > **Security** > **Advanced**.
2. **Add Principal:** `NETWORK SERVICE`.
3. **Permissions:**
   * **Basic:** Read & execute, List folder contents, Read.
4. **Inheritance:** Check **"Replace all child object permission entries..."**
5. **Apply** and exit.

### Verify and Initialize

1. Press **Windows**+**R** and type "services.msc". Hit **Enter**.
2. Find the **Jellyfin Server** service and verify the "Log On As" column shows **Network Service**.
3. Right-click **Jellyfin Server** service and select **Start**.
4. Navigate to http://localhost:8096 to complete the wizard.

> [!TIP]
> If libraries appear empty, ensure the `NETWORK SERVICE` has at least "List Folder" permissions on any parent directories leading to your media folder.

> [!NOTE]
> To allow remote access to Jellyfin server, add a firewall rule that accepts `inbound` traffic for port `8096`.
