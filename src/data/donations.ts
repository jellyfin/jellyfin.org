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
        name: 'Buy me a Coffee'
      }
    ]
  },
  {
    title: '1hitsong',
    roles: ['Roku Client Maintainer'],
    links: [
      {
        url: 'buymeacoffee.com/1hitsong',
        name: 'Buy me a Coffee'
      },
      {
        url: 'github.com/sponsors/1hitsong',
        name: 'Github Sponsors'
      }
    ]
  }
];
