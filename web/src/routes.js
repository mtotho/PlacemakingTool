(function(){
    'use strict';
    angular.module('PlacemakingTool')
        .config(function ($stateProvider,$locationProvider, $urlRouterProvider) {

            $stateProvider
                .state('Place', {
                    url: '/places/:placeId',
                    templateUrl: 'src/controllers/place/place.html',
                    controller: 'PlaceCtrl as vm'
                });


            $urlRouterProvider.otherwise('/');

            //     $locationProvider.html5Mode(tru                e);
//

        });
})();