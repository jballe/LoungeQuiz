(function () {

    var idCounter = 1;

    angular.module('app').directive('appZoomOutContent', function () {

        var svg = require('../../../bower_components/svg.js/dist/svg.js');
        var imageSizeCalculator = require('../../modules/imageSizeCalculator.js');

        var currentAnimation;

        return {
            require: '^appItem',
            transclude: true,
            scope: true,
            template: '<div class="content" ng-class="{ zooming: zooming }"><span class="teaser">{{teaser}}</span><div class="image-content" ng-style="{ width: targetSize.width + \'px\', height: targetSize.height + \'px\' }"></div></div>',
            controller: function ($scope) {
                var ctrl = this;
                $scope.zooming = false;
                $scope.complete = false;
                $scope.ready = false;
                $scope.render = false;

                $scope.init = function () {
                    $scope.img = new Image($scope.imgUrl);
                    $scope.img.crossOrigin = "Anonymous"; //cors support
                    $scope.img.src = $scope.imgUrl;

                    var body = document.querySelector('body');
                    $scope.targetSize = { width: body.clientWidth, height: body.clientHeight };

                    $scope.img.onload = function () { ctrl.imageLoaded(); };
                };

                this.imageLoaded = function () {

                    var size = imageSizeCalculator.calcNewSize($scope.img.width, $scope.img.height, $scope.targetSize.width, $scope.targetSize.height);
                    $scope.targetSize = size;

                    var ratio = $scope.imgCenter;
                    $scope.point = { x: size.width * ratio.x, y: size.height * ratio.y };

                    $scope.ready = true;
                    if ($scope.render)
                        $scope.execute();
                };

                $scope.execute = function () {
                    $scope.render = true;
                    if (!$scope.ready) {
                        return;
                    }

                    if ($scope.zooming)
                        return;

                    var size = $scope.targetSize;

                    var draw = svg.SVG($scope.divId);
                    $scope.draw = draw;

                    var img = draw.image($scope.imgUrl);
                    img.size(size.width, size.height);

                    var circle = draw.circle(10);
                    circle.x($scope.point.x).y($scope.point.y);

                    img.clipWith(circle);

                    var maxWidth = Math.max(size.width, size.height);
                    $scope.img = img;
                    $scope.circle = circle;

                    currentAnimation = img.animate($scope.length * 1000, $scope.easing, $scope.delay * 1000).during(function (pos) {
                        var r = maxWidth * pos;
                        $scope.circle.radius(r);

                        if (!$scope.zooming) {
                            $scope.zooming = true;
                            $scope.$digest();
                        }

                        if (pos >= 1) {
                            $scope.reveal();
                        }
                    });
                }

                $scope.pause = function () {
                    if (!currentAnimation)
                        return;

                    var ispaused = $scope.paused || false;
                    if (ispaused)
                        currentAnimation.play();
                    else
                        currentAnimation.pause();

                    $scope.paused = !ispaused;
                }

                $scope.reveal = function () {
                    if (!currentAnimation)
                        return;

                    currentAnimation.stop(true);
                    $scope.complete = true;

                }

                if ($scope.targetSize)
                    $scope.init();
            },
            link: function ($scope, elm, attr, parentCtrl) {
                elm.addClass('question');

                $scope.imgUrl = attr.appZoomOutContent;
                $scope.imgCenter = angular.fromJson((attr.center || "{ 'x': 0.5, 'y': 0.5 }").replace(/\'/g, '"'));
                $scope.length = attr.time || 20;
                $scope.parentCtrl = parentCtrl;
                $scope.teaser = attr.teaser || 'Billede!';
                $scope.easing = attr.easing || '>';
                $scope.delay = attr.delay || 3;
                $scope.zooming = false;

                $scope.divId = 'image-content' + idCounter++;
                $scope.div = angular.element(elm.children().children()[1]);
                $scope.div.attr('id', $scope.divId);

                if ($scope.init)
                    $scope.init();

                $scope.$on('opened', function () {
                    elm.addClass('active');
                    $scope.execute();
                });

                elm.on('click', function () {
                    if (!$scope.zooming) {
                        $scope.execute();
                    } else if ($scope.complete) {
                        parentCtrl.reveal();
                    } else {
                        $scope.pause();
                    }
                });

                elm.on('dblclick', function () {
                    $scope.reveal();
                });
            }
        };
    });

})();