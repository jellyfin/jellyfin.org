import { SidebarConfig } from '@docusaurus/plugin-content-docs/src/sidebars/types';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

const sidebars: SidebarConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    // "docs/general" pages
    'index',
    { type: 'autogenerated', dirName: 'general' }
  ]
};

export default sidebars;
