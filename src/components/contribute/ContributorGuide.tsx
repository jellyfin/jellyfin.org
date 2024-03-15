import React from 'react';
import Tab from '../tab/Tab';
import CodeSection from './CodeSection';
import TranslationsSection from './TranslationsSection';
import OtherSection from './OtherSection';

export default function ContributorGuide() {
  return (
    <Tab
      data={{
        links: [
          {
            title: 'Code',
            body: <CodeSection />
          },
          {
            title: 'Translations',
            body: <TranslationsSection />
          },
          {
            title: 'Other',
            body: <OtherSection />
          }
        ]
      }}
    />
  );
}
