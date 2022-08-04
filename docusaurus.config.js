/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Jellyfin',
  tagline: 'The Free Software Media System',
  url: 'http://next.jellyfin.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
  organizationName: 'jellyfin',
  projectName: 'jellyfin.org',
  themeConfig: {
    image: 'images/social.png',
    announcementBar: {
      id: 'work_in_progress', // Any value that will identify this message.
      content:
        'This new version of Jellyfin.org is currently being built. <a target="_blank" rel="noopener noreferrer" href="https://github.com/jellyfin/jellyfin.org">Get involved!</a>',
      backgroundColor: '#b71c1c',
      textColor: '#ffffff',
      isCloseable: false
    },
    metadata: [
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
        alt: 'Jellyfin Logo',
        src: 'images/logo.svg'
      },
      items: [
        { to: 'posts', label: 'Blog', position: 'right' },
        {
          to: 'clients',
          label: 'Clients',
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
      logo: {
        alt: 'Jellyfin Logo',
        src: 'images/logo.svg',
        width: 240,
        height: 80
      },
      links: [
        {
          label: 'Documentation',
          to: '/docs/getting-started'
        },
        {
          label: 'Feature Requests',
          to: 'https://features.jellyfin.org'
        },
        {
          label: 'Contribute',
          to: '/contribute'
        },
        {
          label: 'Contact',
          to: '/contact'
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
          routeBasePath: 'posts',
          showReadingTime: true
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
