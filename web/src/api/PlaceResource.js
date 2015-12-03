'use strict';

angular.module('PlacemakingTool').factory('PlaceResource', function($http) {
    var publicroute = "/api/places";
    var adminroute = "/api/v1/places";

    var PlaceResource = {
        GetAllPublic: function(cb){
            $http.get(publicroute).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {

                });
        },
        GetAll: function(cb){
            $http.get(adminroute).
            success(function(data, status, headers, config) {
                cb(data);
            }).
            error(function(data, status, headers, config) {

            });
        },
        CreateOne: function(place,cb){
            $http({
                method: 'POST',
                url: adminroute,
                data:place
            }).then(function(response) {
                cb(response.data);
            }, function (response) {

            });
        },
        UpdateOne: function(place,cb){
            $http({
                method: 'PUT',
                url: adminroute,
                data:place
            }).then(function(response) {
                cb(response.data);
            }, function (response) {

            });
        }
    };

    return PlaceResource;
});