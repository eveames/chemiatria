'use strict';

/**
 * @ngdoc overview
 * @name chemiatriaApp
 * @description
 * # chemiatriaApp
 *
 * Main module of the application.
 */
angular
  .module('chemiatriaApp', [
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'AuthCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/teacher', {
        templateUrl: 'views/teacher.html',
        controller: 'TeacherCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
