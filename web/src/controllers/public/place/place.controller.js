'use strict';

angular.module('PlacemakingTool')
    .controller('PlaceCtrl', function ($scope,$stateParams,FeedbackService,uiGmapGoogleMapApi,FeedbackResource,$mdDialog, PlaceResource) {
        var vm=this;

        //var Place = $resource('/api/places');
        vm.placeName = $stateParams.placeName;
        vm.placeid = $stateParams.placeId;
        vm.Place = null;
        vm.MarkerPlacementMode = false;
        vm.FeedbackMode = false;

        vm.CurrentQuestionIndex = 0;
        vm.Loaded=false;

        var GMaps = null;


        uiGmapGoogleMapApi.then(function(maps){
            GMaps = maps;
            console.log("ready");

            if(vm.Map.control.hasOwnProperty('refresh')){
                vm.Map.control.refresh();
            }
            vm.Loaded = true;
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
                draggable:true,
                icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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
            vm.FeedbackMode = bool;

            if(bool){
                vm.CurrentQuestionIndex = 0;
                vm.FeedbackMarker.options.animation  = null;
                vm.FeedbackMarker.options.draggable = false;

                vm.Map.center = {
                    latitude:  vm.FeedbackMarker.coords.latitude,
                    longitude: vm.FeedbackMarker.coords.longitude
                };

                FeedbackService.SetFeedbackLocation({Latitude: vm.FeedbackMarker.coords.latitude, Longitude:  vm.FeedbackMarker.coords.longitude});

            }else{
                vm.FeedbackMarker.options.animation  = GMaps.Animation.BOUNCE;
                vm.FeedbackMarker.options.draggable = true;
            }
        };

        vm.MapOptions ={
            mapTypeControl:false

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



        vm.SubmitFeedback = function(feedback,ev){
            console.log(feedback);


            feedback.Latitude =  vm.FeedbackMarker.coords.latitude;
            feedback.Longitude = vm.FeedbackMarker.coords.longitude;
            FeedbackResource.CreateOne(feedback, function(status){

                console.log(status);


                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.body))
                        .title('Thank you!')
                        .content('Thank you for submitting your feedback.')
                        .ariaLabel('Alert Dialog')
                        .ok('Continue')
                        .targetEvent(ev)
                );

                vm.SetFeedbackMode(false);
                vm.SetMarkerPlacementMode(false);
            });

        };

    });


