'use strict';

angular.module('PlacemakingTool').factory('QuestionSetResource', function($http,QuestionResource) {
    var route = "api/v1/questionsets";
    var _selectedqs = null;

    var QuestionSetResource = {
        SetSelected:function(qs){
            _selectedqs = qs;
        },
        GetSelected:function(){
            return _selectedqs;
        },
        GetAll: function(cb){
            $http.get(route).
                success(function(data, status, headers, config) {
                    cb(data);
                }).
                error(function(data, status, headers, config) {

                });
        },
        CreateOne: function(qs, cb){
            $http({
                method: 'POST',
                data:qs,
                url: route
            }).then(function successCallback(response) {
                cb(response);
            }, function errorCallback(response) {

            });
        },
        DeleteOne: function(qs, cb){
            $http({
                method: 'DELETE',
                url: route + '/' + qs.Id
            }).then(function successCallback(response) {
                cb(response);
            }, function errorCallback(response) {

            });
        },
        AddQuestion: function(question, cb){
            if(_selectedqs){
                question.QuestionSetId = _selectedqs.Id;
                QuestionResource.CreateOne(question, cb);
            }else{
                console.log("quesiton set not selected");
            }

        },
        RemoveQuestion: function(question, cb){
            if(_selectedqs){
                QuestionResource.DeleteOne(question, cb);
            }else{
                console.log("quesiton set not selected");
            }

        }
    };

    return QuestionSetResource;
});