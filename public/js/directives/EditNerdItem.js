angular.module('EditNerdItem', []).directive('editNerdItem', ['Nerd', '$compile', function(Nerd, $compile) {
	return {
      restrict: 'E', // E stands for element, A stands for attribute
      templateUrl: '../../templates/EditNerdItem.html',
      link: function(scope, element, attrs){
      	
            scope.cancelForm = function(){
                  delete scope.nerd.editted;
      		back();
      	}

            scope.editNerd = function(){
                  Nerd.update(scope.nerd._id, scope.nerd.editted).success(function(newNerd){
                        scope.nerd = newNerd; 
                        back();
                  });
            }

            function back(){
                  var nerdItem = $compile("<nerd-item></nerd-item>")(scope);
                  element.html(nerdItem);
            }

      }
    };
}]);