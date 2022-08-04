import { Amazonfiretv, Android, Appletv, Discord, Ios, Kodi, Lg, Roku, Sailfishos } from '@icons-pack/react-simple-icons';
import clsx from 'clsx';
import React from 'react';

import { Platform } from '../data/clients';
import Desktop from '../../static/images/icons/monitor.svg';
import Web from '../../static/images/icons/web.svg';

const PlatformIcon = ({
  platform,
  size,
  className = ''
}: {
  platform: Platform,
  size: string | number,
  className?: string
}) => {
  className = clsx(className, 'fill--white');

  switch (platform) {
    case Platform.Android:
    case Platform.AndroidTV:
      return <Android size={size} className={className} />;

    case Platform.Browser:
      return <Web width={size} height={size} className={className} />;

    case Platform.Desktop:
      return <Desktop width={size} height={size} className={className} />;

    case Platform.Discord:
      return <Discord size={size} className={className} />;

    case Platform.FireOS:
      return <Amazonfiretv size={size} className={className} />;

    case Platform.IOS:
      return <Ios size={size} className={className} />;

    case Platform.Kodi:
      return <Kodi size={size} className={className} />;

    case Platform.Roku:
      return <Roku size={size} className={className} />;

    case Platform.SailfishOS:
      return <Sailfishos size={size} className={className} />;

    case Platform.TVOS:
      return <Appletv size={size} className={className} />;

    case Platform.WebOS:
      return <Lg size={size} className={className} />;

    default:
      return null;
  }
};

export default PlatformIcon;
