import React from 'react';
import Layout from '@theme/Layout';

import HomepageFeatures from '../components/home/HomepageFeatures';
import FreeSoftware from '../components/home/FreeSoftware';
import BuiltByVolunteers from '../components/home/BuiltByVolunteers';
import MoreClients from '../components/home/MoreClients';
import CallToAction from '../components/home/CallToAction';
import Hero from '../components/common/Hero';

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
        <a href='https://demo.jellyfin.org/stable' className='button button--lg button--secondary button--outline'>
          See it in Action
        </a>
        <a href='/downloads' className='button button--lg button--primary margin-left--md'>
          Download Now
        </a>
      </Hero>
      <main>
        <HomepageFeatures />
        <FreeSoftware />
        <BuiltByVolunteers />
        <MoreClients />
        <CallToAction />
      </main>
    </Layout>
  );
}
