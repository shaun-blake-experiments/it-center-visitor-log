var services = angular.module('iTCenterVisitorLog.services', ['ngResource']);
services.factory('nonexistentService', ['$resource',
	function($resource){
		return $resource("", {}, {
			getLocalOriginal: {
				url: 'some/url.json',
				method: 'GET',
				isArray: true,
				cache: true
			},
		});
	}]
);