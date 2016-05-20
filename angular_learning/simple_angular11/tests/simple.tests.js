describe('SimpleCtrl', function() {
    var $controller;
    beforeEach(function() {
        module('simple');
        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should add a name to the names array', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $event.keyCode = 13;

        $scope.addName($event);
        expect($scope.names).toEqual([{value: 'David'}]);
    });

    it('should only add a name when the enter button is pressed', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $event.keyCode = 14;

        $scope.addName($event);
        expect($scope.names).toEqual([]);
    });

    it('should blank out the text field after adding', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});
        $scope.newName = 'David';
        $event.keyCode = 13;

        $scope.addName($event);
        expect($scope.newName).toEqual('');
    });
});

describe('locStore service', function() {
    var locStore;
    var origSetItem;
    function stubFn(returnValue) {
        var fn = function() {
            fn.called = true;
            fn.args = Array.prototype.slice.call(arguments, 0);
            return returnValue;
        };
        fn.called = false;
        return fn;
    }

    beforeEach(function() {
        module('simple');
        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
        origSetItem = window.localStorage.setItem;
        window.localStorage.setItem = stubFn();
    });

    afterEach(function() {
        window.localStorage.setItem = origSetItem;
    });

    it('should call localStorage.setItem', function() {
        locStore.set('names', 'test');
        expect(window.localStorage.setItem.called).toBe(true);
    });

    it('should get correct args', function() {
        locStore.set('names', 'test');
        expect(window.localStorage.setItem.args).toEqual(['names', '"test"']);
    });
});

describe('upper filter', function() {
    var upper;
    beforeEach(function() {
        module('simple');
        inject(function($filter) {
            upper = $filter('upper');
        });
    });

    it('should make text uppercase', function() {
        expect(upper('hello')).toBe('HELLO');
    });
});

describe('ds-name-list directive', function() {
    var $compile;
    var $rootScope;
    beforeEach(function() {
        module('simple');
        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('should create an unordered list with names provided', function() {
        $rootScope.names = [{value: 'David'}];
        var element = $compile('<ds-name-list names="names"></ds-name-list>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toMatch('<ul>.*?<li.*?>DAVID</li>.*?</ul>');
    });
});
