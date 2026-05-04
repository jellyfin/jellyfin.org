import Layout from '@theme/Layout';
import React from 'react';

import DiscordCard from '../components/contact/DiscordCard';
import EmailCard from '../components/contact/EmailCard';
import MatrixCard from '../components/contact/MatrixCard';
import ForumCard from '../components/contact/ForumCard';
import TwitterCard from '../components/contact/TwitterCard';
import MastodonCard from '../components/contact/MastodonCard';

export default function Contact() {
  return (
    <Layout title='Contact'>
      <h1 className='text--center margin-top--lg'>Contact</h1>

      <main className='margin-top--md margin-bottom--lg'>
        <section className='container'>
          <div className='row'>
            <div className='col'>
              <h2>Chat</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col col--8 margin-bottom--md' style={{ display: 'flex' }}>
              <MatrixCard />
            </div>
            <div className='col col--4 margin-bottom--md' style={{ display: 'flex' }}>
              <DiscordCard />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h2>Social</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col margin-bottom--md' style={{ display: 'flex' }}>
              <ForumCard />
            </div>
            <div className='col margin-bottom--md' style={{ display: 'flex' }}>
              <MastodonCard />
            </div>
            <div className='col margin-bottom--md' style={{ display: 'flex' }}>
              <TwitterCard />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h2>Email</h2>
            </div>
            <div className='col col--12 margin-bottom--md' style={{ display: 'flex' }}>
              Email is intended for specific cases. For most questions, support, or general discussion, please join our
              chat first. It`s faster and helps you reach the right people.
            </div>
            <div className='col col--4 margin-bottom--md' style={{ display: 'flex' }}>
              <EmailCard
                title='Team'
                email='team@jellyfin.org'
                description='For general inquiries, press, or partnership opportunities. Messages here are handled by the core team.'
              />
            </div>
            <div className='col col--4 margin-bottom--md' style={{ display: 'flex' }}>
              <EmailCard
                title='Security'
                email='security@jellyfin.org'
                description='For reporting security issues or vulnerabilities. This reaches the security team directly. Please include as much detail as possible.'
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
