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
Although CloudFlare Pages deployments from Pull Requests are built in our CI/CD workflow
in a completely transparent and auditable manner, **some of them may come from external contributors that might not be good actors!**.

By default, never trust any artifacts given by anyone outside the official channels if you can't inspect the source code first.
They might compromise or trace your activity!
:::
