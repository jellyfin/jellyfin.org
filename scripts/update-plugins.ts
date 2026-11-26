import { readFile, rename, writeFile } from 'node:fs/promises';
import { AllPluginRepositories, type PluginRepository } from '../src/data/pluginRepositories.ts';
import { targetsCurrentJellyfin } from '../src/data/pluginVersions.ts';
import type { GeneratedPlugin, PluginManifest, PluginVersion } from '../src/data/plugins.ts';
import { PluginImages } from './plugin-images.ts';

const OUTPUT_PATH = new URL('../src/data/plugins.generated.json', import.meta.url);

async function getPluginManifest(repository: PluginRepository): Promise<PluginManifest | undefined> {
  try {
    const response = await fetch(repository.url, { signal: AbortSignal.timeout(25_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const manifest = await response.json();
    if (!Array.isArray(manifest)) throw new Error('Expected an array of plugins');

    return manifest;
  } catch (cause) {
    console.warn(`Failed to refresh plugin repository ${repository.name} at ${repository.url}`, { cause });
  }
}

function getLatestVersion(versions: Array<PluginVersion> = []) {
  return [...versions].sort((a, b) =>
    (b.version ?? '').localeCompare(a.version ?? '', undefined, { numeric: true })
  )[0];
}

async function updatePlugins(repositories = AllPluginRepositories) {
  const previous: GeneratedPlugin[] = JSON.parse(await readFile(OUTPUT_PATH, 'utf8'));
  const images = new PluginImages(previous);
  const plugins: GeneratedPlugin[] = [];

  console.log(`Downloading data for ${repositories.length} repositories`);
  for (const repository of repositories) {
    const manifest = await getPluginManifest(repository);
    if (!manifest) {
      plugins.push(...previous.filter((entry) => entry.repository === repository.id));
      continue;
    }

    for (const { versions, ...plugin } of manifest) {
      // Only the latest version is displayed, so drop the release history to keep the data small.
      const version = getLatestVersion(versions);
      if (!version) continue;

      const thumbnail = targetsCurrentJellyfin(version.targetAbi)
        ? await images.cache(plugin.imageUrl, repository)
        : undefined;
      plugins.push({ repository: repository.id, plugin: { ...plugin, version }, thumbnail });
    }
  }

  console.log(`Writing ${plugins.length} plugins to ${OUTPUT_PATH}`);
  const temporary = new URL(`${OUTPUT_PATH.href}.${process.pid}.tmp`);
  await writeFile(temporary, JSON.stringify(plugins, null, '\t'));
  await rename(temporary, OUTPUT_PATH);
  await images.prune(plugins);
}

await updatePlugins();
