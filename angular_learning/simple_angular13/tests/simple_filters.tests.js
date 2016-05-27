describe('simple_filters', function() {
    var upper;
    beforeEach(function() {
        module('simple_filters');
        inject(function($filter) {
            upper = $filter('upper');
        });
    });

    it('should convert text to uppercase', function() {
        expect(upper('hello')).toEqual('HELLO');
    });
});
