import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const Sponsors = () => {
  const data = useStaticQuery(graphql`
    query Sponsors {
      allSponsorsJson {
        nodes {
          name
          link
          logo {
            publicURL
          }
        }
      }
    }
  `);

  return (
    <section className="w-full py-12 bg-gray-200">
      <div className="container mx-auto text-center">
        <h2 className="font-bold text-3xl mb-2">Sponsors &amp; Partners</h2>
        <p className="text-lg">
          These companies generously support Jellyfin by giving the project free
          access to their services.
        </p>
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center mt-8">
          {data.allSponsorsJson.nodes.map((sponsor) => (
            <a href={sponsor.link} key={sponsor.link}>
              <img
                className="max-w-xs h-16 object-contain"
                src={sponsor.logo.publicURL}
                alt={sponsor.name}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
