import React, { FunctionComponent, ReactNode } from 'react';

import './DetailsCard.scss';

type DetailsCardProps = {
  id?: string;
  title: string;
  description: ReactNode;
  smallDescription?: ReactNode;
  badges?: ReactNode;
  icons?: ReactNode;
  primaryButtons?: Array<ReactNode>;
  secondaryButtons?: Array<ReactNode>;
  footerDetails?: ReactNode;
};

const DetailsCard: FunctionComponent<DetailsCardProps> = ({
  id,
  title,
  description,
  smallDescription,
  badges = [],
  icons = [],
  primaryButtons = [],
  secondaryButtons = [],
  footerDetails
}) => (
  <div id={id} className='card details-card margin-bottom--md'>
    <div className='card__header details-card__header'>
      <div className='details-card__header__start'>
        <h2>{title}</h2>
        <div className='details-card__header__start__badges'>{badges}</div>
      </div>
      <div className='details-card__icons'>{icons}</div>
    </div>
    <div className='card__body padding-top--sm'>
      <p>{description}</p>
      {smallDescription && <p className='card__body__helptext'>{smallDescription}</p>}
    </div>
    <div className='card__footer details-card__footer container'>
      <div className='row'>
        <div className='details-card__footer__buttons col'>
          {secondaryButtons}
          <div style={{ flex: 1 }} />
          {primaryButtons}
        </div>
      </div>
      {footerDetails && (
        <div className='row'>
          <div className='col'>{footerDetails}</div>
        </div>
      )}
    </div>
  </div>
);

export default DetailsCard;
