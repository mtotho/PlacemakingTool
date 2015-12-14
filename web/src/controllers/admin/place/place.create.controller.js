'use strict';

angular.module('PlacemakingTool')
    .controller('AdminPlaceCreateCtrl', function ($scope,PlaceResource, uiGmapGoogleMapApi,Geocoder,QuestionSetResource,$state) {
        var vm=this;

        QuestionSetResource.GetAll(function(data){
            vm.QuestionSets = data;
            console.log(data);

        });


        var GMaps = null;
        vm.GMapsLoaded = false;
        uiGmapGoogleMapApi.then(function(maps){
            GMaps = maps;
            console.log("ready");


            vm.GMapsLoaded = true;
        });
        var Place = function(){
            this.Name = "";
            this.IsPublic = false;
            this.Latitude = null;
            this.Longitude = null;
            this.Zoom = null;
            this.QuestionSetId = null;
        };

        vm.Place = new Place();

        //Define the map objects
        vm.Map= {
            center:
            {
                latitude: 40.748817,
                longitude: -73.985428
            },
            zoom: 13,
            control:{},
            markersControl:{}

        };
        $scope.responseMarkers=[
            {
                id:1,
                coords:{
                    latitude:40.733973,
                    longitude:-73.986695
                },
                name:"Kathleen Toth"
            }
        ];




        vm.CreatePlace= function(form){

            if(form.$valid) {

                vm.Place.Zoom= vm.Map.zoom;
                vm.Place.Latitude = vm.Map.center.latitude;
                vm.Place.Longitude = vm.Map.center.longitude;

                console.log(vm.Place);

                Geocoder.GeocodeLatLng(vm.Place.Latitude, vm.Place.Longitude, function(result){
                    console.log(result);

                    vm.Place.City = result.City;
                    vm.Place.State = result.State;
                    vm.Place.PostalCode = result.PostalCode;
                    vm.Place.CountryCode = result.CountryCode;

                    PlaceResource.CreateOne(vm.Place, function(result){
                        $state.go('Admin.PlaceList');
                    });
                });


            }


        };




    });


//function map_resize(offset){
//    var headerheight=$("header").outerHeight() + 36; //36 for temporary nav 16*2 for padding
//    var windowheight=$(window).outerHeight();
//
//    var targetheight = windowheight - (headerheight);
//
//    if(offset){
//        targetheight = targetheight-offset;
//    }
//
//    $("#map_canvas .angular-google-map-container").css('height',targetheight+'px');
//    $(".full-height").css('height',targetheight+'px');
//
//}
//$(window).resize(function(){
//    map_resize(40);
//});