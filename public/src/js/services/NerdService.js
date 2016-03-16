// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },

        create : function(nerdData) {
            var config = {
                method: 'POST',
                url: '/api/nerds',
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
                data: nerdData
            };
            return $http(config);
        },

        update: function(nerdId, nerdData){
            return $http.put('/api/nerds/' + nerdId, nerdData);
        },

        // call to DELETE a nerd
        deletePhotos : function(nerdId, photos) {
            var config = {
                method: "DELETE",
                url: '/api/nerds/' + nerdId + "/photos",
                data: photos,
                headers: {"Content-Type": "application/json;charset=utf-8"}
            };
            return $http(config);
        }
    };       

}]);