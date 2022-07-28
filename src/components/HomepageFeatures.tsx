import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Movies',
    Svg: require('/static/images/illustrations/undraw_home_cinema.svg').default,
    description: (
      <>
        Enjoy your entire movie collection, easy to browse and with beautiful
        artwork.
      </>
    )
  },
  {
    title: 'Shows',
    Svg: require('/static/images/illustrations/undraw_Video_streaming_re.svg').default,
    description: (
      <>
        Watch your favorite shows, automatically sorted by season and ready to
        binge.
      </>
    )
  },
  {
    title: 'Music',
    Svg: require('/static/images/illustrations/undraw_compose_music.svg').default,
    description: (
      <>
        Listen to music, your artists and your playlists, at home or on the go.
      </>
    )
  },
  {
    title: 'Live TV & DVR',
    Svg: require('/static/images/illustrations/undraw_game_day.svg').default,
    description: (
      <>Watch TV and set automatic recordings to expand your library.</>
    )
  },
  {
    title: 'Books',
    Svg: require('/static/images/illustrations/undraw_book_lover.svg').default,
    description: <>Read your books, comics, and magazines.</>
  },
  {
    title: 'Photos',
    Svg: require('/static/images/illustrations/undraw_group_selfie.svg').default,
    description: (
      <>Organize your photos and share memories with your friends and family.</>
    )
  },
  {
    title: 'SyncPlay',
    Svg: require('/static/images/illustrations/undraw_real_time_collaboration.svg').default,
    description: <>Sharing a movie night remotely has never been so easy.</>
  }
];

function Feature({
  Svg,
  title,
  description
}: {
  Svg: any;
  title: string;
  description: JSX.Element;
  key: number;
}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={`${styles.features} landing-section padding-vert--xl`}>
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
