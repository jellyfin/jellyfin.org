---
title: Authentication
sidebar_position: 1
---

# Authentication

To login as a user, you'll need to authenticate against the Jellyfin API. There are a few options to accomplish this, all of which will require knowledge of the base URL of the Jellyfin server.

All of these authentication methods will end in the same result: a freshly generated access token that can be used for subsequent API requests, as well as the ID of the user that is authenticated.

The server will respond with an HTTP 401 status code when the credentials are invalid.

## Username & password

The most obvious and easiest form of authentication would be authenticating by username. This will require developers to prompt the user for their username and password. Once entered, a call can be made against the API to authenticate by username. 

Some users may not have a password. In this scenario, the developer would still authenticate by username but would leave the password field as an empty string.

## Quick Connect