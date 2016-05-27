describe('SimpleCtrl', function() {
    var $controller;
    beforeEach(function() {
        module('simple');
        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should have the correct scope items', function() {
        $scope = {};
        $controller('SimpleCtrl', {$scope: $scope});

        expect($scope.names).toEqual([]);
        expect($scope.newName).toEqual('');
        expect(typeof $scope.addName).toEqual('function');
        expect(typeof $scope.writeToLocalStorage).toEqual('function');
    });

    it('addName should add a name to the names array', function() {
        $scope = {};
        $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        expect($scope.names).toEqual([{value: 'David'}]);
    });

    it('should blank out the newName var and therefore the input', function() {
        $scope = {};
        $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        expect($scope.newName).toEqual('');
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

    it('addName should also make a call to writeToLocalStorage', function() {
        $scope = {};
        $event = {};
        $event.keyCode = 13;
        $controller('SimpleCtrl', {$scope: $scope});
        spyOn($scope, 'writeToLocalStorage');
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.writeToLocalStorage).toHaveBeenCalled();
    });
});
