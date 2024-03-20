import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface TabData {
  body?: ReactNode;
  links: TabLink[];
}

interface TabLink {
  title: string;
  body: ReactNode;
}

export default function Tab({ data }: { data: TabData }) {
  const [selected, setSelected] = React.useState('');
  const selectedTab = data.links.find((link) => link.title === selected);

  return (
    <>
      {data.body && data.body}
      <div>
        {data.links.map((link, index) => (
          <button
            key={index}
            className={clsx('button', 'button--secondary', 'margin-right--md margin-top--md', {
              'button--active': selected === link.title
            })}
            onClick={() => setSelected(link.title)}
          >
            {link.title}
          </button>
        ))}
      </div>

      {selectedTab && selectedTab.body}
    </>
  );
}
