/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    // "docs/general" pages
    'index',
    { type: 'autogenerated', dirName: 'general' }
  ],
  developers: [
    // "docs/developers" pages
    { type: 'autogenerated', dirName: 'developers' },
    { type: 'link', label: 'API Documentation', href: 'https://api.jellyfin.org' }
  ]
};
