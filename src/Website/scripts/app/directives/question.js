(function () {

    angular.module('app').directive('appQuestion', function () {
        return {
            require: '^appItem',
            link: function ($scope, elm, attr, ctrl) {
                elm.addClass('question');
                $scope.$on('keypress:code:32', function (e) {
                    if (!ctrl || !ctrl.isActive())
                        return;

                    ctrl.reveal();
                    if (e.stopPropagation)e.stopPropagation();
                });
            }
        };
    });

})();