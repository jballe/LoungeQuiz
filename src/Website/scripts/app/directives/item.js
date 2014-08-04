(function () {
    angular.module('app').directive('appItem', function ($timeout) {
        function triggerAllowing($scope) {
            $scope.allow = false;
            $timeout(function() {
                $scope.allow = true;
            }, 500);
        }

        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope) {
                this.reveal = function () {
                    if (!$scope.active ||$scope.revealed)
                        return;

                    if (!$scope.allow) return;
                    triggerAllowing($scope);

                    $scope.revealed = true;
                    $scope.$broadcast('reveal');
                    $scope.$digest();
                }
                this.close = function () {
                    if (!$scope.revealed)
                        return;

                    if (!$scope.allow) return;
                    triggerAllowing($scope);

                    $scope.active = false;
                    $scope.$digest();
                }
                this.open = function () {
                    if ($scope.revealed || $scope.active)
                        return;

                    if (!$scope.allow) return;
                    triggerAllowing($scope);

                    $scope.active = true;
                    $scope.$digest();
                    $scope.$broadcast('opened');
                }

                this.isActive = function() {
                    return $scope.active;
                }

                var ctrl = this;
                $scope.$on('reveal', function() { ctrl.reveal(); });
            },
            link: function ($scope, elm, attr, ctrl) {
                $scope.allow = true;

                elm.on('click', function (e) {
                    ctrl.open();
                    e.stopPropagation();
                });

                $scope.$watch('active', function () {
                    elm.toggleClass('active', $scope.active || false);
                });

                $scope.$watch('revealed', function () {
                    elm.toggleClass('revealed', $scope.revealed || false);
                });

            }
        };
    });

})();