describe('SimpleCtrl', function() {
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

    it('should blank out the input field after saving', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = '';
        expect($scope.newName).toEqual(expected);
    });

    it('should only add a name when the enter button is clicked', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 14;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [];
        expect($scope.names).toEqual(expected);
    });

    it('should only add a name when newName has some value', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $event.keyCode = 13;
        $scope.newName = '';
        $scope.addName($event);

        var expected = [];
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

    beforeEach(function() {
        module('simple');

        window.localStorage.setItem = stubFn();

        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
    });

    it('should make a call to window.localStorage.setItem', function() {
        locStore.set('names', 'test string');
        expect(window.localStorage.setItem.called).toBe(true);
    });

    it('should receive the arguments correctly', function() {
        locStore.set('names', 'test names');
        expect(window.localStorage.setItem.args).toEqual(['names', '"test names"']);
    });
});

describe('upper filter', function() {
    var upper;
    beforeEach(function() {
        module('simple');

        inject(function(_$filter_) {
            $filter = _$filter_;
            upper = $filter('upper');
        });

        // This way works also.
        // inject(function($injector) {
        //     upper = $injector.get('upperFilter');
        // });

    });

    it('should make text uppercase', function() {
        expect(upper('hello')).toEqual('HELLO');
    });
});

describe('name-list directive', function() {
    var $compile;
    var $rootScope;

    beforeEach(function() {
        module('simple');

        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('should create an unordered list with the provided names', function() {
        $rootScope.names = [{value: 'David'}];
        element = $compile('<name-list names="names"></name-list>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toContain('David</li>');
    });
});
