(function () {

    angular.module('app-counter').filter('nicetime', function () {
        return function(totalSeconds) {
            if (totalSeconds <= 60)
                return totalSeconds;

            var minutes = Math.floor(totalSeconds / 60);
            var seconds = totalSeconds % 60;

            return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    });

})();