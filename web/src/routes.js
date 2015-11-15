(function(){
    'use strict';
    angular.module('PlacemakingTool')
        .config(function ($stateProvider,$locationProvider, $urlRouterProvider) {

            $stateProvider
                .state('Admin', {
                    url: '/admin',
                    templateUrl: 'src/controllers/admin/admin.html',
                    controller: 'AdminCtrl as vm'
                })
                .state('Admin.PlaceList', {
                    url: '/places',
                    templateUrl: 'src/controllers/admin/place/place.list.html',
                    controller: 'AdminPlaceListCtrl as vm'
                })
                .state('Admin.PlaceCreate', {
                    url: '/places/create',
                    templateUrl: 'src/controllers/admin/place/place.create.html',
                    controller: 'PlaceCtrl as vm'
                })
                .state('Admin.Questions', {
                    url: '/questions',
                    templateUrl: 'src/controllers/admin/question/questions.html',
                    controller: 'AdminQuestionsCtrl as vm'
                })
                .state('PlaceSelect', {
                    url: '/places',
                    templateUrl: 'src/controllers/public/place-select/place.select.html',
                    controller: 'PlaceSelectCtrl as vm'
                })
                .state('Place', {
                    url: '/places/:placeId',
                    templateUrl: 'src/controllers/public/place/place.html',
                    controller: 'PlaceCtrl as vm'
                });


            $urlRouterProvider.otherwise('/');

            //     $locationProvider.html5Mode(tru                e);
//

        });
})();