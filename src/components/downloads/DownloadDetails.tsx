import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

import DetailsCard from '../common/DetailsCard';
import { Download, DownloadStatus, Feature } from '../../data/downloads';
import PlatformIcon from '../PlatformIcon';

type DownloadButtonProps = {
  name: string;
  url?: string;
  onClick?(): void;
  active?: boolean;
  primary?: boolean;
  outline?: boolean;
};

const DownloadButton = ({
  name,
  url,
  onClick,
  active = false,
  primary = true,
  outline = false
}: DownloadButtonProps) => {
  const className = clsx('button', {
    'button--active': active,
    'button--primary': primary,
    'button--secondary': !primary,
    'button--outline': outline
  });

  if (url) {
    return (
      <a href={url} className={className}>
        {name}
      </a>
    );
  } else if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {name}
      </button>
    );
  }
  return null;
};

const StatusBadge = ({ status }: { status: DownloadStatus }) => {
  if (status === DownloadStatus.Official) {
    return <span className='badge badge--primary margin-right--sm'>Official</span>;
  } else if (status === DownloadStatus.Community) {
    return <span className='badge badge--secondary margin-right--sm'>Community</span>;
  }
};

const FfmpegBadge = ({ features }: { features: Array<Feature> }) => {
  if (!features.includes(Feature.CustomFfmpeg)) {
    return (
      <span
        className='badge badge--warning margin-right--sm'
        title='Jellyfin&#39;s custom build of ffmpeg is not available for this platform. Some features like tonemapping may
    not work correctly without this.'
      >
        Custom ffmpeg Unavailable
      </span>
    );
  }
  return null;
};

type DownloadDetailsProps = {
  download: Download;
  isStableLinks: boolean;
  activeButton?: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
};

const DownloadDetails = ({ download, isStableLinks, activeButton, setActiveButton }: DownloadDetailsProps) => (
  <DetailsCard
    title={download.name}
    description={download.description}
    badges={
      <>
        <StatusBadge status={download.status} />
        <FfmpegBadge features={download.features} />
      </>
    }
    icons={download.platforms.map((platform, index) => (
      <PlatformIcon key={`${platform}-${index}`} platform={platform} size={36} />
    ))}
    primaryButtons={(isStableLinks ? download.stableButtons : download.unstableButtons).map((button) => (
      <DownloadButton
        key={button.id}
        name={button.name || 'Downloads'}
        url={button.url}
        onClick={() => {
          setActiveButton(button.id);
        }}
        active={activeButton === button.id}
      />
    ))}
    secondaryButtons={download.otherButtons.map((button) => (
      <DownloadButton key={button.id} name={button.name || 'All Versions'} url={button.url} outline />
    ))}
    footerDetails={
      [...download.stableButtons, ...download.unstableButtons, ...download.otherButtons].find(
        (button) => button.id === activeButton
      )?.details
    }
  />
);

export default DownloadDetails;
