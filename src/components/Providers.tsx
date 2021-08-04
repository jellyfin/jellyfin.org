import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Button from './Button';

const Providers = () => {
  const data = useStaticQuery(graphql`
    query Providers {
      allProvidersJson {
        nodes {
          name
          logo {
            publicURL
          }
          width
          height
        }
      }
    }
  `);

  return (
    <section className="w-full py-24">
      <div className="container lg:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-4 lg:mx-24">
          <div className="order-2 lg:order-1 flex flex-col items-start justify-center">
            <h2 className="font-black text-5xl mb-6">
              All the providers
              <br />
              you need for
              <br />
              <span className="text-transparent decoration-clone bg-clip-text bg-gradient-to-r from-jellyfin-purple-300 to-jellyfin-blue-300">
                quality metadata
              </span>
            </h2>
            <div className="mb-4 font-bold text-2xl">
              Official support for dozens of providers,
              <br />
              and more via community plugins.
            </div>
            <div className="mb-6 text-lg">
              Jellyfin allows you to pull metadata from some of the best
              databases online, or go fully offline with native support for Kodi
              NFO files.
            </div>
            <Button variant="primary" href="/plugins">
              Browse our Plugins
            </Button>
          </div>
          <div className="p-4 order-1 lg:order-2 flex flex-col gap-6 justify-center items-center mb-12 lg:mb-0">
            {data.allProvidersJson.nodes.map((provider) => (
              <img
                key={provider.name}
                className={`${provider.width} ${provider.height} object-contain`}
                src={provider.logo.publicURL}
                alt={provider.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Providers;
