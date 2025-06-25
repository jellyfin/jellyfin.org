import { SiX } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';

const TwitterCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Twitter
      </h3>
      <SiX />
    </div>
    <div className='card__body'>
      Follow us on Twitter for release announcements and other updates, along with general musings.
    </div>
    <div className='card__footer'>
      <a href='https://www.twitter.com/jellyfin' className='button button--block button--twitter'>
        @jellyfin
      </a>
    </div>
  </div>
);

export default TwitterCard;
