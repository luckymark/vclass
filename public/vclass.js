'use strict';

angular
    .module('vclassApp', [
        'ui.bootstrap'
    ])

angular.module('vclassApp')
    .controller('VclassCtrl', ['$scope', '$http' , function ($scope, $http) {
        $http.get('/user')
            .success(function (user) {
                $scope.user = user
            })

        $http.get('/node')
            .success(function (nodes) {
                $scope.nodes = nodes
            })

        $scope.changed = function () {
            $http.post('/user', $scope.user, {headers: {'Content-Type': 'application/json'} })
                .success(function (nodes) {
                    $scope.nodes = nodes
                })
        }

    }])
