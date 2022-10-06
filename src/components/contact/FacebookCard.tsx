import { Facebook } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';

const FacebookCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Facebook
      </h3>
      <Facebook />
    </div>
    <div className='card__body'>
      We don&apos;t post updates there often, but we do have an official Facebook Page also.
    </div>
    <div className='card__footer'>
      <a href='https://www.facebook.com/jellyfin.media/' className='button button--block button--facebook'>
        @jellyfin.media
      </a>
    </div>
  </div>
);

export default FacebookCard;
