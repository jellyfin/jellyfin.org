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
  }
];
