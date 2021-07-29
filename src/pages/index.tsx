import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';

import HomepageFeatures from '../components/HomepageFeatures';
import FreeSoftware from '../components/FreeSoftware';
import BuiltByVolunteers from '../components/BuiltByVolunteers';
import MoreClients from '../components/MoreClients';
import CallToAction from '../components/CallToAction';
import useBaseUrl from '@docusaurus/useBaseUrl';

import SwiperCore, { Autoplay, EffectFade } from 'swiper/core';
SwiperCore.use([Autoplay, EffectFade]);

function HomepageHeader() {
  return (
    <header className={clsx('hero')}>
      <div className="hero-background">
        <Swiper
          loop={true}
          slidesPerView={1}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          autoplay={{
            delay: 10_000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }}
        >
          <SwiperSlide>
            <img
              alt="Screenshot of Metropolis (1927)"
              src={useBaseUrl('/img/hero/hero-1.png')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Screenshot of Fist of Fury (1972)"
              src={useBaseUrl('/img/hero/hero-2.png')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Screenshot of Kwaidan (1964)"
              src={useBaseUrl('/img/hero/hero-3.png')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Screenshot of Dr. Mabuse, The Gambler (1922)"
              src={useBaseUrl('/img/hero/hero-4.png')}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              alt="Screenshot of His Girl Friday (1940)"
              src={useBaseUrl('/img/hero/hero-5.png')}
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="hero-inner">
        <div className="container">
          <div className="hero-content">
            <div className="hero-content-inner">
              <h1 className="hero-title">The Free Software Media System</h1>
              <a
                href="https://demo.jellyfin.org/stable"
                className="button button--lg button--primary button--outline text--white"
              >
                See it in Action
              </a>
              <a
                href="/downloads"
                className="button button--lg button--primary margin-horiz--md"
              >
                Download Now
              </a>
              <button className="button button--lg button--primary button--outline text--white scroll">
                Learn More
              </button>
            </div>
          </div>
        </div>

        <HomepageFeatures />
      </div>
    </header>
  );
}

export default function Home() {
  useEffect(() => {
    // Set up
    document.body.classList.add('transparent-navbar');

    // Clean up
    return () => {
      document.body.classList.remove('transparent-navbar');
    };
  }, []);

  return (
    <Layout
      title={`The Free Software Media System`}
      description="The volunteer-built media solution that puts you in control of your media. Stream to any device from your own server, with no strings attached."
    >
      <HomepageHeader />
      <main>
        <FreeSoftware />
        <BuiltByVolunteers />
        <MoreClients />
        <CallToAction />
      </main>
    </Layout>
  );
}
