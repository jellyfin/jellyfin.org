import {
  Amazonfiretv,
  Android,
  Apple,
  Appletv,
  Archlinux,
  Centos,
  Debian,
  Discord,
  Docker,
  Dotnet,
  Fedora,
  Gentoo,
  Ios,
  Kodi,
  Lg,
  Linux,
  Roku,
  Sailfishos,
  Ubuntu,
  Windows
} from '@icons-pack/react-simple-icons';
import clsx from 'clsx';
import React from 'react';

import Platform from '../../data/platform';
import Desktop from '../../../static/images/icons/monitor.svg';
import Web from '../../../static/images/icons/web.svg';

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
      return <Android size={size} className={className} />;

    case Platform.Arch:
      return <Archlinux size={size} className={className} />;

    case Platform.Browser:
      return <Web width={size} height={size} className={className} />;

    case Platform.CentOS:
      return <Centos size={size} className={className} />;

    case Platform.Desktop:
      return <Desktop width={size} height={size} className={className} />;

    case Platform.Debian:
      return <Debian size={size} className={className} />;

    case Platform.Discord:
      return <Discord size={size} className={className} />;

    case Platform.Docker:
      return <Docker size={size} className={className} />;

    case Platform.DotNet:
      return <Dotnet size={size} className={className} />;

    case Platform.Fedora:
      return <Fedora size={size} className={className} />;

    case Platform.FireOS:
      return <Amazonfiretv size={size} className={className} />;

    case Platform.Gentoo:
      return <Gentoo size={size} className={className} />;

    case Platform.IOS:
      return <Ios size={size} className={className} />;

    case Platform.Kodi:
      return <Kodi size={size} className={className} />;

    case Platform.Linux:
      return <Linux size={size} className={className} />;

    case Platform.MacOS:
      return <Apple size={size} className={className} />;

    case Platform.Roku:
      return <Roku size={size} className={className} />;

    case Platform.SailfishOS:
      return <Sailfishos size={size} className={className} />;

    case Platform.TVOS:
      return <Appletv size={size} className={className} />;

    case Platform.Ubuntu:
      return <Ubuntu size={size} className={className} />;

    case Platform.WebOS:
      return <Lg size={size} className={className} />;

    case Platform.Windows:
      return <Windows size={size} className={className} />;

    default:
      return null;
  }
};

export default PlatformIcon;
