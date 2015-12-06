'use strict';

angular.module('PlacemakingTool').factory('Geocoder', function($http, uiGmapGoogleMapApi) {

    var _geocodeLatLng = function(lat,lng, cb){
        uiGmapGoogleMapApi.then(function(maps) {


            var latlng = new maps.LatLng({lat:lat, lng:lng});

            var query = {
                location:latlng
            };
            var geocoder = new maps.Geocoder();
            geocoder.geocode(query, function(result){

                var addresscomponents = result[0].address_components;

                var city = addresscomponents.filter(function(component){
                    var localityType = component.types.filter(function(type){
                       return type == "locality";
                    });
                    return localityType.length > 0;
                });

                var state = addresscomponents.filter(function(component){
                    var localityType = component.types.filter(function(type){
                        return type == "administrative_area_level_1";
                    });
                    return localityType.length > 0;
                });

                var postal = addresscomponents.filter(function(component){
                    var localityType = component.types.filter(function(type){
                        return type == "postal_code";
                    });
                    return localityType.length > 0;
                });

                var country = addresscomponents.filter(function(component){
                    var localityType = component.types.filter(function(type){
                        return type == "country";
                    });
                    return localityType.length > 0;
                });

                console.log(result);
               cb({
                   City:city.length > 0 ? city[0].long_name : null,
                   State: state.length > 0 ? state[0].short_name : null,
                   PostalCode:postal.length > 0 ? postal[0].long_name : null,
                   CountryCode:country.length > 0 ? country[0].short_name: null
               });
            });
        });
    };


    return {
        GeocodeLatLng:_geocodeLatLng

    };
});