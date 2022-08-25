import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';

import Pill from '../components/common/Pill';
import DownloadDetails from '../components/downloads/DownloadDetails';
import { Downloads, OsType } from '../data/downloads';

export default function DownloadsPage() {
  const [osType, setOsType] = useState<OsType>(OsType.Linux);
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
              <ul className='pills margin-bottom--none' style={{ overflowX: 'auto' }}>
                <Pill
                  active={osType === OsType.Linux}
                  onClick={() => {
                    setOsType(OsType.Linux);
                  }}
                >
                  Linux
                </Pill>
                <Pill
                  active={osType === OsType.Windows}
                  onClick={() => {
                    setOsType(OsType.Windows);
                  }}
                >
                  Windows
                </Pill>
                <Pill
                  active={osType === OsType.MacOS}
                  onClick={() => {
                    setOsType(OsType.MacOS);
                  }}
                >
                  macOS
                </Pill>
                <Pill
                  active={osType === OsType.Docker}
                  onClick={() => {
                    setOsType(OsType.Docker);
                  }}
                >
                  Docker
                </Pill>
              </ul>
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
