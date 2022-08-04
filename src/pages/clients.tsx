import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useState } from 'react';

import ClientDetails from '../components/ClientDetails';
import { Clients, DeviceType, Platform } from '../data/clients';

type ClientFilter = {
  recommended: boolean,
  deviceType?: DeviceType,
  platform?: Platform
}

export default function Plugins() {
  const [filter, setFilter] = useState<ClientFilter>({
    recommended: true
  });

  return (
    <Layout title='Clients'>
      <h1 className='text--center'>Clients</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <ul className='pills'>
            <li
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role='button'
              tabIndex={0}
              className={clsx('pills__item', { 'pills__item--active': filter.recommended })}
              onClick={() => { setFilter({ ...filter, recommended: true }); }}
              onKeyUp={keyEvent => {
                if (keyEvent.key === 'Enter') {
                  setFilter({ ...filter, recommended: true });
                }
              }}
            >
              Recommended Clients
            </li>
            <li
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
              role='button'
              tabIndex={0}
              className={clsx('pills__item', { 'pills__item--active': !filter.recommended })}
              onClick={() => { setFilter({ ...filter, recommended: false }); }}
              onKeyUp={keyEvent => {
                if (keyEvent.key === 'Enter') {
                  setFilter({ ...filter, recommended: false });
                }
              }}
            >
              All Clients
            </li>
          </ul>

          {
            Clients.filter(client => {
              let result = true;

              if (filter.recommended) {
                result = result && !!client.recommended;
              }

              if (typeof filter.deviceType !== 'undefined') {
                result = result && client.deviceTypes.includes(filter.deviceType);
              }

              if (typeof filter.platform !== 'undefined') {
                result = result && client.platforms.includes(filter.platform);
              }

              return result;
            }).map(client => (
              <ClientDetails key={client.id} client={client} />
            ))
          }
        </section>
      </main>
    </Layout>
  );
}
