/*jshint strict: false */
var services = angular.module('iTCenterVisitorLog.services', []);

//API Key = non authenticated calls, Client ID = authenticated
//These are dev api keys associated with my sfblake@hawaii.edu google account.
//They could be switched off to a non-person type MIS account.
	
services.constant("GCAL_API_KEY", 'AIzaSyAUHHYoyPmYh5WwI7ft33RwLlwKUSnAagc');
services.constant("GCAL_CLIENT_ID", '362056014565-n35ka76g1hakh8ujp28likuoa9rcol45.apps.googleusercontent.com');
services.constant("GCAL_SCOPES",
	[
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/calendar',
	]);

services.factory('googleAuthService', ['GCAL_API_KEY', 'GCAL_CLIENT_ID', 'GCAL_SCOPES', '$q', function(GCAL_API_KEY, GCAL_CLIENT_ID, GCAL_SCOPES, $q) {
	var googleAuthService = {};
	
	googleAuthService.init = function(){
		console.log('%cInitiating...', 'color: blue;');
		gapi.client.setApiKey(GCAL_API_KEY);
		//Wait 1 second before calling the authorize method (since the example does)
		window.setTimeout(this.isAuthorized, 1);
	};
	
		
	googleAuthService.isAuthenticated = function(){
		console.log('%cChecking Authenticated...', 'color: blue;');
		gapi.client.setApiKey(GCAL_API_KEY);
		var deferred = $q.defer();

		/*jshint camelcase: false */
		gapi.auth.authorize({client_id: GCAL_CLIENT_ID, scope: GCAL_SCOPES, immediate: true}, function(authResult) {
			var authenticated = authResult && !authResult.error;
			console.log('Authenticated: ' + authenticated);
			deferred.resolve(authenticated);
		});
		
		return deferred.promise;
	};
	
	googleAuthService.authenticate = function(){
		console.log('%cAuthenticating...', 'color: blue;');
		var deferred = $q.defer();
		
		/*jshint camelcase: false */
		gapi.auth.authorize({client_id: GCAL_CLIENT_ID, scope: GCAL_SCOPES, immediate: false}, function(authResult) {
			var authenticated = authResult && !authResult.error;
			console.log('Authenticated: ' + authenticated);
			deferred.resolve(authenticated);
		});
		
		return deferred.promise;
	};
	
	return googleAuthService;
}]);


