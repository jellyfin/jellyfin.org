import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Admonition from '@theme-original/Admonition';

import Pill from '../components/Pill';
import DownloadDetails from '../components/downloads/DownloadDetails';
import { Downloads, OsType } from '../data/downloads';

export default function DownloadsPage() {
  const [osType, setOsType] = useState<OsType>(OsType.Linux);
  const [activeButton, setActiveButton] = useState<string>();

  return (
    <Layout title='Downloads'>
      <h1 className='text--center'>Downloads</h1>

      <main className='margin-vert--lg'>
        <section className='container'>
          <Admonition type='tip' title='Stable or Unstable?'>
            <p>
              Generally, if you&apos;re a new user or value stability use the stable version. It won&apos;t change very
              often. If you want to help test the latest improvements and features and can handle some occasional
              breakage, use the unstable version. Always back up your existing configuration before testing unstable
              releases.
            </p>
          </Admonition>

          <ul className='pills' style={{ overflowX: 'auto' }}>
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

          {Downloads.filter((download) => download.osTypes.includes(osType)).map((download) => (
            <DownloadDetails
              key={download.id}
              download={download}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          ))}
        </section>
      </main>
    </Layout>
  );
}
