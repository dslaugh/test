angular.module('simple', [])
.controller('SimpleCtrl', function SimpleCtrl($scope) {
    $scope.names = [];
    $scope.newName;

    $scope.addName = function($event) {
        if ($event.keyCode === 13) {
            $scope.names.push({value: $scope.newName});
            $scope.newName = '';
        }
    }
});
