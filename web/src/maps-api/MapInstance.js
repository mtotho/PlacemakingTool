'use strict';

angular.module('PlacemakingTool').factory('MapInstance', function($http, uiGmapGoogleMapApi) {

    //var _getMapInstance = function(cb){
    //    uiGmapGoogleMapApi.then(function(maps) {
    //
    //
    //    });
    //};

    var _map = null;

    var setMap = function(map){
        _map = map;
    };

    var getMap = function(){
        return _map;
    };

    return {
        SetMap:setMap,
        GetMap:getMap
    };
});