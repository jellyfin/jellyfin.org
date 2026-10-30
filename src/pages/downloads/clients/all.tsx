import React from 'react';

import ClientsPage from './index';

export default function AllClients() {
  return <ClientsPage filter={{ recommended: false, deviceTypes: [], platform: null }} />;
}
