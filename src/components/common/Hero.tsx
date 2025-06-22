import clsx from 'clsx';
import React, { FunctionComponent, ReactNode } from 'react';

import './Hero.scss';

type HeroProps = {
  children?: ReactNode;
  title: string;
  large?: boolean;
};

const Hero: FunctionComponent<HeroProps> = ({ children, title, large = false }: HeroProps) => (
  <header className={clsx('hero', { 'hero--large': large })}>
    <div className='hero__overlay hero__overlay--gradient'></div>
    <div className='hero__inner'>
      <div className='container'>
        <div className='hero__content'>
          <div className='hero__content__inner'>
            <h1 className='hero__title'>{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Hero;
