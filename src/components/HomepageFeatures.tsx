import React from 'react';
import Icon from '@mdi/react';
import {
  mdiPlayCircle,
  mdiTelevision,
  mdiLock,
  mdiCurrencyUsdOff
} from '@mdi/js';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Your Media',
    path: mdiPlayCircle,
    description: (
      <>
        Enjoy your entire collection of movies, shows, music, photos and books
        in an easy to use and beautiful interface.
      </>
    )
  },
  {
    title: 'Live TV & DVR',
    path: mdiTelevision,
    description: (
      <>
        Watch your favorite sports and TV shows live, or record them to catch up
        later.
      </>
    )
  },
  {
    title: 'No Fees',
    path: mdiCurrencyUsdOff,
    description: (
      <>
        It iss all fully free, without any hidden cost. We will never ask you
        for a single cent or hide features behind a subscription.
      </>
    )
  },
  {
    title: 'Privacy Focused',
    path: mdiLock,
    description: (
      <>
        Jellyfin is built around privacy-first. You are control of everything
        and it never calls home.
      </>
    )
  }
];

function Feature({
  path,
  title,
  description
}: {
  path: any;
  title: string;
  description: JSX.Element;
  key: number;
}) {
  return (
    <div className="col col--3 padding--lg">
      <div className="">
        <Icon path={path} className={styles['feature-svg']} />
      </div>
      <div className="margin-top--md">
        <h3 className={styles['feature-title']}>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={`${styles.features}`}>
      <div className="container--fluid">
        <div className="row row-justify--center padding-horiz--sm">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
