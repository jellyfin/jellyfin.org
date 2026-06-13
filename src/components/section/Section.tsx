import React, { ReactNode } from 'react';

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='col col--4 margin-top--md margin-bottom--md'>
      <div className='card card--dev-index'>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
