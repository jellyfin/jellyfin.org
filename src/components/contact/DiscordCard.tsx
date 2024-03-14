import { SiDiscord } from '@icons-pack/react-simple-icons';
import React from 'react';

import './ContactCard.scss';
import ContactCard, { ContactType } from './ContactCard';

export default function DiscordCard() {
  return (
    <ContactCard
      contactDetails={{
        title: 'Discord',
        icon: <SiDiscord />,
        buttonLink: 'https://discord.gg/zHBxVSXdBV',
        buttonText: 'Join the Discord Server',
        contactType: ContactType.Discord,
        body: (
          <>
            The Jellyfin Discord server is bridged to the official Matrix rooms for convenience.
            <div className='alert alert--secondary margin-top--md'>
              <strong>NOTE:</strong> Matrix is the preferred chat platform. Discord messages may be missed or delayed
              due to bridge instability.
            </div>
          </>
        )
      }}
    />
  );
}
