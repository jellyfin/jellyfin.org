import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import HomeImageUrl from '../../../static/images/screenshots/home/10.8-home.png';
import LibraryImageUrl from '../../../static/images/screenshots/home/10.8-library.png';
import DetailsImageUrl from '../../../static/images/screenshots/home/10.8-details.png';
import PlaybackImageUrl from '../../../static/images/screenshots/home/10.8-playback.png';

import 'swiper/css';
import 'swiper/css/navigation';
import landingSectionStyles from './LandingSection.module.css';
import clsx from 'clsx';

const screenshots = [
  {
    title: 'Home Screen',
    url: HomeImageUrl,
    alt: 'Jellyfin Home Screen'
  },
  {
    title: 'Movie Library Screen',
    url: LibraryImageUrl,
    alt: 'Jellyfin Movie Library Screen'
  },
  {
    title: 'Movie Details Screen',
    url: DetailsImageUrl,
    alt: 'Jellyfin Movie Details Screen'
  },
  {
    title: 'Video Playback Screen',
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
            <Swiper navigation modules={[Navigation]}>
              {screenshots.map(({ title, url, alt }) => (
                <SwiperSlide key={`slide-${title}`}>
                  <img src={url} alt={alt} />
                  <div className='text--center'>
                    <small>{title}</small>
                  </div>
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
