import { mdiPuzzle } from '@mdi/js';
import { Icon } from '@mdi/react';
import Heading from '@theme/Heading';
import { clsx } from 'clsx';
import React, { useState } from 'react';

import { RepositoryById, type PluginRepository } from '../../data/pluginRepositories';
import { targetsCurrentJellyfin } from '../../data/pluginVersions';
import { Plugins, type PluginImage } from '../../data/plugins';
import styles from './PluginCatalog.module.scss';
import PluginDetailsDialog, { formatUpdatedDate, type PluginSelection } from './PluginDetailsDialog';

const alphabetical = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });
const byName = <T extends { name: string }>(first: T, second: T) => alphabetical.compare(first.name, second.name);

const categoryLabels: Record<string, string> = {
  LiveTV: 'Live TV',
  MoviesAndShows: 'Movies and Shows'
};

function categoryLabel(category: string) {
  return Object.hasOwn(categoryLabels, category) ? categoryLabels[category] : category || 'Other';
}

const catalog = Plugins.flatMap((plugin) => {
  const source = RepositoryById(plugin.repository);
  if (!source || !targetsCurrentJellyfin(plugin.version.targetAbi)) return [];

  const category = categoryLabel(plugin.category);
  return [
    {
      plugin,
      repository: source,
      category,
      searchText: [plugin.name, plugin.description, plugin.overview, plugin.owner, category, source.name]
        .join(' ')
        .toLowerCase()
    }
  ];
});

const categories = [...new Set(catalog.map(({ category }) => category))].sort(alphabetical.compare);

function PluginArtwork({ image }: { image?: PluginImage }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={clsx(styles.artwork, image?.banner && styles.banner)}>
      {image && !failed ? (
        <img
          src={`/images/plugins/${image.file}`}
          alt=''
          loading='lazy'
          decoding='async'
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon path={mdiPuzzle} className={styles.placeholder} aria-hidden='true' />
      )}
    </span>
  );
}

function PluginCard({ selection, onOpen }: { selection: PluginSelection; onOpen: () => void }) {
  const { plugin, category, repository } = selection;
  const release = plugin.version;
  const updated = formatUpdatedDate(release.timestamp);

  return (
    <button
      type='button'
      className={styles.card}
      aria-label={[plugin.name, repository.name, repository.official ? 'Official' : null].filter(Boolean).join(', ')}
      aria-haspopup='dialog'
      onClick={onOpen}
    >
      <PluginArtwork image={plugin.thumbnail} />
      <span className={styles.cardBody}>
        <span className={styles.cardTitle}>
          <strong>{plugin.name}</strong>
          {release.version && <span className={styles.version}>v{release.version}</span>}
        </span>
        {updated && (
          <span className={styles.muted}>
            Last updated <time dateTime={release.timestamp}>{updated}</time>
          </span>
        )}
        <span className={styles.cardMeta}>
          <span>{category}</span>
          <span className={styles.cardSource}>
            {repository.name}
            {repository.official && <span className={styles.officialBadge}>Official</span>}
          </span>
        </span>
      </span>
    </button>
  );
}

function RepositoryList({ repositories }: { repositories: PluginRepository[] }) {
  return (
    <ul className={styles.repositoryList}>
      {repositories.map((repository) => (
        <li key={repository.id}>
          <a href={repository.url}>{repository.name}</a>
        </li>
      ))}
    </ul>
  );
}

export default function PluginCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [repositoryFilter, setRepositoryFilter] = useState('');
  const [showUnstable, setShowUnstable] = useState(false);
  const [sort, setSort] = useState('name');
  const [selected, setSelected] = useState<PluginSelection>();

  const activePlugins = catalog.filter(
    ({ repository }) => !repository.official || !!repository.unstable === showUnstable
  );
  const repositories = [...new Set(activePlugins.map(({ repository }) => repository))].sort(byName);
  const officialRepositories = repositories.filter(({ official }) => official);
  const thirdPartyRepositories = repositories.filter(({ official }) => !official);
  const activeRepository = repositories.find(({ id, official }) => (official ? 'official' : id) === repositoryFilter);
  const terms = query.trim().toLowerCase().split(/\s+/);

  const selections = activePlugins.filter(
    (entry) =>
      (!activeRepository || entry.repository === activeRepository) &&
      (!category || entry.category === category) &&
      terms.every((term) => entry.searchText.includes(term))
  );

  selections.sort((first, second) => {
    const nameOrder = byName(first.plugin, second.plugin) || byName(first.repository, second.repository);
    if (sort === 'name-desc') return -nameOrder;
    if (sort === 'updated') {
      const timestamp = (value?: string) => Date.parse(value ?? '') || 0;
      return timestamp(second.plugin.version.timestamp) - timestamp(first.plugin.version.timestamp) || nameOrder;
    }
    return sort === 'repository' ? byName(first.repository, second.repository) || nameOrder : nameOrder;
  });

  return (
    <div className={styles.catalog}>
      <label className={styles.channel}>
        <input type='checkbox' checked={showUnstable} onChange={(event) => setShowUnstable(event.target.checked)} />
        Show unstable official plugins
      </label>

      <div className={styles.filters} role='group' aria-label='Catalog filters'>
        <label className={styles.search}>
          Search plugins
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Name, description, or publisher'
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value=''>All categories</option>
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Repository
          <select
            value={activeRepository ? repositoryFilter : ''}
            onChange={(event) => setRepositoryFilter(event.target.value)}
          >
            <option value=''>All repositories</option>
            {repositories.map((repository) => (
              <option key={repository.id} value={repository.official ? 'official' : repository.id}>
                {repository.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value='name'>Name (A–Z)</option>
            <option value='name-desc'>Name (Z–A)</option>
            <option value='updated'>Recently updated</option>
            <option value='repository'>Repository (A–Z)</option>
          </select>
        </label>
      </div>

      <p className={styles.resultCount} role='status'>
        {selections.length === 1 ? '1 plugin' : `${selections.length} plugins`}
      </p>
      {selections.length ? (
        <ul className={styles.grid}>
          {selections.map((selection) => (
            <li key={`${selection.repository.id}:${selection.plugin.guid}`}>
              <PluginCard selection={selection} onOpen={() => setSelected(selection)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No plugins match your search and filters.</p>
      )}

      <section className={styles.repositories} aria-labelledby='repositories'>
        <Heading as='h2' id='repositories'>
          Plugin repositories
        </Heading>
        {!!officialRepositories.length && (
          <>
            <Heading as='h3' id='official-plugins'>
              Official plugins
            </Heading>
            <RepositoryList repositories={officialRepositories} />
          </>
        )}
        {!!thirdPartyRepositories.length && (
          <>
            <Heading as='h3' id='3rd-party-plugins'>
              Third-party plugins
            </Heading>
            <p>Independent developers make and maintain these plugins. Install and use them at your own risk.</p>
            <RepositoryList repositories={thirdPartyRepositories} />
          </>
        )}
      </section>

      {selected && <PluginDetailsDialog selection={selected} onClose={() => setSelected(undefined)} />}
    </div>
  );
}
