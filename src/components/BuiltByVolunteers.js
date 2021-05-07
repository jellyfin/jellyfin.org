import React from 'react';
import Svg from '../../static/img/people.svg';
import styles from './BuiltByVolunteers.modules.css';

export default function BuiltByVolunteers() {
  // When updating members count here, substract one to account for jellyfin-bot.
  const members = 43;
  const contributors = 1000;

  return (
    <section className="landing-section padding-vert--xl">
      <div className="container">
        <div className="row">
          <div className="col col--6 padding--lg">
              <div className="display--flex flex-direction--column align-items--center margin-bottom--md">
                <h1>{members}</h1>
                <h2>Members</h2>
              </div>
              <div className="display--flex flex-direction--column align-items--center">
                <h1>{contributors}+</h1>
                <h2>Contributors</h2>
              </div>
          </div>
          <div className="col col--6">
            <Svg className={styles.logo} />
            <h1>Built by volunteers, community-driven</h1>
            <div className="margin-bottom--sm"><b>Jellyfin is entirely funded through donations and built by its users.</b></div>
            <div>We rely entirely on contributions from volunteers. There is no corporation steering the ship. Everything is done by users, for users.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
