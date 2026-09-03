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
      '/docs/general/server/media/external-files'
    ],
    to: '/docs/general/server/media/movies#external-subtitles-and-audio-tracks'
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
    from: [
      '/docs/general/administration/install/synology',
      // synology moved
      '/docs/general/installation/synology'
    ],
    to: '/docs/general/installation/advanced/synology'
  },
  // installing from source moved
  {
    from: ['/docs/general/installation/source', '/docs/general/administration/building'],
    to: '/docs/general/installation/advanced/source'
  },
  // "traefik2" moved
  {
    from: ['/docs/general/networking/traefik2', '/docs/general/networking/traefik'],
    to: '/docs/general/post-install/networking/reverse-proxy/traefik'
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
  // transcoding and hwa moved
  {
    from: '/docs/general/administration/hardware-acceleration',
    to: '/docs/general/post-install/transcoding/hardware-acceleration/'
  },
  {
    from: '/docs/general/administration/hardware-acceleration/intel',
    to: '/docs/general/post-install/transcoding/hardware-acceleration/intel'
  },
  {
    from: '/docs/general/server/transcoding',
    to: '/docs/general/post-install/transcoding/'
  },
  // networking moved
  {
    from: '/docs/general/networking/',
    to: '/docs/general/post-install/networking/'
  },
  {
    from: '/docs/general/networking/apache',
    to: '/docs/general/post-install/networking/reverse-proxy/apache'
  },
  {
    from: '/docs/general/networking/caddy',
    to: '/docs/general/post-install/networking/reverse-proxy/caddy'
  },
  {
    from: '/docs/general/networking/dlna',
    to: '/docs/general/post-install/networking/dlna'
  },
  {
    from: '/docs/general/networking/fail2ban',
    to: '/docs/general/post-install/networking/advanced/fail2ban'
  },
  {
    from: '/docs/general/networking/haproxy',
    to: '/docs/general/post-install/networking/reverse-proxy/haproxy'
  },
  {
    from: '/docs/general/networking/letsencrypt',
    to: '/docs/general/post-install/networking/advanced/letsencrypt'
  },
  {
    from: '/docs/general/networking/monitoring',
    to: '/docs/general/post-install/networking/advanced/monitoring'
  },
  {
    from: '/docs/general/networking/nginx',
    to: '/docs/general/post-install/networking/reverse-proxy/nginx'
  }
];
export default redirects;
