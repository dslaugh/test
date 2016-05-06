describe('simple angular with service', function() {
    beforeEach(module('simple_service'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));


    describe('addName', function() {
        it('should add a name to the list', function() {
            $scope = {};
            $event = {};
            var controller = $controller('SimpleServiceCtrl', {$scope: $scope});
            $scope.newName = 'Hello';
            $event.keyCode = 13;
            $scope.addName($event);
            expect($scope.names).toEqual([{value: 'Hello'}]);
        });

        it('should blank out the text input', function() {
            $scope = {};
            $event = {};
            var controller = $controller('SimpleServiceCtrl', {$scope: $scope});
            $scope.newName = 'Hello';
            $event.keyCode = 13;
            $scope.addName($event);

            expect($scope.newName).toEqual('');
        });

        it('should have written to localStorage', function() {
            $scope = {};
            $event = {};
            var controller = $controller('SimpleServiceCtrl', {$scope: $scope});
            $scope.newName = 'Miley';
            $event.keyCode = 13;
            $scope.addName($event);

            var names = window.localStorage.getItem('names');
            var expected = [{value: 'Miley'}];
            expect($scope.names).toEqual(expected);

        });
    })
});
