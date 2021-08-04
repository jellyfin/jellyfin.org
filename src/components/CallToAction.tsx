import React from 'react';
import Button from './Button';

const CallToAction = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-jellyfin-purple-300 to-jellyfin-blue-300 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col flex-grow-0 items-center justify-center mx-4 lg:mx-0">
          <h2 className="font-black text-center text-5xl mb-6">
            Get Started Now
          </h2>
          <p className="mb-14 font-bold text-xl text-center">
            Check out our Getting Started guide to download and set up your
            server today.
          </p>
          <Button variant="primary" href="/downloads">
            Download Jellyfin
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
