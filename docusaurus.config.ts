import { Config } from '@docusaurus/types';
import * as Docs from '@docusaurus/plugin-content-docs';
import * as Blog from '@docusaurus/plugin-content-blog';
import * as Pages from '@docusaurus/plugin-content-pages';
import * as Sitemap from '@docusaurus/plugin-sitemap';
import * as ClientRedirects from '@docusaurus/plugin-client-redirects';
import * as ThemeClassic from '@docusaurus/theme-classic';
import * as SearchLocal from '@easyops-cn/docusaurus-search-local';
import redirects from './redirects';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Jellyfin',
  tagline: 'The Free Software Media System',
  url: 'https://jellyfin.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'images/favicon.ico',
  organizationName: 'jellyfin',
  projectName: 'jellyfin.org',
  themeConfig: {
    image: 'images/social.png?v2',
    prism: {
      theme: prismThemes.nightOwl
    },
    metadata: [
      { name: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@jellyfin' }
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true
    },
    navbar: {
      logo: {
        alt: 'Jellyfin Logo',
        src: 'images/logo.svg'
      },
      items: [
        { to: 'posts', label: 'Blog', position: 'right' },
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
        },
        {
          href: 'https://forum.jellyfin.org',
          label: 'Forum',
          position: 'right'
        }
      ]
    },
    footer: {
      logo: {
        alt: 'Jellyfin Logo',
        src: 'images/logo.svg',
        width: 280,
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
          label: 'Status',
          to: 'https://status.jellyfin.org'
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
Site content is licensed <a href='http://creativecommons.org/licenses/by-nd/4.0/' class="footer__link-item">CC-BY-ND-4.0</a>`
    }
  },
  markdown: {
    mermaid: true
  },
  plugins: [
    // Main content
    [
      '@docusaurus/plugin-content-docs',
      {
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/jellyfin/jellyfin.org/edit/master/'
      } satisfies Docs.Options
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-main',
        routeBasePath: 'posts',
        showReadingTime: true,
        path: 'blog',
        onInlineAuthors: 'ignore',
        onUntruncatedBlogPosts: 'ignore'
      } satisfies Blog.Options
    ],
    ['@docusaurus/plugin-content-pages', {} satisfies Pages.Options],
    // Others
    ['@docusaurus/plugin-sitemap', {} satisfies Sitemap.Options],
    ['docusaurus-plugin-sass', {}],
    ['@docusaurus/plugin-svgr', {}],
    [
      '@docusaurus/plugin-client-redirects',
      {
        fromExtensions: ['html'],
        redirects: redirects
      } satisfies ClientRedirects.Options
    ]
  ],
  themes: [
    [
      '@docusaurus/theme-classic',
      {
        customCss: [
          require.resolve('@fontsource/noto-sans/index.css'),
          require.resolve('./src/css/custom.scss'),
          require.resolve('./src/css/swiper.scss')
        ]
      } satisfies ThemeClassic.Options
    ],
    [
      '@easyops-cn/docusaurus-search-local',
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
      } satisfies SearchLocal.PluginOptions
    ],
    ['@docusaurus/theme-mermaid', {}]
  ]
};

export default config;
