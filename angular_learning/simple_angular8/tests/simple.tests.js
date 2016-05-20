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

        $scope.newName = 'David';
        $event.keyCode = 13;
        $scope.addName($event);

        var expected = [{value: 'David'}]
        expect($scope.names).toEqual(expected);
    });

    it('should blank out the text input after saving', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $scope.newName = 'David';
        $event.keyCode = 13;
        $scope.addName($event);

        var expected = '';
        expect($scope.newName).toEqual(expected);
    });

    it('should not save unless the enter button is pressed', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $scope.newName = 'David';
        $event.keyCode = 14;
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

        window.localStorage.setItem = stubFn();
    });

    it('should make a call to window.localStorage.setItem', function() {
        locStore.set('names', 'test string');
        var expected = true;
        expect(window.localStorage.setItem.called).toBe(true);
    });

    it('should receive the correct arguments', function() {
        locStore.set('names', 'test string');
        var expected = ['names', '"test string"'];
        expect(window.localStorage.setItem.args).toEqual(expected);
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
        var actual = upper('dave');
        var expected = 'DAVE';
        expect(actual).toEqual(expected);
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

    it('should create an unordered list with the provided names. also makes names uppercase', function() {
        $rootScope.names = [{value: 'David'}, {value: 'Slaugh'}];
        var element = $compile('<ds-name-list names="names"></ds-name-list>')($rootScope);
        $rootScope.$digest();

        var actual = element.html();
        expect(actual).toMatch(/<ul>.*?<li.*?>DAVID<\/li>.*?<li.*?>SLAUGH<\/li>.*?<\/ul>/);
    });
});
