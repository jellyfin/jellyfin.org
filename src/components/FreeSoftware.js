import React from 'react';
import Svg from '../../static/img/icon-transparent.svg';
import styles from './FreeSoftware.modules.css';

export default function FreeSoftware() {
  return (
    <section className="landing-section padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--6">
            <Svg className={styles.logo} />
            <h1>Your media, your server, your way</h1>
            <div className="margin-bottom--sm"><b>Jellyfin is fully self-hosted and fully open source.</b></div>
            <div>We don't do tracking or paid plans. There is no forced connection to a remote server. You are in control from start to finish.</div>
          </div>
          <div className="col col--6 padding--lg">
            <img className="shadow--md" src={require('../../static/img/home-10.7.png').default} />
          </div>
        </div>
      </div>
    </section>
  );
}
