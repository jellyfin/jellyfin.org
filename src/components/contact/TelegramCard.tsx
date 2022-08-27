import { Telegram } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.css';

const TelegramCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Telegram
      </h3>
      <Telegram />
    </div>
    <div className='card__body'>
      The chats on Telegram are <strong>not</strong> bridged to the official Matrix rooms.
    </div>
    <div className='card__footer'>
      <div className='margin-bottom--xs'>
        <small>Release Announcements:</small>
      </div>
      <a href='https://t.me/jellyfinofficial' className='button button--block button--telegram'>
        @JellyfinOfficial
      </a>
      <div className='margin-vert--xs'>
        <small>Troubleshooting and Chat:</small>
      </div>
      <a href='https://t.me/jellyfinchat' className='button button--block button--telegram'>
        @JellyfinChat
      </a>
    </div>
  </div>
);

export default TelegramCard;
