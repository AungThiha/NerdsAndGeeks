
angular.module('NerdCtrl', []).controller('NerdController', [ 'Nerd', '$scope', function(Nerd, $scope) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    Nerd.get().success(function(nerds){
        $scope.nerds = nerds;
    });

    $scope.nerd = {};
    $scope.addNerd = function(nerd){
        // code for add
        if(nerd){
            Nerd.create(nerd).success(function(nerd){
                $scope.nerds.unshift(nerd);
                $(".slideToggle").slideUp("fast");
                $scope.nerd = {};
                $scope.nerdForm.$setPristine();
            });
        }
    };


    $scope.slideDown = function(){
        $(".slideToggle").slideDown("fast");
	};

	$scope.cancelForm = function(e){
		$(".slideToggle").slideUp("fast");
		e.nerd = {};
		$scope.nerdForm.$setPristine();
	};

}]);