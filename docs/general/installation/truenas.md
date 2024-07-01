---
uid: installation-truenas
title: TrueNAS SCALE
description: Install on TrueNAS SCALE.
sidebar_position: 7
---

Jellyfin can easily be installed on [TrueNAS SCALE](https://www.truenas.com/truenas-scale/) (version 23.10.1 or newer) via the **Community** train application. Consider reviewing the [TrueNAS Apps tutorial](https://www.truenas.com/docs/scale/scaletutorials/apps/) if you have not previously configured applications on your system.

TrueNAS SCALE makes installing Jellyfin easy, but you must use the Jellyfin web portal to configure accounts and manage libraries.

## Introduction and Preparation

The Jellyfin app in TrueNAS SCALE installs, completes the initial configuration, then starts the Jellyfin web portal.
When updates become available, SCALE alerts and provides easy updates.

You can configure environment variables at any time after deploying the application.

SCALE does not need advance preparation.

You can allow SCALE to create the datasets Jellyfin requires automatically during app installation.
Or before beginning app installation, [create the datasets](https://www.truenas.com/docs/scale/scaletutorials/storage/datasets/datasetsscale/) to use in the **Storage Configuration** section during installation.
Jellyfin requires two datasets: **config** and **cache**.
You can organize these as one parent with two child datasets, for example mnt/tank/jellyfin/config, mnt/tank/jellyfin/cache, and so on.
You can choose to create a static **transcodes** dataset or use temporary storage in the disk or memory for transcoding.

If you want to run the application with a user or group other than the default apps (568) user and group, [create them](https://www.truenas.com/docs/scale/scaletutorials/credentials/managelocalusersscale/) now.

## Installing the Jellyfin Application

To install the **Jellyfin** application, go to **Apps**, click **Discover Apps**, either begin typing Jellyfin into the search field or scroll down to locate the **Jellyfin** application widget. You might need to click "Refresh Charts" if no Jellyfin app is showing in the results.

![Jellyfin App Widget](/images/docs/install-truenas-1.png)

Click on the widget to open the **Jellyfin** application details screen.

![Jellyfin App Details Screen](/images/docs/install-truenas-2.png)

Click **Install** to open the Jellyfin application configuration screen.

Application configuration settings are presented in several sections, each explained below.
To find specific fields click in the **Search Input Fields** search field, scroll down to a particular section or click on the section heading on the navigation area in the upper-right corner.

![Install Jellyfin Screen](/images/docs/install-truenas-3.png)

### Application Name Settings

Accept the default value or enter a name in the **Application Name** field.
In most cases use the default name, but if adding a second deployment of the application you must change this name.

Accept the default version number in **Version**.
When a new version becomes available, the application has an update badge.
The **Installed Applications** screen shows the option to update applications.

### Jellyfin Configuration Settings

You can accept the defaults in the **Jellyfin Configuration** settings, or enter the settings you want to use.

![Configuration Settings](/images/docs/install-truenas-6.png)

You can enter a **Published Server URL** for use in UDP autodiscovery, or leave it blank.

If needed, click **Add** to define **Additional Environment Variables**, see [Configuration](https://jellyfin.org/docs/general/administration/configuration/) for options.

### User and Group Settings

You can accept the default value of 568 (apps) in **User ID** and **Group ID** or define your own.

![User and Group Settings](/images/docs/install-truenas-7.png)

This user and group are used for running the Jellyfin container only and cannot be used to log in to the Jellyfin web interface.
Create an admin user in the Jellyfin initial setup wizard to access the UI.

### Networking Settings

Select **Host Network** under **Network Configuration** if using [DLNA](/docs/general/networking/dlna/), to bind network configuration to the host network settings.
Otherwise, leave **Host Network** unselected.

![Networking](/images/docs/install-truenas-8.png)

Accept the default port numbers in **Web Port**.
The SCALE Jellyfin app listens on port **30013**.

Refer to the TrueNAS [default port list](https://www.truenas.com/docs/references/defaultports/) for a list of assigned port numbers.
To change the port numbers, enter a number within the range 9000-65535.

### Storage Settings

Jellyfin requires three app storage datasets for **Jellyfin Config Storage**, **Jellyfin Cache Storage**, and **Jellyfin Transcodes Storage**.
Solid state storage is recommended for config and cache storage.
Do not use the same spinning disk device for both cache and config and media storage libraries.

You can install Jellyfin using the default setting **ixVolume (dataset created automatically by the system)** or use the host path option with datasets [created before installing the app](#introduction-and-preparation).

![Configure Storage ixVolumes](/images/docs/install-truenas-9.png)

Select **Host Path (Path that already exists on the system)** to browse to and select the datasets.

![Configure Storage Host Paths](/images/docs/install-truenas-10.png)

For **Jellyfin Transcodes Storage** select **ixVolume (dataset created automatically by the system)** in **Type** to let SCALE create the dataset, select **Host Path** to use an existing dataset created on the system, or select **emptyDir** to use a temporary storage volume either on the disk or by mounting a tmpfs (RAM-backed filesystem) directory for storing transcode files.

#### Mounting Additional Storage

Click **Add** next to **Additional Storage** to add the media library storage path(s) on your system.

![Additional Storage](/images/docs/install-truenas-11.png)

Select **Host Path (Path that already exists on the system)** or **SMB Share (Mounts a persistent volume claim to a SMB share)** in **Type**.
You can select **iXvolume (dataset created automatically by the system)** to create a new library dataset, but this is not recommended.

Mounting an SMB share allows data synchronization between the share and the app.
The SMB share mount does not include ACL protections at this time. Permissions are currently limited to the permissions of the user that mounted the share. Alternate data streams (metadata), finder colors tags, previews, resource forks, and MacOS metadata is stripped from the share along with filesystem permissions, but this functionality is undergoing active development and implementation planned for a future TrueNAS SCALE release.

For all types, enter a **Mount Path** to be used within the Jellyfin container.
For example, the local **Host Path** /mnt/tank/video/movies could be assigned the **Mount Path** /media/movies.

<details>
  <summary>Additional Storage Fields</summary>

  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Field</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>All</td>
        <td>Mount Path</td>
        <td>The virtual path to mount the storage within the container.</td>
      </tr>
      <tr>
        <td>Host Path</td>
        <td>Host Path</td>
        <td>The local path to an existing dataset on the System.</td>
      </tr>
      <tr>
        <td>ixVolume</td>
        <td>Dataset Name</td>
        <td>The name for the dataset the system creates.</td>
      </tr>
      <tr>
        <td>SMB Share</td>
        <td>Server</td>
        <td>The server for the SMB share.</td>
      </tr>
      <tr>
        <td>SMB Share</td>
        <td>Share</td>
        <td>The name of the share.</td>
      </tr>
      <tr>
        <td>SMB Share</td>
        <td>Domain (Optional)</td>
        <td>The domain for the SMB share.</td>
      </tr>
      <tr>
        <td>SMB Share</td>
        <td>Username</td>
        <td>The user name used to access the SMB share.</td>
      </tr>
      <tr>
        <td>SMB Share</td>
        <td>Password</td>
        <td>The password for the SMB share user.</td>
      </tr>
      <tr>
        <td>SMB Share</td>
        <td>Size (in Gi)</td>
        <td>The quota size for the share volume. You can edit the size after deploying the application if you need to increase the storage volume capacity for the share.</td>
      </tr>
    </tbody>
  </table>
</details>

### Resource Configuration Settings

Accept the default values in **Resources Configuration** or enter new CPU and memory values
By default, this application is limited to use no more than 4 CPU cores and 8 gibibytes available memory.

![Resource Limits](/images/docs/install-truenas-12.png)

To customize the CPU and memory allocated to the container Jellyfin uses, enter new CPU values as a plain integer value followed by the suffix m (milli).
Default is 4000m, which means Jellyfin is allowed to use 4 CPU threads.

Accept the default value 8Gi allocated memory or enter a new limit.
Enter a plain integer followed by the measurement suffix, for example 4G.

Systems with compatible GPU(s) display devices in **GPU Configuration**.
Use the **GPU Resource** dropdown menu(s) to configure device allocation.

See [Allocating GPUs](https://www.truenas.com/docs/scale/scaletutorials/apps/#allocating-gpu) for more information about allocating GPU devices in TrueNAS SCALE.

## Finalizing Install

Click **Install**.

A container launches with root privileges to apply the correct permissions to the Jellyfin directories.
Afterward, the Jellyfin container runs as a non-root user (default: 568).
Configured storage directory ownership is changed if the parent directory does not match the configured user.

The system opens the **Installed Applications** screen with the Jellyfin app in the **Deploying** state.
When the installation completes it changes to **Running**.

![Jellyfin Installed](/images/docs/install-truenas-4.png)

Click **Web Portal** on the **Application Info** widget to open the Jellyfin web interface initial setup wizard to set up your admin account and begin administering libraries.

![Jellyfin Web Portal](/images/docs/install-truenas-5.png)

## Editing the Jellyfin Application

Go to the **Installed Applications** screen and select Jellyfin from the list of installed applications.
Click **Edit** on the **Application Info** widget to open the **Edit Jellyfin** screen.
The settings on the edit screen are the same as on the install screen.
You cannot edit **Storage Configuration** paths after the initial app install.

Click **Update** to save changes.
TrueNAS automatically updates, recreates, and redeploys the Jellyfin container with the updated environment variables.
