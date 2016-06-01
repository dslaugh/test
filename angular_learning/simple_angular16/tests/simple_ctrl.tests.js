describe('SimpleCtrl', function() {
    var $controller;
    beforeEach(function() {
        module('simple');
        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should have the correct $scope items and set properly', function() {
        $scope = {};
        $controller('SimpleCtrl', {$scope: $scope});
        expect($scope.names).toEqual([]);
        expect($scope.newName).toEqual('');
        expect(typeof $scope.addName).toEqual('function');
        expect(typeof $scope.writeToLocalStorage).toEqual('function');
    });

    it('addName should add a name to the names array', function() {
        $scope = {};
        $event = {keyCode: 13};
        $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.names).toEqual([{value: 'David'}]);
    });

    it('addName should only add a name if the enter button is pressed', function() {
        $scope = {};
        $event = {keyCode: 14};
        $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.names).toEqual([]);
    });

    it('addName should blank out newName and therefore the input field', function() {
        $scope = {};
        $event = {keyCode: 13};
        $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.newName).toEqual('');
    });

    it('addName should call writeToLocalStorage', function() {
        $scope = {};
        $event = {keyCode: 13};
        $controller('SimpleCtrl', {$scope: $scope});
        spyOn($scope, 'writeToLocalStorage');
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.writeToLocalStorage).toHaveBeenCalled();

    });

    it('writeToLocalStorage should call locStore.set with the correct arguments', function() {
        $scope = {};
        $controller('SimpleCtrl', {$scope: $scope});
        spyOn($scope.locStore, 'set');
        $scope.names = [{value: 'David'}];
        $scope.writeToLocalStorage('names', $scope.names);
        expect($scope.locStore.set).toHaveBeenCalled();
        expect($scope.locStore.set).toHaveBeenCalledWith('names', [{value: 'David'}]);
    });
});
