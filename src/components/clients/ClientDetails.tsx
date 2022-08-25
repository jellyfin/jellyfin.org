import React from 'react';

import DetailsCard from '../common/DetailsCard';
import PlatformIcon from '../common/PlatformIcon';
import { Client, ClientType, LicenseType } from '../../data/clients';

const ClientTypeBadge = ({ clientType }: { clientType: ClientType }) => {
  if (clientType === ClientType.Official) {
    return <span className='badge badge--primary margin-right--sm'>Official</span>;
  } else if (clientType === ClientType.ThirdParty) {
    return <span className='badge badge--secondary margin-right--sm'>Third Party</span>;
  }
};

const LicenseTypeBadge = ({ licenseType }: { licenseType: LicenseType }) => {
  if (licenseType === LicenseType.OpenSource) {
    return <span className='badge badge--success margin-right--sm'>Open Source</span>;
  } else if (licenseType === LicenseType.Proprietary) {
    return <span className='badge badge--warning margin-right--sm'>Proprietary</span>;
  }
};

const ClientDetails = ({ client }: { client: Client }) => (
  <DetailsCard
    title={client.name}
    description={client.description}
    badges={
      <>
        <ClientTypeBadge clientType={client.clientType} />
        <LicenseTypeBadge licenseType={client.licenseType} />
      </>
    }
    icons={client.platforms.map((platform, index) => (
      <PlatformIcon key={`${platform}-${index}`} platform={platform} size={36} className='client__platform-icon' />
    ))}
    primaryButtons={client.primaryLinks.map(({ id, url, name }) => (
      <a key={id} href={url} className='button button--primary'>
        {name}
      </a>
    ))}
    secondaryButtons={client.secondaryLinks?.map(({ id, url, name }) => (
      <a key={id} href={url} className='button button--outline button--primary'>
        {name}
      </a>
    ))}
  />
);

export default ClientDetails;
