angular.module('simple', [])
.controller('SimpleCtrl', ['$scope', function($scope) {
    $scope.names = [];
    $scope.newName;

    $scope.addName = function($event) {
        if ($event.keyCode === 13) {
            $scope.names.push({value: $scope.newName});
            $scope.newName = '';
        }
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
}])
.filter('upper', [function() {
    return function(input) {
        return input.toUpperCase();
    };
}])
.directive('dsNameList', [function() {
    return {
        restrict: 'E',
        $scope: {
            names: '='
        },
        template: '<ul><li ng-repeat="name in names">{{name.value | upper}}</li></ul>'
    };
}])
;
