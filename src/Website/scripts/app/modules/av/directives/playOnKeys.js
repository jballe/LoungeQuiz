(function () {

    angular.module('app-av').directive('appPlayOnKeys', function () {
        function play(audioElement) {
            audioElement.play();
        }

        return {
            restrict: 'A',
            link: function ($scope, elm, attr) {
                var keys = attr.appPlayOnKeys || '';
                if (!keys)
                    return;

                var audio = elm[0];
                var callback = function() {
                    play(audio);
                };

                var keysArray = keys.split(',');
                keysArray.forEach(function (key) {
                    $scope.$on('keypress:' + key.toLowerCase(), callback);
                    $scope.$on('keypress:' + key.toUpperCase(), callback);
                });
            }
        };
    });

})();