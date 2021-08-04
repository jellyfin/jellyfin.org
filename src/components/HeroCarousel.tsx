import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import SwiperCore, { Autoplay, EffectFade } from 'swiper/core';
SwiperCore.use([Autoplay, EffectFade]);

const HeroCarousel = ({
  children,
  header,
  slides
}: {
  children?:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
  header?: boolean;
  slides: any[];
}) => {
  return (
    <div className={`${header ? '-mt-20 lg:-mt-28 z-0' : ''} relative`}>
      <div className="mx-auto">
        <div className="relative overflow-hidden flex">
          <div className="h-full w-full absolute">
            <Swiper
              className="h-full w-full"
              loop
              slidesPerView={1}
              effect={'fade'}
              fadeEffect={{ crossFade: true }}
              autoplay={{
                delay: 10_000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false
              }}
            >
              {slides.map((element, alt) => (
                <div className="absolute inset-0 z-0">
                  <SwiperSlide key={alt}>
                    <img
                      className="h-full w-full object-cover"
                      alt={element.alt}
                      src={element.image.childImageSharp.fluid.srcWebp}
                    />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
          <div className="absolute h-full w-full inset-0 bg-gray-700 opacity-60 z-10"></div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
