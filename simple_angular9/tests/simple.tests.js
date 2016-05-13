describe('simple', function() {
    var $controller;
    beforeEach(function() {
        module('simple');

        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('should add a name to the names list', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $event.keyCode = 13;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [{value: 'David'}];
        expect($scope.names).toEqual(expected);
    });

    it('should only save name when the enter button is pressed', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $event.keyCode = 14;
        $scope.newName = 'David';
        $scope.addName($event);

        var expected = [];
        expect($scope.names).toEqual(expected);
    });

    it('should blank out the input after saving', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $event.keyCode = 13;
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
            fn.args = Array.prototype.slice.call(arguments, 0);
            return returnValue;
        };
        fn.called = false;
        return fn;
    }

    var origSetItem;
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

    it('should receive the correct args', function() {
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
        expect(upper('hello')).toEqual('HELLO');
    });
});

describe('sh-name-list directive', function() {
    var $compile;
    var $rootScope;

    beforeEach(function() {
        module('simple');
        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('should create a unordered list with the names provided', function() {
        $rootScope.names = [{value: 'David'}];
        var element = $compile('<ds-name-list names="names"></ds-name-list>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toMatch('<ul>.*?<li.*?>DAVID</li>.*?</ul>');
    });
});
