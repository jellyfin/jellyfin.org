import { SiX } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';

const XCorpCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        X
      </h3>
      <SiX />
    </div>
    <div className='card__body'>
      Follow us on X for release announcements and other updates, along with general musings.
    </div>
    <div className='card__footer'>
      <a href='https://www.x.com/jellyfin' className='button button--block button--xcorp'>
        @jellyfin
      </a>
    </div>
  </div>
);

export default XCorpCard;
