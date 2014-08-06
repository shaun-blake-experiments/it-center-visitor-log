/*jshint strict: false */
var services = angular.module('iTCenterVisitorLog.services', []);

services.factory('googleAuthService', ['$q', function($q) {
	var googleAuthService = {};
	
	//API Key = non authenticated calls, Client ID = authenticated
	//These are dev api keys associated with my sfblake@hawaii.edu google account.
	//They could be switched off to a non-person type MIS account.
	var GCAL_API_KEY = 'AIzaSyAUHHYoyPmYh5WwI7ft33RwLlwKUSnAagc';
	var GCAL_CLIENT_ID = '362056014565-n35ka76g1hakh8ujp28likuoa9rcol45.apps.googleusercontent.com';
	var GCAL_SCOPES = 'https://www.googleapis.com/auth/calendar';
	
	
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

