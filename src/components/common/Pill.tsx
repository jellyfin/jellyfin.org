import clsx from 'clsx';
import React, { FunctionComponent, ReactNode } from 'react';

type PillParams = {
  children: ReactNode;
  active: boolean;
  onClick(): void;
};

const Pill: FunctionComponent<PillParams> = ({ children, active, onClick }: PillParams) => (
  <li
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
    role='button'
    tabIndex={0}
    className={clsx('pills__item', { 'pills__item--active': active })}
    onClick={onClick}
    onKeyUp={(keyEvent) => {
      if (keyEvent.key === 'Enter') {
        onClick();
      }
    }}
  >
    {children}
  </li>
);

export default Pill;
