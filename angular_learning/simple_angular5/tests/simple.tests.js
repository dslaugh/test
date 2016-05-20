describe('simple', function() {
    beforeEach(module('simple'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    it('addName should add a name to the names array', function() {
        $scope = {};
        $event = {};
        $event.keyCode = 13;
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $scope.addName($event);

        $scope.newName = 'Tayler';
        $scope.addName($event);

        var expected = [{value: 'David'}, {value: 'Tayler'}];
        expect($scope.names).toEqual(expected);
    });

    it('should blank out the input', function() {
        $scope = {};
        $event = {};
        $event.keyCode = 13;
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = '';
        expect($scope.newName).toEqual(expected);

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

    beforeEach(function() {
        module('simple');

        window.localStorage.setItem = stubFn();

        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
    });

    it('should call localStorage.setItem', function() {
        locStore.set('test', 'value');
        expect(window.localStorage.setItem.called).toBe(true);
        expect(window.localStorage.setItem.args).toEqual(['test', '"value"']);
    });

});

describe('upper filter', function() {
    var upper;
    beforeEach(function() {
        module('simple');

        inject(function($injector) {
            upper = $injector.get('upperFilter');
        });
    })

    it('should make it uppercase', function() {
        expect(upper('hello')).toEqual('HELLO');
    });
});

describe('name-list directive', function() {
    var $compile;
    var $rootScope;

    beforeEach(module('simple'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should create an unordered list with the names passed to it', function() {
        $rootScope.names = [{value: 'David'}];
        var element = $compile('<name-list names="names"></name-list>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toContain('DAVID</li>');
    });
})
