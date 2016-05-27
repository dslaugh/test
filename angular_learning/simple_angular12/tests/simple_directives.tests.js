describe('simple_directives', function() {
    var $compile;
    var $rootScope;
    beforeEach(function() {
        module('simple_directives');
        inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('should create an unordered list with the provided names converted to uppercase', function() {
        $rootScope.names = [{value: 'David'}, {value: 'Miley'}];
        var element = $compile('<ds-name-list names="names"></ds-name-list>')($rootScope);

        $rootScope.$digest();

        expect(element.html()).toMatch('<ul>.*?<li.*?>DAVID</li>.*?<li.*?>MILEY</li>.*?</ul>');
    });
});
