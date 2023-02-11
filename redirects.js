/** @type {import('@docusaurus/plugin-client-redirects').Options['redirects']} */
module.exports = [
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
  },
  // Unified client + server download pages
  {
    from: '/clients',
    to: '/downloads/clients/'
  },
  {
    from: '/clients/all',
    to: '/downloads/clients/all'
  },
  // New installation documentation
  {
    from: '/docs/general/administration/installing',
    to: '/docs/general/installation/'
  },
  {
    from: '/docs/general/administration/install/synology',
    to: '/docs/general/installation/synology'
  },
  {
    from: '/docs/general/administration/building',
    to: '/docs/general/installation/source'
  },
  // New developer site
  {
    from: '/docs/general/contributing/branding',
    to: '/developers/docs/branding'
  },
  {
    from: '/docs/general/contributing/',
    to: '/developers/docs/contributing/'
  },
  {
    from: '/docs/general/contributing/development',
    to: '/developers/docs/contributing/development'
  },
  {
    from: '/docs/general/contributing/issues',
    to: '/developers/docs/contributing/issues'
  },
  {
    from: '/docs/general/contributing/release-procedure',
    to: '/developers/docs/contributing/release-procedure'
  },
  {
    from: '/docs/general/contributing/source-tree',
    to: '/developers/docs/contributing/source-tree'
  },
  {
    from: '/docs/general/style-guides/',
    to: '/developers/docs/style-guides/'
  },
  {
    from: '/docs/general/style-guides/javascript',
    to: '/developers/docs/style-guides/javascript'
  }
];
