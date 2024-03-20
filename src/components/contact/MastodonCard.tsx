import { SiMastodon } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';
import ContactCard, { ContactType } from './ContactCard';

export default function MastodonCard() {
  return (
    <ContactCard
      contactDetails={{
        title: 'Mastodon',
        icon: <SiMastodon />,
        buttonLink: 'https://mastodon.online/@jellyfin',
        buttonText: '@jellyfin@mastodon.online',
        contactType: ContactType.Mastodon,
        body: <>Follow us on Mastodon for release announcements and more, just like our Twitter account.</>
      }}
    />
  );
}
