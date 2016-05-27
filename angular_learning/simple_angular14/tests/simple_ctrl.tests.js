describe('SimpleCtrl', function() {
    var $controller;
    beforeEach(function() {
        module('simple');
        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should have an addName function', function() {
        $scope = {};
        $controller('SimpleCtrl', {$scope: $scope});
        expect(typeof $scope.addName).toEqual('function');
    });

    it('should add a name to the names list', function() {
        $scope = {};
        $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        expect($scope.names).toEqual([{value: 'David'}]);
    });

    it('should only add a name when the enter button is pressed', function() {
        $scope = {};
        $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 14;
        $scope.newName = 'David';
        $scope.addName($event);

        expect($scope.names).toEqual([]);
    });

    it('should blank out newName and thereby the input field', function() {
        $scope = {};
        $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        expect($scope.newName).toEqual('');
    });
});
