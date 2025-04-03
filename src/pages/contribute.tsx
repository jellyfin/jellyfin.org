import Link from '@docusaurus/Link';
import { SiDigitalocean, SiJetbrains } from '@icons-pack/react-simple-icons';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import React from 'react';

import ContributorGuide from '../components/contribute/ContributorGuide';
import Hero from '../components/common/Hero';

import styles from './contribute.module.scss';

export default function Contribute() {
  return (
    <Layout title='How to Contribute'>
      <Hero title='How to Contribute'>
        <p className='hero__text'>
          Jellyfin is a community project run by volunteers. We&apos;re always looking for additional help.
        </p>
      </Hero>

      <main className='margin-vert--lg text--center'>
        <h2>Find a way to contribute</h2>
        <section className='container margin-bottom--lg'>
          <p>
            If you are interested in helping the Jellyfin project, there are a few different ways to contribute
            depending on your skills and availability. Of course, simply using Jellyfin, finding issues, and reporting
            them, are a major help to our project, even if none of these apply to you!
          </p>
          <p>
            Before contributing, please read over our{' '}
            <Link to='/docs/general/community-standards'>Community&nbsp;Standards</Link> and&nbsp;
            <Link to='/docs/general/contributing'>Contributing&nbsp;Guide</Link>.
          </p>
        </section>

        <section className='container margin-bottom--lg'>
          <ContributorGuide />
        </section>

        <hr />

        <h2>Meet the people that bring you Jellyfin</h2>
        <section className='margin-bottom--lg'>
          <div className='margin-bottom--md' style={{ overflow: 'auto' }}>
            <object
              data='https://opencollective.com/jellyfin/contributors.svg?width=1000&button=false'
              type='image/svg+xml'
              width='1000'
              title='Jellyfin Contributors'
            ></object>
          </div>

          <h3>Sponsors</h3>
          <div className={styles['sponsor-list']}>
            <a
              href='https://www.digitalocean.com'
              className={clsx('button', 'button--lg', styles['button--digitalocean'])}
              style={{ display: 'inline-flex' }}
            >
              <SiDigitalocean size={28} className='margin-right--sm' />
              DigitalOcean
            </a>

            <a
              href='https://www.jetbrains.com'
              className={clsx('button', 'button--lg', styles['button--jetbrains'])}
              style={{ display: 'inline-flex' }}
            >
              <SiJetbrains size={28} className='margin-right--sm' />
              JetBrains
            </a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
