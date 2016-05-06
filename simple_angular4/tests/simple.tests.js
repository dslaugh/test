describe('simple', function() {
    beforeEach(module('simple'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('should add a name to the names array', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [{value: 'David'}];
        expect($scope.names).toEqual(expected);
    });

    it('should not add name if the enter button is not pressed', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 14;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [];
        expect($scope.names).toEqual(expected);
    });

    it('should blank out the text input', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        expect($scope.newName).toEqual('');
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

    it('should call localStorage.setItem', function() {
        locStore.set('names', 'testing');
        expect(window.localStorage.setItem.called).toBe(true);
        expect(window.localStorage.setItem.args).toEqual(['names', '"testing"']);
    });
});
