(function () {

    angular.module('app').directive('appAnswer', function () {
        return {
            restrict: 'A',
            require: '^appItem',
            link: function ($scope, elm, attr, ctrl) {
                $scope.$on('keypress:code:32', function (e) {
                    if (!ctrl || !ctrl.isActive())
                        return;

                    ctrl.close();
                    if (e.stopPropagation) e.stopPropagation();
                });
            }
        };
    });

})();