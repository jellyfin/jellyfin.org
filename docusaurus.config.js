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
    metadata: [
      { name: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@jellyfin' }
    ],
    colorMode: {
      defaultMode: 'dark',
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
          docId: 'index',
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
          to: '/docs'
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
      copyright: `<a href="https://github.com/jellyfin/jellyfin/releases/latest">
<img alt="Current Release" src="https://img.shields.io/github/release/jellyfin/jellyfin.svg"/>
</a>
<br/>
Site content is licensed <a href='http://creativecommons.org/licenses/by-nd/4.0/'>CC-BY-ND-4.0</a>`
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
          customCss: [
            require.resolve('@fontsource/noto-sans/index.css'),
            require.resolve('./src/css/custom.scss'),
            require.resolve('./src/css/swiper.scss')
          ]
        }
      }
    ]
  ],
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html'],
        redirects: [
          // These pages existed on the jellyfin-blog site, but were not fully configured
          {
            from: ['/categories', '/tags'],
            to: '/posts'
          },
          // Jellyfin 10.8 and below linked to this subtitle docs page
          {
            from: '/docs/general/server/media/subtitles',
            to: '/docs/general/server/media/external-files'
          },
          // Storage docs moved from the server guide to administrative docs
          {
            from: '/docs/general/server/storage',
            to: '/docs/general/administration/storage'
          }
        ]
      }
    ]
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        indexPages: true,
        blogRouteBasePath: '/posts',
        ignoreFiles: [
          'andtv-privacy',
          // NOTE: We need to explicitly ignore the blog routes because it seems to fall through to the page indexing
          'posts',
          /^posts\//
        ],
        explicitSearchResultPath: true
      }
    ]
  ]
};
