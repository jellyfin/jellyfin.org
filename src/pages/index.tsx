import React, { useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import FreeSoftware from '../components/FreeSoftware';
import BuiltByVolunteers from '../components/BuiltByVolunteers';
import MoreClients from '../components/MoreClients';
import CallToAction from '../components/CallToAction';

function HomepageHeader() {
  return (
    <header className={clsx('hero')}>
      <div className="hero-overlay hero-overlay--gradient"></div>
      <div className="hero-inner">
        <div className="container">
          <div className="hero-content">
            <div className="hero-content-inner">
              <h1 className="hero-title">The Free Software Media System</h1>
              <a
                href="https://demo.jellyfin.org/stable"
                className="button button--lg button--secondary button--outline text--white"
              >
                See it in Action
              </a>
              <a
                href="/downloads"
                className="button button--lg button--primary margin-horiz--md"
              >
                Download Now
              </a>
              <button className="button button--lg button--secondary button--outline text--white scroll">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  useEffect(() => {
    // Set up
    document.body.classList.add('transparent-navbar');

    // Clean up
    return () => {
      document.body.classList.remove('transparent-navbar');
    };
  }, []);

  return (
    <Layout
      title={`The Free Software Media System`}
      description="The volunteer-built media solution that puts you in control of your media. Stream to any device from your own server, with no strings attached."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <FreeSoftware />
        <BuiltByVolunteers />
        <MoreClients />
        <CallToAction />
      </main>
    </Layout>
  );
}
