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
  }
];
