'use strict';

angular.module('PlacemakingTool').factory('FeedbackResource', function($http) {
    var route = "api/placefeedback";
    var _selectedqs = null;

    var PlaceFeedbackResource = {
        CreateOne: function(feedback, cb){
            $http({
                method: 'POST',
                data:feedback,
                url: route
            }).then(function successCallback(response) {
                cb(response.data);
            }, function errorCallback(response) {

            });
        }
    };

    return PlaceFeedbackResource ;
});