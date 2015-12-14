'use strict';

angular.module('PlacemakingTool', [
    'ngMaterial',
    'ngAnimate',
    'ngSanitize',
    //'ngDragDrop',
    'ui.router',
    'uiGmapgoogle-maps'
])

    .config(function ($httpProvider,uiGmapGoogleMapApiProvider) {
        /*  $mdThemingProvider.theme('default')
         .primaryPalette('light-green', {
         'default': '400', // by default use shade 400 from the pink palette for primary intentions
         'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
         'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
         'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
         })*/

        //$httpProvider.interceptors.push('TokenInterceptor');
        uiGmapGoogleMapApiProvider.configure({
            // key: 'AIzaSyD93JNhuGDGJKKgp8JGBpj60bDbbpMgJis',
            v: '3.22',
            libraries: 'places,geocoder'
        });
    }).run(function($rootScope, $window, $location) {
       // AuthenticationFactory.check();
    }).filter('getByProp', function() {
        return function(input, prop, val) {

            var i=0, len=input.length;
            for (i=0; i<len; i++) {

                if (input[i][prop] === val) {
                    return input[i];
                }
            }
            return null;
        }
    }).filter('getIndexByProp', function() {
        return function(input, prop, val) {

            var i=0, len=input.length;
            for (i=0; i<len; i++) {

                if (input[i][prop] === val) {
                    return i;
                }
            }
            return null;
        }
    });

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
};
