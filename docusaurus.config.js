/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Jellyfin',
  tagline: 'The Free Software Media System',
  url: 'http://next.jellyfin.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jellyfin',
  projectName: 'jellyfin.org',
  themeConfig: {
    image: 'img/social.png',
    /*announcementBar: {
      id: 'work_in_progress', // Any value that will identify this message.
      content:
        'This new version of Jellyfin.org is currently being built. <a target="_blank" rel="noopener noreferrer" href="https://github.com/jellyfin/jellyfin.org">Get involved!</a>',
      backgroundColor: '#b71c1c',
      textColor: '#ffffff',
      isCloseable: false
    },*/
    metadatas: [
      { name: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@jellyfin' }
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false
    },
    navbar: {
      logo: {
        alt: 'Jellyfin logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          to: 'features',
          label: 'Features',
          position: 'right'
        },
        {
          to: 'clients',
          label: 'Clients',
          position: 'right'
        },
        {
          to: 'plugins',
          label: 'Plugins',
          position: 'right'
        },
        {
          to: 'downloads',
          label: 'Downloads',
          position: 'right'
        },
        {
          to: 'contribute',
          label: 'Contribute',
          position: 'right'
        },
        { to: 'blog', label: 'Blog', position: 'right' },
        {
          type: 'doc',
          docId: 'getting-started',
          label: 'Documentation',
          position: 'right'
        },
        {
          to: 'contact',
          label: 'Contact',
          position: 'right'
        }
      ]
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started'
            },
            {
              label: 'Developer Documentation',
              href: 'https://developer.jellyfin.org'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Community Standards',
              to: 'community-standards'
            },
            {
              label: 'Matrix',
              href: 'https://matrix.to/#/+jellyfin:matrix.org'
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/zHBxVSXdBV'
            },
            {
              label: 'Reddit',
              href: 'https://reddit.com/r/jellyfin'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Getting Help',
              to: 'getting-help'
            },
            {
              label: 'Blog',
              to: 'blog'
            },
            {
              label: 'FAQ',
              to: 'faq'
            },
            {
              label: 'Check us out on GitHub',
              href: 'https://github.com/jellyfin'
            }
          ]
        }
      ],
      copyright: `Site content is licensed <a href='http://creativecommons.org/licenses/by-nd/4.0/'>CC-BY-ND-4.0</a>`
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/jellyfin/jellyfin.org/edit/master/'
        },
        blog: {
          showReadingTime: true
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('swiper/swiper.scss'),
            require.resolve('swiper/components/effect-fade/effect-fade.scss')
          ]
        }
      }
    ]
  ],
  plugins: ['docusaurus-plugin-sass']
};
