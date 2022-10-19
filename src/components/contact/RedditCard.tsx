import { Reddit } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';

const RedditCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Reddit
      </h3>
      <Reddit />
    </div>
    <div className='card__body'>
      Participate in community discussion and troubleshooting and receive updates from the Jellyfin project and
      community on Reddit.
    </div>
    <div className='card__footer'>
      <a href='https://www.reddit.com/r/jellyfin' className='button button--block button--reddit'>
        /r/jellyfin
      </a>
    </div>
  </div>
);

export default RedditCard;
