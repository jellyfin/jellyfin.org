export type PluginRepository = {
  id: string;
  official?: boolean;
  unstable?: boolean;
  name: string;
  url: string;
  includes: Record<string, string>;
};

export type PluginRepositoryIncluded = {
  name: string;
  url: string;
};

export const OfficialPluginRepositories: Array<PluginRepository> = [
  {
    id: 'jellyfin',
    name: 'Jellyfin',
    official: true,
    url: 'https://repo.jellyfin.org/releases/plugin/manifest-stable.json',
    includes: {}
  },
  {
    id: 'jellyfin-unstable',
    name: 'Jellyfin Unstable',
    official: true,
    unstable: true,
    url: 'https://repo.jellyfin.org/releases/plugin/manifest-unstable.json',
    includes: {}
  }
];

export const ThirdPartyRepositories: Array<PluginRepository> = [
  {
    id: 'gh:9p4/jellyfin-plugin-sso',
    name: "9p4's Single-Sign-On (SSO) Repo",
    url: 'https://raw.githubusercontent.com/9p4/jellyfin-plugin-sso/manifest-release/manifest.json',
    includes: {
      "9p4's Single Sign On Plugin": 'https://github.com/9p4/jellyfin-plugin-sso'
    }
  },
  {
    id: 'gh:vosmiic/jellyfin-ani-sync',
    name: 'Ani-Sync Repo',
    url: 'https://raw.githubusercontent.com/vosmiic/jellyfin-ani-sync/master/manifest.json',
    includes: {
      'Ani-Sync': 'https://github.com/vosmiic/jellyfin-ani-sync'
    }
  },
  {
    id: 'gh:danieladov/JellyfinPluginManifest',
    name: "danieladov's Repo",
    url: 'https://raw.githubusercontent.com/danieladov/JellyfinPluginManifest/master/manifest.json',
    includes: {
      'Merge Versions': 'https://github.com/danieladov/jellyfin-plugin-mergeversions',
      'Skin Manager': 'https://github.com/danieladov/jellyfin-plugin-skin-manager',
      'Theme Songs': 'https://github.com/danieladov/jellyfin-plugin-themesongs'
    }
  },
  {
    id: 'gh:dkanada/jellyfin-plugin-intros',
    name: "dkanada's Repo",
    url: 'https://raw.githubusercontent.com/dkanada/jellyfin-plugin-intros/master/manifest.json',
    includes: {
      Intros: 'https://github.com/dkanada/jellyfin-plugin-intros'
    }
  },
  {
    id: 'gh:k-matti/jellyfin-plugin-repository',
    name: "k-matti's Repo",
    url: 'https://raw.githubusercontent.com/k-matti/jellyfin-plugin-repository/master/manifest.json',
    includes: {
      'SMS Notifications': 'https://github.com/k-matti/jellyfin-plugin-sms',
      NapiSub: 'https://github.com/k-matti/jellyfin-plugin-napi'
    }
  },
  {
    id: 'gh:LinFor/jellyfin-plugin-kinopoisk',
    name: "LinFor's Repo",
    url: 'https://raw.githubusercontent.com/LinFor/jellyfin-plugin-kinopoisk/master/dist/manifest.json',
    includes: {
      'Kinopoisk metadata plugin': 'https://github.com/LinFor/jellyfin-plugin-kinopoisk'
    }
  },
  {
    id: 'lizardbyte.dev',
    name: "LizardByte's Repo",
    url: 'https://app.lizardbyte.dev/jellyfin-plugin-repo/manifest.json',
    includes: {
      Themerr: 'https://github.com/LizardByte/themerr-jellyfin'
    }
  },
  {
    id: 'gh:ShokoAnime/Shokofin',
    name: "ShokoAnime's Repo",
    url: 'https://raw.githubusercontent.com/ShokoAnime/Shokofin/master/manifest.json',
    includes: {
      Shokofin: 'https://github.com/ShokoAnime/Shokofin'
    }
  }
];
