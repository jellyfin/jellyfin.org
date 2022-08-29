import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';

import Pill from '../../components/common/Pill';
import DownloadDetails from '../../components/downloads/DownloadDetails';
import { Downloads, OsType } from '../../data/downloads';

export default function DownloadsPage({ osType = OsType.Linux }: { osType?: OsType }) {
  const [isStableLinks, setIsStableLinks] = useState<boolean>(true);
  const [isStableHelpVisible, setIsStableHelpVisible] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>();

  return (
    <Layout title='Downloads'>
      <h1 className='text--center'>Downloads</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <div className='row margin-bottom--md'>
            <div className='col'>
              <div className='pills' style={{ overflowX: 'auto' }}>
                <Link
                  to='/downloads'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Linux })}
                >
                  Linux
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
                  MacOS
                </Link>
                <Link
                  to='/downloads/docker'
                  className={clsx('pills__item', { 'pills__item--active': osType === OsType.Docker })}
                >
                  Docker
                </Link>
              </div>
            </div>

            <div className='col' style={{ textAlign: 'right' }}>
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

              <ul className='pills margin-bottom--none' style={{ display: 'inline-flex' }}>
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
              </ul>
            </div>
          </div>

          {isStableHelpVisible && (
            <Admonition type='tip' title='Stable or Unstable?'>
              <p>
                Generally, if you&apos;re a new user or value stability use the stable version. It won&apos;t change
                very often. If you want to help test the latest improvements and features and can handle some occasional
                breakage, use the unstable version. Always back up your existing configuration before testing unstable
                releases.
              </p>
            </Admonition>
          )}

          {Downloads.filter((download) => download.osTypes.includes(osType)).map((download) => (
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
