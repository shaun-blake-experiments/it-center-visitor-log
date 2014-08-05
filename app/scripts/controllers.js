angular.module('iTCenterVisitorLog.controllers', ['ngRoute'])

.config(function($routeProvider) {
	$routeProvider
		.otherwise({
			redirectTo:'/main'
		});
})

.controller('MainCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
	
	//Put the startup code at the top where it's easy to find
	var initialize = function() {
		
	};
	
	$scope.showPage = function (page) {
		$location.path("/" + page);
	};
	
	initialize();
}]);