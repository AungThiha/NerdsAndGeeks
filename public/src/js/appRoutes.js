// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/geeks', {
            templateUrl: '/views/geek.html'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController',
            controllerAs: 'nerdCtrl'
        })

        .otherwise({ redirectTo: '/about'});

    $locationProvider.html5Mode(true);

}]);