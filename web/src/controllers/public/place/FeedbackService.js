'use strict';

angular.module('PlacemakingTool').factory('FeedbackService', function($http) {

    var _feedbackLocation = null;

    var _setFeedbackLocation = function(location){
        _feedbackLocation = location;
    };


    return {
        SetFeedbackLocation:_setFeedbackLocation

    };
});