---
uid: testing-web-clients
title: Testing Jellyfin Web Clients
---

## Weekly Unstable Builds

Weekly unstable builds ship Jellyfin Server and Jellyfin Web in a complete package. Please refer to [Testing Jellyfin Server](/docs/general/testing/server/) for more info.

## Testing pull requests from Cloudflare Pages Deployments

Each pull request of [Jellyfin Web](https://github.com/jellyfin/jellyfin-web) and [Jellyfin Vue](https://github.com/jellyfin/jellyfin-vue) is automatically deployed to Cloudflare Pages. Please follow the steps below on how to test them.

1. Find the pull request you would like to test / review in the list of open pull requests: [pull requests for Jellyfin Web](https://github.com/jellyfin/jellyfin-web/pulls), [pull requests for Jellyfin Vue](https://github.com/jellyfin/jellyfin-vue/pulls)
2. On most pull requests, there should be a comment from `jellyfin-bot` with a link to a deployed version of the current pull request. Click on the link next to `Preview URL` to open a hosted instance of the current pull request.
   ![CF Pages Comment](/images/docs/testing/web/cf-pages-comment.png)

   :::note
   Some pull requests might not have this comment, or the link might otherwise not work. To test out these pull requests, they will have to be built manually.
   :::

3. Clicking on the link in the comment will open an instance of the client you are testing. For Jellyfin Web, it will be linked automatically to our demo server. For Jellyfin Vue, you can connect to the demo server with this address: `https://demo.jellyfin.org/unstable/`. The credentials will be provided on the login page.

   If you wish to connect to a different server, click the `Change Server` button in the apps at the login screen. Alternatively, enter a different server address in Jellyfin Vue when first prompted to add a server.

:::caution
Using a development version of clients may lead to data corruption or loss on the server. Please use a dedicated test server and make regular backups of [Jellyfin files](/docs/general/administration/configuration#server-paths).
:::

:::danger
Although Cloudflare Pages deployments from Pull Requests are built into our CI/CD workflow
in a completely transparent and auditable manner, **some of them may come from external contributors that might not be good actors!**.

By default, never trust any artifacts given by anyone outside the official channels if you can't inspect the source code first.
They might compromise your system or track your activity!
:::

## Testing from source code

Jellyfin web clients can be hosted as a standalone application without being associated with a Jellyfin server. In that case, a separate Jellyfin server will need to be prepared.

"Test server" below refers to the device hosting the web client in the test setup.

### Prerequisites

Below is a list of things to prepare before testing Jellyfin web clients.

- Have an instance of Jellyfin Server. A dedicated testing setup is recommended.
- Install [NodeJS, npm and nvm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) on the test server.
- Install [Git](https://github.com/git-guides/install-git) on the test server.
- (Optional) Install [GitHub CLI](https://cli.github.com/) or [GitHub Desktop](https://github.com/apps/desktop) on the test server
- (Optional) A text editor or web IDE to make changes during testing, eg. [VSCode](https://code.visualstudio.com/), [Notepad++](https://notepad-plus-plus.org/) ,[Jetbrains Webstorm](https://www.jetbrains.com/webstorm/).

:::note
Installing Github CLI or Github Desktop will automatically install Git on the system.
:::

### Obtaining Source Code

The source code of the web clients can simply be cloned from their respective GitHub repositories: [Jellyfin Web](https://github.com/jellyfin/jellyfin-web/), [Jellyfin Vue](https://github.com/jellyfin/jellyfin-vue/)
Instructions on how to do so can be found [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

### Checking out branches

The `master` branch is where the unstable build is built from. If you wish to test over there, please checkout that branch. To checkout the `master` branch, simply do the following.

- Git CLI, GitHub CLI: open a terminal in the web folder and run `git checkout master`.
- GitHub Desktop: Select the `master` branch in the branch dropdown menu.

### Checking out PRs

PRs are special branches submitted by contributors with the goal of eventually being merged into `master`. To checkout a PR, please follow the instructions below.

1. Find the PR you would like to checkout in the list of open PRs: [Jellyfin Web](https://github.com/jellyfin/jellyfin-web/pulls), [Jellyfin Vue](https://github.com/jellyfin/jellyfin-vue/pulls).
2. Checkout the PR in Git: [Git CLI and GitHub CLI](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally), [GitHub Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/viewing-a-pull-request-in-github-desktop)

### Install Dependencies

1. Navigate to the web directory (the folder containing the cloned contents of the repository)
2. Open a terminal window in the folder.
3. Run `npm install` to install dependencies. This will need to be done every time you switch to a new branch, as different branches might have different versions of dependencies.

### Start Development Server

1. Open a terminal window in the folder of the cloned contents.
2. Run `npm start` to start a development server. Allow firewall access when prompted if you are using Windows. The server will start on port 8080 for Jellyfin Web and Port 3000 for Jellyfin Vue. The server will auto update if the contents of the folder is changed.
3. Connect client devices to the server using its IP address in order to start testing. You will need to connect a server manually. To use the demo instance, enter `https://demo.jellyfin.org/unstable` in the server address field.
4. When you have finished testing, or would like to switch to a different branch, press `Ctrl+C` in the terminal window to stop the server.

More info on how to setup Jellyfin Vue in a development environment can be found [here](https://github.com/jellyfin/jellyfin-vue/wiki/Contributing#development-setup)
