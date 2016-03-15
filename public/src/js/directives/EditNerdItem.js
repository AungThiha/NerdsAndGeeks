angular.module('EditNerdItem', []).directive('editNerdItem', ['Nerd', '$compile', 'Upload', function (Nerd, $compile, Upload) {
    return {
        restrict: 'E', // E stands for element, A stands for attribute
        templateUrl: 'views/EditNerdItem.html',
        link: function (scope, element, attrs) {

            scope.cancelForm = function () {
                delete scope.nerd.editted;
                back();
            };

            scope.editNerd = function () {
                Nerd.update(scope.nerd._id, scope.nerd.editted).success(function (newNerd) {
                    scope.nerd = newNerd;
                    back();
                });
            };

            function back() {
                var nerdItem = $compile("<nerd-item></nerd-item>")(scope);
                element.html(nerdItem);
            }

            var progressList = element.find('.progress-list');

            function upload(file) {
                progressList.append('<li class="progress" name="'+ file.name +'">' +
                    '<div class="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">' +
                    '<span class="progress-type">'+ file.name +'</span>' +
                    '</div>' +
                    '</li>');
                var progressBar = progressList.find(".progress[name='"+ file.name +"'] .progress-bar");
                Upload.upload({
                    url: 'api/nerds/' + scope.nerd._id + '/photos',
                    data: {photos: file}
                }).then(function (photos) {
                    scope.nerd.photos.unshift(photos.data[0]);
                }, function (resp) {
                    progressBar.css("background-color", "#d9534f");
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    if(progressPercentage >= 100.0){
                        progressBar.parent().remove();
                    }else {
                        progressBar.css("width", progressPercentage + "%");
                    }
                });
            }

            scope.uploadPhotos = function (files) {
                if (files && files.length) {

                    for (var i = 0; i < files.length; i++) {
                        upload(files[i]);
                    }

                } else {
                    console.log("no photos");
                }
            };

        }
    };
}]);