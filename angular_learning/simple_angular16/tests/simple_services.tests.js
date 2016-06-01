describe('simple_services', function() {
    var locStore;
    beforeEach(function() {
        module('simple_services');
        inject(function($injector) {
            locStore = $injector.get('locStore');
        });
        spyOn(window.localStorage, 'setItem');
    });

    it('should call window.localStorage.setItem', function() {
        locStore.set('names', 'test');
        expect(window.localStorage.setItem).toHaveBeenCalled();
    });

    it('should receive correct arguments', function() {
        locStore.set('names', 'test');
        expect(window.localStorage.setItem).toHaveBeenCalledWith('names', '"test"');
    });
});
