import * as ClientRedirects from '@docusaurus/plugin-client-redirects';

const redirects: ClientRedirects.Options['redirects'] = [
  // These pages existed on the jellyfin-blog site, but were not fully configured
  {
    from: ['/categories', '/tags'],
    to: '/posts'
  },
  // Jellyfin 10.8 and below linked to this subtitle docs page
  {
    from: [
      '/docs/general/server/media/subtitles',
      '/docs/general/server/media/subtitles.html',
      // video content moved
      '/docs/general/server/media/external-files'
    ],
    to: '/docs/general/server/media/video#external-subtitles-and-audio-racks'
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
  // "traefik2" moved
  {
    from: '/docs/general/networking/traefik2',
    to: '/docs/general/networking/traefik'
  },
  // Internet radio moved to live tv
  {
    from: '/docs/general/server/media/internet-radio',
    to: '/docs/general/server/live-tv/internet-radio'
  },
  // Merge comic and books
  {
    from: '/docs/general/server/media/comics',
    to: '/docs/general/server/media/books'
  },
  // Video content docs moved
  {
    from: [
      '/docs/general/server/media/movies',
      '/docs/general/server/media/shows',
      '/docs/general/server/media/music-videos'
    ],
    to: '/docs/general/server/media/video'
  }
];
export default redirects;
