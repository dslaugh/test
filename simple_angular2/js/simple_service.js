angular.module('simple_service', [])
.controller('SimpleServiceCtrl', ['$scope', 'locStore', function SimpleServiceCtrl($scope, locStore) {
    $scope.newName;
    $scope.names = [];

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
.factory('locStore',  function() {
	function set(name, data) {
		window.localStorage.setItem(name, JSON.stringify(data));
	}
	function get(name) {
		return JSON.parse(window.localStorage.getItem(name));

	}
	function remove(name) {
		window.localStorage.removeItem(name);
	}
	return {
		set: set,
		get: get,
		remove: remove
	};
})
;
