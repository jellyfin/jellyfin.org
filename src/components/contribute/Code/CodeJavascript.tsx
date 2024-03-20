import React from 'react';
import Tab from '../../tab/Tab';
import Link from '@docusaurus/Link';

export default function CodeJavascript() {
  return (
    <>
      <div className='margin-top--md'>
        The primary Jellyfin web client is written primarily in JavaScript. You have a couple options to get started.
      </div>
      <Tab
        data={{
          links: [
            {
              title: 'Fix Bugs',
              body: (
                <div>
                  <p>
                    There are always bugs to fix in Jellyfin. If you want to find an existing bug to fix, head over to
                    the{' '}
                    <a href='https://github.com/jellyfin/jellyfin-web/issues?q=is%3Aissue+is%3Aopen+label%3Abug'>
                      open Bug Issues page
                    </a>{' '}
                    on GitHub, and find one that interests you. If you find a bug that affects you already, it is a good
                    candidate to fix as you should be quickly able to test it; otherwise, the bug report should list
                    steps to reproduce the bug.
                  </p>
                  <p>
                    Once you have found a bug you would like to fix, head over to the{' '}
                    <a href='https://github.com/jellyfin/jellyfin-web'>GitHub page</a> for the web client and begin
                    hacking. Development documentation can be found on the <Link to='/docs'>Documentation page</Link>.
                    When the fix is ready, feel free to propose it to other users in the issue to get them to help test
                    as well.
                  </p>
                  <p>
                    You should always develop bugfixes on a dedicated Git branch within your own Fork of Jellyfin&apos;s
                    web client (the fork+branch model). Once your bugfix is ready, submit a Pull Request on GitHub from
                    your feature branch to the Master branch of the project. It will be reviewed and, if it passes
                    review, accepted into Jellyfin.
                  </p>
                </div>
              )
            },
            {
              title: 'Implement a Feature',
              body: (
                <div>
                  <p>
                    First, check out our <a href='https://features.jellyfin.org'>Feature Requests tracker</a> and find
                    something that looks interesting or useful to you. Please comment on the issue to indicate that you
                    are working on it in order to let everyone know.
                  </p>
                  <p>
                    Most well-requested features will have a tag; as a JavaScript developer, those tagged as{' '}
                    <b>&ldquo;Web UI&rdquo;</b> are of the most interest to you.
                  </p>
                  <p>
                    Once you have found a feature you would like to implement, head over to the{' '}
                    <a href='https://github.com/jellyfin/jellyfin'>GitHub page</a> for the server and begin hacking.
                    Development documentation can be found on the <Link to='/docs'>Documentation page</Link>.
                  </p>
                  <p>
                    You should always develop features on a dedicated Git branch within your own Fork of Jellyfin&apos;s
                    web client (the fork+branch model). Once your feature is ready, submit a Pull Request on GitHub from
                    your feature branch to the Master branch of the project. It will be reviewed and, if it passes
                    review, accepted into Jellyfin.
                  </p>
                </div>
              )
            },
            {
              title: 'Help Modernize the Web Client',
              body: (
                <div>
                  Jellyfin&apos;s web client is being rewritten. We are currently converting it to TypeScript and React.
                  Head over to the <a href='https://github.com/jellyfin/jellyfin-web/'>project page</a> on GitHub for
                  more information.
                </div>
              )
            }
          ]
        }}
      />
    </>
  );
}
