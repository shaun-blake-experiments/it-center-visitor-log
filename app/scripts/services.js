/*jshint strict: false */
var services = angular.module('iTCenterVisitorLog.services', []);

//API Key = non authenticated calls, Client ID = authenticated
//These are dev api keys associated with my sfblake@hawaii.edu google account.
//They could be switched off to a non-person type MIS account.
	
services.constant('GCAL_API_KEY', 'AIzaSyAUHHYoyPmYh5WwI7ft33RwLlwKUSnAagc');
services.constant('GCAL_CLIENT_ID', '362056014565-n35ka76g1hakh8ujp28likuoa9rcol45.apps.googleusercontent.com');
services.constant('GCAL_SCOPES',
	[
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/userinfo.email',
	]);

services.factory('googleAuthService', ['GCAL_API_KEY', 'GCAL_CLIENT_ID', 'GCAL_SCOPES', '$q', function(GCAL_API_KEY, GCAL_CLIENT_ID, GCAL_SCOPES, $q) {
	var googleAuthService = {};
	
	googleAuthService.init = function(){
		console.log('%cInitiating...', 'color: blue;');
		gapi.client.setApiKey(GCAL_API_KEY);
		//Wait 1 second before calling the authorize method (since the example does)
		window.setTimeout(this.isAuthenticated, 1);
	};
	
		
	googleAuthService.isAuthenticated = function(){
		console.log('%cChecking Authenticated...', 'color: blue;');
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

services.factory('googlePlusService', ['GCAL_API_KEY', 'GCAL_CLIENT_ID', 'GCAL_SCOPES', '$q', function(GCAL_API_KEY, GCAL_CLIENT_ID, GCAL_SCOPES, $q) {
	var googlePlusService = {};
	
	googlePlusService.getUserInfo = function(){
		console.log('%cGetting Google Plus User Info', 'color: blue;');
		var deferred = $q.defer();
		gapi.client.load('plus', 'v1', function() {
			gapi.client.plus.people.get({userId: 'me'}).execute(function(resp) {
				console.log(resp);
				deferred.resolve(resp);
			});
		});
		return deferred.promise;
	};
	
	return googlePlusService;
}]);


services.factory('googleCalendarService', ['GCAL_API_KEY', 'GCAL_CLIENT_ID', 'GCAL_SCOPES', '$q', function(GCAL_API_KEY, GCAL_CLIENT_ID, GCAL_SCOPES, $q) {
	var googleCalendarService = {};
	
	googleCalendarService.getTodaysEvents = function(){
		console.log('%cGetting Calendar Events', 'color: blue;');
		var deferred = $q.defer();
		gapi.client.load('calendar', 'v3', function() {
			//Make it easy by using Moment.js
			var today = moment("20140813", "YYYYMMDD").startOf('day');
			var tomorrow = moment("20140813", "YYYYMMDD").startOf('day').add(1, 'days');
			gapi.client.calendar.events.list({calendarId: 'primary', timeMin: today.toDate(), timeMax: tomorrow.toDate()}).execute(function(resp) {
				console.log(resp);
				deferred.resolve(resp);
			});
		});
		return deferred.promise;
	};
	
	return googleCalendarService;
}]);

