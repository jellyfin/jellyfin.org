import React from 'react';

import './ContactCard.scss';

interface EmailCardProps {
  title: string;
  email: string;
  description: string;
}

const EmailCard = ({ title, email, description }: EmailCardProps) => (
  <div className='card card--contact'>
    <div className='card__header' style={{ display: 'flex' }}>
      <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
        {title}
      </h3>
    </div>

    <div className='card__body'>
      <div className='margin-top--md'>
        <a href={`mailto:${email}`} className='button button--block button--email'>
          {email}
        </a>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default EmailCard;
