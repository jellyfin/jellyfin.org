import React, { ReactNode } from 'react';

import Platform from './platform';

export enum DownloadStatus {
  Official,
  Community,
  OsPackage
}

export enum Feature {
  CustomFFmpeg
}

export enum OsType {
  Docker,
  Linux,
  MacOS,
  Windows
}

export type Button = {
  id: string;
  name?: string;
  url?: string;
  details?: ReactNode;
};

export type Download = {
  id: string;
  name: string;
  description: ReactNode;
  osTypes: Array<OsType>;
  status: DownloadStatus;
  features: Array<Feature>;
  platforms: Array<Platform>;
  stableButtons: Array<Button>;
  unstableButtons: Array<Button>;
  otherButtons: Array<Button>;
};

export const Downloads: Array<Download> = [
  {
    id: 'debian',
    name: 'Debian and Ubuntu',
    osTypes: [OsType.Linux],
    status: DownloadStatus.Official,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Debian, Platform.Ubuntu],
    description: 'Install Jellyfin via our APT repository or via manual archives (.deb).',
    stableButtons: [
      {
        id: 'debian-stable-button',
        name: 'Install Instructions',
        details: (
          <>
            <pre>
              <code>
                {`sudo apt install curl gnupg
sudo mkdir /etc/apt/keyrings
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )
Suites: $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )
Components: main
Arch: $( dpkg --print-architecture )
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF
sudo apt update
sudo apt install jellyfin`}
              </code>
            </pre>
            <p>
              <b>Note:</b> The third command should give you output similar to{' '}
              <code>deb [arch=(architecture)] https://repo.jellyfin.org/(distribution) (release) main</code>. We support{' '}
              <code>amd64</code>, <code>armhf</code>, and <code>arm64</code> for architectures, <code>debian</code> and{' '}
              <code>ubuntu</code> for distributions, <code>buster</code> and <code>bullseye</code> for Debian releases
              and <code>bionic</code>, <code>focal</code>, <code>impish</code> and <code>jammy</code> for Ubuntu
              releases. If you see something different in your output, you might need to manually modify it. Use the
              closest equivalent Debian or Ubuntu version instead.
            </p>
            <p className='margin-bottom--none'>
              Once installed, Jellyfin will be running as a service. Manage it with{' '}
              <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
              <code>{'sudo service jellyfin {action}'}</code>.
            </p>
          </>
        )
      }
    ],
    unstableButtons: [
      {
        id: 'debian-unstable-button',
        name: 'Install Instructions',
        details: (
          <>
            <pre>
              <code>
                {`sudo apt install curl gnupg
sudo mkdir /etc/apt/keyrings
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )
Suites: $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )
Components: main unstable
Arch: $( dpkg --print-architecture )
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF
sudo apt update
sudo apt install jellyfin`}
              </code>
            </pre>
            <p>
              <b>Note:</b> The third command should give you output similar to{' '}
              <code>deb [arch=(architecture)] https://repo.jellyfin.org/(distribution) (release) main</code>. We support{' '}
              <code>amd64</code>, <code>armhf</code>, and <code>arm64</code> for architectures, <code>debian</code> and{' '}
              <code>ubuntu</code> for distributions, <code>buster</code> and <code>bullseye</code> for Debian releases
              and <code>bionic</code>, <code>focal</code>, <code>impish</code> and <code>jammy</code> for Ubuntu
              releases. If you see something different in your output, you might need to manually modify it. Use the
              closest equivalent Debian or Ubuntu version instead.
            </p>
            <p>
              <b>Note:</b> Both the <code>main</code> and <code>unstable</code> are needed as the{' '}
              <code>jellyfin-ffmpeg</code> package is only in the <code>main</code> component.
            </p>
            <p className='margin-bottom--none'>
              Once installed, Jellyfin will be running as a service. Manage it with{' '}
              <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
              <code>{'sudo service jellyfin {action}'}</code>.
            </p>
          </>
        )
      }
    ],
    otherButtons: [
      {
        id: 'debian-all-link',
        name: 'All Debian Versions',
        url: 'https://repo.jellyfin.org/releases/server/debian/versions'
      },
      {
        id: 'ubuntu-all-link',
        name: 'All Ubuntu Versions',
        url: 'https://repo.jellyfin.org/releases/server/ubuntu/versions'
      }
    ]
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    osTypes: [OsType.Linux],
    status: DownloadStatus.Community,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Arch],
    description: 'Install Jellyfin via the Arch User Repository.',
    stableButtons: [
      {
        id: 'arch-stable-button',
        name: 'Install Instructions',
        details: (
          <pre className='margin-bottom--none'>
            <code>
              {`git clone https://aur.archlinux.org/jellyfin.git
cd jellyfin
makepkg -si`}
            </code>
          </pre>
        )
      }
    ],
    unstableButtons: [
      {
        id: 'arch-unstable-button',
        name: 'Install Instructions',
        details: (
          <pre className='margin-bottom--none'>
            <code>
              {`git clone https://aur.archlinux.org/jellyfin-git.git
cd jellyfin-git
makepkg -si`}
            </code>
          </pre>
        )
      }
    ],
    otherButtons: [
      {
        id: 'arch-aur-link',
        name: 'AUR',
        url: 'https://aur.archlinux.org/packages/?K=jellyfin'
      }
    ]
  },
  {
    id: 'fedora',
    name: 'Fedora and CentOS',
    osTypes: [OsType.Linux],
    status: DownloadStatus.Official,
    features: [],
    platforms: [Platform.Fedora, Platform.CentOS],
    description: 'RPM archives for both Fedora and CentOS are provided.',
    stableButtons: [
      {
        id: 'fedora-stable-link',
        name: 'Fedora Downloads',
        url: 'https://repo.jellyfin.org/releases/server/fedora/stable'
      },
      {
        id: 'centos-stable-link',
        name: 'CentOS Downloads',
        url: 'https://repo.jellyfin.org/releases/server/centos/stable'
      }
    ],
    unstableButtons: [
      {
        id: 'fedora-unstable-link',
        name: 'Fedora Downloads',
        url: 'https://repo.jellyfin.org/releases/server/fedora/unstable'
      },
      {
        id: 'centos-unstable-link',
        name: 'CentOS Downloads',
        url: 'https://repo.jellyfin.org/releases/server/centos/unstable'
      }
    ],
    otherButtons: [
      {
        id: 'fedora-all-link',
        name: 'All Fedora Versions',
        url: 'https://repo.jellyfin.org/releases/server/fedora/versions'
      },
      {
        id: 'centos-all-link',
        name: 'All CentOS Versions',
        url: 'https://repo.jellyfin.org/releases/server/centos/versions'
      }
    ]
  },
  {
    id: 'gentoo',
    name: 'Gentoo Linux',
    osTypes: [OsType.Linux],
    status: DownloadStatus.OsPackage,
    features: [],
    platforms: [Platform.Gentoo],
    description: 'Install Jellyfin via the Gentoo Repository.',
    stableButtons: [
      {
        id: 'gentoo-stable-button',
        name: 'Install Instructions',
        details: (
          <>
            <pre>
              <code>emerge www-apps/jellyfin</code>
            </pre>
            <p className='margin-bottom--none'>
              Once installed, Jellyfin will be running as a service. Manage it with{' '}
              <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
              <code>{'sudo rc-service jellyfin {action}'}</code>
            </p>
          </>
        )
      }
    ],
    unstableButtons: [],
    otherButtons: []
  },
  {
    id: 'generic-linux',
    name: 'Generic Linux',
    osTypes: [OsType.Linux],
    status: DownloadStatus.Official,
    features: [],
    platforms: [Platform.Linux],
    description: 'Linux self-contained binary TAR archives (.tar.gz) are provided.',
    stableButtons: [{ id: 'linux-stable-link', url: 'https://repo.jellyfin.org/releases/server/linux/stable' }],
    unstableButtons: [{ id: 'linux-unstable-link', url: 'https://repo.jellyfin.org/releases/server/linux/unstable' }],
    otherButtons: [{ id: 'linux-all-link', url: 'https://repo.jellyfin.org/releases/server/linux/versions' }]
  },
  {
    id: 'windows',
    name: 'Windows',
    osTypes: [OsType.Windows],
    status: DownloadStatus.Official,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Windows],
    description: 'Both installers (.exe) and manual ZIP archives (.zip) are provided.',
    stableButtons: [{ id: 'windows-stable-link', url: 'https://repo.jellyfin.org/releases/server/windows/stable' }],
    unstableButtons: [
      { id: 'windows-unstable-link', url: 'https://repo.jellyfin.org/releases/server/windows/unstable' }
    ],
    otherButtons: [{ id: 'windows-all-link', url: 'https://repo.jellyfin.org/releases/server/windows/versions' }]
  },
  {
    id: 'macos',
    name: 'MacOS',
    osTypes: [OsType.MacOS],
    status: DownloadStatus.Official,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.MacOS],
    description: 'Both installers (.dmg) and manual ZIP archives (.tar.gz) are provided.',
    stableButtons: [{ id: 'macos-stable-link', url: 'https://repo.jellyfin.org/releases/server/macos/stable' }],
    unstableButtons: [{ id: 'macos-unstable-link', url: 'https://repo.jellyfin.org/releases/server/macos/unstable' }],
    otherButtons: [{ id: 'macos-all-link', url: 'https://repo.jellyfin.org/releases/server/macos/versions' }]
  },
  {
    id: 'docker',
    name: 'Docker',
    osTypes: [OsType.Docker],
    status: DownloadStatus.Official,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Docker],
    description: (
      <>
        Run Jellyfin in Docker. Example commands store data in <code>/srv/jellyfin</code> and assume your media is
        stored under <code>/media</code>.
      </>
    ),
    stableButtons: [
      {
        id: 'docker-stable-button',
        name: 'Install Instructions',
        details: (
          <pre className='margin-bottom--none'>
            <code>{`docker pull jellyfin/jellyfin:latest
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:latest`}</code>
          </pre>
        )
      }
    ],
    unstableButtons: [
      {
        id: 'docker-unstable-button',
        name: 'Install Instructions',
        details: (
          <pre className='margin-bottom--none'>
            <code>{`docker pull jellyfin/jellyfin:unstable
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:unstable`}</code>
          </pre>
        )
      }
    ],
    otherButtons: [{ id: 'docker-hub-link', name: 'Docker Hub', url: 'https://hub.docker.com/r/jellyfin/jellyfin/' }]
  },
  {
    id: 'portable',
    name: 'Portable',
    osTypes: [OsType.Linux, OsType.MacOS, OsType.Windows],
    status: DownloadStatus.Official,
    features: [],
    platforms: [Platform.DotNet],
    description: 'The portable version can be run on any system with a .NET Core runtime.',
    stableButtons: [{ id: 'portable-stable-link', url: 'https://repo.jellyfin.org/releases/server/portable/stable' }],
    unstableButtons: [
      { id: 'portable-unstable-link', url: 'https://repo.jellyfin.org/releases/server/portable/unstable' }
    ],
    otherButtons: [{ id: 'portable-all-link', url: 'https://repo.jellyfin.org/releases/server/portable/versions' }]
  }
];
