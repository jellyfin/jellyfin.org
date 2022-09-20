import Link from '@docusaurus/Link';
import { mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import ClientDetails from '../../components/clients/ClientDetails';
import Pill from '../../components/common/Pill';
import { Client, Clients, DeviceType } from '../../data/clients';
import Platform, { FeaturedClientPlatforms } from '../../data/platform';

import styles from './index.module.css';

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
  const [filteredClients, setFilteredClients] = useState<Client[]>([...Clients]);
  const [filter, setFilter] = useState<ClientFilter>({
    recommended,
    deviceTypes: [],
    platforms: []
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

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
      <h1 className='text--center'>Clients</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <div className={styles.header}>
            <div className={clsx('pills', styles.pills, 'margin-bottom--md')}>
              <Link to='/clients' className={clsx('pills__item', { 'pills__item--active': filter.recommended })}>
                Recommended Clients
              </Link>
              <Link to='/clients/all' className={clsx('pills__item', { 'pills__item--active': !filter.recommended })}>
                All Clients
              </Link>
            </div>

            <button
              className={clsx(
                'button',
                'button--outline',
                'button--primary',
                { 'button--active': isFiltersVisible },
                'button--icon',
                'margin-bottom--md'
              )}
              onClick={() => {
                setIsFiltersVisible(!isFiltersVisible);
              }}
            >
              <Icon path={mdiFilter} size='1em' />
              Filters
            </button>
          </div>

          {isFiltersVisible && (
            <div>
              <ul className={clsx('pills', styles.pills, 'margin-bottom--md')}>
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
              </ul>

              <ul className={clsx('pills', styles.pills, 'margin-bottom--md')}>
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
              </ul>
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
