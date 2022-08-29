import React from 'react';

import DownloadsPage from '.';
import { OsType } from '../../data/downloads';

export default function WindowsDownloads() {
  return <DownloadsPage osType={OsType.Windows} />;
}
