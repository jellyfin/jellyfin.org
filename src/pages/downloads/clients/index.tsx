import useIsBrowser from '@docusaurus/useIsBrowser';
import Link from '@docusaurus/Link';
import { useHistory, useLocation } from '@docusaurus/router';
import { mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import ClientDetails from '../../../components/clients/ClientDetails';
import Pill from '../../../components/common/Pill';
import { Clients, DeviceType } from '../../../data/clients';
import Platform, { FeaturedClientPlatforms } from '../../../data/platform';
import { UAParser } from 'ua-parser-js';

import styles from '../index.module.scss';
import ExternalLinkIcon from '@theme/Icon/ExternalLink';

type ClientFilter = {
  recommended: boolean;
  deviceTypes: DeviceType[];
  platform: Platform | null;
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

function getPlatform(userAgent: string): Platform | null {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();
  switch (os.name) {
    case 'macOS':
      // TODO : Re-enable platform-specific clients once Platform.Desktop is no longer used for all desktop platforms.
      // return Platform.MacOS;
      return Platform.Desktop;
    case 'Windows':
      // TODO : Re-enable platform-specific clients once Platform.Desktop is no longer used for all desktop platforms.
      // return Platform.MacOS;
      return Platform.Desktop;
    case 'Linux':
    case 'Ubuntu':
    case 'Debian':
    case 'Arch':
    case 'CentOS':
    case 'Fedora':
    case 'Gentoo':
    case 'Sailfish':
      // TODO : Re-enable platform-specific clients once Platform.Desktop is no longer used for all desktop platforms.
      // return Platform.Linux;
      return Platform.Desktop;
    case 'Android':
      return Platform.Android;
    case 'watchOS':
    case 'iOS':
      return Platform.IOS;
    case 'WebOS':
      return Platform.WebOS;
    case 'Xbox':
      return Platform.Xbox;
    default:
      return null;
  }
}

export default function ClientsPage(options: { filter?: ClientFilter }) {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  let optionFilter = options.filter;
  if (!optionFilter) {
    optionFilter = {
      recommended: true,
      deviceTypes: (searchParams.get('type')?.split(',') ?? []) as DeviceType[],
      platform: (searchParams.get('platform') ?? undefined) as Platform | null
    };
  }
  const [filter, setFilterValue] = useState<ClientFilter>(optionFilter);

  const isBrowser = useIsBrowser();
  if (isBrowser && filter.platform === undefined) {
    const platform = getPlatform(navigator.userAgent);
    setFilterValue((filter) => ({ ...filter, platform: platform as Platform | null }));
  }

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const setFilter = (filter: ClientFilter) => {
    const search = new URLSearchParams();

    if (filter.deviceTypes.length > 0) {
      search.set('type', filter.deviceTypes.join(','));
    }
    if (filter.platform) {
      search.set('platform', filter.platform);
    }
    history.push({
      search: search.toString()
    });

    setFilterValue(filter);
  };

  const filteredClients = useMemo(
    () =>
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
          result && (filter.platform === null || client.platforms.some((platform) => filter.platform === platform));

        return result;
      }),
    [filter]
  );

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

                <ul className={clsx('pills', styles['filter-pills'])}>
                  <Pill
                    active={filter.platform === null}
                    onClick={() => {
                      setFilter({ ...filter, platform: null });
                    }}
                  >
                    All Platforms
                  </Pill>
                  {Object.entries(Platform)
                    .filter(([, platform]) => FeaturedClientPlatforms.includes(platform))
                    .map(([key, platform]) => (
                      <Pill
                        key={key}
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
