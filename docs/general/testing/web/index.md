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

