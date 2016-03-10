angular.module('NerdItem', []).directive('nerdItem', function($compile) {
	return {
      restrict: 'E', // E stands for element, A stands for attribute
      templateUrl: '../templates/NerdItem.html',
      link: function(scope, element, attrs){
      	scope.editMode = function(e){
                  scope.nerd.editted = {
                        name: scope.nerd.name,
                        age: scope.nerd.age,
                        address: scope.nerd.address,
                        bio: scope.nerd.bio
                  }
                  var editNerdItem = $compile("<edit-nerd-item></edit-nerd-item>")(scope);
      		element.html(editNerdItem);
      	}
      }
    };
});