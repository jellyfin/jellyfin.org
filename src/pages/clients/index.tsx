import Link from '@docusaurus/Link';
import { mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import ClientDetails from '../../components/clients/ClientDetails';
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
              className='button button--outline button--primary button--icon margin-bottom--md'
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
              <h4 className='margin-bottom--sm'>Device Type</h4>
              <div className='margin-bottom--md'>
                {Object.entries(DeviceType).map(([key, deviceType]) => (
                  <label key={key} className='margin-right--md' style={{ display: 'inline-block' }}>
                    <input
                      type='checkbox'
                      className='margin-right--sm'
                      checked={filter.deviceTypes.includes(deviceType)}
                      onChange={() => {
                        setFilter({
                          ...filter,
                          deviceTypes: toggleValue(filter.deviceTypes, deviceType)
                        });
                      }}
                    />{' '}
                    {deviceType}
                  </label>
                ))}
              </div>

              <h4 className='margin-bottom--sm'>Platform</h4>
              <div className='margin-bottom--md'>
                {Object.entries(Platform)
                  .filter(([, platform]) => FeaturedClientPlatforms.includes(platform))
                  .map(([key, platform]) => (
                    <label key={key} className='margin-right--md' style={{ display: 'inline-block' }}>
                      <input
                        type='checkbox'
                        className='margin-right--sm'
                        checked={filter.platforms.includes(platform)}
                        onChange={() => {
                          setFilter({
                            ...filter,
                            platforms: toggleValue(filter.platforms, platform)
                          });
                        }}
                      />
                      {platform}
                    </label>
                  ))}
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
