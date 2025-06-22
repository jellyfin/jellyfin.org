import { SiDiscord } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';

const DiscordCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Discord
      </h3>
      <SiDiscord />
    </div>
    <div className='card__body'>
      The Jellyfin Discord server is bridged to the official Matrix rooms for convenience.
      <div className='alert alert--secondary margin-top--md'>
        <strong>NOTE:</strong> Matrix is the preferred chat platform. Discord messages may be missed or delayed due to
        bridge instability.
      </div>
    </div>
    <div className='card__footer'>
      <a href='https://discord.gg/zHBxVSXdBV' className='button button--block button--discord'>
        Join the Discord Server
      </a>
    </div>
  </div>
);

export default DiscordCard;
