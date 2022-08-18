---
uid: clients-mopidy
title: Mopidy
---

# Installing Mopidy Extension

The Mopidy Jellyfin extension is available to install from [PyPi](https://pypi.org/project/Mopidy-Jellyfin) using pip.

## General

For general use computers, such as workstations or laptops, it's recommended to install Mopidy extensions in user mode.  Installing python packages from pip using sudo or root permissions can lead to conflicts with your package manager in the future.

1. Install Mopidy using your method of choice using the [official documentation](https://docs.mopidy.com/en/latest/installation/)

2. Install the Jellyfin extension for Mopidy:

    ```sh
    pip3 install --user mopidy-jellyfin
    ```

3. (Optional) Install other mopidy related packages:

    ```sh
    pip3 install --user mopidy-mpd mopidy-musicbox-webclient
    ```

4. Configure your `mopidy.conf` located at `$HOME/.config/mopidy/mopidy.conf`
    See [Config File](xref:clients-mopidy#config-file)

5. There may be a need to install extra `gstreamer` codecs if they're not already on your system, but these are highly variable and depend on your hardware and distro

6. Start the program by running `mopidy` from a terminal

7. See [Usage](xref:clients-mopidy#usage)

## Raspberry Pi (Remote Controlled Speakers)

Utilizing a Raspberry Pi (or other small form factor computer) it's possible to use Mopidy to build a set of standalone smart speakers connected to your Jellyfin server.

1. Grab the latest [raspbian image](https://www.raspberrypi.org/downloads/raspbian/).  Unless you have a need for a GUI, the 'Lite' image is plenty for this project.

2. Install the image to the SD card (See the [official documentation](https://www.raspberrypi.org/documentation/installation/installing-images/README.md))

3. Install Mopidy from their [apt repo](https://docs.mopidy.com/en/latest/installation/debian/#install-from-apt-mopidy-com) to ensure we get the latest version

4. Install required OS packages:

    ```sh
    sudo apt install mopidy mopidy-mpd gstreamer1.0-plugins-bad python3-pip
    ```

5. Install the Jellyfin extension and any other Mopidy related packages you may want:

    ```sh
    sudo pip3 install mopidy-jellyfin mopidy-musicbox-webclient
    ```

6. Configure your `mopidy.conf` located at `/etc/mopidy/mopidy.conf`:
    See [Config File](xref:clients-mopidy#config-file)

7. Enable and start the mopidy service:

    ```sh
    sudo systemctl enable --now mopidy
    ```

8. See [Usage](xref:clients-mopidy#usage)

## Config File

The config file for Mopidy is divided into sections in an INI format. An example for Jellyfin is shown here.

```ini
[jellyfin]
hostname = Jellyfin server hostname
username = username
password = password
libraries = Library1, Library2 (Optional: will default to "Music" if left undefined)
albumartistsort = False (Optional: will default to True if left undefined)
album_format = {ProductionYear} - {Name} (Optional: will default to "{Name}" if left undefined)
```

* `libraries` determines what is populated into Mopidy's internal library (view by Artists/Album/etc).  Using the file browser will show all music or book libraries in the Jellyfin server
* `albumartistsort` changes whether the media library populates based on "Artist" or "Album Artist" metadata
* `album_format` can be used to change the display format of music albums when using the file browser view.  Currently the only really usable fields are ProductionYear and Name

Other options that may be useful to include:

```ini
[mpd]
enabled = true
# Useful if you want to control this instance from a remote MPD client
hostname = 0.0.0.0
port = 6600
# This will help avoid timeout errors for  artists or folders with large amounts of files
connection_timeout = 300

# Used in the event you want to control this system from a web browser
[http]
hostname = 0.0.0.0
port = 6680
```

Be aware that Mopidy provides no security on open ports, so if you'll be running this in a public place you'll likely want to change `0.0.0.0` to `127.0.0.1` to prevent somebody else from hijacking your listening session.

## Usage

Once Mopidy is running, you can connect and control it with your client of choice.  MPD clients will connect using port 6600 by default.  Tested MPD clients include [ncmpcpp](https://github.com/arybczak/ncmpcpp) and [M.A.L.P](https://play.google.com/store/apps/details?id=org.gateshipone.malp).  Web clients can be reached at `http://localhost:6680`, or `http://$IP_ADDRESS:6680` if this is a remote system.

## Upgrading

When a new version of Mopidy Jellyfin is released, you can upgrade via pip using the `--upgrade` flag.

```sh
pip3 install --user --upgrade mopidy-jellyfin
```
