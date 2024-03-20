import { SiTwitter } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';
import ContactCard, { ContactType } from './ContactCard';

export default function TwitterCard() {
  return (
    <ContactCard
      contactDetails={{
        title: 'Twitter',
        icon: <SiTwitter />,
        buttonLink: 'https://www.twitter.com/jellyfin',
        buttonText: '@jellyfin',
        contactType: ContactType.Twitter,
        body: <>Follow us on Twitter for release announcements and other updates, along with general musings.</>
      }}
    />
  );
}
