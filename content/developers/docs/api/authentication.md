---
title: Authentication
sidebar_position: 1
---

# Authentication

To login as a user, you'll need to authenticate against the Jellyfin API. There are a few options to accomplish this, all of which will require knowledge of the base URL of the Jellyfin server.

All of these authentication methods will end in the same result: a freshly generated access token that can be used for subsequent API requests, as well as the ID of the user that is authenticated.

## Username & password

The most obvious form of authentication would be using a username and password. This will require developers to prompt the user for their credentials, but once entered a call can be made against the API to authenticate by username. 

## Quick Connect