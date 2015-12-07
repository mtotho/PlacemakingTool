'use strict';

angular.module('PlacemakingTool').factory('QuestionResource', function($http) {
    var route= "/api/v1/questions";

    var QuestionResource = {
        GetAll:function(cb){
            $http.get(route).
            success(function(data, status, headers, config) {
                cb(data);
            }).
            error(function(data, status, headers, config) {

            });
        },
        CreateOne: function(question, cb){
            $http.post(route, question).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {

                });
        },
        UpdateOne: function(question, cb){
            $http.put(route, question).
            success(function(data, status, headers, config) {
                cb(data);
            }).
            error(function(data, status, headers, config) {

            });
        },
        DeleteOne: function(question, cb){
            $http({
                method: 'DELETE',
                url: route + '/' + question.Id
            }).then(function successCallback(response) {
                cb(response);
            }, function errorCallback(response) {

            });
        }

    };

    return QuestionResource;
});