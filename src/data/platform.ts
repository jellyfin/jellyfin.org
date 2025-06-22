enum Platform {
  // Client platforms
  Android = 'Android',
  AndroidTV = 'Android TV',
  Browser = 'Browser',
  Desktop = 'Desktop',
  Discord = 'Discord',
  FireOS = 'Fire TV',
  IOS = 'iOS',
  Kodi = 'Kodi',
  Roku = 'Roku',
  SailfishOS = 'Sailfish OS',
  TVOS = 'tvOS',
  WebOS = 'webOS',

  // Server platforms
  Arch = 'Arch Linux',
  CentOS = 'CentOS',
  Debian = 'Debian',
  Docker = 'Docker',
  DotNet = '.NET Portable',
  Fedora = 'Fedora',
  Gentoo = 'Gentoo',
  Linux = 'Generic Linux',
  MacOS = 'macOS',
  Ubuntu = 'Ubuntu',
  Windows = 'Windows'
}

export default Platform;

/**
 * List of "featured" clients.
 * Currently this is only used for determining which platform to include in the filter options.
 */
export const FeaturedClientPlatforms = [
  Platform.Android,
  Platform.AndroidTV,
  Platform.Desktop,
  Platform.FireOS,
  Platform.IOS,
  Platform.Kodi,
  Platform.Roku,
  Platform.TVOS,
  Platform.WebOS
];
