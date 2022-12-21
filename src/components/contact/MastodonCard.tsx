import { Mastodon } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';

const MastodonCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Mastodon
      </h3>
      <Mastodon />
    </div>
    <div className='card__body'>
      Follow us on Mastodon for release announcements and more, just like our Twitter account.
    </div>
    <div className='card__footer'>
      <a href='https://mastodon.online/@jellyfin' className='button button--block button--mastodon'>
        @jellyfin@mastodon.online
      </a>
    </div>
  </div>
);

export default MastodonCard;
