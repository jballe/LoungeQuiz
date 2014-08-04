(function () {

    angular.module('app-counter').directive('appCounter', function ($interval) {
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope) {
                $scope.active = false;
                $scope.soon = false;
                $scope.completed = false;

                var handle;

                $scope.run = function () {
                    $scope.active = true;
                    handle = $interval(function () {
                        if ($scope.count > 0) {
                            $scope.count--;
                        }

                        $scope.soon = $scope.count > 0 && $scope.count < 5;
                        $scope.completed = $scope.count <= 0;

                        if ($scope.count <= 0) {
                            $interval.cancel(handle);
                            $scope.completed = true;
                        }

                    }, 1000, $scope.count);
                };

                $scope.reset = function() {

                };
            },
            link: function ($scope, elm, attr) {
                var time = attr.appCounter || '';
                var chuncks = time.split(':');
                if (chuncks.length == 1)
                    $scope.count = parseInt(time);
                else if(chuncks.length == 2) {
                    $scope.count = parseInt(chuncks[0]) * 60 + parseInt(chuncks[1]);
                }

                elm.on('click', function () {
                    if (!$scope.active) {
                        elm[0].classList.add('active');
                        $scope.run();
                    } else {
                        $scope.reset();
                    }
                });
            }
        }
    });

})();