(function () {

    angular.module('app-av').directive('appStopOnEvent', function () {
        function stop(audioElement) {
            if (!audioElement)
                return;

            if (audioElement.stop)
                audioElement.stop();
            else if (audioElement.pause)
                audioElement.pause();
        }

        return {
            restrict: 'A',
            link: function ($scope, elm, attr) {
                var eventName = attr.appStopOnEvent || '';
                if (!eventName)
                    return;

                var audio = elm[0];
                var callback = function () {
                    stop(audio);
                };

                var keysArray = eventName.split(',');
                keysArray.forEach(function (key) {
                    $scope.$on(key, callback);
                });
            }
        };
    });

})();