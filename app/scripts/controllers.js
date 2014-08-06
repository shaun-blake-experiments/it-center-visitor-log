/*jshint strict: false */
angular.module('iTCenterVisitorLog.controllers', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo:'/main'
		});
})

.controller('MainCtrl', ['$scope', '$http', '$location', 'googleAuthService', 'googlePlusService', function($scope, $http, $location, googleAuthService, googlePlusService) {
	$scope.authenticated = false;
	$scope.userInfoResolved = false;
	$scope.userInfo = {};
	
	$scope.init = function() {
		googleAuthService.init();
		googleAuthService.isAuthenticated().then(function(authenticated) {
			$scope.authenticated = authenticated;
			if(!authenticated) {
				return;
			}
			googlePlusService.getUserInfo().then(function(userInfo) {
				$scope.userInfo = userInfo;
				$scope.userInfoResolved = true;
			});
		});
	};
	
	$scope.showPage = function (page) {
		$location.path('/' + page);
	};
	
	$scope.authenticate = function () {
		if($scope.authenticated) {
			return;
		}
		googleAuthService.authenticate().then(function(authenticated) {
			$scope.authenticated = authenticated;
		});
	};
}]);