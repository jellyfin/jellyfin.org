import React from 'react';

import DetailsCard from '../common/DetailsCard';
import { Plugin, PluginWithRepository } from '../../data/plugins';
import { RepositoryById } from '../../data/pluginRepositories';

function PluginDetails({ plugin }: { plugin: Plugin | PluginWithRepository }) {
  const repository = 'repository' in plugin ? RepositoryById(plugin.repository) : null;
  // TODO: Add filtering?
  if (repository.unstable) return;

  const targetAbi = plugin.versions.find((version) => version.targetAbi)?.targetAbi ?? null;
  const latestVersion = plugin.versions.find((version) => version.sourceUrl && version.version) ?? null;

  return (
    <DetailsCard
      id={plugin.guid}
      title={plugin.name}
      badges={
        <>
          {repository.official ? (
            <span className='badge badge--primary margin-right--sm'>Official</span>
          ) : (
            <span className='badge badge--secondary margin-right--sm'>Third Party</span>
          )}
          {repository.unstable && <span className='badge badge--warning margin-right--sm'>Unstable</span>}

          <span className='badge badge--secondary margin-right--sm'>{plugin.category}</span>
          {targetAbi && <span className='badge badge--secondary margin-right--sm'>{targetAbi}</span>}
        </>
      }
      description={plugin.description}
      primaryButtons={[
        latestVersion && (
          <a key='download' href={latestVersion.sourceUrl} className='button button--primary'>
            Download {latestVersion.version}
          </a>
        )
      ]}
      // description={<pre>{JSON.stringify(plugin, null, '\t')}</pre>}
      // footerDetails={<img src={plugin.imageUrl} />}
    />
  );
}

export default PluginDetails;
