'use strict';

/**
 * @ngdoc function
 * @name chemiatriaApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the chemiatriaApp
 */

 //need to include/rewrite? Data factory
app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (user) {
        Data.post('login', {
            user: user
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/');
            }
        });
    };
    $scope.signup = {email:'',password:'',username:'',type:'',section:''};
    $scope.signUp = function (user) {
        Data.post('signUp', {
            user: user
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
});

