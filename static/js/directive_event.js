/**
 * Created by Neil on 2015/12/20.
 */
angular.module('myApp', []).
controller('myController', function($scope){
    $scope.keyInfo = {};
    $scope.mouseInfo = {};
    $scope.keyStroke = function(event){
        $scope.keyInfo.keyCode = event.keyCode;
    };
    $scope.mouseClick = function(event){
        $scope.mouseInfo.clientX = event.clientX;
        $scope.mouseInfo.clientY = event.clientY;
        $scope.mouseInfo.screenX = event.screenX;
        $scope.mouseInfo.screenY = event.screenY;
    };
});