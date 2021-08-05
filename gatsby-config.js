const fs = require(`fs`);
const fetch = require(`node-fetch`);
const { buildClientSchema } = require(`graphql`);
const { createHttpLink } = require(`apollo-link-http`);

module.exports = {
  siteMetadata: {
    siteUrl: 'https://jellyfin.org',
    title: 'Jellyfin'
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: './src/data/'
      },
      __key: 'data'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-plugin-prettier-eslint',
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            '**/*.{css,scss,less}',
            '**/*.{json,json5}',
            '**/*.{graphql}',
            '**/*.{md,mdx}',
            '**/*.{html}',
            '**/*.{yaml,yml}'
          ]
        },
        eslint: {
          patterns: '**/*.{js,jsx,ts,tsx}',
          customOptions: {
            fix: true,
            cache: true
          }
        }
      }
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `github`,
        typeName: `GitHub`,
        createLink: () =>
          createHttpLink({
            uri: `https://api.github.com/graphql`,
            headers: {
              Authorization: `bearer ${process.env.JF_BOT_TOKEN}`
            },
            fetch
          }),
        createSchema: async () => {
          const json = JSON.parse(fs.readFileSync(`${__dirname}/github.json`));
          return buildClientSchema(json.data);
        }
      }
    }
  ]
};
