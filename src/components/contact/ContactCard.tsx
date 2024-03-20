import React, { ReactNode } from 'react';

import './ContactCard.scss';

export enum ContactType {
  Discord = 'button button--block button--discord',
  Forum = 'button button--block button--forum',
  Mastodon = 'button button--block button--mastodon',
  Matrix = 'button button--block button--matrix',
  Twitter = 'button button--block button--twitter'
}

interface ContactDetails {
  title: string;
  icon?: ReactNode;
  buttonLink: string;
  buttonText: string;
  contactType: ContactType;
  body: ReactNode;
}

export default function ContactCard({ contactDetails }: { contactDetails: ContactDetails }) {
  return (
    <div className='card card--contact'>
      <div className='card__header' style={{ display: 'flex' }}>
        <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
          {contactDetails.title}
        </h3>
        {contactDetails.icon && contactDetails.icon}
      </div>
      <div className='card__body'>{contactDetails.body}</div>
      <div className='card__footer'>
        <a href={contactDetails.buttonLink} className={contactDetails.contactType}>
          {contactDetails.buttonText}
        </a>
      </div>
    </div>
  );
}
