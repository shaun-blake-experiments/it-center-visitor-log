var services = angular.module('iTCenterVisitorLog.services', []);

services.factory('gcalService', function() {
	var gCalServices = {};
	
	//API Key = non authenticated calls, Client ID = authenticated
	//These are dev api keys associated with my sfblake@hawaii.edu google account.
	//They could be switched off to a non-person type MIS account.
	var GCAL_API_KEY = 'AIzaSyAUHHYoyPmYh5WwI7ft33RwLlwKUSnAagc';
	var GCAL_CLIENT_ID = '362056014565-n35ka76g1hakh8ujp28likuoa9rcol45.apps.googleusercontent.com';
	var GCAL_SCOPES = 'https://www.googleapis.com/auth/calendar';
	
	
	gCalServices.init = function(){
		console.log('%cInitiating...', 'color: blue;');
		handleClientLoad();
		
	};
	gCalServices.authenticate = function(){
		console.log('%cAuthenticating...', 'color: blue;');
		handleAuthClick();
		
	};
	
	function handleClientLoad() {
		console.log("handleClientLoad");
		gapi.client.setApiKey(GCAL_API_KEY);
		window.setTimeout(checkAuth,1);
	}
	
	function checkAuth() {
		console.log("checkAuth");
		gapi.auth.authorize({client_id: GCAL_CLIENT_ID, scope: GCAL_SCOPES, immediate: true}, handleClientLoadAuthResult);
	}
	
	function handleClientLoadAuthResult(authResult) {
		console.log("handleClientLoadAuthResult");
		if (authResult && !authResult.error) {
			console.log('%cAuthentication Success! The user is already authorized', 'color: green;');
		} else {
			console.log('%cAuthentication Failed! The user will need to authorize.', 'background-color: yellow;');
		}
	}
	
	function handleAuthClick(event) {
		console.log("handleAuthClick");
		gapi.auth.authorize({client_id: GCAL_CLIENT_ID, scope: GCAL_SCOPES, immediate: false}, handleAuthClickAuthResult);
		return false;
	}
	
	function handleAuthClickAuthResult(authResult) {
		console.log("handleAuthClickAuthResult");
		if (authResult && !authResult.error) {
			console.log('%cAuthentication Success! The user is now authorized.', 'color: green;');
		} else {
			console.log('%cAuthentication Failed!  Maybe they hit cancel?', 'color: red;');
			console.log(authResult);
		}
	}
	
	return gCalServices;
});