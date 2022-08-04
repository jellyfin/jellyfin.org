import React, { useState } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import Hero from '../components/Hero';

enum InstallOption {
  DockerStable,
  DockerUnstable,
  DebianStable,
  DebianUnstable,
  ArchStable,
  ArchUnstable
}

const InstallInstructions = {
  Docker: {
    Stable: `docker pull jellyfin/jellyfin:latest
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:latest`,
    Unstable: `docker pull jellyfin/jellyfin:unstable
mkdir -p /srv/jellyfin/{config,cache}
docker run -d -v /srv/jellyfin/config:/config -v /srv/jellyfin/cache:/cache -v /media:/media --net=host jellyfin/jellyfin:unstable`
  },
  Debian: {
    Stable: `sudo apt install curl gnupg
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/jellyfin.gpg
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin`,
    Unstable: `sudo apt install curl gnupg
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | gpg --dearmor -o /etc/apt/trusted.gpg.d/jellyfin.gpg
echo "deb [arch=$( dpkg --print-architecture )] https://repo.jellyfin.org/$( awk -F'=' '/^ID=/{ print $NF }' /etc/os-release ) $( awk -F'=' '/^VERSION_CODENAME=/{ print $NF }' /etc/os-release ) main unstable" | sudo tee /etc/apt/sources.list.d/jellyfin.list
sudo apt update
sudo apt install jellyfin`
  },
  Arch: {
    Stable: `git clone https://aur.archlinux.org/jellyfin.git
cd jellyfin
makepkg -si`,
    Unstable: `git clone https://aur.archlinux.org/jellyfin-git.git
cd jellyfin-git
makepkg -si`
  }
};

export default function Downloads() {
  const [installOption, setInstallOption] = useState<InstallOption>(null);
  return (
    <Layout title='Downloads'>
      <Hero title='Downloads'>
        <p className='hero__text'>You can download the latest releases of Jellyfin Server below!</p>
      </Hero>

      <main className='margin-vert--lg'>
        <section className='container'>
          <h2>Stable or Unstable?</h2>
          <p>
            Generally, if you&apos;re a new user or value stability use the stable version. It won&apos;t change very
            often. If you want to help test the latest improvements and features and can handle some occasional
            breakage, use the unstable version. Always back up your existing configuration before testing unstable
            releases.
          </p>

          <h3>
            Docker
            <span className='badge badge--success margin-left--sm'>Official</span>
          </h3>
          <p>
            Run Jellyfin in Docker. Example commands store data in <code>/srv/jellyfin</code> and assume your media is
            stored under <code>/media</code>.
          </p>
          <p>
            <button
              className={clsx('button button--primary margin-right--md margin-bottom--md', {
                'button--active': installOption === InstallOption.DockerStable
              })}
              onClick={() => {
                setInstallOption(InstallOption.DockerStable);
              }}
            >
              Stable
            </button>
            <button
              className={clsx('button button--secondary margin-right--md margin-bottom--md', {
                'button--active': installOption === InstallOption.DockerUnstable
              })}
              onClick={() => {
                setInstallOption(InstallOption.DockerUnstable);
              }}
            >
              Unstable
            </button>
            <a
              href='https://hub.docker.com/r/jellyfin/jellyfin/'
              className='button button--outline button--primary margin-bottom--md'
            >
              Docker Hub
            </a>
            {installOption === InstallOption.DockerStable && (
              <pre>
                <code>{InstallInstructions.Docker.Stable}</code>
              </pre>
            )}
            {installOption === InstallOption.DockerUnstable && (
              <pre>
                <code>{InstallInstructions.Docker.Unstable}</code>
              </pre>
            )}
          </p>

          <h3>
            Debian and Ubuntu
            <span className='badge badge--success margin-left--sm'>Official</span>
          </h3>
          <p>Install Jellyfin via our Apt repository or via manual archives (.deb).</p>
          <p>
            <button
              className={clsx('button button--primary margin-right--md margin-bottom--md', {
                'button--active': installOption === InstallOption.DebianStable
              })}
              onClick={() => {
                setInstallOption(InstallOption.DebianStable);
              }}
            >
              Stable
            </button>
            <button
              className={clsx('button button--secondary margin-right--md margin-bottom--md', {
                'button--active': installOption === InstallOption.DebianUnstable
              })}
              onClick={() => {
                setInstallOption(InstallOption.DebianUnstable);
              }}
            >
              Unstable
            </button>
            <a
              href='https://repo.jellyfin.org/releases/server/debian/versions'
              className='button button--outline button--primary margin-right--md margin-bottom--md'
            >
              All Debian Versions
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/ubuntu/versions'
              className='button button--outline button--primary margin-bottom--md'
            >
              All Ubuntu Versions
            </a>
            {installOption === InstallOption.DebianStable && (
              <pre>
                <code>{InstallInstructions.Debian.Stable}</code>
              </pre>
            )}
            {installOption === InstallOption.DebianUnstable && (
              <pre>
                <code>{InstallInstructions.Debian.Unstable}</code>
              </pre>
            )}
          </p>

          <h3>
            Arch Linux
            <span className='badge badge--info margin-left--sm'>Community</span>
          </h3>
          <p>Install Jellyfin via the Arch User Repository.</p>
          <p>
            <button
              className={clsx('button button--primary margin-right--md margin-bottom--md', {
                'button--active': installOption === InstallOption.ArchStable
              })}
              onClick={() => {
                setInstallOption(InstallOption.ArchStable);
              }}
            >
              Stable
            </button>
            <button
              className={clsx('button button--secondary margin-right--md margin-bottom--md', {
                'button--active': installOption === InstallOption.ArchUnstable
              })}
              onClick={() => {
                setInstallOption(InstallOption.ArchUnstable);
              }}
            >
              Unstable
            </button>
            <a
              href='https://aur.archlinux.org/packages/?K=jellyfin'
              className='button button--outline button--primary margin-bottom--md'
            >
              AUR
            </a>
            {installOption === InstallOption.ArchStable && (
              <pre>
                <code>{InstallInstructions.Arch.Stable}</code>
              </pre>
            )}
            {installOption === InstallOption.ArchUnstable && (
              <pre>
                <code>{InstallInstructions.Arch.Unstable}</code>
              </pre>
            )}
          </p>
          {installOption === InstallOption.ArchStable && (
            <>
              <p>
                <b>Note:</b> The third command should give you output similar to{' '}
                <code>deb [arch=(architecture)] https://repo.jellyfin.org/(distribution) (release) main</code>. We
                support <code>amd64</code>, <code>armhf</code>, and <code>arm64</code> for architectures,{' '}
                <code>debian</code> and <code>ubuntu</code> for distributions, <code>buster</code> and{' '}
                <code>bullseye</code> for Debian releases and <code>bionic</code>, <code>focal</code>,{' '}
                <code>impish</code> and <code>jammy</code> for Ubuntu releases. If you see something different in your
                output, you might need to manually modify it. Use the closest equivalent Debian or Ubuntu version
                instead.
              </p>
              <p>
                Once installed, Jellyfin will be running as a service. Manage it with{' '}
                <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
                <code>{'sudo service jellyfin {action}'}</code>.
              </p>
            </>
          )}
          {installOption === InstallOption.ArchUnstable && (
            <>
              <p>
                <b>Note:</b> The third command should give you output similar to{' '}
                <code>deb [arch=(architecture)] https://repo.jellyfin.org/(distribution) (release) main</code>. We
                support <code>amd64</code>, <code>armhf</code>, and <code>arm64</code> for architectures,{' '}
                <code>debian</code> and <code>ubuntu</code> for distributions, <code>buster</code> and{' '}
                <code>bullseye</code> for Debian releases and <code>bionic</code>, <code>focal</code>,{' '}
                <code>impish</code> and <code>jammy</code> for Ubuntu releases. If you see something different in your
                output, you might need to manually modify it. Use the closest equivalent Debian or Ubuntu version
                instead.
              </p>
              <p>
                <b>Note:</b> Both the <code>main</code> and <code>unstable</code> are needed as the{' '}
                <code>jellyfin-ffmpeg</code> package is only in the <code>main</code> component.
              </p>
              <p>
                Once installed, Jellyfin will be running as a service. Manage it with{' '}
                <code>{'sudo systemctl {action} jellyfin.service'}</code> or{' '}
                <code>{'sudo service jellyfin {action}'}</code>.
              </p>
            </>
          )}

          <h3>
            Fedora and CentOS
            <span className='badge badge--info margin-left--sm'>Community</span>
          </h3>
          <p>RPM archives for both Fedora and CentOS are provided.</p>
          <p>
            <a
              href='https://repo.jellyfin.org/releases/server/fedora'
              className='button button--primary margin-right--md margin-bottom--md'
            >
              Stable Fedora
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/centos'
              className='button button--primary margin-right--md margin-bottom--md'
            >
              Stable CentOS
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/fedora/versions'
              className='button button--outline button--primary margin-right--md margin-bottom--md'
            >
              All Fedora Versions
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/centos/versions'
              className='button button--outline button--primary margin-bottom--md'
            >
              All CentOS Versions
            </a>
          </p>

          <h3>
            Generic Linux
            <span className='badge badge--success margin-left--sm'>Official</span>
          </h3>
          <p>Linux self-contained binary TAR archives (.tar.gz) are provided.</p>
          <p>
            <a
              href='https://repo.jellyfin.org/releases/server/linux/stable'
              className='button button--primary margin-right--md margin-bottom--md'
            >
              Stable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/linux/unstable'
              className='button button--secondary margin-right--md margin-bottom--md'
            >
              Unstable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/linux/versions'
              className='button button--outline button--primary margin-bottom--md'
            >
              All Versions
            </a>
          </p>

          <h3>
            MacOS
            <span className='badge badge--success margin-left--sm'>Official</span>
          </h3>
          <p>Both installers (.dmg) and manual ZIP archives (.tar.gz) are provided.</p>
          <p>
            <a
              href='https://repo.jellyfin.org/releases/server/macos/stable'
              className='button button--primary margin-right--md margin-bottom--md'
            >
              Stable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/macos/unstable'
              className='button button--secondary margin-right--md margin-bottom--md'
            >
              Unstable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/macos/versions'
              className='button button--outline button--primary margin-bottom--md'
            >
              All Versions
            </a>
          </p>

          <h3>
            Windows
            <span className='badge badge--success margin-left--sm'>Official</span>
          </h3>
          <p>Both installers (.exe) and manual ZIP archives (.zip) are provided.</p>
          <p>
            When using the installer, please ensure you <i>fully uninstall</i> any ZIP archive versions you may have
            installed, or you may get duplicate services.
          </p>
          <p>
            <a
              href='https://repo.jellyfin.org/releases/server/windows/stable'
              className='button button--primary margin-right--md margin-bottom--md'
            >
              Stable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/windows/unstable'
              className='button button--secondary margin-right--md margin-bottom--md'
            >
              Unstable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/windows/versions'
              className='button button--outline button--primary margin-bottom--md'
            >
              All Versions
            </a>
          </p>

          <h3>
            Portable
            <span className='badge badge--success margin-left--sm'>Official</span>
          </h3>
          <p>The portable version can be run on any system with a .NET Core runtime.</p>
          <p>
            <a
              href='https://repo.jellyfin.org/releases/server/portable/stable'
              className='button button--primary margin-right--md margin-bottom--md'
            >
              Stable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/portable/unstable'
              className='button button--secondary margin-right--md margin-bottom--md'
            >
              Unstable
            </a>
            <a
              href='https://repo.jellyfin.org/releases/server/portable/versions'
              className='button button--outline button--primary margin-bottom--md'
            >
              All Versions
            </a>
          </p>
        </section>
      </main>
    </Layout>
  );
}
