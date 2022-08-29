import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React, { useState } from 'react';

import ClientDetails from '../../components/clients/ClientDetails';
import { Clients, DeviceType } from '../../data/clients';
import Platform from '../../data/platform';

type ClientFilter = {
  recommended: boolean;
  deviceType?: DeviceType;
  platform?: Platform;
};

export default function ClientsPage({ recommended = true }: { recommended?: boolean }) {
  const [filter] = useState<ClientFilter>({
    recommended
  });

  return (
    <Layout title='Clients'>
      <h1 className='text--center'>Clients</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <div className='pills margin-bottom--md'>
            <Link to='/clients' className={clsx('pills__item', { 'pills__item--active': filter.recommended })}>
              Recommended Clients
            </Link>
            <Link to='/clients/all' className={clsx('pills__item', { 'pills__item--active': !filter.recommended })}>
              All Clients
            </Link>
          </div>

          {Clients.filter((client) => {
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
          }).map((client) => (
            <ClientDetails key={client.id} client={client} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
