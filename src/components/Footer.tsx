import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

const Footer = () => {
  return (
    <div className="relative bg-gray-700 text-white">
      <div className="container mx-auto py-16 lg:py-20 px-6 lg:px-0 flex flex-wrap gap-2 lg:gap-0 justify-between">
        <div className="text-center md:text-left w-full md:w-2/5 mb-10 px-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start">
            <StaticImage
              className="h-12 w-32 lg:h-16 lg:w-40"
              src="../images/banner-dark.svg"
              title="Home"
              alt="Jellyfin Logo"
              objectFit="contain"
            />
          </div>
          <p className="mt-4 max-w-xs font-medium text-sm mx-auto md:mx-0 md:mr-4">
            All site content is licensed under{' '}
            <a
              className="transition-colors text-gray-100 hover:text-primary-100"
              href="http://creativecommons.org/licenses/by-nd/4.0/"
            >
              CC-BY-ND-4.0
            </a>
          </p>
        </div>
        <div className="md:w-1/5">
          <h5 className="font-bold">Docs</h5>
          <ul className="mt-4 text-sm font-medium">
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Getting Started
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Developer Documentation
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/5">
          <h5 className="font-bold">Community</h5>
          <ul className="mt-4 text-sm font-medium">
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Community Standards
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Join us on Matrix
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Join us on Discord
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Join us on Reddit
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/5">
          <h5 className="font-bold">More</h5>
          <ul className="mt-4 text-sm font-medium">
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Getting Help
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Blog
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                FAQ
              </a>
            </li>
            <li className="mt-3">
              <a
                className="border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition-colors text-gray-100 hover:text-primary-100"
                href="#"
              >
                Check us out on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
