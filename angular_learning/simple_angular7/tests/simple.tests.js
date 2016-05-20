describe('SimpleCtrl', function() {
    var $controller;
    beforeEach(function() {
        module('simple');

        inject(function(_$controller_) {
            $controller = _$controller_;
        });
    });

    it('addName should add a name to the names list', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $scope.newName = 'David';
        $event.keyCode = 13;

        $scope.addName($event);

        var expected = [{value: 'David'}];
        expect($scope.names).toEqual(expected);
    });

    it('should only add a name when the enter button is pressed', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $scope.newName = 'David';
        $event.keyCode = 12;

        $scope.addName($event);

        var expected = [];
        expect($scope.names).toEqual(expected);
    });

    it('should blank out the text input after adding', function() {
        $scope = {};
        $event = {};
        var controller = $controller('SimpleCtrl', {$scope: $scope});

        $scope.newName = 'David';
        $event.keyCode = 13;

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

        inject(function($injector) {
            locStore = $injector.get('locStore');
        });

        window.localStorage.setItem = stubFn();
    });

    it('should make a call to window.localStorage.setItem', function() {

        locStore.set('names', 'test');
        expect(window.localStorage.setItem.called).toBe(true);
    });

    it('the parameters are being set correctly', function() {
        locStore.set('names', 'dave');
        expect(window.localStorage.setItem.args).toEqual(['names', '"dave"']);
    });
});

describe('upper filter', function() {
    var upper;
    beforeEach(function() {
        module('simple');
        inject(function(_$filter_) {
            upper = _$filter_('upper');
        });
    });

    it('should make text uppercase', function() {
        expect(upper('dave')).toEqual('DAVE');
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

    it('should create an unordered list with the names provided', function() {
        $rootScope.names = [{value: 'Dave'}];
        var element = $compile('<ds-name-list names="names"></ds-name-list>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toContain('DAVE</li>');
        expect(element.html()).toMatch(/<ul>.*?<li.*?>DAVE<\/li>.*?<\/ul>/);
    });
});
