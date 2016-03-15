// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(nerdData) {
            return $http.post('/api/nerds', nerdData);
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