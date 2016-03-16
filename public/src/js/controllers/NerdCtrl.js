angular.module('NerdCtrl', []).controller('NerdController', ['Nerd', '$scope', function (Nerd, $scope) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    Nerd.get().success(function (nerds) {
        if (nerds.length > 0)
            nerds[nerds.length - 1].editable = false;
        $scope.nerds = nerds;
    });

    $scope.nerd = {};
    $scope.addNerd = function (nerd) {
        // code for add
        if (nerd) {
            var form_data = new FormData();
            for ( var key in nerd ) {
                form_data.append(key, nerd[key]);
            }
            Nerd.create(form_data).success(function (nerd) {
                $scope.nerds.unshift(nerd);
                $(".slideToggle").slideUp("fast");
                $scope.nerd = {};
                delete $scope.preview;
                $scope.nerdForm.$setPristine();
            });
        }
    };


    $scope.slideDown = function () {
        $(".slideToggle").slideDown("fast");
    };

    $scope.cancelForm = function (e) {
        $(".slideToggle").slideUp("fast");
        e.nerd = {};
        $scope.nerdForm.$setPristine();
    };

    $scope.addPhoto = function (file) {

        if (file) {

            $scope.nerd.photo = file;
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.preview = e.target.result;
            };
            reader.readAsDataURL($scope.nerd.photo);

        } else {
            console.log("no photos");
        }
    };

    $scope.removePhoto = function(){
        delete $scope.nerd.photo;
        delete $scope.preview;
    };

}]);