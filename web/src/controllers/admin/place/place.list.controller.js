'use strict';

angular.module('PlacemakingTool')
    .controller('AdminPlaceListCtrl', function ($scope,PlaceResource,QuestionSetResource,  $mdToast, $state) {
        var vm=this;

        vm.places = null;

        PlaceResource.GetAll(function(places){
            console.log(places);
            vm.Places = places;
        });


        QuestionSetResource.GetAll(function(data){
            vm.QuestionSets = data;

            console.log(data);

        });

        vm.UpdatePlace = function(place){
            console.log(place);

            PlaceResource.UpdateOne(place, function(data){
                console.log(data);
                    $mdToast.show(
                        $mdToast.simple()
                            .content(data.Name + ' update successfully!')
                            .position('top right')
                            .hideDelay(2000)
                    );

            });

            //Places.update({id:place._id}, place, function(data){
            //    console.log(data);
            //
            //    $mdToast.show(
            //        $mdToast.simple()
            //            .content(data.name + ' update successfully!')
            //            .position('top right')
            //            .hideDelay(2000)
            //    );
            //});
        }


    });

