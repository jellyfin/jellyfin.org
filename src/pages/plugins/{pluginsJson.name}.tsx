import React from 'react';
import { graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const query = graphql`
  query ($id: String) {
    pluginsJson(id: { eq: $id }) {
      category
      description
      imageUrl
      imageURL
      name
      overview
      owner
      versions {
        version
        changelog
      }
    }
  }
`;

const PluginDetails = ({ data, location }) => {
  return (
    <Layout>
      <Header />
      <main>
        <header className="bg-gray-700 text-white">
          <div className="container mx-auto flex flex-col p-2 lg:p-4">
            <div className="flex gap-4">
              {('imageUrl' in data.pluginsJson && data.pluginsJson.imageUrl) ||
              ('imageURL' in data.pluginsJson && data.pluginsJson.imageURL) ? (
                <img
                  alt={data.pluginsJson.name}
                  className="w-96 shadow-lg"
                  src={data.pluginsJson?.imageUrl || data.pluginsJson?.imageURL}
                />
              ) : (
                <StaticImage
                  className="w-96 shadow-lg"
                  alt="No image found"
                  src="../../images/plugin-placeholder.svg"
                />
              )}
              <div className="flex flex-col">
                <p className="font-bold">{data.pluginsJson.category}</p>
                <div className="flex flex-row items-end gap-2 mb-1">
                  <h1 className="font-black text-5xl">
                    {data.pluginsJson.name}
                  </h1>
                  <p>{data.pluginsJson.versions[0].version}</p>
                </div>
                <p className="font-sans-title font-light text-lg mb-2">
                  By{' '}
                  {data.pluginsJson.owner === 'jellyfin'
                    ? 'Team Jellyfin'
                    : data.pluginsJson.owner}
                </p>
                <p className="text-xl font-bold mb-2">
                  {data.pluginsJson.overview}
                </p>
                <p className="max-w-prose">{data.pluginsJson.description}</p>
              </div>
            </div>
          </div>
        </header>
        <div className="p-2 lg:p-4 shadow-md bg-white container mx-auto">
          {data.pluginsJson.versions.map((version) => (
            <section key={version.version} className="plugin-changelog">
              <div className="flex flex-col">
                <h2 className="font-extrabold text-2xl mb-2">
                  Changes in version {version.version}
                </h2>
                <ReactMarkdown>{version.changelog}</ReactMarkdown>
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default PluginDetails;
