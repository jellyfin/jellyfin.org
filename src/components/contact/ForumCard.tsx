import React from 'react';

import './ContactCard.scss';
import ContactCard, { ContactType } from './ContactCard';

export default function ForumCard() {
  return (
    <ContactCard
      contactDetails={{
        title: 'Forum',
        buttonLink: 'https://forum.jellyfin.org',
        buttonText: 'Jellyfin Forum',
        contactType: ContactType.Forum,
        body: <>Join us on our Forum for release announcements, troubleshooting, and development discussions.</>
      }}
    />
  );
}
