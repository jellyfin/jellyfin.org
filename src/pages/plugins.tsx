import React from 'react';
import { graphql, Link } from 'gatsby';
import uniq from 'lodash-es/uniq';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Layout } from '../components/Layout';
import { StaticImage } from 'gatsby-plugin-image';

export const query = graphql`
  query Plugins {
    allPluginsJson {
      nodes {
        category
        imageUrl
        pluginPath: gatsbyPath(filePath: "/plugins/{pluginsJson.name}")
        name
        overview
        owner
        versions {
          version
          changelog
        }
      }
    }
  }
`;

const PluginCategory = ({ name, plugins }) => {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">{name}</h2>
      <div className="grid xl:grid-cols-4 gap-4 mb-3">
        {plugins.map((plugin) => (
          <Link key={plugin.name} to={plugin.pluginPath}>
            <div className="bg-gray-100 shadow-md hover:shadow-lg transition-shadow">
              {plugin.imageUrl ? (
                <img alt={plugin.name} src={plugin.imageUrl} />
              ) : (
                <StaticImage
                  alt="No image found"
                  src="../../images/plugin-placeholder.svg"
                />
              )}
              <div className="flex flex-col p-3">
                <h3 className="text-xl font-bold">{plugin.name}</h3>
                <p className="text-lg">
                  By{' '}
                  {plugin.owner === 'jellyfin' ? 'Team Jellyfin' : plugin.owner}
                </p>
                <p>{plugin.overview}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Plugins = ({ data }) => {
  const categories = uniq(
    data.allPluginsJson.nodes.map((plugin) => {
      return plugin.category;
    })
  );

  return (
    <Layout>
      <Header />
      <main className="flex flex-col flex-grow">
        <header className="bg-gray-700 text-white py-4">
          <div className="container mx-auto flex flex-col p-2 lg:p-4">
            <h1 className="font-black text-5xl">Plugins</h1>
          </div>
        </header>
        <div className="container flex-grow mx-auto flex flex-col p-2 lg:p-4 shadow-md bg-white">
          {categories.map((category) => (
            <PluginCategory
              key={category as string}
              name={category}
              plugins={data.allPluginsJson.nodes.filter(
                (plugin) => plugin.category === category
              )}
            />
          ))}
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default Plugins;
