import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';

import Pill from '../../components/common/Pill';
import DownloadDetails from '../../components/downloads/DownloadDetails';
import { Downloads, OsType } from '../../data/downloads';

import styles from './index.module.scss';

export default function DownloadsPage({ osType = OsType.Linux }: { osType?: OsType }) {
  const [isStableLinks, setIsStableLinks] = useState<boolean>(true);
  const [isStableHelpVisible, setIsStableHelpVisible] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>();

  return (
    <Layout title='Downloads'>
      <h1 className='text--center margin-top--lg'>Downloads</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <div className='row'>
            <div className='col margin-bottom--md'>
              <div className='pills'>
                <Link to='/downloads' className='pills__item'>
                  Clients
                </Link>
                <Link to='/downloads/server' className='pills__item pills__item--active'>
                  Server
                </Link>
                <Link to='https://repo.jellyfin.org' className='pills__item'>
                  Full Repository{' '}
                  <svg width='17' height='13.5' aria-hidden='true' viewBox='0 0 24 24' className='iconExternalLink'>
                    <path
                      fill='currentColor'
                      d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z'
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>

            <div className={clsx('col', 'margin-bottom--md', styles['header-pills-middle'])}>
              <div className='pills' style={{ overflowX: 'auto' }}>
                <Link
                  to='/downloads/linux'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Linux })}
                >
                  Linux
                </Link>
                <Link
                  to='/downloads/docker'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Docker })}
                >
                  Docker
                </Link>
                <Link
                  to='/downloads/windows'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Windows })}
                >
                  Windows
                </Link>
                <Link
                  to='/downloads/macos'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.MacOS })}
                >
                  macOS
                </Link>
                <Link
                  to='/downloads/dotnet'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.DotNet })}
                >
                  .NET
                </Link>
              </div>
            </div>

            <div className={clsx('col', 'margin-bottom--md', styles['header-pills-end'])}>
              <div className={clsx('pills', 'margin-bottom--none', styles['stable-links'])}>
                <Pill
                  active={!isStableLinks}
                  onClick={() => {
                    setIsStableLinks(false);
                    setActiveButton(null);
                  }}
                >
                  Unstable
                </Pill>
                <Pill
                  active={isStableLinks}
                  onClick={() => {
                    setIsStableLinks(true);
                    setActiveButton(null);
                  }}
                >
                  Stable
                </Pill>
              </div>

              <button
                className='button button--link'
                onClick={() => {
                  setIsStableHelpVisible(!isStableHelpVisible);
                }}
                style={{
                  verticalAlign: 'baseline'
                }}
              >
                Help?
              </button>
            </div>
          </div>

          <div className='text--center margin-bottom--md'>
            <a href='https://github.com/jellyfin/jellyfin/releases/latest'>
              <img alt='Current Release' src='https://img.shields.io/github/release/jellyfin/jellyfin.svg' />
            </a>
          </div>

          {isStableHelpVisible && (
            <Admonition type='tip' title='Stable or Unstable?'>
              <p>
                Generally, if you&apos;re a new user or don&apos;t want your server to change often, use the Stable
                version. If you want to help test the latest improvements and features and can handle some occasional
                breakage, use the Unstable version. New Unstable releases are published Weekly on Monday mornings
                (~05:00 UTC). NOTE: Always back up your existing configuration before testing Unstable releases as there
                is NO DOWNGRADE PATH; you must restore your Stable configuration from a backup. For more details,
                [please see this documentation](/docs/general/testing/upgrading-and-downgrading).
              </p>
            </Admonition>
          )}

          {Downloads.filter(
            (download) =>
              // OS Type matches filter
              download.osTypes.includes(osType) &&
              // Ensure there are unstable links if unstable is selected
              (isStableLinks || download.unstableButtons.length > 0)
          ).map((download) => (
            <DownloadDetails
              key={download.id}
              download={download}
              isStableLinks={isStableLinks}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
}
