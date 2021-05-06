/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Jellyfin',
  tagline: 'The Free Software Media System',
  url: 'https://jellyfin.org/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jellyfin',
  projectName: 'jellyfin.org',
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false
    },
    navbar: {
      logo: {
        alt: 'Jellyfin logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: 'blog', label: 'Blog', position: 'right' },
        {
          to: 'clients',
          label: 'Clients',
          position: 'right',
        },
        {
          to: 'downloads',
          label: 'Downloads',
          position: 'right',
        },
        {
          to: 'contribute',
          label: 'Contribute',
          position: 'right',
        },
        {
          type: 'doc',
          docId: 'intro',
          label: 'Documentation',
          position: 'right',
        },
        {
          to: 'contact',
          label: 'Contact',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Developer Documentation',
              href: 'https://developer.jellyfin.org',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Matrix',
              href: 'https://matrix.to/#/+jellyfin:matrix.org',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/zHBxVSXdBV',
            },
            {
              label: 'Reddit',
              href: 'https://reddit.com/r/jellyfin',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'Check us out on GitHub',
              href: 'https://github.com/jellyfin',
            },
          ],
        },
      ],
      copyright: `Site content is licensed <a href='http://creativecommons.org/licenses/by-nd/4.0/'>CC-BY-ND-4.0</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
