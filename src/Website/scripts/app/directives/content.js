(function () {

    angular.module('app').directive('appContent', function () {
        return {
            transclude: true,
            template: '<div class="content" ng-transclude></div>',
        };
    });

})();