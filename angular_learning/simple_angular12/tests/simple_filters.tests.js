describe('simple_filters', function() {
    describe('upper', function() {
        var upper;
        beforeEach(function() {
            module('simple_filters');
            inject(function($filter) {
                upper = $filter('upper');
            });
        });

        it('should make text uppercase', function() {
            expect(upper('hello')).toEqual('HELLO');
        });
    });
});
