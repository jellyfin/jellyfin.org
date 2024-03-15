import React from 'react';
import Tab from '../tab/Tab';

import CodeCSharp from './Code/CodeCSharp';
import CodeJavascript from './Code/CodeJavascript';
import CodeOther from './Code/CodeOther';

export default function CodeSection() {
  return (
    <>
      <div className='margin-top--md'>
        There are a couple ways to get involved with Jellyfin depending on your skillset.
      </div>
      <Tab
        data={{
          links: [
            {
              title: 'C#',
              body: <CodeCSharp />
            },
            {
              title: 'Javascript',
              body: <CodeJavascript />
            },
            {
              title: 'Other',
              body: <CodeOther />
            }
          ]
        }}
      />
    </>
  );
}
