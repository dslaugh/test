angular.module('simple', ['simple_directives', 'simple_services'])
.controller('SimpleCtrl', ['$scope', 'locStore', function($scope, locStore) {
    $scope.names = [];
    $scope.newName = '';

    $scope.addName = function($event) {
        if ($event.keyCode === 13) {
            $scope.names.push({value: $scope.newName});
            $scope.newName = '';
            $scope.writeToLocalStorage();
        }
    };

    $scope.writeToLocalStorage = function() {
        locStore.set('names', $scope.names);
    };
}]);
