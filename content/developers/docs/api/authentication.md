---
title: Authentication
sidebar_position: 3
---

# Authentication

To login as a user, you'll need to authenticate against the Jellyfin API. There are a few options to accomplish this, all of which will require knowledge of the base URL of the Jellyfin server.

All of these authentication methods will end in the same result: a freshly generated access token that can be used for subsequent API requests, as well as the ID of the user that is authenticated.

The server will respond with an HTTP 401 status code when the credentials are invalid.

## Username & password

The most obvious and easiest form of authentication would be authenticating by username. This will require developers to prompt the user for their username and password. Once entered, a call can be made to the [AuthenticateWithUserByName](https://api.jellyfin.org/#tag/User/operation/AuthenticateUserByName) operation.

Some users may not have a password. In this scenario, the developer would still authenticate by username but would leave the password field as an empty string.

## Quick Connect

Using passwords is not the best choice on all platforms. Using the remote of a television or entering a complex password on mobile is not the best experience. For those cases Quick Connect helps out. With Quick Connect the app requests a code from the server and displays it to the user. This code can then be used in an already signed in app to authorize the new one.

The Quick Connect functionality may be disabled by a server. In those cases the server responds with an HTTP 401 response. You can check if QuickConnect is enabled first or deal with it when trying to use it.

To check if Quick Connect is enabled for a given server, use the [GetQuickConnectEnabled](https://api.jellyfin.org/#tag/QuickConnect/operation/GetQuickConnectEnabled) operation. This will return a boolean value.

To start a Quick Connect session you need to request a Quick Connect code by calling the [InitiateQuickConnect](https://api.jellyfin.org/#tag/QuickConnect/operation/InitiateQuickConnect) operation. This returns a state object which can be updated by calling the Get Quick Connect State operation.

This Quick Connect state contains a few values that are of interest:

- `authenticated` is a boolean that indicates if the user authorized the app. When this is true you can retrieve an access token.
- `secret` is a string with a unique code for this session. It is used to update the session state.
- The `code` is for the user to input in a different app

The next step is to show the code to the user. The user will then use this code in another session to authenticate.

Depending on your app you might want to either show a "next" button to press when the user is authorized the app or otherwise automatically update the Quick Connect state. We recommended refreshing the Quick Connect state every 5 seconds.

Eventually the authenticated value will change to true. This means the user authorized your app. You can now use the secret to get an access token in the user api via the [AuthenticateWithQuickConnect](https://api.jellyfin.org/#tag/User/operation/AuthenticateWithQuickConnect) operation.

So in summary:

1. Create a Quick Connect session
2. Show the code to the user
3. Update the state every 5 seconds or manually
4. Request an access token when authenticated is true
