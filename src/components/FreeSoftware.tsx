import React from 'react';
import styles from './FreeSoftware.modules.css';

export default function FreeSoftware() {
  return (
    <section className={`${styles.section} padding-vert--xl`}>
      <div className="container">
        <div className="row">
          <div className="col col--6 display--flex flex-direction--column align-items--start row-justify--center">
            <h1 className={styles['section-title']}>
              Your media, your server,
              <br /> your way
            </h1>
            <div className="margin-bottom--sm">
              <b>Jellyfin is fully self-hosted and fully open source.</b>
            </div>
            <div>
              We don&apos;t do tracking or paid plans. There is no forced
              connection to a remote server. You are in control from start to
              finish.
            </div>
            <a
              href="/contribute"
              className="button button--lg button--primary margin-top--lg"
            >
              Get Started
            </a>
          </div>
          <div className="col col--6 padding--lg">
            <img
              alt="Jellyfin home screen"
              className="shadow--md"
              src={require('../../static/img/home-10.7.png').default}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
