import React from 'react';
import Layout from '@theme/Layout';
import ContributorGuide from '../components/ContributorGuide';
import Hero from '../components/Hero';

export default function Contribute() {
  return (
    <Layout title='How to Contribute'>
      <Hero title='How to Contribute'>
        <p className='hero__text'>
          Jellyfin is a community project run by volunteers.
          We&apos;re always looking for additional help.
        </p>
      </Hero>

      <main className='margin-vert--lg text--center'>
        <section className='container margin-bottom--lg'>
          <p>
            If you&apos;re interesting in helping the Jellyfin project, there are a few different ways to
            contribute depending on your skills and availability.
            Of course, simply using Jellyfin, finding issues, and reporting them, are a major help to our
            project, even if none of these apply to you!
          </p>
          <p>
            Before contributing, please read over
            our <a href='https://jellyfin.org/docs/general/community-standards.html'>
              Community&nbsp;Standards
            </a> and&nbsp;<a href='https://jellyfin.org/docs/general/contributing/index.html'>
              Contributing&nbsp;Guide
            </a>.
          </p>
        </section>

        <section className='container margin-bottom--lg'>
          <ContributorGuide />
        </section>

        <h2>Meet the people that bring you Jellyfin</h2>
        <div
          className='margin-bottom--lg'
          style={{ overflow: 'auto' }}
        >
          <object
            data='https://opencollective.com/jellyfin/contributors.svg?width=1000&button=false'
            type='image/svg+xml'
            width='1000'
          >
            Jellyfin Contributors
          </object>
        </div>
      </main>
    </Layout>
  );
}
