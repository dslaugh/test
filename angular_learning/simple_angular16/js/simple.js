angular.module('simple', ['simple_services', 'simple_directives'])
.controller('SimpleCtrl', ['$scope', 'locStore', function($scope, locStore) {
    $scope.names = [];
    $scope.newName = '';
    $scope.locStore = locStore;

    $scope.addName = function($event) {
        if ($event.keyCode === 13) {
            $scope.names.push({value: $scope.newName});
            $scope.newName = '';
            $scope.writeToLocalStorage();
        }
    };

    $scope.writeToLocalStorage = function() {
        $scope.locStore.set('names', $scope.names);
    };
}]);
