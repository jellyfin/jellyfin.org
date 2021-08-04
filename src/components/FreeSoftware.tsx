import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import Button from './Button';

const FreeSoftware = () => {
  return (
    <section className="w-full py-24">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 mx-4 lg:mx-24 lg:flex-grow-0">
          <div className="p-4 order-1 lg:order-2">
            <StaticImage
              alt="Jellyfin home screen"
              className="shadow-lg lg:max-w-5xl"
              src="../images/home-10.7.png"
              placeholder="blurred"
            />
          </div>
          <div className="order-2 lg:order-1 lg:max-w-7xl flex flex-col items-start justify-center">
            <h2 className="font-black text-5xl mb-6">
              Your media,
              <br />
              your server,
              <br />
              <span className="text-transparent decoration-clone bg-clip-text bg-gradient-to-r from-jellyfin-purple-300 to-jellyfin-blue-300">
                your way
              </span>
            </h2>
            <div className="mb-4 font-bold text-2xl">
              Jellyfin is fully self-hosted and fully open source.
            </div>
            <div className="mb-6 text-lg">
              We don&apos;t do tracking or paid plans.
              <br />
              There is no forced connection to a remote server.
              <br />
              You are in control from start to finish.
            </div>
            <Button variant="primary" href="/contribute">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeSoftware;
