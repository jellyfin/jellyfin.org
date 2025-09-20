type Link = {
  name: string;
  url: string;
};

export type DonationTarget = {
  title: string;
  roles: Array<string>;
  links: Array<Link>;
};

export const donations: Array<DonationTarget> = [
  {
    title: 'JPVenson',
    roles: ['Xbox Subproject Lead', 'Server Developer', 'Moderator'],
    links: [
      {
        url: 'https://coff.ee/venson',
        name: 'Buy Me a Coffee'
      }
    ]
  },
  {
    title: '1hitsong',
    roles: ['Roku Client Maintainer'],
    links: [
      {
        url: 'https://coff.ee/1hitsong',
        name: 'Buy Me a Coffee'
      },
      {
        url: 'https://github.com/sponsors/1hitsong',
        name: 'GitHub Sponsors'
      }
    ]
  },
  {
    title: 'Niels van Velzen',
    roles: ['Core team', 'Android TV maintainer', 'Android maintainer'],
    links: [
      {
        url: 'https://github.com/sponsors/nielsvanvelzen',
        name: 'GitHub Sponsors'
      },
      {
        url: 'https://coff.ee/nielsvanvelzen',
        name: 'Buy Me a Coffee'
      }
    ]
  },
  {
    title: 'Tim Gels',
    roles: ['Community Moderator'],
    links: [
      {
        url: 'https://github.com/sponsors/TimGels',
        name: 'GitHub Sponsors'
      },
      {
        url: 'https://coff.ee/timgels',
        name: 'Buy Me a Coffee'
      }
    ]
  }
];
