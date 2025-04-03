import React, { ComponentType, HTMLProps, ReactNode } from 'react';
import landingSectionStyles from './LandingSection.module.scss';
import styles from './HomepageFeatures.module.scss';
import clsx from 'clsx';

type Feature = {
  title: string;
  description: ReactNode;
  Svg: ComponentType<HTMLProps<HTMLElement & SVGElement>>;
};

const FeatureList: Feature[] = [
  {
    title: 'Movies',
    Svg: require('/static/images/illustrations/undraw_home_cinema.svg').default,
    description: <>Enjoy your entire movie collection, easy to browse and with beautiful artwork.</>
  },
  {
    title: 'Shows',
    Svg: require('/static/images/illustrations/undraw_Video_streaming_re.svg').default,
    description: <>Watch your favorite shows, automatically sorted by season and ready to binge.</>
  },
  {
    title: 'Music',
    Svg: require('/static/images/illustrations/undraw_compose_music.svg').default,
    description: <>Listen to music, your artists and your playlists, at home or on the go.</>
  },
  {
    title: 'Live TV & DVR',
    Svg: require('/static/images/illustrations/undraw_game_day.svg').default,
    description: <>Watch TV and set automatic recordings to expand your library.</>
  },
  {
    title: 'Books',
    Svg: require('/static/images/illustrations/undraw_book_lover.svg').default,
    description: <>Read your books, comics, and magazines.</>
  },
  {
    title: 'Photos',
    Svg: require('/static/images/illustrations/undraw_group_selfie.svg').default,
    description: <>Organize your photos and share memories with your friends and family.</>
  },
  {
    title: 'SyncPlay',
    Svg: require('/static/images/illustrations/undraw_real_time_collaboration.svg').default,
    description: <>Sharing a movie night remotely has never been so easy.</>
  }
];

function FeatureCard({ Svg, title, description }: Feature) {
  return (
    <>
      <div className='text--center'>
        <Svg className={styles.featureSvg} title={title} />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={clsx(styles.features, landingSectionStyles['landing-section'], 'padding-vert--xl')}>
      <div className='container'>
        <div className='row row--center text--center'>
          <div className='col col--8'>
            <h2>What is Jellyfin?</h2>
            <p>
              Jellyfin enables you to collect, manage, and stream your media. Run the Jellyfin server on your system and
              gain access to the leading free-software entertainment system, bells <em>and</em> whistles included.
            </p>
          </div>
        </div>
        <div className='row row--center padding-horiz--sm'>
          {FeatureList.map((feature) => (
            <div key={`column-${feature.title}`} className='col col--3 col-sm-12 col-md-6'>
              {<FeatureCard {...feature} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
