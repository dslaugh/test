describe('simple', function() {
    beforeEach(module('simple'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('addName', function() {
        it('should add a name to the names array', function() {
            var $scope = {};
            var $event = {};
            var controller = $controller('SimpleCtrl', {$scope, $scope});
            $event.keyCode = 13;
            $scope.newName = 'David';
            $scope.addName($event);
            var expected = [{value: 'David'}];
            expect($scope.names).toEqual(expected);
        });

        it('should empty the newName var', function() {
            var $scope = {};
            var $event = {};
            var controller = $controller('SimpleCtrl', {$scope, $scope});
            $event.keyCode = 13;
            $scope.newName = 'David';
            $scope.addName($event);
            expect($scope.newName).toBe('');
        });
    });
});
