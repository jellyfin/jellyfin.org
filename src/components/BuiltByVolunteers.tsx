import React from 'react';
import Svg from '../../static/img/people.svg';
import styles from './BuiltByVolunteers.modules.css';

export default function BuiltByVolunteers() {
  // When updating members count here, substract one to account for jellyfin-bot.
  const members = 45;
  const contributors = 1000;

  return (
    <section className={`${styles.section} padding-vert--xl`}>
      <div className="container">
        <div className="row">
          <div className={`col col--5 padding--lg ${styles['member-counts']}`}>
            <div
              className="display--flex position--relative flex-direction--column align-items--center margin-bottom--md"
              style={{ zIndex: 2 }}
            >
              <span className={styles.number}>{members}</span>
              <span>Members</span>
            </div>
            <div
              className="display--flex position--relative flex-direction--column align-items--center"
              style={{ zIndex: 2 }}
            >
              <span className={styles.number}>{contributors}+</span>
              <span>Contributors</span>
            </div>
          </div>
          <div className="col col--6 display--flex flex-direction--column align-items--start row-justify--center">
            <h1 className={styles['section-title']}>
              Built by volunteers,
              <wbr /> community&#8209;driven
            </h1>
            <div className="margin-bottom--sm">
              <b>
                Jellyfin is entirely funded through donations and built by its
                users.
              </b>
            </div>
            <div>
              We rely entirely on contributions from volunteers. There is no
              corporation steering the ship. Everything is done by users, for
              users.
            </div>
            <a
              href="/contribute"
              className="button button--lg button--primary margin-top--lg"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
