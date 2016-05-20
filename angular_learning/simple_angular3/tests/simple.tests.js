describe('Simple', function() {
    beforeEach(module('simple'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('should add a name to the list', function() {
        var $scope = {};
        var $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [{value: 'David'}];
        expect($scope.names).toEqual(expected);
    });

    it('should not add a name if keyCode is not 13', function() {
        var $scope = {};
        var $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 14;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [];
        expect($scope.names).toEqual(expected);
    });

    it('should blank out the text input', function() {
        var $scope = {};
        var $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = '';
        expect($scope.newName).toEqual(expected);
    });

    it('should have written to localStorage', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'Miley';
        $event.keyCode = 13;
        $scope.addName($event);

        var names = window.localStorage.getItem('names');
        var expected = [{value: 'Miley'}];
        expect($scope.names).toEqual(expected);

    });
});

describe('locStore service', function() {
    var locStore;

    function stubFn(returnValue) {
    	var fn = function() {
    		fn.called = true;
    		fn.args = Array.prototype.slice.call(arguments);
    		return returnValue;
    	};

    	fn.called = false;

    	return fn;
    }

    beforeEach(module('simple'));

    beforeEach(function() {
        window.localStorage.setItem = stubFn();

        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
    });

    it('should call localStorage', function() {
        locStore.set('testing', 'stuff');
        expect(window.localStorage.setItem.called).toBe(true);
        expect(window.localStorage.setItem.args).toEqual(['testing', '"stuff"']);
    });
});
