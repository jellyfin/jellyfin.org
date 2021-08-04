import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Icon from '@mdi/react';
import { mdiClose, mdiMenu } from '@mdi/js';
import { Transition } from '@headlessui/react';

const Header = ({ mainClasses = 'bg-gray-700' }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query MenuEntries {
      allMenuJson {
        nodes {
          title
          url
        }
      }
    }
  `);

  return (
    <header
      className={`relative transition-height ${mainClasses} ${
        isHamburgerOpen ? 'bg-grey-700' : ''
      } lg:flex lg:justify-center`}
    >
      <nav className="lg:container">
        <div className="flex items-center justify-between h-20 lg:h-28 px-4">
          <div className="absolute flex lg:hidden">
            <button
              onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md transition-colors text-gray-100 hover:text-primary-100"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isHamburgerOpen ? (
                <Icon path={mdiClose} size={1.25} />
              ) : (
                <Icon path={mdiMenu} size={1.25} />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center lg:justify-start w-full">
            <div className="flex-shrink-0">
              <Link to="/">
                <StaticImage
                  className="h-12 w-32 lg:h-16 lg:w-40"
                  src="../images/banner-dark.svg"
                  title="Home"
                  alt="Jellyfin Logo"
                  objectFit="contain"
                  placeholder={'none'}
                />
              </Link>
            </div>
            <div className="hidden lg:block lg:ml-auto">
              <div className="ml-5 lg:ml-10 flex items-baseline gap-5">
                {data.allMenuJson.nodes.map((item, index) => (
                  <Link
                    className="transition-colors font-bold text-white hover:text-primary-100"
                    key={item.url}
                    to={item.url}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Transition show={isHamburgerOpen}>
          <div className="lg:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {data.allMenuJson.nodes.map((item, index) => (
                <Link
                  className="text-gray-200 hover:text-primary-100 block px-3 py-2 font-medium"
                  key={item.url}
                  to={item.url}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </Transition>
      </nav>
    </header>
  );
};

export default Header;
