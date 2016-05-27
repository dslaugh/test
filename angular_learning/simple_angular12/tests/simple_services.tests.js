describe('simple_services', function() {
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
        module('simple_services');
        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
        origSetItem = window.localStorage.setItem;
        window.localStorage.setItem = stubFn();
    });

    afterEach(function() {
        window.localStorage.setItem = origSetItem;
    });

    it('should make a call to localStorage.setItem', function() {
        locStore.set('names', 'testing');
        expect(window.localStorage.setItem.called).toBe(true);
    });

    it('should receive the correct arguments', function() {
        locStore.set('names', 'test');
        expect(window.localStorage.setItem.args).toEqual(['names', '"test"']);
    });
});
