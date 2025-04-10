import React from 'react';

import './ContactCard.scss';

const ForumCard = () => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        Forum
      </h3>
    </div>
    <div className='card__body'>
      Join us on our Forum for release announcements, troubleshooting, and development discussions.
    </div>
    <div className='card__footer'>
      <a href='https://forum.jellyfin.org' className='button button--primary button--block button--forum'>
        Jellyfin Forum
      </a>
    </div>
  </div>
);

export default ForumCard;
