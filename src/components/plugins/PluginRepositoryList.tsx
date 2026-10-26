import React, { useState } from 'react';

import { PluginRepository } from '../../data/pluginRepositories';
import { PluginsForRepository } from '../../data/plugins';

const PluginRepositoryList = ({ repositories }: { repositories: Array<PluginRepository> }) => {
  const [copyMessage, setCopyMessage] = useState('');

  const copyRepositoryUrl = async (repository: PluginRepository) => {
    try {
      await navigator.clipboard.writeText(repository.url);
      setCopyMessage(`Copied ${repository.name} repository URL.`);
    } catch {
      setCopyMessage(`Unable to copy ${repository.name} repository URL. Copy it manually: ${repository.url}`);
    }
  };

  return (
    <>
      {repositories.map((repository) => {
        const plugins = PluginsForRepository(repository.id);
        if (plugins.length === 0) return null;

        return (
          <section key={repository.id}>
            <h3>{repository.name}</h3>
            <ul>
              {plugins.map((plugin) => (
                <li key={plugin.guid}>
                  <strong>{plugin.name}</strong>
                  <p>{plugin.description}</p>
                  <button
                    type='button'
                    className='button button--secondary button--sm'
                    onClick={() => void copyRepositoryUrl(repository)}
                  >
                    Copy repository URL
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <p role='status' aria-live='polite'>
        {copyMessage}
      </p>
    </>
  );
};

export default PluginRepositoryList;
