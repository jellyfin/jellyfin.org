import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface NodeData {
  body?: ReactNode;
  links: NodeLink[];
}

interface NodeLink {
  title: string;
  node: NodeData;
}

export default function Node({ data }: { data: NodeData }) {
  const [selected, setSelected] = React.useState('');
  const selectedNode = data.links.find((link) => link.title === selected)?.node;

  return (
    <>
      <div className='margin-top--md'>{data.body && data.body}</div>
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

      {selectedNode && <Node data={selectedNode} />}
    </>
  );
}
