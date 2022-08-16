import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

import DetailsCard from '../common/DetailsCard';
import { Download, DownloadStatus } from '../../data/downloads';
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

type DownloadDetailsProps = {
  download: Download;
  activeButton?: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
};

const DownloadDetails = ({ download, activeButton, setActiveButton }: DownloadDetailsProps) => (
  <DetailsCard
    title={download.name}
    description={download.description}
    badges={<StatusBadge status={download.status} />}
    icons={download.platforms.map((platform, index) => (
      <PlatformIcon key={`${platform}-${index}`} platform={platform} size={36} />
    ))}
    primaryButtons={[
      ...download.unstableButtons.map((button) => (
        <DownloadButton
          key={button.id}
          name={button.name || 'Unstable'}
          url={button.url}
          onClick={() => {
            setActiveButton(button.id);
          }}
          active={activeButton === button.id}
          primary={false}
        />
      )),
      ...download.stableButtons.map((button) => (
        <DownloadButton
          key={button.id}
          name={button.name || 'Stable'}
          url={button.url}
          onClick={() => {
            setActiveButton(button.id);
          }}
          active={activeButton === button.id}
        />
      ))
    ]}
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
