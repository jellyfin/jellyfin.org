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
      r/Jellyfin has 
      <a href='https://www.theverge.com/2023/6/5/23749188/reddit-subreddit-private-protest-api-changes-apollo-charges'>
        gone private
      </a>
      . Our chat options remain open. We are currently on Lemmy: 
      <a href='https://beehaw.org/c/jellyfin@lemmy.ml'>c/Jellyfin</a> (via Beehaw)
    </div>
    <div className='card__footer'>
      <button className='button button--block button--reddit'>Unavailable</button>
    </div>
  </div>
);

export default RedditCard;
