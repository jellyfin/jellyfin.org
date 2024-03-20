import React from 'react';
import Tab from '../tab/Tab';
import Link from '@docusaurus/Link';

export default function OtherSection() {
  return (
    <>
      <div className='margin-top--md'>
        Even if you are not a developer or able to speak multiple languages, there are still lots of things you can do
        to help Jellyfin.
      </div>
      <Tab
        data={{
          links: [
            {
              title: 'Write Documentation',
              body: (
                <p>
                  Documentation is simultaneously very important, but very neglected in a lot of projects. We want to be
                  different, and you can help! If you come across anything that you think should be documented, such as
                  how to do things, configuration steps, or just general helpful pointers, we welcome contributions
                  to{' '}
                  <a href='https://github.com/jellyfin/jellyfin.org'>our Documentation Repository</a>, visible{' '}
                  <Link to='/docs'>here</Link>.
                </p>
              )
            },
            {
              title: 'Help People Troubleshoot',
              body: (
                <p>
                  We have a large and diverse userbase, with so many features that the combinations and configurations
                  are almost endless. But as a volunteer-run project, the contributors can often be limited in the help
                  they can provide. If you are well-versed in Jellyfin&apos;s operation, we welcome you to try to help
                  troubleshoot problems your fellow users are having. Troubleshooting generally occurs in our{' '}
                  <a href='https://matrix.to/#/#jellyfin:matrix.org'>main</a> and{' '}
                  <a href='https://matrix.to/#/#jellyfin-troubleshooting:matrix.org'>troubleshooting</a> Matrix rooms
                  and on <a href='https://forum.jellyfin.org'>our Forum</a>. Hanging around those places and helping
                  your fellow users, in a kind, courteous, and respectful manner, earns our eternal gratitude!
                </p>
              )
            },
            {
              title: 'Help Pay for Expenses',
              body: (
                <p>
                  As a project, we generally do not like asking for donations - we are entirely volunteer-run and intend
                  to keep Jellyfin free as in beer, as well as free as in speech, forever. We do not wish, support, nor
                  intend donations to privilege any user&apos;s voice or priorities. That said, if you do want to help
                  us cover some operating expenses like our VPS hosting, domains, developer licenses, metadata API keys,
                  and other incidental expenses, check out our{' '}
                  <a href='https://opencollective.com/jellyfin'>OpenCollective page</a> to donate. Our entire budget as
                  well as all expenses are publicly visible there.
                </p>
              )
            }
          ]
        }}
      />
    </>
  );
}
