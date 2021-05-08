import React from 'react';
import Web from '../../static/img/web.svg';
import Desktop from '../../static/img/monitor.svg';
import { Android, Apple, Roku, Amazon, Kodi } from '@icons-pack/react-simple-icons';
import Plus from '../../static/img/plus-thick.svg';

export default function MoreClients() {
  return (
    <section className="landing-section padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--12 display--flex flex-direction--column align-items--center">
            <h1>More clients than you can count</h1>
            <div>With a large array of official and third-party clients, Jellyfin is available on every platform. Your media is ready to follow you, wherever you go.</div>

            <div className="display--flex flex-wrap--wrap align-items--center fill--white margin-top--lg">
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Web />
                <span className="margin-top--sm">Web</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Desktop />
                <span className="margin-top--sm">Desktop</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Android color="#ffffff" size={48} />
                <span className="margin-top--sm">Android</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Apple color="#ffffff" size={48} />
                <span className="margin-top--sm">Apple</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Roku color="#ffffff" size={48} />
                <span className="margin-top--sm">Roku</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Kodi color="#ffffff" size={48} />
                <span className="margin-top--sm">Kodi</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Amazon color="#ffffff" size={48} />
                <span className="margin-top--sm">Amazon</span>
              </div>
              <div className="display--flex flex-direction--column align-items--center client-icon-block">
                <Plus />
                <span className="margin-top--sm">And more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
