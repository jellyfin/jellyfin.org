type Link = {
  name: string;
  url: string;
};

export type DonationTarget = {
  title: string;
  roles: Array<string>;
  links: Array<Link>;
};

export enum MiscRoles {
  Mod = 'Moderator',
  CommunityMod = 'Community Moderator',
  CoreTeam = 'Core Team',
  ReleaseManager = 'Release Manager',
  InfastructureAdmin = 'Infastructure Administrator',
  ProjectLeader = 'Project Leader'
}

export enum Projects {
  Server = 'Jellyfin Server',
  Xbox = 'Jellyfin for Xbox',
  Roku = 'Jellyfin for Roku',
  ATV = 'Jellyfin for Android TV',
  Android = 'Jellyfin for Android',
  Swiftfin = 'Swiftfin',
  Vue = 'Jellyfin Vue',
  JellyfinWeb = 'Jellyfin Web',
  IOS = 'Jellyfin for iOS'
}

export enum ProjectRole {
  SubprojectLead = 'Subproject Lead',
  Contributor = 'Contributor'
}

export enum SponsorTypes {
  GithubSponsor = 'Github Sponsors',
  BuyMeACoffee = 'Buy Me a Coffee',
  Patreon = 'Patreon',
  Liberapay = 'Liberapay'
}

function GetProjectRole(project: Projects, roleInProject: ProjectRole) {
  return `${project} ${roleInProject}`;
}

export const donations: Array<DonationTarget> = [
  {
    title: 'Jean-Pierre Bachmann (JPVenson)',
    roles: [
      GetProjectRole(Projects.Xbox, ProjectRole.SubprojectLead),
      GetProjectRole(Projects.Server, ProjectRole.Contributor),
      MiscRoles.Mod
    ],
    links: [
      {
        url: 'https://coff.ee/venson',
        name: SponsorTypes.BuyMeACoffee
      }
    ]
  },
  {
    title: '1hitsong',
    roles: [GetProjectRole(Projects.Roku, ProjectRole.SubprojectLead)],
    links: [
      {
        url: 'https://coff.ee/1hitsong',
        name: SponsorTypes.BuyMeACoffee
      },
      {
        url: 'https://github.com/sponsors/1hitsong',
        name: SponsorTypes.GithubSponsor
      }
    ]
  },
  {
    title: 'Niels van Velzen',
    roles: [
      MiscRoles.CoreTeam,
      GetProjectRole(Projects.ATV, ProjectRole.SubprojectLead),
      GetProjectRole(Projects.Android, ProjectRole.SubprojectLead)
    ],
    links: [
      {
        url: 'https://github.com/sponsors/nielsvanvelzen',
        name: SponsorTypes.GithubSponsor
      },
      {
        url: 'https://coff.ee/nielsvanvelzen',
        name: SponsorTypes.BuyMeACoffee
      }
    ]
  },
  {
    title: 'Tim Gels',
    roles: [MiscRoles.CommunityMod, GetProjectRole(Projects.Xbox, ProjectRole.Contributor)],
    links: [
      {
        url: 'https://github.com/sponsors/TimGels',
        name: SponsorTypes.GithubSponsor
      },
      {
        url: 'https://coff.ee/timgels',
        name: SponsorTypes.BuyMeACoffee
      }
    ]
  },
  {
    title: 'Joshua Boniface',
    roles: [MiscRoles.ProjectLeader, MiscRoles.ReleaseManager, MiscRoles.InfastructureAdmin],
    links: [
      {
        url: 'https://github.com/sponsors/joshuaboniface',
        name: SponsorTypes.GithubSponsor
      },
      {
        url: 'https://patreon.com/joshuaboniface',
        name: SponsorTypes.Patreon
      }
    ]
  },
  {
    title: 'Ethan Pippin',
    roles: [GetProjectRole(Projects.Swiftfin, ProjectRole.SubprojectLead)],
    links: [
      {
        url: 'https://github.com/sponsors/LePips',
        name: SponsorTypes.GithubSponsor
      }
    ]
  },
  {
    title: 'Fernando Fernández (ferferga)',
    roles: [GetProjectRole(Projects.Vue, ProjectRole.SubprojectLead)],
    links: [
      {
        url: 'https://github.com/sponsors/ferferga',
        name: SponsorTypes.GithubSponsor
      }
    ]
  },
  {
    title: 'Bill Thornton (ferferga)',
    roles: [
      MiscRoles.CoreTeam,
      GetProjectRole(Projects.JellyfinWeb, ProjectRole.SubprojectLead),
      GetProjectRole(Projects.IOS, ProjectRole.SubprojectLead)
    ],
    links: [
      {
        url: 'https://github.com/sponsors/thornbill',
        name: SponsorTypes.GithubSponsor
      },
      {
        url: 'https://coff.ee/thornbill',
        name: SponsorTypes.BuyMeACoffee
      }
    ]
  },
  {
    title: 'Bond_009',
    roles: [MiscRoles.CoreTeam, GetProjectRole(Projects.Server, ProjectRole.Contributor)],
    links: [
      {
        url: 'https://liberapay.com/Bond_009',
        name: SponsorTypes.GithubSponsor
      },
      {
        url: 'https://github.com/sponsors/Bond-009',
        name: SponsorTypes.GithubSponsor
      }
    ]
  }
];
