/*jshint strict: false */
angular.module('iTCenterVisitorLog.controllers', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo:'/main'
		});
})

.controller('MainCtrl', ['$scope', '$http', '$location', 'googleAuthService', function($scope, $http, $location, googleAuthService) {
	$scope.authenticated = false;
	
	$scope.init = function() {
		googleAuthService.init();
		googleAuthService.isAuthenticated().then(function(authenticated) {
			$scope.authenticated = authenticated;
		});
	};
	
	$scope.showPage = function (page) {
		$location.path('/' + page);
	};
	
	$scope.authenticate = function () {
		googleAuthService.authenticate().then(function(authenticated) {
			$scope.authenticated = authenticated;
		});
	};
}]);