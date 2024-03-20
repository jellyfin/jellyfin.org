import { NodeData } from '../components/node/Node';
import React from 'react';
import Link from '@docusaurus/Link';

export const contributeData: NodeData = {
  links: [
    {
      title: 'Code',
      node: {
        body: <div>There are a couple ways to get involved with Jellyfin depending on your skillset.</div>,
        links: [
          {
            title: 'C#',
            node: {
              body: (
                <div>
                  The main core of Jellyfin as well as its plugins are written in C#. You have a couple options to get
                  started.
                </div>
              ),
              links: [
                {
                  title: 'Fix Bugs',
                  node: {
                    body: (
                      <div>
                        <p>
                          There are always bugs to fix in Jellyfin. If you want to find an existing bug to fix, head
                          over to the{' '}
                          <a href='https://github.com/jellyfin/jellyfin/issues?q=is%3Aissue+is%3Aopen+label%3Abug'>
                            open Bug Issues page
                          </a>{' '}
                          on GitHub, and find one that interests you. If you find a bug that affects you already, it is
                          a good candidate to fix as you should be quickly able to test it; otherwise, the bug report
                          should list steps to reproduce the bug.
                        </p>
                        <p>
                          Once you have found a bug you would like to fix, head over to the{' '}
                          <a href='https://github.com/jellyfin/jellyfin'>GitHub page</a> for the server and begin
                          hacking. Development documentation can be found on the{' '}
                          <Link to='/docs'>Documentation page</Link>. When the fix is ready, feel free to propose it to
                          other users in the issue to get them to help test as well.
                        </p>
                        <p>
                          You should always develop bugfixes on a dedicated Git branch within your own Fork of Jellyfin
                          (the fork+branch model). Once your bugfix is ready, submit a Pull Request on GitHub from your
                          feature branch to the Master branch of the project. It will be reviewed and, when it passes
                          review, accepted into Jellyfin.
                        </p>
                      </div>
                    ),
                    links: []
                  }
                },
                {
                  title: 'Implement a Feature',
                  node: {
                    body: (
                      <div>
                        <p>
                          New features for Jellyfin are generally implemented in one of two ways, depending on the
                          complexity and scope of the feature.
                        </p>
                        <p>
                          First, check out our <a href='https://features.jellyfin.org'>Feature Requests tracker</a> and
                          find something that looks interesting or useful to you. Please comment on the issue to
                          indicate that you are working on it in order to let everyone know.
                        </p>
                        <p className='margin--none'>
                          Most well-requested features will have a tag; as a C# developer, those tagged as{' '}
                          <b>&ldquo;Server&rdquo;</b> or <b>&ldquo;Plugin&rdquo;</b> are of the most interest to you.
                          Select the option below based on the tag on the feature.
                        </p>
                      </div>
                    ),
                    links: []
                  }
                }
              ]
            }
          },
          {
            title: 'JavaScript',
            node: {
              body: (
                <div>
                  The primary Jellyfin web client is written primarily in JavaScript. You have a couple options to get
                  started.
                </div>
              ),
              links: [
                {
                  title: 'Fix Bugs',
                  node: {
                    body: (
                      <div>
                        <p>
                          There are always bugs to fix in Jellyfin. If you want to find an existing bug to fix, head
                          over to the{' '}
                          <a href='https://github.com/jellyfin/jellyfin-web/issues?q=is%3Aissue+is%3Aopen+label%3Abug'>
                            open Bug Issues page
                          </a>{' '}
                          on GitHub, and find one that interests you. If you find a bug that affects you already, it is
                          a good candidate to fix as you should be quickly able to test it; otherwise, the bug report
                          should list steps to reproduce the bug.
                        </p>
                        <p>
                          Once you have found a bug you would like to fix, head over to the{' '}
                          <a href='https://github.com/jellyfin/jellyfin-web'>GitHub page</a> for the web client and
                          begin hacking. Development documentation can be found on the{' '}
                          <Link to='/docs'>Documentation page</Link>. When the fix is ready, feel free to propose it to
                          other users in the issue to get them to help test as well.
                        </p>
                        <p>
                          You should always develop bugfixes on a dedicated Git branch within your own Fork of
                          Jellyfin&apos;s web client (the fork+branch model). Once your bugfix is ready, submit a Pull
                          Request on GitHub from your feature branch to the Master branch of the project. It will be
                          reviewed and, if it passes review, accepted into Jellyfin.
                        </p>
                      </div>
                    ),
                    links: []
                  }
                },
                {
                  title: 'Implement a Feature',
                  node: {
                    body: (
                      <div>
                        <p>
                          First, check out our <a href='https://features.jellyfin.org'>Feature Requests tracker</a> and
                          find something that looks interesting or useful to you. Please comment on the issue to
                          indicate that you are working on it in order to let everyone know.
                        </p>
                        <p>
                          Most well-requested features will have a tag; as a JavaScript developer, those tagged as{' '}
                          <b>&ldquo;Web UI&rdquo;</b> are of the most interest to you.
                        </p>
                        <p>
                          Once you have found a feature you would like to implement, head over to the{' '}
                          <a href='https://github.com/jellyfin/jellyfin'>GitHub page</a> for the server and begin
                          hacking. Development documentation can be found on the{' '}
                          <Link to='/docs'>Documentation page</Link>.
                        </p>
                        <p>
                          You should always develop features on a dedicated Git branch within your own Fork of
                          Jellyfin&apos;s web client (the fork+branch model). Once your feature is ready, submit a Pull
                          Request on GitHub from your feature branch to the Master branch of the project. It will be
                          reviewed and, if it passes review, accepted into Jellyfin.
                        </p>
                      </div>
                    ),
                    links: []
                  }
                },
                {
                  title: 'Help Modernize the Web Client',
                  node: {
                    body: (
                      <div>
                        Jellyfin&apos;s web client is being rewritten. We are currently converting it to TypeScript and
                        React. Head over to the <a href='https://github.com/jellyfin/jellyfin-web/'>project page</a> on
                        GitHub for more information.
                      </div>
                    ),
                    links: []
                  }
                }
              ]
            }
          },
          {
            title: 'Other',
            node: {
              body: (
                <div>
                  <p>
                    Jellyfin has several other sub-projects that use various languages. If any of these suit you, head
                    over to the relevant project page and begin hacking.
                  </p>
                  <ul>
                    <li>
                      <b>Kotlin/Java:</b> The <a href='https://github.com/jellyfin/jellyfin-androidtv'>Android TV</a>{' '}
                      and <a href='https://github.com/jellyfin/jellyfin-android'>Android</a> apps are written in Kotlin
                      and Java for some legacy code.
                    </li>
                    <li>
                      <b>Python:</b> The <a href='https://github.com/jellyfin/jellyfin-kodi'>Kodi</a> client is written
                      in Python.
                    </li>
                    <li>
                      <b>BrightScript:</b> The <a href='https://github.com/jellyfin/jellyfin-roku'>Roku</a> client is
                      written in BrightScript.
                    </li>
                  </ul>
                  <p>
                    Feel free to browse around the <a href='https://github.com/jellyfin'>project page</a> for the full
                    list of official sub-projects.
                  </p>
                </div>
              ),
              links: []
            }
          }
        ]
      }
    },
    {
      title: 'Translations',
      node: {
        body: (
          <div>
            Check out our <a href='https://translate.jellyfin.org/'>Weblate instance</a> and start helping to translate
            strings to other languages! Logging in will require a <a href='https://github.com'>GitHub</a> account.
          </div>
        ),
        links: []
      }
    },
    {
      title: 'Other',
      node: {
        body: (
          <div>
            Even if you are not a developer or able to speak multiple languages, there are still lots of things you can
            do to help Jellyfin.
          </div>
        ),
        links: [
          {
            title: 'Write Documentation',
            node: {
              body: (
                <div>
                  Documentation is simultaneously very important, but very neglected in a lot of projects. We want to be
                  different, and you can help! If you come across anything that you think should be documented, such as
                  how to do things, configuration steps, or just general helpful pointers, we welcome contributions to{' '}
                  <a href='https://github.com/jellyfin/jellyfin.org'>our Documentation Repository</a>, visible{' '}
                  <Link to='/docs'>here</Link>.
                </div>
              ),
              links: []
            }
          },
          {
            title: 'Help People Troubleshoot',
            node: {
              body: (
                <div>
                  We have a large and diverse userbase, with so many features that the combinations and configurations
                  are almost endless. But as a volunteer-run project, the contributors can often be limited in the help
                  they can provide. If you are well-versed in Jellyfin&apos;s operation, we welcome you to try to help
                  troubleshoot problems your fellow users are having. Troubleshooting generally occurs in our{' '}
                  <a href='https://matrix.to/#/#jellyfin:matrix.org'>main</a> and{' '}
                  <a href='https://matrix.to/#/#jellyfin-troubleshooting:matrix.org'>troubleshooting</a> Matrix rooms
                  and on <a href='https://forum.jellyfin.org'>our Forum</a>. Hanging around those places and helping
                  your fellow users, in a kind, courteous, and respectful manner, earns our eternal gratitude!
                </div>
              ),
              links: []
            }
          },
          {
            title: 'Help Pay for Expenses',
            node: {
              body: (
                <div>
                  As a project, we generally do not like asking for donations - we are entirely volunteer-run and intend
                  to keep Jellyfin free as in beer, as well as free as in speech, forever. We do not wish, support, nor
                  intend donations to privilege any user&apos;s voice or priorities. That said, if you do want to help
                  us cover some operating expenses like our VPS hosting, domains, developer licenses, metadata API keys,
                  and other incidental expenses, check out our{' '}
                  <a href='https://opencollective.com/jellyfin'>OpenCollective page</a> to donate. Our entire budget as
                  well as all expenses are publicly visible there.
                </div>
              ),
              links: []
            }
          }
        ]
      }
    }
  ]
};
