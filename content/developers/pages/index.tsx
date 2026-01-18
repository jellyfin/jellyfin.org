import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Hero from '../../../src/components/common/Hero';
import blogPosts from '../../../.docusaurus/docusaurus-plugin-content-blog/developers-blog/blog-post-list-prop-developers-blog.json';

import './index.scss';
import NavigationLinks from '../../../src/components/navigationLinks/NavigationLinks';

export default function Index() {
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
            <NavigationLinks
              title='Documentation'
              pages={[
                { url: '/developers/docs/api/authorization', name: 'Using the REST API' },
                { url: '/developers/docs/api/authorization', name: 'Creating a server plugin' },
                { url: '/developers/docs/api/websockets', name: 'Connecting to WebSockets'},
                { url: '/developers/docs/api/syncplay', name: 'Utilising the SyncPlay API' },
                { url: '/developers/docs/api/playlists', name: 'Managing playlists' },
              ]}
            />

            <NavigationLinks
              title={blogPosts.title}
              pages={blogPosts.items.slice(0, 5).map((item) => {
                return { url: item.permalink, name: item.title };
              })}
            />

            <NavigationLinks
              title='More resources'
              pages={[
                { url: '/developers/docs/contributing', name: 'Contributing' },
                { url: '/developers/docs/branding', name: 'Jellyfin branding' }
              ]}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
