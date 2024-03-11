import Link from '@docusaurus/Link';
import { SiOpensourceinitiative } from '@icons-pack/react-simple-icons';
import Icon from '@mdi/react';
import { mdiAccountGroup, mdiLock, mdiCurrencyUsdOff } from '@mdi/js';
import clsx from 'clsx';
import React from 'react';

import landingSectionStyles from './LandingSection.module.scss';

const ICON_SIZE = 48;

const cards = [
  {
    id: 'free-software',
    title: 'Free Software',
    icon: <SiOpensourceinitiative size={ICON_SIZE} />,
    description:
      'Jellyfin is Free Software, licensed under the GNU GPL. You can use it, study it, modify it, build it, and distribute it for free, as long as your changes are licensed the same way.'
  },
  {
    id: 'community',
    title: 'Community Built',
    icon: <Icon path={mdiAccountGroup} size={`${ICON_SIZE}px`} />,
    description: (
      <>
        The project relies entirely on contributions from volunteers. Want to help out? There’s lots of ways to do so,
        and you don’t even have to code! See our <Link to='/contribute'>contribution guide</Link> for more details.
      </>
    )
  },
  {
    id: 'free-cost',
    title: 'No Fees',
    icon: <Icon path={mdiCurrencyUsdOff} size={`${ICON_SIZE}px`} />,
    description:
      'The Jellyfin server and official clients are free to download, now and always. There are no costs, hidden or otherwise, to use Jellyfin, either for yourself, for your friends, or for your company. All our incidental costs are paid through donations from users like you.'
  },
  {
    id: 'privacy',
    title: 'Privacy Focused',
    icon: <Icon path={mdiLock} size={`${ICON_SIZE}px`} />,
    description:
      'Jellyfin has no tracking, phone-home, or central servers collecting your data. We believe in keeping our software open and transparent. We’re also not in the media business, so the only media you see is your own.'
  }
];

export default function FreedomSection() {
  return (
    <section className={clsx(landingSectionStyles['landing-section'], 'padding-vert--xl')}>
      <div className='container'>
        <div
          className='row text--center'
          style={{ marginTop: '-2rem' }} // offset the large margin for the first row of cols
        >
          {cards.map(({ id, title, icon, description }) => (
            <div key={id} className='col col--6 margin-top--lg'>
              {icon}
              <h3>{title}</h3>
              <p className='margin--none'>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
