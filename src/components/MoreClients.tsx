import React from 'react';
import Web from '../../static/img/web.svg';
import Desktop from '../../static/img/monitor.svg';
import {
  Android,
  Apple,
  Roku,
  Amazon,
  Kodi
} from '@icons-pack/react-simple-icons';
import Plus from '../../static/img/plus-thick.svg';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './MoreClients.module.css';

export default function MoreClients() {
  return (
    <section className={`${styles.section} padding-vert--xl`}>
      <div className="container">
        <div className="row">
          <div className="col col--5 display--flex flex-direction--column align-items--start row-justify--center padding-right--xl">
            <h1 className={styles['section-title']}>
              More clients
              <br /> than you can count
            </h1>
            <div>
              With a large array of official and third-party clients,
              <wbr /> Jellyfin is available on every platform.
              <br />
              Your media is ready to follow you, wherever you go.
            </div>
            <a
              href="/contribute"
              className="button button--lg button--primary margin-top--lg"
            >
              Find Your Device
            </a>
          </div>
          <div className="col col--7">
            <img
              alt="Jellyfin clients on TV, desktop, tablet and phone"
              src={useBaseUrl('/img/devices.png')}
            />
          </div>
        </div>
        <div className="row">
          <div
            className={`${styles['client-list']} col col--12 display--flex flex-wrap--wrap row-justify--center margin-top--xl`}
          >
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Web />
              <span className="margin-top--sm">Web</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Desktop />
              <span className="margin-top--sm">Desktop</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Android color="#858a8f" size={48} />
              <span className="margin-top--sm">Android</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Apple color="#858a8f" size={48} />
              <span className="margin-top--sm">Apple</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Roku color="#858a8f" size={48} />
              <span className="margin-top--sm">Roku</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Kodi color="#858a8f" size={48} />
              <span className="margin-top--sm">Kodi</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Amazon color="#858a8f" size={48} />
              <span className="margin-top--sm">Amazon</span>
            </div>
            <div className="display--flex flex-direction--column align-items--center client-icon-block margin-top--md">
              <Plus />
              <span className="margin-top--sm">And more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
