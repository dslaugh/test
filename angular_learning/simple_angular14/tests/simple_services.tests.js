describe('simple_services', function() {
    var locStore;
    beforeEach(function() {
        module('simple_services');
        inject(function($injector) {
            locStore = $injector.get('locStore');
        });

        spyOn(window.localStorage, 'setItem');
        locStore.set('names', 'test');
    });

    it('should make a call to localStorage.setItem', function() {
        expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('should receive the correct arguments', function() {
        expect(window.localStorage.setItem).toHaveBeenCalledWith('names', '"test"');
    });
});
