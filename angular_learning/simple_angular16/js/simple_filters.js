angular.module('simple_filters', [])
.filter('upper', function() {
    return function(input) {
        return input.toUpperCase();
    };
});
