val api = jellyfin.createApi(/* .. */)

try {
// highlight-start
	val authenticationResult by api.userApi.authenticateUserByName(
		username = "demo",
		password = "",
	)
// highlight-end

	// Use access token in api instance
	api.accessToken = authenticationResult.accessToken

	// Print session information
	println(authenticationResult.sessionInfo)
} catch (err: InvalidStatusException) {
	if (err.status == 401) {
		// Username or password is incorrect
		println("Invalid user")
	}
}
