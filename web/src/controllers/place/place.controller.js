'use strict';

angular.module('PlacemakingTool')
    .controller('PlaceCtrl', function ($scope,$stateParams) {
        var vm=this;

        //var Place = $resource('/api/places');
        vm.placeName = $stateParams.name;
        vm.placeid = $stateParams.placeId;




    });


