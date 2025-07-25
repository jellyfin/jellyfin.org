import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React from 'react';
import { SiAndroid, SiApple, SiRoku, SiKodi } from '@icons-pack/react-simple-icons';
import Icon from '@mdi/react';
import { mdiPlusThick, mdiMonitor, mdiWeb } from '@mdi/js';

import landingSectionStyles from './LandingSection.module.scss';
import styles from './ClientSection.module.scss';

export default function ClientSection() {
  return (
    <section className={clsx(landingSectionStyles['landing-section'], 'padding-vert--xl')}>
      <div className='container text--center'>
        <div className='row row--center'>
          <div className='col col--8'>
            <h2>Your media, wherever you&nbsp;are</h2>
            <p>
              With a large array of official and third-party clients, Jellyfin is available on most popular platforms.
              Your media is ready to follow you, wherever you go.
            </p>
          </div>
        </div>

        <div className='row row--center'>
          <div className={clsx('col', styles['client-icon'], 'margin-top--md')}>
            <Icon path={mdiWeb} size='48px' className='fill-white' />
            <div className='margin-top--sm'>Web</div>
          </div>
          <Link
            to='/downloads/clients?platform=Desktop'
            className={clsx('col', styles['client-icon'], 'margin-top--md')}
          >
            <Icon path={mdiMonitor} size='48px' className='fill-white' />
            <div className='margin-top--sm'>Desktop</div>
          </Link>
          <Link
            to='/downloads/clients?platform=Android,Android TV'
            className={clsx('col', 'fill--white', styles['client-icon'], 'margin-top--md')}
          >
            <SiAndroid color='#ffffff' size={48} />
            <div className='margin-top--sm'>Android</div>
          </Link>
          <Link
            to='/downloads/clients?platform=iOS,tvOS'
            className={clsx('col', 'fill--white', styles['client-icon'], 'margin-top--md')}
          >
            <SiApple color='#ffffff' size={48} />
            <div className='margin-top--sm'>Apple</div>
          </Link>
          <Link
            to='/downloads/clients?platform=Fire TV'
            className={clsx('col', 'fill--white', styles['client-icon'], 'margin-top--md')}
          >
            {/*
            Not available in simple-icons because it was removed (https://github.com/simple-icons/simple-icons/pull/13056)
            Using the SVG from an older version instead
            */}
            <svg xmlns='http://www.w3.org/2000/svg' width={48} height={48} viewBox='0 0 24 24'>
              <path d='M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z' />
            </svg>
            <div className='margin-top--sm'>Amazon</div>
          </Link>
          <Link
            to='/downloads/clients?platform=Roku'
            className={clsx('col', 'fill--white', styles['client-icon'], 'margin-top--md')}
          >
            <SiRoku color='#ffffff' size={48} />
            <div className='margin-top--sm'>Roku</div>
          </Link>
          <Link
            to='/downloads/clients?platform=Kodi'
            className={clsx('col', 'fill--white', styles['client-icon'], 'margin-top--md')}
          >
            <SiKodi color='#ffffff' size={48} />
            <div className='margin-top--sm'>Kodi</div>
          </Link>
          <Link to='/downloads/clients' className={clsx('col', styles['client-icon'], 'margin-top--md')}>
            <Icon path={mdiPlusThick} size='48px' className='fill-white' />
            <div className='margin-top--sm'>And more</div>
          </Link>
        </div>

        <div className='row'>
          <div className='col margin-top--lg'>
            <Link to='/downloads/clients' className='button button--primary button--lg'>
              Find a Client
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
