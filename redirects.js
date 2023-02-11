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
  }
];
