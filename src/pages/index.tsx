import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import HomepageFeatures from '../components/home/HomepageFeatures';
import ClientSection from '../components/home/ClientSection';
import CallToAction from '../components/home/CallToAction';
import FreedomSection from '../components/home/FreedomSection';
import Hero from '../components/common/Hero';
import InActionSection from '../components/home/InActionSection';

export default function Home() {
  return (
    <Layout
      title={`The Free Software Media System`}
      description='The volunteer-built media solution that puts you in control of your media. Stream to any device from your own server, with no strings attached.'
    >
      <Hero title='The Free Software Media System' large>
        <p className='hero__text margin-vert--lg'>
          Jellyfin is the volunteer-built media solution that puts <em>you</em> in control of your media. Stream to any
          device from your own server, with no strings attached. Your media, your server, your way.
        </p>
        <div className='hero__buttons'>
          <a href='https://demo.jellyfin.org/stable' className='button button--lg button--secondary button--outline'>
            See it in Action
          </a>
          <Link to='/downloads/server' className='button button--lg button--primary'>
            Download Now
          </Link>
        </div>
        <p className='margin-bottom--none margin-top--md'>
          <a href='/docs/general/community-standards/servers' className='secondary-link'>
            Note: We do not run servers for users.
          </a>
        </p>
      </Hero>
      <main>
        <HomepageFeatures />
        <ClientSection />
        <InActionSection />
        <FreedomSection />
        <CallToAction />
      </main>
    </Layout>
  );
}
