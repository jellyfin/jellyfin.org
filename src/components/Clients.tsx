import React from 'react';
import Icon from '@mdi/react';
import { mdiMonitor, mdiPlus, mdiWeb } from '@mdi/js';
import {
  Amazon,
  Android,
  Apple,
  Kodi,
  Roku
} from '@icons-pack/react-simple-icons';
import Button from './Button';
import { StaticImage } from 'gatsby-plugin-image';

const Clients = () => {
  return (
    <section className="w-full py-24">
      <div className="container mx-auto flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 lg:mx-24">
          <div className="flex flex-col items-start justify-center order-2 lg:order-2">
            <h1 className="font-black text-5xl mb-6">
              More clients
              <br />
              <span className="text-transparent decoration-clone bg-clip-text bg-gradient-to-r from-jellyfin-purple-300 to-jellyfin-blue-300">
                than you can count
              </span>
            </h1>

            <div className="mb-4 font-bold text-2xl">
              Your media is ready to follow you,
              <br />
              wherever you go.
            </div>
            <div className="mb-6 text-lg">
              With a large array of official and third-party clients,
              <wbr /> Jellyfin is available on every platform.
            </div>
            <Button variant="primary" href="/clients">
              Find Your Device
            </Button>
          </div>
          <div className="order-1 lg:order-1">
            <StaticImage
              alt="Jellyfin clients on TV, desktop, tablet and phone"
              src="../images/devices-2021-08-04.png"
              placeholder="blurred"
            />
          </div>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:flex lg:flex-row justify-center mx-14 lg:mx-0 gap-6 text-gray-400">
            <div className="flex flex-col items-center">
              <Icon className="w-12 h-12" path={mdiWeb} />
              <span className="margin-top--sm">Web</span>
            </div>
            <div className=" flex flex-col items-center">
              <Icon className="w-12 h-12" path={mdiMonitor} />
              <span className="margin-top--sm">Desktop</span>
            </div>
            <div className=" flex flex-col items-center">
              <Android size={48} />
              <span className="margin-top--sm">Android</span>
            </div>
            <div className=" flex flex-col items-center">
              <Apple size={48} />
              <span className="margin-top--sm">Apple</span>
            </div>
            <div className=" flex flex-col items-center">
              <Roku size={48} />
              <span className="margin-top--sm">Roku</span>
            </div>
            <div className=" flex flex-col items-center">
              <Kodi size={48} />
              <span className="margin-top--sm">Kodi</span>
            </div>
            <div className=" flex flex-col items-center">
              <Amazon size={48} />
              <span className="margin-top--sm">Amazon</span>
            </div>
            <div className=" flex flex-col items-center">
              <Icon className="w-12 h-12" path={mdiPlus} />
              <span className="margin-top--sm">And more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
