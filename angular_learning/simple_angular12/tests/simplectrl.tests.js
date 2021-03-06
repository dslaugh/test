describe('SimpleCtrl', function() {
    var $controller;
    beforeEach(function() {
        module('simple');
        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should add a name to the names array', function() {
        var $scope = {};
        var $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.names).toEqual([{value: 'David'}]);
    });

    it('should only add a name if the enter button is pressed', function() {
        var $scope = {};
        var $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 14;
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.names).toEqual([]);
    });

    it('should blank out the text field after adding', function() {
        var $scope = {};
        var $event = {};
        $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);
        expect($scope.newName).toEqual('');
    });
});
