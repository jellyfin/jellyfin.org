import React from 'react';
import CodeBlock from '@theme/CodeBlock';

import { PluginRepository } from '../../data/pluginRepositories';
import { PluginsForRepository } from '../../data/plugins';

const PluginRepositoryList = ({ repositories }: { repositories: Array<PluginRepository> }) => {
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
                  <p>
                    <strong>Repository URL</strong>
                  </p>
                  <CodeBlock>{repository.url}</CodeBlock>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
};

export default PluginRepositoryList;
