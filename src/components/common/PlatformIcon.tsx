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
  SiUbuntu,
  SiWindows
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
  className = clsx(className, 'fill--white');

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
      return <SiWindows size={size} className={className} />;

    default:
      return null;
  }
};

export default PlatformIcon;
