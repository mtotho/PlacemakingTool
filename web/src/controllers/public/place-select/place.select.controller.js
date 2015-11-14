'use strict';

angular.module('PlacemakingTool')
    .controller('PlaceSelectCtrl', function ($scope,$stateParams, PlaceResource) {
        var vm=this;


        PlaceResource.GetAllPublic(function(places){
           console.log(places);
        });

    });


