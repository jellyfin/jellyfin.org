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
    url: 'https://repo.jellyfin.org/files/plugin/manifest.json',
    includes: {}
  },
  {
    id: 'jellyfin-unstable',
    name: 'Jellyfin Unstable',
    official: true,
    unstable: true,
    url: 'https://repo.jellyfin.org/files/plugin-unstable/manifest.json',
    includes: {}
  }
];

export const ThirdPartyRepositories: Array<PluginRepository> = [
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
    url: 'https://raw.githubusercontent.com/ShokoAnime/Shokofin/metadata/stable/manifest.json',
    includes: {
      Shokofin: 'https://github.com/ShokoAnime/Shokofin'
    }
  },
  {
    id: 'gh:tubearchivist/tubearchivist-jf-plugin',
    name: "TubeArchivist's Repo",
    url: 'https://raw.githubusercontent.com/tubearchivist/tubearchivist-jf-plugin/master/manifest.json',
    includes: {
      TubeArchivistMetadata: 'https://github.com/tubearchivist/tubearchivist-jf-plugin'
    }
  },
  {
    id: 'gh:neptunehub/audiomuse-ai-plugin',
    name: "AudioMuse-AI's Repo",
    url: 'https://raw.githubusercontent.com/neptunehub/audiomuse-ai-plugin/master/manifest.json',
    includes: {
      'AudioMuse-AI': 'https://github.com/neptunehub/audiomuse-ai-plugin'
    }
  },
  {
    id: 'gh:DeDuplicate/Jellyfin_wizdomsubs_downloader',
    name: "DeDuplicate's WizdomSubs Downloader Repo",
    url: 'https://raw.githubusercontent.com/DeDuplicate/Jellyfin_wizdomsubs_downloader/refs/heads/main/manifest.json',
    includes: {
      'WizdomSubs Downloader': 'https://github.com/DeDuplicate/Jellyfin_wizdomsubs_downloader'
    }
  },
  {
    id: 'gh:GeiserX/smart-covers',
    name: "GeiserX's SmartCovers Repo",
    url: 'https://geiserx.github.io/smart-covers/manifest.json',
    includes: {
      SmartCovers: 'https://github.com/GeiserX/smart-covers'
    }
  },
  {
    id: 'gh:GeiserX/whisper-subs',
    name: "GeiserX's WhisperSubs Repo",
    url: 'https://geiserx.github.io/whisper-subs/manifest.json',
    includes: {
      WhisperSubs: 'https://github.com/GeiserX/whisper-subs'
    }
  },
  {
    id: 'gh:TidBits16/FinPlugins',
    name: "TidBits16's FinPlugins Repo",
    url: 'https://raw.githubusercontent.com/TidBits16/FinPlugins/main/manifest.json',
    includes: {
      MusicFin: 'https://github.com/TidBits16/MusicFin',
      ExplicitFin: 'https://github.com/TidBits16/ExplicitFin',
      LyricFin: 'https://github.com/TidBits16/LyricFin',
      ArtistFin: 'https://github.com/TidBits16/ArtistFin'
    }
  }
];
