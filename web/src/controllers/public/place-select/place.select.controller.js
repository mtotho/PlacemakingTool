'use strict';

angular.module('PlacemakingTool')
    .controller('PlaceSelectCtrl', function ($scope,$stateParams, PlaceResource) {
        var vm=this;

        vm.Places = [];
        PlaceResource.GetAllPublic(function(places){
           console.log(places);

            vm.Places = places;
        });

    });


