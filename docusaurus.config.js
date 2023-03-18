/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Jellyfin',
  tagline: 'The Free Software Media System',
  url: 'https://jellyfin.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
  organizationName: 'jellyfin',
  projectName: 'jellyfin.org',
  /** @type {import('@docusaurus/types').ThemeConfig} */
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
        {
          to: 'downloads',
          label: 'Downloads'
        },
        {
          to: 'posts',
          label: 'Blog'
        },
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          label: 'Documentation'
        },

        {
          to: 'developers',
          label: 'Developers',
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
  plugins: [
    // Main content
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        sidebarPath: require.resolve('./sidebars.js'),
        editUrl: 'https://github.com/jellyfin/jellyfin.org/edit/master/'
      }
    ],
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      {
        id: 'blog-main',
        routeBasePath: 'posts',
        showReadingTime: true,
        path: 'blog'
      }
    ],
    [
      '@docusaurus/plugin-content-pages',
      /** @type {import('@docusaurus/plugin-content-pages').Options} */
      {}
    ],
    // Developers content
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'developers-docs',
        path: 'content/developers/docs',
        routeBasePath: 'developers/docs',
        sidebarPath: require.resolve('./content/developers/docs/_sidebar.js'),
        editUrl: 'https://github.com/jellyfin/jellyfin.org/edit/master/'
      }
    ],
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      {
        id: 'developers-blog',
        path: 'content/developers/blog',
        routeBasePath: 'developers/blog',
        showReadingTime: true,
        authorsMapPath: '../../../blog/authors.yml'
      }
    ],
    [
      '@docusaurus/plugin-content-pages',
      /** @type {import('@docusaurus/plugin-content-pages').Options} */
      {
        id: 'developers-pages',
        path: 'content/developers/pages',
        routeBasePath: 'developers'
      }
    ],
    // Others
    [
      '@docusaurus/plugin-sitemap',
      /** @type {import('@docusaurus/plugin-sitemap').Options} */
      {}
    ],
    [
      'docusaurus-plugin-sass',
      /** @type {import('docusaurus-plugin-sass').Options} */
      {}
    ],
    [
      '@docusaurus/plugin-client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      {
        fromExtensions: ['html'],
        redirects: require('./redirects.js')
      }
    ]
  ],
  themes: [
    [
      require.resolve('@docusaurus/theme-classic'),
      /** @type {import('@docusaurus/theme-classic').Options} */
      {
        customCss: [
          require.resolve('@fontsource/noto-sans/index.css'),
          require.resolve('./src/css/custom.scss'),
          require.resolve('./src/css/swiper.scss')
        ]
      }
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').Options} */
      {
        hashed: true,
        indexBlog: false,
        indexPages: true,
        blogRouteBasePath: '/posts',
        ignoreFiles: [
          // NOTE: We need to explicitly ignore the blog routes because it seems to fall through to the page indexing
          'posts',
          /^posts\//
        ],
        explicitSearchResultPath: true
      }
    ]
  ]
};
