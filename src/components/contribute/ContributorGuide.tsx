import Link from '@docusaurus/Link';
import clsx from 'clsx';
import React, { useState } from 'react';

enum ContributorOption {
  Code,
  Translations,
  Other
}

enum CodeOption {
  CSharp,
  JavaScript,
  Other
}

enum CodeLanguageOption {
  Bug,
  Feature,
  Modernize
}

enum CSharpFeatureOption {
  Server,
  Plugin
}

enum OtherOption {
  Documentation,
  Troubleshoot,
  Donation
}

export default function ContributorGuide() {
  const [contributorOption, setContributorOption] = useState<ContributorOption>(null);
  const [codeOption, setCodeOption] = useState<CodeOption>(null);
  const [codeLanguageOption, setCodeLanguageOption] = useState<CodeLanguageOption>(null);
  const [cSharpFeatureOption, setCSharpFeatureOption] = useState<CSharpFeatureOption>(null);
  const [otherOption, setOtherOption] = useState<OtherOption>(null);

  return (
    <>
      <div>
        <button
          className={clsx('button', 'button--secondary', 'margin-right--md', {
            'button--active': contributorOption === ContributorOption.Code
          })}
          onClick={() => {
            setContributorOption(ContributorOption.Code);
            setOtherOption(null);
          }}
        >
          Code
        </button>
        <button
          className={clsx('button', 'button--secondary', 'margin-right--md', {
            'button--active': contributorOption === ContributorOption.Translations
          })}
          onClick={() => {
            setContributorOption(ContributorOption.Translations);
            setCodeOption(null);
            setOtherOption(null);
            setCodeLanguageOption(null);
            setCSharpFeatureOption(null);
          }}
        >
          Translations
        </button>
        <button
          className={clsx('button', 'button--secondary', {
            'button--active': contributorOption === ContributorOption.Other
          })}
          onClick={() => {
            setContributorOption(ContributorOption.Other);
            setCodeOption(null);
            setCodeLanguageOption(null);
            setCSharpFeatureOption(null);
          }}
        >
          Other
        </button>
      </div>

      {contributorOption === ContributorOption.Code && (
        <>
          <div className='margin-top--md'>
            There are a couple ways to get involved with Jellyfin depending on your skill set.
          </div>
          <div>
            <button
              className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                'button--active': codeOption === CodeOption.CSharp
              })}
              onClick={() => {
                if (codeOption !== CodeOption.CSharp) {
                  setCodeLanguageOption(null);
                }
                setCodeOption(CodeOption.CSharp);
              }}
            >
              C#
            </button>
            <button
              className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                'button--active': codeOption === CodeOption.JavaScript
              })}
              onClick={() => {
                if (codeOption !== CodeOption.JavaScript) {
                  setCodeLanguageOption(null);
                }
                setCodeOption(CodeOption.JavaScript);
                setCSharpFeatureOption(null);
              }}
            >
              JavaScript
            </button>
            <button
              className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                'button--active': codeOption === CodeOption.Other
              })}
              onClick={() => {
                setCodeOption(CodeOption.Other);
                setCodeLanguageOption(null);
                setCSharpFeatureOption(null);
              }}
            >
              Other
            </button>
          </div>

          {codeOption === CodeOption.CSharp && (
            <>
              <div className='margin-top--md'>
                The main core of Jellyfin as well as its plugins are written in C#. You have a couple options to get
                started.
              </div>
              <div>
                <button
                  className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                    'button--active': codeLanguageOption === CodeLanguageOption.Bug
                  })}
                  onClick={() => {
                    setCodeLanguageOption(CodeLanguageOption.Bug);
                    setCSharpFeatureOption(null);
                  }}
                >
                  Fix Bugs
                </button>
                <button
                  className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                    'button--active': codeLanguageOption === CodeLanguageOption.Feature
                  })}
                  onClick={() => {
                    setCodeLanguageOption(CodeLanguageOption.Feature);
                  }}
                >
                  Implement a Feature
                </button>
              </div>

              {codeLanguageOption === CodeLanguageOption.Bug && (
                <div className='margin-top--md'>
                  <p>
                    There are always bugs to fix in Jellyfin. If you want to find an existing bug to fix, head over to
                    the{' '}
                    <a href='https://github.com/jellyfin/jellyfin/issues?q=is%3Aissue+is%3Aopen+label%3Abug'>
                      open Bug Issues page
                    </a>{' '}
                    on GitHub, and find one that interests you. If you find a bug that affects you already, it is a good
                    candidate to fix as you should be quickly able to test it; otherwise, the bug report should list
                    steps to reproduce the bug.
                  </p>
                  <p>
                    Once you have found a bug you would like to fix, head over to the{' '}
                    <a href='https://github.com/jellyfin/jellyfin'>GitHub page</a> for the server and begin hacking.
                    Development documentation can be found on the <Link to='/docs'>Documentation page</Link>. When the
                    fix is ready, feel free to propose it to other users in the issue to get them to help test as well.
                  </p>
                  <p>
                    You should always develop bugfixes on a dedicated Git branch within your own Fork of Jellyfin (the
                    fork+branch model). Once your bugfix is ready, submit a Pull Request on GitHub from your feature
                    branch to the Master branch of the project. It will be reviewed and, when it passes review, accepted
                    into Jellyfin.
                  </p>
                </div>
              )}

              {codeLanguageOption === CodeLanguageOption.Feature && (
                <>
                  <div className='margin-top--md'>
                    <p>
                      New features for Jellyfin are generally implemented in one of two ways, depending on the
                      complexity and scope of the feature.
                    </p>
                    <p>
                      First, check out our <a href='https://features.jellyfin.org'>Feature Requests tracker</a> and find
                      something that looks interesting or useful to you. Please comment on the issue to indicate that
                      you are working on it in order to let everyone know.
                    </p>
                    <p className='margin--none'>
                      Most well-requested features will have a tag; as a C# developer, those tagged as{' '}
                      <b>&ldquo;Server&rdquo;</b> or <b>&ldquo;Plugin&rdquo;</b> are of the most interest to you. Select
                      the option below based on the tag on the feature.
                    </p>
                  </div>

                  <div>
                    <button
                      className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                        'button--active': cSharpFeatureOption === CSharpFeatureOption.Server
                      })}
                      onClick={() => {
                        setCSharpFeatureOption(CSharpFeatureOption.Server);
                      }}
                    >
                      Server
                    </button>
                    <button
                      className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                        'button--active': cSharpFeatureOption === CSharpFeatureOption.Plugin
                      })}
                      onClick={() => {
                        setCSharpFeatureOption(CSharpFeatureOption.Plugin);
                      }}
                    >
                      Plugin
                    </button>
                  </div>

                  {cSharpFeatureOption === CSharpFeatureOption.Server && (
                    <div className='margin-top--md'>
                      <p>
                        Features of this type should be implemented directly into the core server itself. Once you have
                        found a feature you want to implement, head over to the{' '}
                        <a href='https://github.com/jellyfin/jellyfin'>GitHub page</a> for the server and begin hacking.
                        Development documentation can be found on the <Link to='/docs'>Documentation page</Link>.
                      </p>
                      <p>
                        You should always develop features on a dedicated Git branch within your own Fork of Jellyfin
                        (the fork+branch model). Once your feature is ready, submit a Pull Request on GitHub from your
                        feature branch to the Master branch of the project. It will be reviewed and, if it passes
                        review, accepted into Jellyfin.
                      </p>
                    </div>
                  )}

                  {cSharpFeatureOption === CSharpFeatureOption.Plugin && (
                    <div className='margin-top--md'>
                      <p>
                        Features of this type should be implemented as external plugins. Plugins help extend the
                        functionality of Jellyfin without integrating the code into the main core. This lets users
                        select the features they want and install them dynamically, without complicating the server as a
                        whole. For developers, they also help keep the code clean and focused on the functionality,
                        without worrying about the backend.
                      </p>
                      <p>
                        Once you have found a feature you want to implement with a plugin, check out the{' '}
                        <a href='https://github.com/jellyfin/jellyfin-plugin-template'>Plugin Template repository</a>{' '}
                        and clone this repository into a new project. Official plugins are named
                        &ldquo;jellyfin-plugin-mycoolname&rdquo;. You can use this template to get you started on
                        writing the plugin.
                        {/* FIXME: The plugin-api docs need a new home */}
                        {/* You may also want to consult the{' '}
                        <a href='/docs/plugin-api/index.html'>Jellyfin API documentation</a> to help learn the
                        interfaces available. */}
                      </p>
                      <p>
                        Once your plugin is working as expected, and all information filled out, publish your code to
                        GitHub and <a href='https://matrix.to/#/#jellyfin-dev:matrix.org'>contact the team on Matrix</a>
                        . If your plugin passes our evaluation, we will add it to the official plugin catalogue, and can
                        optionally transfer ownership of the plugin to the Jellyfin organization on GitHub.
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {codeOption === CodeOption.JavaScript && (
            <>
              <div className='margin-top--md'>
                The primary Jellyfin web client is written primarily in JavaScript. You have a couple options to get
                started.
              </div>
              <div>
                <button
                  className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                    'button--active': codeLanguageOption === CodeLanguageOption.Bug
                  })}
                  onClick={() => {
                    setCodeLanguageOption(CodeLanguageOption.Bug);
                  }}
                >
                  Fix Bugs
                </button>
                <button
                  className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                    'button--active': codeLanguageOption === CodeLanguageOption.Feature
                  })}
                  onClick={() => {
                    setCodeLanguageOption(CodeLanguageOption.Feature);
                  }}
                >
                  Implement a Feature
                </button>
                <button
                  className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                    'button--active': codeLanguageOption === CodeLanguageOption.Modernize
                  })}
                  onClick={() => {
                    setCodeLanguageOption(CodeLanguageOption.Modernize);
                  }}
                >
                  Help Modernize the Web Client
                </button>
              </div>

              {codeLanguageOption === CodeLanguageOption.Bug && (
                <div className='margin-top--md'>
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
              )}

              {codeLanguageOption === CodeLanguageOption.Feature && (
                <div className='margin-top--md'>
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
              )}

              {codeLanguageOption === CodeLanguageOption.Modernize && (
                <div className='margin-top--md'>
                  Jellyfin&apos;s web client is being rewritten. We are currently converting it to TypeScript and React.
                  Head over to the <a href='https://github.com/jellyfin/jellyfin-web/'>project page</a> on GitHub for
                  more information.
                </div>
              )}
            </>
          )}

          {codeOption === CodeOption.Other && (
            <div className='margin-top--md'>
              <p>
                Jellyfin has several other sub-projects that use various languages. If any of these suit you, head over
                to the relevant project page and begin hacking.
              </p>
              <ul>
                <li>
                  <b>Kotlin/Java:</b> The <a href='https://github.com/jellyfin/jellyfin-androidtv'>Android TV</a> and{' '}
                  <a href='https://github.com/jellyfin/jellyfin-android'>Android</a> apps are written in Kotlin and Java
                  for some legacy code.
                </li>
                <li>
                  <b>Python:</b> The <a href='https://github.com/jellyfin/jellyfin-kodi'>Kodi</a> client is written in
                  Python.
                </li>
                <li>
                  <b>BrightScript:</b> The <a href='https://github.com/jellyfin/jellyfin-roku'>Roku</a> client is
                  written in BrightScript.
                </li>
              </ul>
              <p>
                Feel free to browse around the <a href='https://github.com/jellyfin'>project page</a> for the full list
                of official sub-projects.
              </p>
            </div>
          )}
        </>
      )}

      {contributorOption === ContributorOption.Translations && (
        <div className='margin-top--md'>
          Check our our <a href='https://translate.jellyfin.org/'>Weblate instance</a> and start helping to translate
          strings to other languages! Logging in will require a <a href='https://github.com'>GitHub</a> account.
        </div>
      )}

      {contributorOption === ContributorOption.Other && (
        <>
          <div className='margin-top--md'>
            Even if you are not a developer or able to speak multiple languages, there are still lots of things you can
            do to help Jellyfin.
          </div>
          <div>
            <button
              className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                'button--active': otherOption === OtherOption.Documentation
              })}
              onClick={() => {
                setOtherOption(OtherOption.Documentation);
              }}
            >
              Write Documentation
            </button>
            <button
              className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                'button--active': otherOption === OtherOption.Troubleshoot
              })}
              onClick={() => {
                setOtherOption(OtherOption.Troubleshoot);
              }}
            >
              Help People Troubleshoot
            </button>
            <button
              className={clsx('button', 'button--secondary', 'margin-right--md', 'margin-top--md', {
                'button--active': otherOption === OtherOption.Donation
              })}
              onClick={() => {
                setOtherOption(OtherOption.Donation);
              }}
            >
              Help Pay for Expenses
            </button>
          </div>

          {otherOption === OtherOption.Documentation && (
            <div className='margin-top--md'>
              Documentation is simultaneously very important, but very neglected in a lot of projects. We want to be
              different, and you can help! If you come across anything that you think should be documented, such as how
              to do things, configuration steps, or just general helpful pointers, we welcome contributions to{' '}
              <a href='https://github.com/jellyfin/jellyfin.org'>our Documentation Repository</a>, visible{' '}
              <Link to='/docs'>here</Link>.
            </div>
          )}

          {otherOption === OtherOption.Troubleshoot && (
            <div className='margin-top--md'>
              We have a large and diverse user base, with so many features that the combinations and configurations are
              almost endless. But as a volunteer-run project, the contributors can often be limited in the help they can
              provide. If you are well-versed in Jellyfin&apos;s operation, we welcome you to try to help troubleshoot
              problems your fellow users are having. Troubleshooting generally occurs in our{' '}
              <a href='https://matrix.to/#/#jellyfin:matrix.org'>main</a> and{' '}
              <a href='https://matrix.to/#/#jellyfin-troubleshooting:matrix.org'>troubleshooting</a> Matrix rooms and on{' '}
              <a href='https://forum.jellyfin.org'>our Forum</a>. Hanging around those places and helping your fellow
              users, in a kind, courteous, and respectful manner, earns our eternal gratitude!
            </div>
          )}

          {otherOption === OtherOption.Donation && (
            <div className='margin-top--md'>
              As a project, we generally do not like asking for donations - we are entirely volunteer-run and intend to
              keep Jellyfin free as in beer, as well as free as in speech, forever. We do not wish, support, nor intend
              donations to privilege any user&apos;s voice or priorities. That said, if you do want to help us cover
              some operating expenses like our VPS hosting, domains, developer licenses, metadata API keys, and other
              incidental expenses, check out our <a href='https://opencollective.com/jellyfin'>OpenCollective page</a>{' '}
              to donate. Our entire budget as well as all expenses are publicly visible there.
            </div>
          )}
        </>
      )}
    </>
  );
}
