import React from 'react';

import { PluginRepository } from '../../data/pluginRepositories';
import PluginRepositoryDetails from './PluginRepositoryDetails';

const PluginRepositoryList = ({ repositories }: { repositories: Array<PluginRepository> }) => (
  <>
    {repositories.map((repository) => (
      <PluginRepositoryDetails key={repository.id} repository={repository} />
    ))}
  </>
);

export default PluginRepositoryList;
