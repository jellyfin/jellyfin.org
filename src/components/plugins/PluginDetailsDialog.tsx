import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import React, { useEffect, useRef } from 'react';

import type { PluginRepository } from '../../data/pluginRepositories';
import { getHttpsUrl } from '../../data/pluginVersions';
import type { PluginWithRepository } from '../../data/plugins';
import styles from './PluginCatalog.module.scss';

export type PluginSelection = {
  plugin: PluginWithRepository;
  repository: PluginRepository;
  category: string;
};

const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' });

export function formatUpdatedDate(timestamp?: string) {
  const date = Date.parse(timestamp ?? '');
  return Number.isFinite(date) ? dateFormat.format(date) : undefined;
}

export default function PluginDetailsDialog({
  selection: { plugin, repository, category },
  onClose
}: {
  selection: PluginSelection;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const release = plugin.version;
  const updated = formatUpdatedDate(release.timestamp);
  const downloadUrl = getHttpsUrl(release.sourceUrl)?.href;
  const projectUrl = Object.hasOwn(repository.includes, plugin.name) ? repository.includes[plugin.name] : undefined;

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog ref={dialog} className={`card ${styles.dialog}`} aria-labelledby='plugin-details-title' onClose={onClose}>
      <header className={`card__header ${styles.dialogHeader}`}>
        <h2 id='plugin-details-title'>{plugin.name}</h2>
        <form method='dialog'>
          <button type='submit' className='button button--sm button--secondary button--outline'>
            Close
          </button>
        </form>
      </header>

      <div className='card__body'>
        <p className={styles.description}>{plugin.description || plugin.overview}</p>

        <dl className={styles.details}>
          {release.version && (
            <div>
              <dt>Plugin version</dt>
              <dd>{release.version}</dd>
            </div>
          )}
          <div>
            <dt>Category</dt>
            <dd>{category}</dd>
          </div>
          {plugin.owner && (
            <div>
              <dt>Publisher</dt>
              <dd>{plugin.owner}</dd>
            </div>
          )}
          {updated && (
            <div>
              <dt>Last updated</dt>
              <dd>
                <time dateTime={release.timestamp}>{updated}</time>
              </dd>
            </div>
          )}
          <div>
            <dt>Repository</dt>
            <dd>{repository.name}</dd>
          </div>
        </dl>

        {!repository.official && (
          <p className='alert alert--warning'>Install and use third-party plugins at your own risk.</p>
        )}
        <p>
          To add the repository, copy its URL into <strong>Dashboard → Plugins → Repositories</strong> in Jellyfin.
        </p>
        <CodeBlock title='Repository URL'>{repository.url}</CodeBlock>
      </div>

      <footer className={`card__footer ${styles.actions}`}>
        {downloadUrl && (
          <a className='button button--primary' href={downloadUrl}>
            Download ZIP
          </a>
        )}
        {projectUrl && <a href={projectUrl}>Plugin project</a>}
        <Link to='#manual' onClick={() => dialog.current?.close()}>
          Manual installation
        </Link>
      </footer>
    </dialog>
  );
}
