import { AllPluginRepositories, type PluginRepository } from '../src/data/pluginRepositories.ts';
import type { Plugin, PluginManifestEntry, PluginVersion } from '../src/data/plugins.ts';
import { writeFile } from 'node:fs/promises';

const OUTPUT_PATH = new URL('../src/data/plugins.generated.json', import.meta.url);

async function getPluginManifest(repository: PluginRepository) {
  try {
    const response = await fetch(repository.url);
    const json = await response.json();
    return json;
  } catch (cause) {
    console.warn(`Failed to retrieve plugin repository ${repository.name} at ${repository.url}`, { cause });
    return [];
  }
}

function getLatestVersion(versions: Array<PluginVersion> = []) {
  return [...versions].sort((a, b) => (b.version ?? '').localeCompare(a.version ?? '', undefined, { numeric: true }))[0];
}

async function getPlugins(repositories: Array<PluginRepository>) {
  const plugins: { repository: string; plugin: Plugin }[] = [];

  for (const repository of repositories) {
    const manifest = await getPluginManifest(repository);
    for (const { versions, ...plugin } of manifest as Array<PluginManifestEntry>) {
      // Only the latest version is displayed, so drop the release history to keep the data small
      const version = getLatestVersion(versions);
      if (!version) continue;
      plugins.push({ repository: repository.id, plugin: { ...plugin, version } });
    }
  }

  return plugins;
}

async function updatePlugins(repositories = AllPluginRepositories) {
  console.log(`Downloading data for ${repositories.length} repositories`);
  const plugins = await getPlugins(repositories);
  console.log(`Writing ${plugins.length} plugins to ${OUTPUT_PATH}`);
  await writeFile(OUTPUT_PATH, JSON.stringify(plugins, null, '\t'));
}

updatePlugins();
