import React from 'react';

import DownloadsPage from './server';
import { OsType } from '../../data/downloads';

export default function DotNetDownloads() {
  return <DownloadsPage osType={OsType.DotNet} />;
}
