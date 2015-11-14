'use strict';

angular.module('PlacemakingTool').factory('PlaceResource', function($http) {
    var publicroute = "/api/places";

    var PlaceResource = {
        GetAllPublic: function(cb){
            $http.get(publicroute).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {

                });
        }

    };

    return PlaceResource;
});