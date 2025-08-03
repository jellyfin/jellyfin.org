import React from 'react';

import './ContactCard.scss';

const IrcCard = () => (
  <div className='card card--contact'>
    <div className='card__header'>
      <h3>IRC</h3>
    </div>
    <div className='card__body'>
      The official Matrix rooms are also bridged from Matrix to <a href='https://libera.chat'>Libera.chat</a> for
      convenience.
      <div className='alert alert--secondary margin-top--md'>
        <strong>NOTE:</strong> Matrix is the preferred chat platform. IRC is generally not recommended due to a lack of
        features and moderation controls.
      </div>
      <div className='container margin-top--md'>
        <div className='row'>
          <div className='col col--3 col--offset-3'>
            <h4>General Channels</h4>
            <ul>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin'>#jellyfin</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-announce'>#jellyfin-announce</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-troubleshooting'>#jellyfin-troubleshooting</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-offtopic'>#jellyfin-offtopic</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-translate'>#jellyfin-translate</a>
              </li>
            </ul>
          </div>
          <div className='col col--3'>
            <h4>Development Channels</h4>
            <ul>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-dev'>#jellyfin-dev</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-dev-client'>#jellyfin-dev-client</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-dev-android'>#jellyfin-dev-android</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-dev-ios'>#jellyfin-dev-ios</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-vue'>#jellyfin-vue</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-dev-roku'>#jellyfin-dev-roku</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-dev-python'>#jellyfin-dev-python</a>
              </li>
              <li>
                <a href='ircs://irc.libera.chat:6697/#jellyfin-documentation'>#jellyfin-documentation</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default IrcCard;
