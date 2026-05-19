import React from 'react';

import Section from '../section/Section';
import Link from '@docusaurus/Link';

interface Page {
  url: string;
  name: string;
}

export default function NavigationLinks({ title, pages }: { title: string; pages: Page[] }) {
  return (
    <Section title={title}>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>
            <Link to={page.url}>{page.name}</Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
