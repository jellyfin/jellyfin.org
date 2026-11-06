import React from 'react';
import CodeBlock from '@theme/CodeBlock';

import { PluginRepository } from '../../data/pluginRepositories';
import { PluginsForRepository } from '../../data/plugins';
import styles from './PluginRepositoryList.module.scss';

const PuzzlePiece = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z' />
  </svg>
);

const PluginRepositoryList = ({ repositories }: { repositories: Array<PluginRepository> }) => {
  return (
    <>
      {repositories.map((repository) => {
        const plugins = [...PluginsForRepository(repository.id)].sort((a, b) => a.name.localeCompare(b.name));
        if (plugins.length === 0) return null;

        return (
          <section key={repository.id}>
            <h3>{repository.name}</h3>
            <p>
              <strong>Repository URL</strong>
            </p>
            <CodeBlock>{repository.url}</CodeBlock>
            <div className={styles.grid}>
              {plugins.map((plugin) => (
                <div className={styles.card} key={plugin.guid} title={plugin.description}>
                  <div className={styles.image}>
                    {plugin.imageUrl ? <img src={plugin.imageUrl} alt='' loading='lazy' /> : <PuzzlePiece />}
                  </div>
                  {plugin.version.targetAbi && <span className={styles.badge}>ABI {plugin.version.targetAbi}</span>}
                  <div className={styles.name}>{plugin.name}</div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default PluginRepositoryList;
