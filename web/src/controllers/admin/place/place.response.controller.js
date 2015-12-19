'use strict';

angular.module('PlacemakingTool')
    .controller('AdminPlaceResponseCtrl', function ($scope,$stateParams,uiGmapGoogleMapApi,uiGmapIsReady,MapInstance,FeedbackResource,$mdDialog, PlaceResource) {
        var vm=this;

        //var Place = $resource('/api/places');
        vm.placeName = $stateParams.placeName;
        vm.placeid = $stateParams.placeId;
        vm.Place = null;


        vm.CurrentQuestionIndex = 0;
        vm.GMapsLoaded=false;
        vm.PlaceLoaded=false;
        vm.ResponseMarkers = [];

        var GMaps = null;


        uiGmapGoogleMapApi.then(function(maps){
            GMaps = maps;
            console.log("ready");

            vm.GMapsLoaded = true;
        });

        uiGmapIsReady.promise(1).then(function(instances) {
            instances.forEach(function(inst) {

                var map = inst.map;
                google.maps.event.trigger(map, 'resize');
                var uuid = map.uiGmap_id;
                var mapInstanceNumber = inst.instance; // Starts at 1.

                MapInstance.SetMap(map);
            });
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
            },
            events:{

            }

        };


        vm.MapOptions ={
            mapTypeControl:false

        };

        PlaceResource.GetOne(vm.placeid, function(place){
            vm.PlaceLoaded = true;
            vm.Map.center = {
                latitude: place.Latitude,
                longitude:place.Longitude
            };


            vm.Map.zoom = place.Zoom;
            console.log(place);
            vm.Place = place;


            for(var i=0; i<vm.Place.PlaceFeedbacks.length; i++){
                var feedback = vm.Place.PlaceFeedbacks[i];

                var marker = {
                    id:feedback.Id,
                    coords:{
                        latitude: feedback.Latitude,
                        longitude:feedback.Longitude
                    },
                    options:{
                        icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    }
                };

                var markertypeFilter = feedback.QuestionResponses.filter(function(response){
                   return response.Question.QuestionType == "markertype";
                });

                if(markertypeFilter.length == 1 && markertypeFilter[0].ResponseOptions.length == 1){
                    var markerTypeOption = markertypeFilter[0];
                    marker.options.icon = markerTypeOption.ResponseOptions[0].OptionImage;
                }


                vm.ResponseMarkers.push(marker);


            }


        });



    });


