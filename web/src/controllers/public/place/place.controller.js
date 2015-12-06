'use strict';

angular.module('PlacemakingTool')
    .controller('PlaceCtrl', function ($scope,$stateParams, PlaceResource) {
        var vm=this;

        //var Place = $resource('/api/places');
        vm.placeName = $stateParams.placeName;
        vm.placeid = $stateParams.placeId;

        PlaceResource.GetOnePublic(vm.placeid, function(place){
           console.log(place);
        });


    });


