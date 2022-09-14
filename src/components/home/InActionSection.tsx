import clsx from 'clsx';
import React from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import HomeImageUrl from '../../../static/images/screenshots/home/10.8-home.png';
import LibraryImageUrl from '../../../static/images/screenshots/home/10.8-library.png';
import DetailsImageUrl from '../../../static/images/screenshots/home/10.8-details.png';
import PlaybackImageUrl from '../../../static/images/screenshots/home/10.8-playback.png';

import 'swiper/css';
import 'swiper/css/pagination';
import landingSectionStyles from './LandingSection.module.css';

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
        <div className='row row--center'>
          <div className='col col--10 padding--none'>
            <Swiper
              autoplay
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
              className='swiper-pagination--below'
            >
              {screenshots.map(({ id, caption, url, alt }) => (
                <SwiperSlide key={`slide-${id}`}>
                  <figure className='margin--none'>
                    <img src={url} alt={alt} />
                    <figcaption className='text--center'>{caption}</figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className='row'>
          <div className='col margin-top--md text--center'>
            <a href='https://demo.jellyfin.org/stable' className='button button--outline button--secondary'>
              Try the Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
