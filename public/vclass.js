'use strict';

angular
    .module('vclassApp', [
        'ui.bootstrap'
    ])

angular.module('vclassApp')
    .controller('VclassCtrl', ['$scope', '$http' , '$interval', function ($scope, $http, $interval) {
        $http.get('/user')
            .success(function (user) {
                $scope.user = user
            })

        $scope.changed = function () {
            $http.post('/user', {name: $scope.user}, {headers: {'Content-Type': 'application/json'} })
        }

        $http.get('/classroom')
            .success(function (nodes) {
                $scope.nodes = nodes
            })

        $interval(function () {
            $http.get('/classroom')
                .success(function (nodes) {
                    $scope.nodes = nodes
                })
        }, 10000)
    }])
