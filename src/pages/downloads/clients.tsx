import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';

import React from 'react';

import ClientDetails from '../../components/clients/ClientDetails';
import { Platform, Clients, ClientType, DEVICE_PLATFORMS, DeviceType, OTHERS } from '../../data/clients';
import ExternalLinkIcon from '@theme/Icon/ExternalLink';

type ClientTypeFilter = '' | 'all' | 'official' | 'thirdParty';

type ClientFilter = {
  clientType: ClientTypeFilter;
  deviceType: DeviceType | '';
  platform: Platform | '';
};

export default function ClientsPage() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const clientType = (searchParams.get('clientType') as ClientTypeFilter) || '';
  const clientTypeClients = [
    ...Clients.filter((it) => {
      switch (clientType) {
        case 'all':
          return true;
        case '':
          return it.recommended;
        case 'official':
          return it.clientType === ClientType.Official || it.clientType === ClientType.OfficialBeta;
        case 'thirdParty':
          return it.clientType === ClientType.ThirdParty;
        default:
          return false;
      }
    })
  ];

  const deviceType = (searchParams.get('type') as DeviceType) || '';
  const deviceTypeClients = deviceType
    ? [...clientTypeClients.filter((it) => it.deviceTypes.includes(deviceType))]
    : clientTypeClients;

  const platform = (searchParams.get('platform') as Platform) || '';
  const platformClients = platform
    ? [...deviceTypeClients.filter((it) => it.platforms.includes(platform))]
    : deviceTypeClients;

  const clientPlatforms = [...new Set(deviceTypeClients.flatMap((it) => it.platforms))].sort();

  const filter: ClientFilter = {
    clientType,
    deviceType,
    platform
  };

  const setFilter = (filter: ClientFilter) => {
    const search = new URLSearchParams();

    if (filter.clientType) {
      search.set('clientType', filter.clientType);
    }

    if (filter.deviceType) {
      search.set('type', filter.deviceType);
    }
    if (filter.platform) {
      search.set('platform', filter.platform);
    }
    history.push({
      search: search.toString()
    });
  };

  return (
    <Layout title='Clients'>
      <h1 className='text--center margin-top--lg'>Downloads</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <div className='row'>
            <div className='col margin-bottom--md'>
              <div className='pills'>
                <Link to='/downloads' className='pills__item pills__item--active'>
                  Clients
                </Link>
                <Link to='/downloads/server' className='pills__item'>
                  Server
                </Link>
                <Link to='https://repo.jellyfin.org' className='pills__item'>
                  Full Repository
                  <ExternalLinkIcon />
                </Link>
              </div>
            </div>
          </div>

          <div className='card card--outline margin-bottom--md'>
            <div
              className='card__body'
              style={{ display: 'grid', gap: '0.5rem', gridTemplateColumns: 'max-content max-content' }}
            >
              <div style={{ display: 'grid', gridColumn: '1 / -1', gridTemplateColumns: 'subgrid' }}>
                <label htmlFor='clientSelect'>Clients</label>
                <select
                  id='clientSelect'
                  className='pills__item pills__item--active'
                  value={filter.clientType}
                  onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    setFilter({ ...filter, clientType: target.value as ClientTypeFilter });
                  }}
                >
                  <option value='all'>All</option>
                  <option value='' label='Recommended'></option>
                  <option value='official'>Official</option>
                  <option value='thirdParty'>Third Party</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridColumn: '1 / -1', gridTemplateColumns: 'subgrid' }}>
                <label htmlFor='devicesSelect'>Devices</label>
                <select
                  id='devicesSelect'
                  className='pills__item pills__item--active'
                  value={filter.platform}
                  onChange={(e) => {
                    const target = e.target as HTMLSelectElement;
                    setFilter({ ...filter, platform: target.value as Platform });
                  }}
                >
                  <option value=''>All</option>
                  {[...DEVICE_PLATFORMS.entries()].map(([name, platforms]) => (
                    <optgroup key={name} label={name}>
                      {platforms
                        .filter((it) => clientPlatforms.includes(it))
                        .map((it) => (
                          <option key={it}>{it}</option>
                        ))}
                    </optgroup>
                  ))}
                  <optgroup key={'others'} label='Others'>
                    {OTHERS.filter((it) => clientPlatforms.includes(it)).map((it) => (
                      <option key={it}>{it}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          {platformClients.length === 0 ? (
            <div className='card padding-vert--lg'>
              <div className='card__header text--center'>
                <h3>No clients were found that match the selected filters.</h3>
              </div>
            </div>
          ) : (
            platformClients.map((client) => <ClientDetails key={client.id} client={client} />)
          )}
        </section>
      </main>
    </Layout>
  );
}
