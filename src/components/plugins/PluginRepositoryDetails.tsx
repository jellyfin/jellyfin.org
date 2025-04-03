import React from 'react';

import DetailsCard from '../common/DetailsCard';
import { PluginRepository } from '../../data/pluginRepositories';

const PluginRepositoryDetails = ({ repository }: { repository: PluginRepository }) => (
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

        {Object.entries(repository.includes).length > 0 && (
          <>
            <h3>Includes</h3>
            <ul>
              {Object.entries(repository.includes).map(([name, url]) => (
                <li key={url}>
                  <a href={url} target='_blank' rel='noreferrer'>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    }
  />
);

export default PluginRepositoryDetails;
