angular.module('components', [])
.directive('toggleModelVariable', function() {
  return {
      restrict: 'A',
      template: '',
      link: function(scope, element, attrs, toggleModelVariableCtrl) {
        console.log("got here");
        
        var scopeVarToWatch = attrs.toggleModelVariable;
        if(!scope[scopeVarToWatch]) {
        	scope[scopeVarToWatch] = false;
        }
        var dialog = element[0];
        scope.$watch(scopeVarToWatch, function(newValue, oldValue) {
        	//Convert toggle functionality to be based on the show/hide value
        	if(newValue === true && !dialog.opened || newValue === false && dialog.opened) {
        		dialog.toggle();
        	}
        });
      },
  };
});
