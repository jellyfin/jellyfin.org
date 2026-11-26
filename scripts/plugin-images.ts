import { createHash } from 'node:crypto';
import { access, mkdir, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import type { PluginRepository } from '../src/data/pluginRepositories.ts';
import type { GeneratedPlugin, PluginImage } from '../src/data/plugins.ts';
import { getHttpsUrl } from '../src/data/pluginVersions.ts';

const IMAGE_DIRECTORY = new URL('../static/images/plugins/', import.meta.url);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const CACHE_FILENAME = /^[a-f\d]{64}\.webp$/;

// Sharp exposes these methods on the CommonJS export, rather than as ESM named exports.
// eslint-disable-next-line import-x/no-named-as-default-member
const { block, unblock } = sharp;
block({ operation: ['VipsForeignLoad'] });
unblock({
  operation: [
    'VipsForeignLoadPngBuffer',
    'VipsForeignLoadJpegBuffer',
    'VipsForeignLoadWebpBuffer',
    'VipsForeignLoadNsgifBuffer'
  ]
});

async function fetchImage(url: URL, isAllowedHost: (url: URL) => boolean) {
  const signal = AbortSignal.timeout(12_000);

  for (let redirects = 0; redirects <= 3; redirects++) {
    if (!isAllowedHost(url)) throw new Error(`Image host ${url.host} is not approved`);

    const response = await fetch(url, { redirect: 'manual', signal });
    const location = response.headers.get('location');
    if (response.status >= 300 && response.status < 400 && location) {
      await response.body?.cancel();
      const nextUrl = getHttpsUrl(new URL(location, url).href);
      if (!nextUrl) throw new Error('Invalid image redirect');
      url = nextUrl;
      continue;
    }

    if (!response.ok || !response.body) {
      await response.body?.cancel();
      throw new Error(`HTTP ${response.status}`);
    }

    const chunks: Uint8Array[] = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.byteLength;
      if (size > MAX_IMAGE_BYTES) throw new Error('Image exceeds the download size limit');
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }

  throw new Error('Too many image redirects');
}

export class PluginImages {
  private previous = new Map<string, PluginImage>();
  private refreshed = new Map<string, PluginImage>();

  constructor(previous: GeneratedPlugin[]) {
    for (const { thumbnail } of previous) {
      if (thumbnail && CACHE_FILENAME.test(thumbnail.file)) this.previous.set(thumbnail.file, thumbnail);
    }
  }

  async cache(imageUrl: string | undefined, repository: PluginRepository) {
    const url = getHttpsUrl(imageUrl);
    const manifestHost = new URL(repository.url).host;
    const isAllowedHost = (url: URL) =>
      url.host === manifestHost ||
      (repository.id === 'lizardbyte.dev' && url.host === 'lizardbyte.github.io') ||
      (repository.official && !url.port && url.hostname.endsWith('.mirror.jellyfin.org'));
    if (!url || !isAllowedHost(url)) return undefined;

    url.hash = '';
    const file = createHash('sha256').update(url.href).digest('hex') + '.webp';
    const cached = this.refreshed.get(file);
    if (cached) return cached;

    const output = new URL(file, IMAGE_DIRECTORY);
    try {
      const buffer = await fetchImage(url, isAllowedHost);
      const source = sharp(buffer, { limitInputPixels: 16_000_000 });
      const { width, height } = await source.metadata();
      if (width < 2 || height < 2) throw new Error('Image has no usable dimensions');

      const thumbnail = await source.resize(960, 540, { fit: 'inside', withoutEnlargement: true }).webp().toBuffer();
      const image = { file, banner: width / height >= 1.55 && width / height <= 2.1 };

      await mkdir(IMAGE_DIRECTORY, { recursive: true });
      const temporary = new URL(`${file}.${process.pid}.tmp`, IMAGE_DIRECTORY);
      await writeFile(temporary, thumbnail);
      await rename(temporary, output);

      this.refreshed.set(file, image);
      return image;
    } catch (cause) {
      console.warn(`Could not cache plugin image from ${url.origin}${url.pathname}`, cause);
      const previous = this.previous.get(file);
      if (previous) {
        const exists = await access(output).then(
          () => true,
          () => false
        );
        if (exists) return previous;
      }
    }
  }

  async prune(plugins: GeneratedPlugin[]) {
    const active = new Set(plugins.map(({ thumbnail }) => thumbnail?.file));
    await mkdir(IMAGE_DIRECTORY, { recursive: true });
    for (const file of await readdir(IMAGE_DIRECTORY)) {
      if (CACHE_FILENAME.test(file) && !active.has(file)) await unlink(new URL(file, IMAGE_DIRECTORY));
    }
  }
}
