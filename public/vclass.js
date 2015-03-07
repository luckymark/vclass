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

        $http.get('/node')
            .success(function (nodes) {
                $scope.nodes = nodes
            })

        $interval(function() {
            $http.get('/node')
                .success(function (nodes) {
                    $scope.nodes = nodes
                })
        }, 10000)

        $scope.changed = function () {
            console.log($scope.user)
            $http.post('/user', $scope.user, {headers: {'Content-Type': 'application/json'} })
                .success(function (nodes) {
                    $scope.nodes = nodes
                })
        }

    }])
