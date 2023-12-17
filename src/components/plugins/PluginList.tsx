import React from 'react';

import { Plugin } from '../../data/plugins';
import PluginDetails from './PluginDetails';

const PluginList = ({ plugins }: { plugins: Array<Plugin> }) => (
  <>
    {plugins.map((plugin) => (
      <PluginDetails key={plugin.guid} plugin={plugin} />
    ))}
  </>
);

export default PluginList;
