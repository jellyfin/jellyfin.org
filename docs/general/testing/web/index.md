---
uid: testing-web
title: Testing Jellyfin Web
---

## Weekly Unstable Builds

Weekly unstable builds ship server and web in a complete package. Please refer to [Testing Jellyfin Server](/docs/general/testing/server/) for more info.

## Testing PRs from Cloudflare Pages Deployments

Each PR of Jellyfin Web is automatically deployed to Cloudflare Pages. Please follow the steps below on how to test them.

1. Find the PR you would like to checkout in [the list of open PRs](https://github.com/jellyfin/jellyfin-web/pulls).
2. There should be a comment from `jellyfin-bot` with a link to a deployed version of this PR.
   ![CF Pages Comment](/images/docs/testing/web/cf-pages-comment)
3. Clicking on the link in the comment will open an instance of Jellyfin Web that is linked to a development instance of a Jellyfin demo server. You can login to the demo server with the credentials provided on the login page, or login to a different server by clicking `Change Server`.

## Testing from source code

Jellfin Web can be hosted as a standalone application without being associated to a Jellyfin server. In that case, a separate Jellyfin server will need to be prepared.

"Test server" below refers to the device hosting Jellyfin web in the test setup.

### Prerequisites

Below are a list of things to prepare before testing Jellyfin web

- Have an instance of Jellyfin Server.
- Install [NodeJS, npm and nvm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on the test server.
- Install [git](https://github.com/git-guides/install-git) on the test server.
- (Optional) Install [Github CLI](https://cli.github.com/) or [Github Desktop](https://github.com/apps/desktop) on the test server

### Obtaining Jellyfin Web

The Jellyfin Web source code can simply be cloned from the Github repository.
Instructions on how to do so can be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

### Checking out branches

The `master` branch is where the unstable build is built from. If you wish to test over there, please checkout that branch. to checkout the `master` branch, simply do the following.

- Git CLI, Github CLI: open a terminal in the web folder and run `git checkout master`.
- Github Desktop: Select the `master` branch in the branch dropdown menu.

### Checking out PRs

PRs are special branches submitted by contributors with the goal of eventually being merged into `master`. To checkout a PR, please follow the instructions below.

1. Find the PR you would like to checkout in [the list of open PRs](https://github.com/jellyfin/jellyfin-web/pulls).
2. Checkout the PR. [Git CLI and Github CLI](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally), [Github Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/viewing-a-pull-request-in-github-desktop)

### Install Dependencies

1. Navigate to the web directory (the folder containing the cloned contents of the repository)
2. Open a terminal window in the folder.
3. run `npm install` to install prerequisites. This will need to be done every time you switch to a new branch.

### Start Development Server

1. Open a terminal window in the folder
2. run `npm start` to start a development server. The server will start on port 8080. The server will auto update if the contents of the folder is changed.
3. Connect devices to this server to start testing.
4. Press `Ctrl+C` in the terminal window to stop the server.
