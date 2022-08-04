export enum ClientType {
  Official,
  ThirdParty
}

export enum DeviceType {
  Desktop,
  Mobile,
  TV
}

export enum LicenseType {
  OpenSource,
  Proprietary
}

export enum Platform {
  Android,
  AndroidTV,
  Browser,
  Desktop,
  Discord,
  FireOS,
  IOS,
  Kodi,
  Roku,
  SailfishOS,
  TVOS,
  WebOS
}

type Link = {
  id: string,
  name: string,
  url: string
}

export type Client = {
  id: string,
  name: string,
  description: string,
  clientType: ClientType,
  deviceTypes: Array<DeviceType>,
  licenseType: LicenseType,
  platforms: Array<Platform>,
  primaryLinks: Array<Link>,
  secondaryLinks?: Array<Link>,
  recommended?: boolean
}

export const Clients: Array<Client> = [
  {
    id: 'jellyfin-media-player',
    name: 'Jellyfin Media Player',
    description: 'The official Jellyfin desktop client.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.Desktop],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Desktop],
    primaryLinks: [{
      id: 'flathub',
      name: 'Flathub (Linux)',
      url: 'https://flathub.org/apps/details/com.github.iwalton3.jellyfin-media-player'
    }, {
      id: 'gh-downloads',
      name: 'GitHub Downloads',
      url: 'https://github.com/jellyfin/jellyfin-media-player/releases'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-media-player'
    }],
    recommended: true
  },
  {
    id: 'jellyfin-mpv-shim',
    name: 'Jellyfin MPV Shim',
    description: 'A cross-platform cast client for Jellyfin.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.Desktop],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Desktop],
    primaryLinks: [{
      id: 'flathub',
      name: 'Flathub (Linux)',
      url: 'https://flathub.org/apps/details/com.github.iwalton3.jellyfin-mpv-shim'
    }, {
      id: 'gh-downloads',
      name: 'GitHub Downloads',
      url: 'https://github.com/jellyfin/jellyfin-mpv-shim/releases'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-mpv-shim'
    }]
  },
  {
    id: 'jellyamp',
    name: 'Jellyamp',
    description: 'A desktop client for listening to music from a Jellyfin server.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Desktop],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Desktop],
    primaryLinks: [{
      id: 'gh-downloads',
      name: 'GitHub Downloads',
      url: 'https://github.com/m0ngr31/jellyamp/releases'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/m0ngr31/jellyamp'
    }]
  },
  {
    id: 'preserve',
    name: 'Preserve',
    description: 'A music client inspired by players such as foobar2000 or Clementine.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Desktop],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Browser, Platform.Desktop],
    primaryLinks: [{
      id: 'browser',
      name: 'Open in Browser',
      url: 'https://preserveplayer.com/'
    }, {
      id: 'gl-downloads',
      name: 'GitLab Downloads',
      url: 'https://gitlab.com/tonyfinn/preserve/-/releases'
    }],
    secondaryLinks: [{
      id: 'gitlab',
      name: 'GitLab',
      url: 'https://gitlab.com/tonyfinn/preserve'
    }]
  },
  {
    id: 'sonixd',
    name: 'Sonixd',
    description: 'A full-featured Subsonic/Jellyfin compatible desktop music player.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Desktop],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Desktop],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://github.com/jeffvli/sonixd#install'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jeffvli/sonixd'
    }]
  },
  {
    id: 'tauon-music-box',
    name: 'Tauon Music Box',
    description: 'A modern streamlined music player for desktop with a minimal interface that\'s packed with features!',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Desktop],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Desktop],
    primaryLinks: [{
      id: 'flathub',
      name: 'Flathub (Linux)',
      url: 'https://flathub.org/apps/details/com.github.taiko2k.tauonmb'
    }, {
      id: 'install',
      name: 'Installation Guide',
      url: 'https://github.com/Taiko2k/TauonMusicBox#download-and-install-dizzy'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/Taiko2k/TauonMusicBox'
    }, {
      id: 'tauon',
      name: 'Website',
      url: 'https://tauonmusicbox.rocks'
    }]
  },
  {
    id: 'jellycon',
    name: 'JellyCon',
    description: 'A lightweight Kodi add-on that lets you browse and play media files directly from your Jellyfin server within the Kodi interface.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.Desktop, DeviceType.Mobile, DeviceType.TV],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Kodi],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://github.com/jellyfin/jellycon#installation'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellycon'
    }],
    recommended: true
  },
  {
    id: 'jellyfin-kodi',
    name: 'Jellyfin for Kodi',
    description: 'A Kodi add-on that syncs metadata from selected Jellyfin libraries into the local Kodi database.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.Desktop, DeviceType.Mobile, DeviceType.TV],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Kodi],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://docs.jellyfin.org/general/clients/kodi.html'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-kodi'
    }]
  },
  {
    id: 'jellyfin-android',
    name: 'Jellyfin for Android',
    description: 'The official Jellyfin app for Android devices.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Android],
    primaryLinks: [{
      id: 'fdroid',
      name: 'F-Droid',
      url: 'https://f-droid.org/en/packages/org.jellyfin.mobile/'
    }, {
      id: 'amazon-store',
      name: 'Amazon Appstore',
      url: 'https://www.amazon.com/gp/aw/d/B081RFTTQ9'
    }, {
      id: 'play-store',
      name: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=org.jellyfin.mobile'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-android'
    }],
    recommended: true
  },
  {
    id: 'jellyfin-expo',
    name: 'Jellyfin Mobile for iOS',
    description: 'The official Jellyfin app for iOS and iPadOS devices.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.IOS],
    primaryLinks: [{
      id: 'apple-store',
      name: 'App Store',
      url: 'https://apps.apple.com/us/app/jellyfin-mobile/id1480192618?mt=8'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-expo'
    }],
    recommended: true
  },
  {
    id: 'findroid',
    name: 'Findroid',
    description: 'A third-party Android application for Jellyfin that provides a native user interface to browse and play movies and series.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Android],
    primaryLinks: [{
      id: 'izzy-fdroid',
      name: 'IzzyOnDroid',
      url: 'https://apt.izzysoft.de/fdroid/index/apk/dev.jdtech.jellyfin'
    }, {
      id: 'play-store',
      name: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=dev.jdtech.jellyfin'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jarnedemeulemeester/findroid'
    }]
  },
  {
    id: 'gelli',
    name: 'Gelli',
    description: 'A native music player for Android devices with transcoding support, gapless playback, favorites, playlists, and many other features.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Android],
    primaryLinks: [{
      id: 'gh-downloads',
      name: 'GitHub Downloads',
      url: 'https://github.com/dkanada/gelli/releases'
    }, {
      id: 'fdroid',
      name: 'F-Droid',
      url: 'https://f-droid.org/packages/com.dkanada.gramophone/'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/dkanada/gelli'
    }]
  },
  {
    id: 'finamp',
    name: 'Finamp',
    description: 'A third party app for music playback with support for offline mode/downloading songs.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Android, Platform.IOS],
    primaryLinks: [{
      id: 'fdroid',
      name: 'F-Droid',
      url: 'https://f-droid.org/packages/com.unicornsonlsd.finamp/'
    }, {
      id: 'play-store',
      name: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=com.unicornsonlsd.finamp'
    }, {
      id: 'app-store',
      name: 'App Store',
      url: 'https://apps.apple.com/us/app/finamp/id1574922594'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/UnicornsOnLSD/finamp'
    }]
  },
  {
    id: 'sailfin',
    name: 'Sailfin',
    description: 'A Sailfish OS client for Jellyfin.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.SailfishOS],
    primaryLinks: [{
      id: 'open-repos',
      name: 'OpenRepos',
      url: 'https://openrepos.net/content/ahappyhuman/sailfin'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/heartfin/harbour-sailfin'
    }]
  },
  {
    id: 'yatse',
    name: 'Yatse',
    description: 'A third party remote control for Jellyfin with support for Chromecast playback.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Mobile],
    licenseType: LicenseType.Proprietary,
    platforms: [Platform.Android],
    primaryLinks: [{
      id: 'play-store',
      name: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=org.leetzone.android.yatsewidgetfree'
    }],
    secondaryLinks: [{
      id: 'yatse',
      name: 'Website',
      url: 'https://yatse.tv/'
    }]
  },
  {
    id: 'jellyfin-androidtv',
    name: 'Jellyfin for Android TV',
    description: 'The official Jellyfin app for Android TV devices.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.TV],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.AndroidTV, Platform.FireOS],
    primaryLinks: [{
      id: 'amazon-store',
      name: 'Amazon Appstore',
      url: 'https://www.amazon.com/gp/aw/d/B07TX7Z725'
    }, {
      id: 'play-store',
      name: 'Play Store',
      url: 'https://play.google.com/store/apps/details?id=org.jellyfin.androidtv'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-androidtv'
    }],
    recommended: true
  },
  {
    id: 'jellyfin-roku',
    name: 'Jellyfin for Roku',
    description: 'The official Jellyfin app for Roku devices.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.TV],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Roku],
    primaryLinks: [{
      id: 'roku-store',
      name: 'Channel Store',
      url: 'https://channelstore.roku.com/details/592369/jellyfin'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-roku'
    }],
    recommended: true
  },
  {
    id: 'jellyfin-webos',
    name: 'Jellyfin for WebOS',
    description: 'The official Jellyfin app for WebOS devices.',
    clientType: ClientType.Official,
    deviceTypes: [DeviceType.TV],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.WebOS],
    primaryLinks: [{
      id: 'jf-blog',
      name: 'Older webOS Versions',
      url: '/posts/webos-july2022'
    }, {
      id: 'lg-store',
      name: 'Content Store - webOS 6+',
      url: 'https://us.lgappstv.com/main/tvapp/detail?appId=1030579'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/jellyfin-webos'
    }],
    recommended: true
  },
  {
    id: 'infuse',
    name: 'Infuse',
    description: 'A third-party client for iOS, iPadOS, and tvOS devices.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [DeviceType.Mobile, DeviceType.TV],
    licenseType: LicenseType.Proprietary,
    platforms: [Platform.IOS, Platform.TVOS],
    primaryLinks: [{
      id: 'apple-store',
      name: 'App Store',
      url: 'https://apps.apple.com/app/id1136220934?mt=8'
    }],
    secondaryLinks: [{
      id: 'website',
      name: 'Website',
      url: 'https://firecore.com/infuse'
    }],
    recommended: true
  },
  {
    id: 'mopidy',
    name: 'Mopidy-Jellyfin',
    description: 'An official plugin for Mopidy that uses Jellyfin as a backend.',
    clientType: ClientType.Official,
    deviceTypes: [],
    licenseType: LicenseType.OpenSource,
    platforms: [],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://jellyfin.org/docs/general/clients/mopidy.html'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/jellyfin/mopidy-jellyfin'
    }]
  },
  {
    id: 'volumio',
    name: 'Jellyfin Plugin for Volumio',
    description: 'A Volumio plugin for playing audio from one or more Jellyfin servers.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [],
    licenseType: LicenseType.OpenSource,
    platforms: [],
    primaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/patrickkfkan/volumio-jellyfin'
    }]
  },
  {
    id: 'discord-music',
    name: 'Discord Music Bot for Jellyfin',
    description: 'A Discord bot that allows playing your Jellyfin music library in Discord voice channels.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Discord],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://github.com/kgt1/jellyfin-discord-music-bot#getting-started'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/kgt1/jellyfin-discord-music-bot'
    }]
  },
  {
    id: 'jellycli',
    name: 'Jellycli',
    description: 'A terminal player for Jellyfin, only for music at the moment.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [],
    licenseType: LicenseType.OpenSource,
    platforms: [],
    primaryLinks: [{
      id: 'gh-downloads',
      name: 'GitHub Downloads',
      url: 'https://github.com/tryffel/jellycli/releases'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/tryffel/jellycli'
    }]
  },
  {
    id: 'jftui',
    name: 'jftui',
    description: 'A terminal client for Jellyfin built as a REPL interface, that uses mpv for multimedia playback.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [],
    licenseType: LicenseType.OpenSource,
    platforms: [],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://github.com/Aanok/jftui#installation'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/Aanok/jftui'
    }]
  },
  {
    id: 'web-scrobbler',
    name: 'Web Scrobbler',
    description: 'Web Scrobbler helps online music listeners to scrobble their playback history.',
    clientType: ClientType.ThirdParty,
    deviceTypes: [],
    licenseType: LicenseType.OpenSource,
    platforms: [Platform.Browser],
    primaryLinks: [{
      id: 'install',
      name: 'Installation Guide',
      url: 'https://github.com/web-scrobbler/web-scrobbler#installation'
    }],
    secondaryLinks: [{
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/web-scrobbler/web-scrobbler'
    }, {
      id: 'website',
      name: 'Website',
      url: 'https://web-scrobbler.com'
    }]
  }
];
