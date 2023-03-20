const api = new Jellyfin(/* .. */);

try {
  // highlight-start
  const authenticationResult = await api.authenticateUserByName('demo', '');
  // highlight-end

  // Log session information
  console.log(authenticationResult.data.sessionInfo);
} catch (err) {
  // TODO: Check how to catch 401 with TS SDK
  if (err.status == 401) {
    // Username or password is incorrect
    console.log('Invalid user');
  }
}
