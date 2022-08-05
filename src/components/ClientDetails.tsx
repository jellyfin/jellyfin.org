import React from 'react';

import PlatformIcon from './PlatformIcon';
import { Client, ClientType, LicenseType } from '../data/clients';

import './ClientDetails.css';

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
  <div className='card client margin-bottom--md'>
    <div className='card__header client__header'>
      <div className='client__header__start'>
        <h3>{client.name}</h3>
        <div className='client__header__start__badges'>
          <ClientTypeBadge clientType={client.clientType} />
          <LicenseTypeBadge licenseType={client.licenseType} />
        </div>
      </div>
      <div>
        {client.platforms.map((platform, index) => (
          <PlatformIcon key={`${platform}-${index}`} platform={platform} size={36} className='client__platform-icon' />
        ))}
      </div>
    </div>
    <div className='card__body padding-top--sm'>{client.description}</div>
    <div className='card__footer client__footer'>
      {client.secondaryLinks?.map(({ id, url, name }) => (
        <a key={id} href={url} className='button button--outline button--primary'>
          {name}
        </a>
      ))}
      <div style={{ flexGrow: 1 }} />
      {client.primaryLinks.map(({ id, url, name }) => (
        <a key={id} href={url} className='button button--primary'>
          {name}
        </a>
      ))}
    </div>
  </div>
);

export default ClientDetails;
