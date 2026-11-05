import GeneratedPlugins from './plugins.generated.json';

export type PluginManifest = Array<PluginManifestEntry>;

export type PluginManifestEntry = Omit<Plugin, 'version'> & { versions: Array<PluginVersion> };

export type Plugin = {
  guid: string;
  name: string;
  description: string;
  overview: string;
  category: string;
  owner: string;
  imageUrl?: string;
  version: PluginVersion;
};

export type PluginWithRepository = Plugin & { repository: string };

export type PluginVersion = {
  changelog?: string;
  targetAbi?: string;
  sourceUrl?: string;
  checksum?: string;
  timestamp?: string;
  version?: string;
};

type GeneratedPlugin = {
  repository: string;
  plugin: Plugin;
};

export const Plugins: Array<PluginWithRepository> = (GeneratedPlugins as GeneratedPlugin[]).map(
  ({ repository, plugin }) => ({ ...plugin, repository })
);

export const PluginsForRepository = (repository: string) =>
  (GeneratedPlugins as GeneratedPlugin[])
    .filter((plugin) => plugin.repository === repository)
    .map(({ plugin }) => plugin);
