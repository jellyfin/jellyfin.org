import clsx from 'clsx';
import React, { FunctionComponent, ReactNode } from 'react';

type PillParams = {
  children: ReactNode;
  active: boolean;
  onClick(): void;
};

const Pill: FunctionComponent<PillParams> = ({ children, active, onClick }: PillParams) => (
  <button
    className={clsx('pills__item', { 'pills__item--active': active })}
    onClick={onClick}
    onKeyUp={(keyEvent) => {
      if (keyEvent.key === 'Enter') {
        onClick();
      }
    }}
  >
    {children}
  </button>
);

export default Pill;
