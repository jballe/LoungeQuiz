(function () {

    angular.module('app-av').directive('appKeypressListener', function ($rootScope, $document) {
        return {
            link: function () {
                $document.bind('keypress', function(evt) {
                    var keycode = evt.which;
                    var letter = String.fromCharCode(keycode);

                    $rootScope.$broadcast('keypress', evt);
                    $rootScope.$broadcast('keypress:' + letter, evt);
                    $rootScope.$broadcast('keypress:code:' + keycode, evt);
                });
            }
        };
    });

})();