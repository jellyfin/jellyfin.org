import React from 'react';
import Button from './Button';

const Volunteers = () => {
  const members = 45;
  const contributors = 1000;

  return (
    <section className="w-full py-24 text-white bg-gradient-to-r from-jellyfin-pink-500 to-jellyfin-orange-500">
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center lg:flex-row gap-6 mx-4 lg:mx-24">
          <div className="flex flex-col lg:w-80 justify-center mb-12 lg:mb-0">
            <div className="flex flex-col items-center mb-8">
              <span className="text-5xl font-extrabold mb-4">{members}</span>
              <span className="text-4xl font-bold">Members</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-extrabold mb-4">
                {contributors}+
              </span>
              <span className="text-4xl font-bold">Contributors</span>
            </div>
          </div>
          <div className="flex flex-col lg:max-w-xl flex-grow-0 items-start justify-center">
            <h1 className="font-black text-5xl mb-6">
              Built by volunteers,
              <br />
              <span className="text-transparent decoration-clone bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
                community-driven
              </span>
            </h1>
            <div className="mb-4 font-bold text-2xl">
              <b>
                Jellyfin is entirely funded through donations,
                <br />
                and built by its users.
              </b>
            </div>
            <div className="mb-6 text-lg">
              We rely entirely on contributions from volunteers. There is no
              corporation steering the ship. Everything is done by users, for
              users.
            </div>
            <Button variant="primary" href="/contribute">
              Get Involved
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteers;
