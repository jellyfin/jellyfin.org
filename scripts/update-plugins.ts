import { AllPluginRepositories, PluginRepository } from '../src/data/pluginRepositories';
import { Plugin } from '../src/data/plugins';
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

async function getPlugins(repositories: Array<PluginRepository>) {
  const plugins: { repository: string; plugin: Plugin }[] = [];

  for (const repository of repositories) {
    const manifest = await getPluginManifest(repository);
    for (const plugin of manifest) {
      plugins.push({ repository: repository.id, plugin });
    }
  }

  return plugins;
}

async function updatePlugins(repositories = AllPluginRepositories) {
  console.log(`Downloading data for ${repositories.length} repositories`);
  const plugins = await getPlugins(AllPluginRepositories);
  console.log(`Writing ${plugins.length} plugins to ${OUTPUT_PATH}`);
  await writeFile(OUTPUT_PATH, JSON.stringify(plugins, null, '\t'));
}

updatePlugins();
