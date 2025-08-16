import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import { mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import Layout from '@theme/Layout';

import clsx from 'clsx';
import React, { useState } from 'react';

import ClientDetails from '../../components/clients/ClientDetails';
import Pill from '../../components/common/Pill';
import { Clients, ClientType, DeviceType } from '../../data/clients';
import Platform from '../../data/platform';

import styles from './index.module.scss';

type ClientTypeFilter = 'official' | 'recommended';

type ClientFilter = {
  clientType: ClientTypeFilter;
  deviceType: DeviceType;
  platform: Platform;
};

export default function ClientsPage() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const clientType = (searchParams.get('clientType') as ClientTypeFilter) || undefined;
  const clientTypeClients = clientType
    ? [
        ...Clients.filter((it) => {
          if (clientType === 'recommended') return it.recommended;
          if (clientType === 'official')
            return it.clientType === ClientType.Official || it.clientType === ClientType.OfficialBeta;
          return false;
        })
      ]
    : Clients;

  const clientDeviceTypes = [...new Set(clientTypeClients.flatMap((it) => it.deviceTypes))].sort();

  const deviceType = (searchParams.get('type') as DeviceType) || undefined;
  const deviceTypeClients = deviceType
    ? [...clientTypeClients.filter((it) => it.deviceTypes.includes(deviceType))]
    : clientTypeClients;

  const platform = (searchParams.get('platform') as Platform) || undefined;
  const platformClients = platform
    ? [...deviceTypeClients.filter((it) => it.platforms.includes(platform))]
    : deviceTypeClients;

  const clientPlatforms = [...new Set(deviceTypeClients.flatMap((it) => it.platforms))].sort();

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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

    if (filter.deviceType !== undefined) {
      search.set('type', filter.deviceType);
    }
    if (filter.platform !== undefined) {
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
                </Link>
              </div>
            </div>

            <div className={clsx('col', 'margin-bottom--md', styles['header-pills-end'])}>
              <button
                className={clsx(
                  'button',
                  'button--outline',
                  'button--primary',
                  { 'button--active': isFiltersVisible },
                  'button--icon',
                  styles['filters-button']
                )}
                onClick={() => {
                  setIsFiltersVisible(!isFiltersVisible);
                }}
              >
                <Icon path={mdiFilter} size='1em' />
                Filters
              </button>
            </div>
          </div>

          {isFiltersVisible && (
            <div className='card card--outline margin-bottom--md'>
              <div className='card__body'>
                <ul className={clsx('pills', styles['filter-pills'], 'margin-bottom--md')}>
                  <div className='pills'>
                    <Pill
                      active={clientType === undefined}
                      onClick={() => {
                        setFilter({ ...filter, clientType: undefined });
                      }}
                    >
                      All Clients
                    </Pill>
                    <Pill
                      active={clientType === 'official'}
                      onClick={() => {
                        setFilter({ ...filter, clientType: 'official' });
                      }}
                    >
                      Official
                    </Pill>
                    <Pill
                      active={clientType === 'recommended'}
                      onClick={() => {
                        setFilter({ ...filter, clientType: 'recommended' });
                      }}
                    >
                      Recommended
                    </Pill>
                  </div>
                </ul>

                <ul className={clsx('pills', styles['filter-pills'], 'margin-bottom--md')}>
                  <Pill
                    active={filter.deviceType === undefined}
                    onClick={() => {
                      setFilter({ ...filter, deviceType: undefined });
                    }}
                  >
                    All Device Types
                  </Pill>
                  {clientDeviceTypes.map((deviceType) => (
                    <Pill
                      key={deviceType}
                      active={filter.deviceType === deviceType}
                      onClick={() => {
                        setFilter({ ...filter, deviceType, platform: undefined });
                      }}
                    >
                      {deviceType}
                    </Pill>
                  ))}
                </ul>

                <ul className={clsx('pills', styles['filter-pills'])}>
                  <Pill
                    active={filter.platform === undefined}
                    onClick={() => {
                      setFilter({ ...filter, platform: undefined });
                    }}
                  >
                    All Platforms
                  </Pill>
                  {clientPlatforms.map((platform) => (
                    <Pill
                      key={platform}
                      active={filter.platform === platform}
                      onClick={() => {
                        setFilter({ ...filter, platform });
                      }}
                    >
                      {platform}
                    </Pill>
                  ))}
                </ul>
              </div>
            </div>
          )}

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
