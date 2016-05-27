angular.module('simple_directives', ['simple_filters'])
.directive('dsNameList', [function() {
    return {
        restrict: 'E',
        scope: {
            'names': '='
        },
        template: '<ul><li ng-repeat="name in names">{{name.value | upper}}</li></ul>'
    };
}]);
