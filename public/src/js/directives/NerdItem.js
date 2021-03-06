angular.module('NerdItem', ['ui.bootstrap']).directive('nerdItem', ['Nerd', '$compile', '$uibModal', function (Nerd, $compile, $uibModal) {
    return {
        restrict: 'E', // E stands for element, A stands for attribute
        templateUrl: 'views/NerdItem.html',
        link: function (scope, element, attrs) {

            scope.editMode = function () {
                scope.nerd.editted = {
                    name: scope.nerd.name,
                    age: scope.nerd.age,
                    address: scope.nerd.address,
                    bio: scope.nerd.bio,
                    photos: scope.nerd.photos
                };
                var editNerdItem = $compile("<edit-nerd-item></edit-nerd-item>")(scope);
                element.parent().html(editNerdItem);
            };

            scope.delete = function (nerd) {
                // $("#deleteConfirmation").modal("show");
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/deleteConfirmationModal.html',
                    size: 'sm',
                    controller: ['$scope', '$uibModalInstance', 'nerd', function ($scope, $uibModalInstance, nerd) {
                        $scope.ok = function () {
                            $uibModalInstance.close(nerd);
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }],
                    resolve: {
                        nerd: function () {
                            return nerd;
                        }
                    }
                });

                modalInstance.result.then(function (nerd) {
                    var index = scope.nerds.indexOf(nerd);
                    Nerd.delete(nerd._id).success(function () {
                        scope.nerds.splice(index, 1);
                    });
                }, function () {
                    // console.log("after close");
                });
            };

        }
    };
}]);