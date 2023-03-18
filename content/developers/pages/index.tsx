import React, { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Hero from '../../../src/components/common/Hero';
import blogPosts from '../../../.docusaurus/docusaurus-plugin-content-blog/developers-blog/blog-post-list-prop-developers-blog.json';

import './index.scss';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='col col--4 margin-top--md margin-bottom--md'>
      <div className='card card--dev-index'>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

function DocsHighlights() {
  return (
    <Section title='Documentation'>
      <ul>
        <li>
          <Link to='/developers/docs/api/authorization'>Using the REST API</Link>
        </li>
        <li>
          <Link to='/developers/docs/api/authorization'>Creating a server plugin</Link>
        </li>
      </ul>
    </Section>
  );
}

function OtherPages() {
  return (
    <Section title='More resources'>
      <ul>
        <li>
          <Link to='/developers/docs/contributing/'>Contributing</Link>
        </li>
        <li>
          <Link to='/developers/docs/branding'>Jellyfin branding</Link>
        </li>
      </ul>
    </Section>
  );
}

function RecentBlogPosts() {
  return (
    <Section title={blogPosts.title}>
      <ul>
        {blogPosts.items.slice(0, 5).map((item, index) => (
          <li key={index}>
            <a href={`${item.permalink}`}>{item.title}</a>{' '}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Index() {
  return (
    <Layout title={`Jellyfin developers`}>
      <Hero title='Jellyfin for Developers'>
        <p className='hero__text margin-vert--lg'>Get started developing with or for Jellyfin today.</p>
        <div className='hero__buttons'>
          <Link to='/docs/'>Not a developer? Go to the user documentation</Link>
        </div>
      </Hero>
      <main>
        <section className='container'>
          <div className='row'>
            <DocsHighlights />
            <RecentBlogPosts />
            <OtherPages />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Index;
