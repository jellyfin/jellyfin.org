import React from 'react';

import DetailsCard from '../common/DetailsCard';
import { PluginRepository } from '../../data/pluginRepositories';
import { PluginsForRepository } from '../../data/plugins';

function PluginRepositoryDetails({ repository }: { repository: PluginRepository }) {
  const plugins = PluginsForRepository(repository.id);

  return (
    <DetailsCard
      id={repository.id}
      title={repository.name}
      badges={
        <>
          {repository.official ? (
            <span className='badge badge--primary margin-right--sm'>Official</span>
          ) : (
            <span className='badge badge--secondary margin-right--sm'>Third Party</span>
          )}
          {repository.unstable && <span className='badge badge--warning margin-right--sm'>Unstable</span>}
        </>
      }
      description={
        <>
          <span>Repository URL</span>
          <pre>{repository.url}</pre>
          Included plugins: {plugins.map((plugin) => plugin.name).join(', ')}.
        </>
      }
    />
  );
}

export default PluginRepositoryDetails;
