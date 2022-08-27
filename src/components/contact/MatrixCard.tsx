import { Element } from '@icons-pack/react-simple-icons';
import React, { useState } from 'react';

import './ContactCard.css';

const MatrixCard = () => {
  const [isAllRoomsVisible, setAllRoomsVisible] = useState(false);

  return (
    <div className='card card--contact'>
      <div className='card__header' style={{ display: 'flex' }}>
        <h3 className='margin-bottom--none' style={{ flexGrow: 1 }}>
          Matrix
        </h3>
        <Element />
      </div>
      <div className='card__body'>
        We primarily use <a href='https://element.io/get-started'>Element</a> to access the{' '}
        <a href='https://www.matrix.org'>Matrix</a> network. Find all the official rooms in the Jellyfin Space!
      </div>
      <div className='card__footer container'>
        <div className='row margin-bottom--md'>
          <div className='col text--center'>
            <button
              className='button button--sm button--secondary button--outline'
              onClick={() => {
                setAllRoomsVisible(!isAllRoomsVisible);
              }}
            >
              View All Rooms
            </button>
          </div>
        </div>
        {isAllRoomsVisible && (
          <div className='row margin-bottom--md'>
            <div className='col col--3 col--offset-3'>
              <h4>General Rooms</h4>
              <ul>
                <li>
                  <a href='https://matrix.to/#/#jellyfin:matrix.org'>#jellyfin</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-announce:matrix.org'>#jellyfin-announce</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-troubleshooting:matrix.org'>#jellyfin-troubleshooting</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-offtopic:matrix.org'>#jellyfin-offtopic</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-translate:matrix.org'>#jellyfin-translate</a>
                </li>
              </ul>
            </div>
            <div className='col col--3'>
              <h4>Development Rooms</h4>
              <ul>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev:matrix.org'>#jellyfin-dev</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev-client:matrix.org'>#jellyfin-dev-client</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev-android:matrix.org'>#jellyfin-dev-android</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev-ios:matrix.org'>#jellyfin-dev-ios</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev-ios:matrix.org'>#jellyfin-vue</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev-ios:matrix.org'>#jellyfin-dev-roku</a>
                </li>
                <li>
                  <a href='https://matrix.to/#/#jellyfin-dev-python:matrix.org'>#jellyfin-dev-python</a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className='row'>
          <div className='col col--6 col--offset-3'>
            <a href='https://matrix.to/#/#jellyfinorg:matrix.org' className='button button--block button--matrix'>
              Join the Jellyfin Space
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixCard;
