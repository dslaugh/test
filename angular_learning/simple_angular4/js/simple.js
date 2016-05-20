angular.module('simple', [])
.controller('SimpleCtrl', ['$scope', 'locStore', function SimpleCtrl($scope, locStore) {
    $scope.names = [];
    $scope.newName = '';

    $scope.addName = function($event) {
        if ($event.keyCode === 13) {
            $scope.names.push({value: $scope.newName});
            $scope.newName = '';
            $scope.writeNamesToLocalStorage();
        }
    }

    $scope.writeNamesToLocalStorage = function() {
        locStore.set('names', $scope.names);
    }
}])
.service('locStore', [function() {
    this.set = function(name, data) {
		window.localStorage.setItem(name, JSON.stringify(data));
	}
	this.get = function(name) {
		return JSON.parse(window.localStorage.getItem(name));

	}
	this.remove = function(name) {
		window.localStorage.removeItem(name);
	}
}]);
;
