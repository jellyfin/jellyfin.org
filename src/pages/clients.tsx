import Layout from '@theme/Layout';
import React, { useState } from 'react';

import ClientDetails from '../components/ClientDetails';
import Pill from '../components/Pill';
import { Clients, DeviceType } from '../data/clients';
import Platform from '../data/platform';

type ClientFilter = {
  recommended: boolean;
  deviceType?: DeviceType;
  platform?: Platform;
};

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
            <Pill
              active={filter.recommended}
              onClick={() => {
                setFilter({ ...filter, recommended: true });
              }}
            >
              Recommended Clients
            </Pill>
            <Pill
              active={!filter.recommended}
              onClick={() => {
                setFilter({ ...filter, recommended: false });
              }}
            >
              All Clients
            </Pill>
          </ul>

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
