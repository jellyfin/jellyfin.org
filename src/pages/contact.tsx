import Layout from '@theme/Layout';
import React, { useState } from 'react';

import DiscordCard from '../components/contact/DiscordCard';
import IrcCard from '../components/contact/IrcCard';
import MatrixCard from '../components/contact/MatrixCard';
import ForumCard from '../components/contact/ForumCard';
import TwitterCard from '../components/contact/TwitterCard';
import MastodonCard from '../components/contact/MastodonCard';

export default function Contact() {
  const [isOtherChatVisible, setOtherChatVisible] = useState(false);

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
            <div className='col margin-bottom--md text--center'>
              <button
                className='button button--sm button--secondary button--outline'
                onClick={() => {
                  setOtherChatVisible(!isOtherChatVisible);
                }}
              >
                Other
              </button>
            </div>
          </div>
          {isOtherChatVisible && (
            <div className='row'>
              <div className='col col--12 margin-bottom--md'>
                <IrcCard />
              </div>
            </div>
          )}
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
        </section>
      </main>
    </Layout>
  );
}
