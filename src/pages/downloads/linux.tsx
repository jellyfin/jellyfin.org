import React from 'react';

import DownloadsPage from './server';
import { OsType } from '../../data/downloads';

export default function LinuxDownloads() {
  return <DownloadsPage osType={OsType.Linux} />;
}
