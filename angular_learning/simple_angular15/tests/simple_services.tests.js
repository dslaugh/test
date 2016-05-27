describe('simple_services', function() {
    var locStore;
    beforeEach(function() {
        module('simple_services');
        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
        // Firefox doesn't allow us to use spyOn on localStorage so this fixes that
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            var mock = (function() {
                var store = {};
                return {
                    getItem: function(key) {
                        return store[key];
                    },
                    setItem: function(key, value) {
                        store[key] = value.toString();
                    },
                    clear: function() {
                        store = {};
                    }
                };
            })();
            Object.defineProperty(window, 'localStorage', { value: mock, configurable: true, enumerable: true, writable: true });
        }
        spyOn(window.localStorage, 'setItem');
    });

    it('should make a call to window.localStorage.setItem', function() {
        locStore.set('names', 'test');
        expect(window.localStorage.setItem).toHaveBeenCalled();
    });
});
