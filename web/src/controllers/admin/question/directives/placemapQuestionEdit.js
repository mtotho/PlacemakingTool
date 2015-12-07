'use strict';

angular.module('PlacemakingTool')
    .directive('placemapQuestionEdit', function () {
        return {
            templateUrl: 'src/controllers/admin/question/directives/placemap-question-edit.html?v=1',
            restrict: 'EA',
            scope:{
                "question":"="
            },
            require:"^placemapQuestionList",
            link: function (scope, element, attrs, ctrl) {
                scope.pushQuestion = function(question){
                    ctrl.pushQuestion(question);
                };

                scope.editComplete = function(){
                    ctrl.editComplete();
                }
            },
            controller: function($scope, QuestionResource){


                $scope.isNew = true;

                if(!angular.isUndefinedOrNull($scope.question.Id)){
                    $scope.isNew = false;
                }

                $scope.removeOptFromQuestion = function(opt){
                    console.log( $scope.question);
                    var index = -1;

                    for(var i = 0; i < $scope.question.QuestionOptions.length; i++){
                        if($scope.question.QuestionOptions[i].Id===opt.Id){
                            index = i;
                            break;
                        }
                    }

                    if(index>0){
                        $scope.question.QuestionOptions.splice(index, 1);
                    }
                };

                $scope.newOption = "";

                $scope.addOption = function(){

                    if($scope.newOption !== ""){
                        $scope.question.QuestionOptions.push({OptionText:$scope.newOption, QuestionId:$scope.question.Id});
                        $scope.newOption = "";
                    }

                };

                $scope.cancelEdit = function(){
                    $scope.editComplete();
                };

                $scope.saveQuestion = function(form){

                    if(form.$valid) {
                        if(!$scope.question.hasOwnProperty("IsRequired")){
                            $scope.question.IsRequired = false;
                        }
                        if ($scope.isNew) {

                            QuestionResource.CreateOne($scope.question, function(data){
                                console.log(data);

                                $scope.pushQuestion(data);
                            });

                        } else {

                            QuestionResource.UpdateOne($scope.question, function (result) {
                                $scope.question = result;
                                $scope.editComplete();
                            });

                        }
                    }
                }





            }//end controller
        };
    });