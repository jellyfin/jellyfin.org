import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import { mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import ClientDetails from '../../../components/clients/ClientDetails';
import Pill from '../../../components/common/Pill';
import { Client, Clients, DeviceType } from '../../../data/clients';
import Platform, { FeaturedClientPlatforms } from '../../../data/platform';

import styles from '../index.module.scss';

type ClientFilter = {
  recommended: boolean;
  deviceTypes: DeviceType[];
  platforms: Platform[];
};

/**
 * If value is already in array, it is removed. Otherwise it is added.
 */
function toggleValue<Type>(array: Type[], value: Type): Type[] {
  const index = array.indexOf(value);
  if (index > -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  } else {
    return [...array, value];
  }
}

export default function ClientsPage({ recommended = true }: { recommended?: boolean }) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [filteredClients, setFilteredClients] = useState<Client[]>([...Clients]);
  const [filter, setFilterValue] = useState<ClientFilter>({
    recommended,
    deviceTypes: (searchParams.get('type')?.split(',') ?? []) as DeviceType[],
    platforms: (searchParams.get('platform')?.split(',') ?? []) as Platform[]
  });

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const setFilter = (filter: ClientFilter) => {
    const search = new URLSearchParams();

    if (filter.deviceTypes.length > 0) {
      search.set('type', filter.deviceTypes.join(','));
    }
    if (filter.platforms.length > 0) {
      search.set('platform', filter.platforms.join(','));
    }
    history.push({
      search: search.toString()
    });

    setFilterValue(filter);
  };

  useEffect(() => {
    setFilteredClients(
      Clients.filter((client) => {
        let result = true;

        if (filter.recommended) {
          result = result && !!client.recommended;
        }

        result =
          result &&
          (filter.deviceTypes.length === 0 ||
            client.deviceTypes.some((deviceType) => filter.deviceTypes.includes(deviceType)));

        result =
          result &&
          (filter.platforms.length === 0 || client.platforms.some((platform) => filter.platforms.includes(platform)));

        return result;
      })
    );
  }, [filter, setFilteredClients]);

  return (
    <Layout title='Clients'>
      <h1 className='text--center margin-top--lg'>Downloads</h1>

      <main className='margin-vert--lg' aria-live='polite'>
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

            <div className={clsx('col', 'margin-bottom--md', styles['header-pills-middle'])}>
              <div className='pills'>
                <Link
                  to={`/downloads/clients${location.search}`}
                  className={clsx('pills__item', { 'pills__item--active': filter.recommended })}
                >
                  Recommended
                </Link>
                <Link
                  to={`/downloads/clients/all${location.search}`}
                  className={clsx('pills__item', { 'pills__item--active': !filter.recommended })}
                >
                  All
                </Link>
              </div>
            </div>

            <div className={clsx('col', 'margin-bottom--md', styles['header-pills-end'])}>
              <button
                className={clsx(
                  'button',
                  'button--outline',
                  'button--secondary',
                  { 'button--active': isFiltersVisible },
                  'button--icon',
                  styles['filters-button']
                )}
                aria-expanded={isFiltersVisible}
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
                <div className={clsx('pills', styles['filter-pills'], 'margin-bottom--md')}>
                  <Pill
                    active={filter.deviceTypes.length === 0}
                    onClick={() => {
                      setFilter({ ...filter, deviceTypes: [] });
                    }}
                  >
                    All Device Types
                  </Pill>
                  {Object.entries(DeviceType).map(([key, deviceType]) => (
                    <Pill
                      key={key}
                      active={filter.deviceTypes.includes(deviceType)}
                      onClick={() => {
                        setFilter({
                          ...filter,
                          deviceTypes: toggleValue(filter.deviceTypes, deviceType)
                        });
                      }}
                    >
                      {deviceType}
                    </Pill>
                  ))}
                </div>

                <div className={clsx('pills', styles['filter-pills'])}>
                  <Pill
                    active={filter.platforms.length === 0}
                    onClick={() => {
                      setFilter({ ...filter, platforms: [] });
                    }}
                  >
                    All Platforms
                  </Pill>
                  {Object.entries(Platform)
                    .filter(([, platform]) => FeaturedClientPlatforms.includes(platform))
                    .map(([key, platform]) => (
                      <Pill
                        key={key}
                        active={filter.platforms.includes(platform)}
                        onClick={() => {
                          setFilter({
                            ...filter,
                            platforms: toggleValue(filter.platforms, platform)
                          });
                        }}
                      >
                        {platform}
                      </Pill>
                    ))}
                </div>
              </div>
            </div>
          )}

          {filteredClients.length === 0 ? (
            <div className='card padding-vert--lg'>
              <div className='card__header text--center'>
                <h3>No clients were found that match the selected filters.</h3>
              </div>
            </div>
          ) : (
            filteredClients.map((client) => <ClientDetails key={client.id} client={client} />)
          )}
        </section>
      </main>
    </Layout>
  );
}
