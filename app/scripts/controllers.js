/*jshint strict: false */
angular.module('iTCenterVisitorLog.controllers', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo:'/main'
		});
})

.controller('MainCtrl', ['$scope', '$http', '$location', 'gcalService', function($scope, $http, $location, gcalService) {
	
	//Put the startup code at the top where it's easy to find
	$scope.init = function() {
		gcalService.init();
	};
	
	$scope.showPage = function (page) {
		$location.path('/' + page);
	};
	
	$scope.authenticate = function () {
		gcalService.authenticate();
	};
}]);