import {
  Discord,
  Github,
  Matrix,
  Reddit
} from '@icons-pack/react-simple-icons';
import { mdiBookOpen, mdiClipboardList, mdiHammerWrench } from '@mdi/js';
import Icon from '@mdi/react';
import { Link } from 'gatsby';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Layout } from '../components/Layout';

const Plugins = () => {
  return (
    <Layout>
      <Header />
      <main className="flex flex-col flex-grow">
        <header className="bg-gray-700 text-white py-4">
          <div className="container mx-auto flex flex-col p-2 lg:p-4">
            <h1 className="font-black text-5xl">Documentation</h1>
          </div>
        </header>
        <div className="container flex-grow mx-auto flex flex-col gap-4 p-2 lg:p-4 shadow-md bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/">
              <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                <div className="flex items-center justify-center p-7 bg-gray-200">
                  <Icon
                    className="text-jellyfin-purple-300"
                    path={mdiBookOpen}
                    size={3}
                  />
                </div>
                <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                  <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-jellyfin-purple-300 to-jellyfin-purple-600">
                    User documentation
                  </h3>
                  <p className="max-w-prose">
                    Learn how to setup Jellyfin, install plugins or setup
                    hardware acceleration.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/documentation/api/">
              <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                <div className="flex items-center justify-center p-7 bg-gray-200">
                  <Icon
                    className="text-jellyfin-orange-500"
                    path={mdiClipboardList}
                    size={3}
                  />
                </div>
                <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                  <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-jellyfin-orange-500 to-jellyfin-orange-600">
                    API reference
                  </h3>
                  <p className="max-w-prose">
                    View API endpoints, parameters and supported features.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                <div className="flex items-center justify-center p-7 bg-gray-200">
                  <Icon
                    className="text-jellyfin-blue-300"
                    path={mdiHammerWrench}
                    size={3}
                  />
                </div>
                <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                  <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-jellyfin-blue-300 to-jellyfin-blue-100">
                    Developer documentation
                  </h3>
                  <p className="max-w-prose">
                    View code documentation, cookbooks and learn about plugin
                    development.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-extrabold">Quick access</h3>
              <ul>
                <Link to="/">
                  <li className="bg-gray-200 hover:bg-gray-100 text-lg p-2 pl-4">
                    Get started with Jellyfin
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-300 hover:bg-gray-100 text-lg p-2 pl-4">
                    Setup hardware acceleration
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-200 hover:bg-gray-100 text-lg p-2 pl-4">
                    Organize your media for Jellyfin
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-300 hover:bg-gray-100 text-lg p-2 pl-4">
                    Using a reverse proxy
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-200 hover:bg-gray-100 text-lg p-2 pl-4">
                    Setting up live TV
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-300 hover:bg-gray-100 text-lg p-2 pl-4">
                    Installing plugins
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-200 hover:bg-gray-100 text-lg p-2 pl-4">
                    System requirements
                  </li>
                </Link>
                <Link to="/">
                  <li className="bg-gray-300 hover:bg-gray-100 text-lg p-2 pl-4">
                    Troubleshooting an issue
                  </li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <h3 className="text-2xl font-extrabold">Get help</h3>
              <p>
                If you can't find what you're looking for in our documentation,
                users and team members are always happy to help and answer your
                questions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/">
                  <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                    <div className="flex items-center justify-center p-7 bg-gray-200">
                      <Github className="text-gray-900" size="72" />
                    </div>
                    <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                      <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                        Open an issue on GitHub
                      </h3>
                      <p className="max-w-prose">
                        If you're encountering a bug, the best way to make us
                        aware of it is by opening an issue.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                    <div className="flex items-center justify-center p-7 bg-gray-200">
                      <Matrix className="text-gray-900" size="72" />
                    </div>
                    <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                      <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                        Get help on Matrix
                      </h3>
                      <p className="max-w-prose">
                        We have a room on Matrix dedicated to helping users
                        troubleshoot their issues.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                    <div className="flex items-center justify-center p-7 bg-gray-200">
                      <Reddit className="text-gray-900" size="72" />
                    </div>
                    <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                      <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                        Ask for help on Reddit
                      </h3>
                      <p className="max-w-prose">
                        We have a dedicated subreddit where you can ask
                        questions or get help.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/">
                  <div className="flex flex-row shadow-md hover:shadow-lg transition-shadow bg-gray-300">
                    <div className="flex items-center justify-center p-7 bg-gray-200">
                      <Discord className="text-gray-900" size="72" />
                    </div>
                    <div className="flex flex-col justify-center pl-4 pr-7 py-3">
                      <h3 className="text-2xl font-extrabold text-transparent  decoration-clone bg-clip-text bg-gradient-to-r from-gray-900 to-gray-800">
                        Get help on Discord
                      </h3>
                      <p className="max-w-prose">
                        If you're not a Matrix user, our troubleshooting room is
                        also on Discord.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default Plugins;
