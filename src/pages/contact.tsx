import React from 'react';
import Layout from '@theme/Layout';
import {
  Telegram,
  Discord,
  Element,
  Reddit,
  Twitter,
  Facebook,
  Github,
  Jellyfin,
  Weblate,
  Opencollective
} from '@icons-pack/react-simple-icons';
import styles from './contact.module.css';

// TODO: We can probably factorize this a little?
// Make it less markup heavy by building an object, then iterating over it, for example.

// TODO: How do we handle platforms with multiple links like IRC and Element?
// TODO: Once available, change the Element link to use Element Spaces.

export default function Contact() {
  return (
    <Layout>
      <div className="container margin-bottom--lg">
        <h1>Contact</h1>
        <h2>Chat</h2>
        <div className="row">
          <div className="col col--12">
            <p>
              The Jellyfin team and community are active on several messaging
              platforms.
              <br />
              While Element is our main avenue of communication, it is bridged
              to Discord and Libera Chat for convenience.
            </p>
            <div className={styles['contact-grid']}>
              <a
                className={`${styles.element} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://matrix.to/#/#jellyfin:matrix.org"
              >
                <Element className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Element</h2>
                  <span>#jellyfin:matrix.org</span>
                </div>
              </a>
              <a
                className={`${styles.discord} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://discord.gg/zHBxVSXdBV"
              >
                <Discord className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Discord</h2>
                  <span>discord.gg/zHBxVSXdBV</span>
                </div>
              </a>
              <a
                className={`${styles.libera} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="ircs://irc.libera.chat:6697/#jellyfin"
              >
                <span className={`${styles['libera-icon']} margin--md`}>#</span>
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Libera Chat</h2>
                  <span>#jellyfin</span>
                </div>
              </a>
              <a
                className={`${styles.telegram} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://t.me/jellyfinchat"
              >
                <Telegram className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Telegram</h2>
                  <span>@JellyfinChat</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <h2 className="margin-top--md">Social</h2>
        <div className="row">
          <div className="col col--12">
            <p>
              If you want to follow Jellyfin news and engage the community, we
              are active on several social media platforms.
            </p>
            <div className={styles['contact-grid']}>
              <a
                className={`${styles.reddit} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://www.reddit.com/r/jellyfin"
              >
                <Reddit className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Reddit</h2>
                  <span>/r/jellyfin</span>
                </div>
              </a>
              <a
                className={`${styles.twitter} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://www.twitter.com/jellyfin"
              >
                <Twitter className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Twitter</h2>
                  <span>@Jellyfin</span>
                </div>
              </a>
              <a
                className={`${styles.facebook} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://www.facebook.com/jellyfin.media/"
              >
                <Facebook className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Facebook</h2>
                  <span>jellyfin.media</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        <h2 className="margin-top--md">Other</h2>
        <div className="row">
          <div className="col col--12">
            <p>
              The following platforms allow you to contribute to, and to
              support, Jellyfin.
            </p>
            <div className={styles['contact-grid']}>
              <a
                className={`${styles.github} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://github.com/jellyfin"
              >
                <Github className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">GitHub</h2>
                  <span>Jellyfin</span>
                </div>
              </a>
              <a
                className={`${styles.weblate} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://translate.jellyfin.org/"
              >
                <Weblate className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Weblate</h2>
                  <span>Translate</span>
                </div>
              </a>
              <a
                className={`${styles.jellyfin} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://features.jellyfin.org/"
              >
                <Jellyfin className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Fider</h2>
                  <span>Request features</span>
                </div>
              </a>
              <a
                className={`${styles['open-collective']} ${styles['contact-card']} display--flex padding--md shadow--md`}
                href="https://features.jellyfin.org/"
              >
                <Opencollective className="margin--md" size={48} />
                <div className="display--flex flex-direction--column row-justify--center">
                  <h2 className="margin-bottom--none">Open Collective</h2>
                  <span>Help finance infrastructure</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
