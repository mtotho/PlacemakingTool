'use strict';

angular.module('PlacemakingTool')
    .controller('PlaceCtrl', function ($scope,$stateParams, uiGmapGoogleMapApi, PlaceResource) {
        var vm=this;

        //var Place = $resource('/api/places');
        vm.placeName = $stateParams.placeName;
        vm.placeid = $stateParams.placeId;
        vm.Place = null;
        vm.MarkerPlacementMode = false;
        vm.FeedbackMode = false;


        var GMaps = null;
        uiGmapGoogleMapApi.then(function(maps){
            GMaps = maps;
        });
        //Define the map objects
        vm.Map= {
            center:
            {
                latitude: 40.748817,
                longitude: -73.985428
            },
            zoom: 13,
            control:{},
            markersControl:{},
            options:{
                mapTypeControl:false
            }

        };

        vm.FeedbackMarker = {
            idKey:"draggable",
            coords:
            {
                latitude: 40.748817,
                longitude: -73.985428
            },
            options:{
                visible:false,
                draggable:true
            }
        };

        vm.SetMarkerPlacementMode = function(bool){
            vm.MarkerPlacementMode = bool;

            if(bool){
                vm.FeedbackMarker.options.visible = true;
                vm.FeedbackMarker.coords= {
                    latitude: vm.Map.center.latitude,
                    longitude:vm.Map.center.longitude
                };
                vm.FeedbackMarker.options.animation  = GMaps.Animation.BOUNCE;
            }else{
                vm.FeedbackMarker.options.visible = false;
            }
        };

        vm.SetFeedbackMode = function(bool){
            vm.FeedbackMode = true;
        };

        PlaceResource.GetOnePublic(vm.placeid, function(place){

            vm.Map.center = {
                latitude: place.Latitude,
                longitude:place.Longitude
            };
            vm.FeedbackMarker.coords= {
                latitude: place.Latitude,
                longitude:place.Longitude
            };

            vm.Map.zoom = place.Zoom;
           console.log(place);
            vm.Place = place;
        });

        //Size map height after it loadss
        $scope.$on('$viewContentLoaded', function () {
            map_resize(64);
        });


    });


function map_resize(offset){
  //  var headerheight=$("header").outerHeight();
    var windowheight=$(window).outerHeight();

    var targetheight = windowheight;// - (headerheight);

    if(offset){
        targetheight = targetheight-offset;
    }

    $("#map_canvas .angular-google-map-container").css('height',targetheight+'px');
    $(".full-height").css('height',targetheight+'px');

}
$(window).resize(function(){
    map_resize(64);
});