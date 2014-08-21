/*jshint strict: false */
angular.module('iTCenterVisitorLog.components', [])
.directive('ngPolymerDialogShowModel', function() {
	return {
		restrict: 'A',
		template: '',
		link: function(scope, element, attrs) {
			var scopeVarToWatch = attrs.ngPolymerDialogShowModel;
			if(!scope[scopeVarToWatch]) {
				scope[scopeVarToWatch] = false;
			}
			var dialog = element[0];
			scope.$watch(scopeVarToWatch, function(newValue) {
				//Convert toggle functionality to be based on the show/hide value
				if(newValue === true && !dialog.opened || newValue === false && dialog.opened) {
					dialog.toggle();
				}
			});
		},
	};
})
.directive('ngPolymerModel', function() {
	return {
		restrict: 'A',
		template: '',
		link: function(scope, elements, attrs) {
			var scopeVarToWatch = attrs.ngPolymerModel;
			var element = elements[0];
			scope.$watch(scopeVarToWatch, function(newValue, oldValue) {
				if(newValue !== oldValue) {
					element.setModelFromAngular(newValue);
				}
			});
		},
	};
});
