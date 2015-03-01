'use strict';

angular
    .module('filesApp', [
        'ui.bootstrap',
        'ui.ace',
        'bgDirectives',
        'ui.tree'
    ])

angular.module('filesApp')
    .controller('FilesCtrl', ['$scope', '$http' , function ($scope, $http) {
        $http.get('/user')
            .success(function (me) {
                $scope.me = me
            })

        $http.get('/node')
            .success(function (nodes) {
                $scope.nodes = nodes
            })

        $http.get('/file')
            .success(function (files) {
                $scope.files = files
            })

        $scope.changed = function () {
            $http.post('/user', $scope.user, {headers: {'Content-Type': 'application/json'} })
                .success(function (nodes) {
                    $scope.nodes = nodes
                })
        }

        $scope.getFileState = function (node, scope) {
            if (node.type == 'file') {
                return 'file'
            }
            else if (scope.$nodeScope.collapsed) {
                return 'folder-closed'
            } else {
                return 'folder-opened'
            }
        }

        $scope.viewer = {
            filename: "",
            content: ""
        }

        $scope.view = function (node, scope) {
            if (node.type == 'file') {
                $http.post("/getFileContent", node).
                    success(function (content) {
                        $scope.viewer.filename = node.path
                        $scope.viewer.content = content
                        var lines = content.split('\n')
                        var element = document.getElementById('_ace')
                        element.style.height = lines.length * _editor.renderer.lineHeight + "px"
                    })
            } else {
                scope.toggle()
            }

        }

        var _editor
        $scope.aceLoaded = function (editor) {
            _editor = editor
        }

    }])
