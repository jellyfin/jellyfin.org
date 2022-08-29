import React from 'react';

import DownloadsPage from '.';
import { OsType } from '../../data/downloads';

export default function LinuxDownloads() {
  return <DownloadsPage osType={OsType.MacOS} />;
}
