'use strict';

angular.module('PlacemakingTool')
    .directive('resizeElement', function ($window) {
        return {
            restrict: 'A',
            scope:{
                resizeOffset:"=",
                resizeSelector:"="
            },
            link: function (scope, element, attrs) {
                var w = angular.element($window);
                var thisElement = element;

                scope.getWindowDimensions = function () {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                };
                scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;

                    if(scope.resizeSelector){
                        thisElement.find(scope.resizeSelector).css("height", (newValue.h - scope.resizeOffset) + 'px');
                    }else{
                        thisElement.css("height", (newValue.h - scope.resizeOffset) + 'px');
                    }


                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        };
    });