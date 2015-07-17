/**
 * Created by shchoi on 2015-06-27.
 */
'use strict'
angular.module('myApp.controllers', []).controller('helloWorldCtrl', function($scope){
    $scope.name = {
        first : "Jane", last : "Doe"
    };
});