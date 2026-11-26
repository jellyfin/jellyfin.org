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

export type PluginImage = {
  file: string;
  banner: boolean;
};

export type PluginWithRepository = Plugin & { repository: string; thumbnail?: PluginImage };

export type PluginVersion = {
  changelog?: string;
  targetAbi?: string;
  sourceUrl?: string;
  checksum?: string;
  timestamp?: string;
  version?: string;
};

export type GeneratedPlugin = {
  repository: string;
  plugin: Plugin;
  thumbnail?: PluginImage;
};

export const Plugins: Array<PluginWithRepository> = (GeneratedPlugins as GeneratedPlugin[]).map(
  ({ repository, plugin, thumbnail }) => ({ ...plugin, repository, thumbnail })
);

export const PluginsForRepository = (repository: string) =>
  (GeneratedPlugins as GeneratedPlugin[])
    .filter((plugin) => plugin.repository === repository)
    .map(({ plugin }) => plugin);
