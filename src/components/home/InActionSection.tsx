import clsx from 'clsx';
import React from 'react';
import HomeImageUrl from '../../../static/images/screenshots/home/10.8-home.png';
import LibraryImageUrl from '../../../static/images/screenshots/home/10.8-library.png';
import DetailsImageUrl from '../../../static/images/screenshots/home/10.8-details.png';
import PlaybackImageUrl from '../../../static/images/screenshots/home/10.8-playback.png';

import landingSectionStyles from './LandingSection.module.scss';

const screenshots = [
  {
    id: 'home-screen',
    caption:
      'The home screen highlights your media library. The sections can be customized to each user’s individual preferences.',
    url: HomeImageUrl,
    alt: 'Jellyfin Home Screen'
  },
  {
    id: 'library-screen',
    caption:
      'The library screen lists your media with options to filter and sort so you can find exactly what you are looking for.',
    url: LibraryImageUrl,
    alt: 'Jellyfin Movie Library Screen'
  },
  {
    id: 'details-screen',
    caption: 'The details screen displays all the information about your media.',
    url: DetailsImageUrl,
    alt: 'Jellyfin Movie Details Screen'
  },
  {
    id: 'video-osd',
    caption:
      'The playback screen gives you the controls you need to play or cast your media or start a SyncPlay session with friends or family.',
    url: PlaybackImageUrl,
    alt: 'Jellyfin Video Playback Screen'
  }
];

export default function InActionSection() {
  return (
    <section className={clsx(landingSectionStyles['landing-section'], 'padding-vert--xl')}>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2 className='text--center'>See Jellyfin in Action</h2>
          </div>
        </div>

        {screenshots.map(({ id, caption, url, alt }, index) => {
          const isEven = index % 2 === 0;

          const leftClass = clsx('col', isEven ? 'col--8' : 'col--4', 'align-self--center');
          const rightClass = clsx('col', !isEven ? 'col--8' : 'col--4', 'align-self--center');

          return (
            <div className='row row--center margin-vert--lg' data-id={id} key={`${id}-${index}`}>
              <div className={leftClass}>
                {isEven ? (
                  <img src={url} alt={alt} />
                ) : (
                  <p className='hidden--mobile text--center margin-vert--md'>{caption}</p>
                )}
              </div>
              <div className={rightClass}>
                {!isEven ? <img src={url} alt={alt} /> : <p className='text--center margin-vert--md'>{caption}</p>}
              </div>
              {!isEven && (
                <div className='hidden--desktop col col--5 align-self--center'>
                  <p className='text--center margin-vert--md'>{caption}</p>
                </div>
              )}
            </div>
          );
        })}

        <div className='row'>
          <div className='col margin-top--lg text--center'>
            <a href='https://demo.jellyfin.org/stable' className='button button--outline button--secondary button--lg'>
              Try the Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
