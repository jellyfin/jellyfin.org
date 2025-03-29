import {
  SiAmazonfiretv,
  SiAndroid,
  SiApple,
  SiAppletv,
  SiArchlinux,
  SiCentos,
  SiDebian,
  SiDiscord,
  SiDocker,
  SiDotnet,
  SiFedora,
  SiGentoo,
  SiIos,
  SiKodi,
  SiLg,
  SiLinux,
  SiRoku,
  SiSailfishos,
  SiUbuntu
} from '@icons-pack/react-simple-icons';
import Icon from '@mdi/react';
import { mdiMonitor, mdiWeb } from '@mdi/js';
import clsx from 'clsx';
import React from 'react';

import Platform from '../../data/platform';

const PlatformIcon = ({
  platform,
  size,
  className = ''
}: {
  platform: Platform;
  size: string | number;
  className?: string;
}) => {
  className = clsx(className);

  switch (platform) {
    // TODO: AndroidTV should have a unique icon
    case Platform.Android:
    case Platform.AndroidTV:
      return <SiAndroid size={size} className={className} />;

    case Platform.Arch:
      return <SiArchlinux size={size} className={className} />;

    case Platform.Browser:
      return <Icon path={mdiWeb} size={`${size}px`} className={className} />;

    case Platform.CentOS:
      return <SiCentos size={size} className={className} />;

    case Platform.Desktop:
      return <Icon path={mdiMonitor} size={`${size}px`} className={className} />;

    case Platform.Debian:
      return <SiDebian size={size} className={className} />;

    case Platform.Discord:
      return <SiDiscord size={size} className={className} />;

    case Platform.Docker:
      return <SiDocker size={size} className={className} />;

    case Platform.DotNet:
      return <SiDotnet size={size} className={className} />;

    case Platform.Fedora:
      return <SiFedora size={size} className={className} />;

    case Platform.FireOS:
      return <SiAmazonfiretv size={size} className={className} />;

    case Platform.Gentoo:
      return <SiGentoo size={size} className={className} />;

    case Platform.IOS:
      return <SiIos size={size} className={className} />;

    case Platform.Kodi:
      return <SiKodi size={size} className={className} />;

    case Platform.Linux:
      return <SiLinux size={size} className={className} />;

    case Platform.MacOS:
      return <SiApple size={size} className={className} />;

    case Platform.Roku:
      return <SiRoku size={size} className={className} />;

    case Platform.SailfishOS:
      return <SiSailfishos size={size} className={className} />;

    case Platform.TVOS:
      return <SiAppletv size={size} className={className} />;

    case Platform.Ubuntu:
      return <SiUbuntu size={size} className={className} />;

    case Platform.WebOS:
      return <SiLg size={size} className={className} />;

    case Platform.Windows:
      // Not available in simple-icons because it was removed due to Microsoft (https://github.com/simple-icons/simple-icons/issues/11236)
      // using the Font Awesome icon instead
      // Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
      return (
        <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} className={className} viewBox='0 0 448 512'>
          <path d='M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z' />
        </svg>
      );

    default:
      return null;
  }
};

export default PlatformIcon;
