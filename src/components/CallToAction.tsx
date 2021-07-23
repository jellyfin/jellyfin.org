import React from 'react';
import styles from './CallToAction.modules.css';

export default function CallToAction() {
  return (
    <div className={`${styles.cta} padding-vert--xl`}>
      <div className="container">
        <div className="cta-inner">
          <h2 className={styles['section-title']}>Get Started Now</h2>
          <p className="cta-sub">
            Check out our Getting Started guide to download and set up your
            server today.
          </p>
          <a
            href="/downloads"
            className="button button--primary button--lg margin-top--lg"
          >
            Download Jellyfin
          </a>
        </div>
      </div>
    </div>
  );
}
