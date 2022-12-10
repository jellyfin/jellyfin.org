import React from 'react';

import DownloadsPage from './server';
import { OsType } from '../../data/downloads';

export default function DockerDownloads() {
  return <DownloadsPage osType={OsType.Docker} />;
}
