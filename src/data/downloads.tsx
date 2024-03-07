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
            <code>{`docker pull jellyfin/jellyfin:latest  # or docker pull ghcr.io/jellyfin/jellyfin:latest
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:latest`}</code>
          </pre>
        )
      },
      {
        id: 'docker-hub-link',
        name: 'Docker Hub',
        url: 'https://hub.docker.com/r/jellyfin/jellyfin/'
      },
      {
        id: 'docker-hub-link',
        name: 'GHCR',
        url: 'https://ghcr.io/jellyfin/jellyfin'
      }
    ],
    unstableButtons: [
      {
        id: 'docker-unstable-button',
        name: 'Install Instructions',
        details: (
          <pre className='margin-bottom--none'>
            <code>{`docker pull jellyfin/jellyfin:unstable  # or docker pull ghcr.io/jellyfin/jellyfin:unstable
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:unstable`}</code>
          </pre>
        )
      },
      {
        id: 'docker-hub-link',
        name: 'Docker Hub',
        url: 'https://hub.docker.com/r/jellyfin/jellyfin/'
      },
      {
        id: 'docker-hub-link',
        name: 'GHCR',
        url: 'https://ghcr.io/jellyfin/jellyfin'
      }
    ],
    otherButtons: []
  },
  {
    id: 'debuntu',
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
              <code>{`curl https://repo.jellyfin.org/install-debuntu.sh | sudo bash`}</code>
            </pre>
            <p>
              If you do not have <code>curl</code> installed, you can use{' '}
              <code>wget -O-</code> instead of{' '}
              <code>curl</code>.
            </p>
            <p>
              For more advanced users, the full steps can be <a href="https://jellyfin.org/docs/general/installation/linux#debuntu-debian-ubuntu-and-derivatives-using-apt">
              found in the docs</a>.
            </p>
            <p className='margin-bottom--none'>
              Once installed, Jellyfin will be running as a service. Manage it with{' '}
              <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
              <code>{'sudo service jellyfin {action}'}</code>.
            </p>
          </>
        )
      },
      {
        id: 'debian-manual-stable-link',
        name: 'Downloads (Debian)',
        url: 'https://repo.jellyfin.org/?path=/server/debian/latest-stable'
      },
      {
        id: 'ubuntu-manual-stable-link',
        name: 'Downloads (Ubuntu)',
        url: 'https://repo.jellyfin.org/?path=/server/ubuntu/latest-stable'
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
DISTRO="$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release )"
CODENAME="$( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release )"
curl -fsSL https://repo.jellyfin.org/\${DISTRO}/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/jellyfin.gpg
cat <<EOF | sudo tee /etc/apt/sources.list.d/jellyfin.sources
Types: deb
URIs: https://repo.jellyfin.org/\${DISTRO}
Suites: \${CODENAME}
Components: main unstable
Architectures: $( dpkg --print-architecture )
Signed-By: /etc/apt/keyrings/jellyfin.gpg
EOF
sudo apt update
sudo apt install jellyfin`}
              </code>
            </pre>
            <p>
              <b>Note:</b> If you are running a non-Debian, non-Ubuntu derivative, ensure the $DISTRO and $CODENAME are
              valid Debian or Ubuntu values!
            </p>
            <p>
              <b>Note:</b> Both the <code>main</code> and <code>unstable</code> are needed in <code>Components:</code>{' '}
              as the <code>jellyfin-ffmpeg</code> package is only in the <code>main</code> component.
            </p>
            <p className='margin-bottom--none'>
              Once installed, Jellyfin will be running as a service. Manage it with{' '}
              <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
              <code>{'sudo service jellyfin {action}'}</code>.
            </p>
          </>
        )
      },
      {
        id: 'debian-manual-unstable-link',
        name: 'Downloads (Debian)',
        url: 'https://repo.jellyfin.org/?path=/server/debian/latest-unstable'
      },
      {
        id: 'ubuntu-manual-unstable-link',
        name: 'Downloads (Ubuntu)',
        url: 'https://repo.jellyfin.org/?path=/server/ubuntu/latest-unstable'
      }
    ],
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
    stableButtons: [
      {
        id: 'linux-manual-stable-link',
        url: 'https://repo.jellyfin.org/?path=/server/linux/latest-stable'
      }
    ],
    unstableButtons: [
      {
        id: 'linux-manual-unstable-link',
        url: 'https://repo.jellyfin.org/?path=/server/linux/latest-unstable'
      }
    ],
    otherButtons: []
  },
  {
    id: 'windows',
    name: 'Windows',
    osTypes: [OsType.Windows],
    status: DownloadStatus.Official,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Windows],
    description: 'Both installers (.exe) and manual ZIP archives (.zip) are provided.',
    stableButtons: [
      {
        id: 'windows-manual-stable-link',
        name: "Downloads",
        url: 'https://repo.jellyfin.org/?path=/server/windows/latest-stable'
      }
    ],
    unstableButtons: [
      {
        id: 'windows-unstable-link',
        name: "Downloads",
        url: 'https://repo.jellyfin.org/?path=/server/windows/latest-unstable'
      }
    ],
    otherButtons: []
  },
  {
    id: 'macos',
    name: 'MacOS',
    osTypes: [OsType.MacOS],
    status: DownloadStatus.Official,
    features: [],
    platforms: [Platform.MacOS],
    description: 'Both installers (.dmg) and manual ZIP archives (.tar.gz) are provided.',
    stableButtons: [
      {
        id: 'macos-manual-stable-link',
        name: "Downloads",
        url: 'https://repo.jellyfin.org/?path=/server/macos/latest-stable'
      }
    ],
    unstableButtons: [
      {
        id: 'macos-manual-unstable-link',
        name: "Downloads",
        url: 'https://repo.jellyfin.org/?path=/server/macos/latest-unstable'
      }
    ],
    otherButtons: []
  },
  {
    id: 'portable',
    name: 'Portable',
    osTypes: [OsType.Linux, OsType.MacOS, OsType.Windows],
    status: DownloadStatus.Official,
    features: [],
    platforms: [Platform.DotNet],
    description: 'The portable version can be run on any system with a .NET Core runtime.',
    stableButtons: [
      {
        id: 'portable-manual-stable-link',
        url: 'https://repo.jellyfin.org/?path=/server/portable/latest-stable'
      }
    ],
    unstableButtons: [
      {
        id: 'portable-manual-unstable-link',
        url: 'https://repo.jellyfin.org/?path=/server/portable/latest-unstable'
      },
    ],
    otherButtons: []
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    osTypes: [OsType.Linux],
    status: DownloadStatus.Official,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Arch],
    description: 'Install Jellyfin via Arch-Extra Repository.',
    stableButtons: [
      {
        id: 'arch-stable-link',
        name: 'Arch Downloads',
        url: 'https://archlinux.org/packages/?q=jellyfin'
      },
      {
        id: 'arch-aur-link',
        name: 'AUR Downloads',
        url: 'https://aur.archlinux.org/packages/?K=jellyfin'
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
      },
      {
        id: 'arch-aur-link',
        name: 'AUR Downloads',
        url: 'https://aur.archlinux.org/packages/?K=jellyfin'
      }
    ],
    otherButtons: []
  },
  {
    id: 'fedora-centos',
    name: 'Fedora/CentOS Linux',
    osTypes: [OsType.Linux],
    status: DownloadStatus.OsPackage,
    features: [],
    platforms: [Platform.Fedora, Platform.CentOS],
    description: 'Install Jellyfin via the RPMFusion Repository (Free).',
    stableButtons: [
      {
        id: 'rpmfusion-stable-button',
        name: 'Install Instructions',
        details: (
          <>
            <p>
              <a href="https://rpmfusion.org/Configuration">Configure the RPMFusion repository</a>
            </p>
            <pre>
              <code>{`dnf install jellyfin`}</code>
            </pre>
          </>
        )
      },
      {
        id: 'rpmfusion-stable-link',
        name: 'RPMFusion',
        url: 'https://admin.rpmfusion.org/pkgdb/package/free/jellyfin/'
      }
    ],
    unstableButtons: [],
    otherButtons: []
  },
  {
    id: 'flatpak',
    name: 'Flatpak',
    osTypes: [OsType.Linux],
    status: DownloadStatus.Community,
    features: [Feature.CustomFFmpeg],
    platforms: [Platform.Linux],
    description: 'Install Jellyfin via Flathub.',
    stableButtons: [
      {
        id: 'flatpak-stable-button',
        name: 'Install Instructions',
        details: (
          <>
            <pre>
              <code>{`flatpak install flathub org.jellyfin.JellyfinServer`}</code>
            </pre>
            <p>
              <b>Note:</b> If you are running on an Intel GPU an additional extension is required for HDR Tone mapping.
            </p>
            <pre>
              <code>{`flatpak install flathub org.jellyfin.JellyfinServer.Plugin.IntelComputeRuntime`}</code>
            </pre>
          </>
        )
      },
      {
        id: 'flatpak-flathub-link',
        name: 'Flathub',
        url: 'https://flathub.org/apps/org.jellyfin.JellyfinServer'
      }
    ],
    unstableButtons: [],
    otherButtons: [
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
  }
];
