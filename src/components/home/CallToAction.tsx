import Link from '@docusaurus/Link';
import React from 'react';

import styles from './CallToAction.modules.css';

export default function CallToAction() {
  return (
    <div className={styles.cta}>
      <div className='container'>
        <h2>Get Started Now</h2>
        <p className={styles['cta-sub']}>
          Check out our Getting Started guide to download and set up your server today.
        </p>
        <Link to='/downloads' className='button button--primary button--lg margin-top--lg'>
          Download Jellyfin
        </Link>
      </div>
    </div>
  );
}
