var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'ngCookies']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'components/home/index.html',
            controller: 'homeCtrl'
        })
        .when('/timeline', {
            templateUrl: 'components/timeline/index.html',
            controller: 'timelineCtrl'
        })
        .when('/timeline/all', {
            templateUrl: 'components/timeline/all.html',
            controller: 'allTimelineCtrl'
        })
})