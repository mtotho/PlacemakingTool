'use strict';

angular.module('PlacemakingTool')
    .directive('placemapQuestionSetList', function () {
        return {
            templateUrl: 'src/controllers/admin/question/directives/placemap-question-set-list.html',
            restrict: 'EA',
            scope:{

            },
            //require:"^legacyToolExplorer",
            link: function (scope, element, attrs, ctrl) {

            },
            controller: function($scope, $resource, QuestionSetResource){


                $scope.newQS = new QuestionSetModel();

                $scope.questionsets = [];

                $scope.selectedSet = null;

                QuestionSetResource.GetAll(function(data){
                    $scope.questionsets = data;
                    console.log(data);

                });


                $scope.selectSet = function(qs){
                    $scope.selectedSet = qs;
                    QuestionSetResource.SetSelected(qs);
                };

                $scope.createSet = function(form){

                    if(form.$valid) {
                        QuestionSetResource.CreateOne($scope.newQS, function(data){
                            console.log(data);

                            $scope.questionsets.push(data);
                            $scope.newQS = new QuestionSetModel();
                        });

                    }
                };

                $scope.removeQuestion = function(question, index){
                    if($scope.selectedSet!== null){
                        $scope.selectedSet.Questions.splice(index,1);
                        QuestionSetResource.RemoveQuestion(question);
                    }
                };

                $scope.saveQS = function(){
                    //if(vm.selectedQS !== null){
                    //    console.log(vm.selectedQS);
                    //    QuestionSet.update({id:vm.selectedQS._id}, vm.selectedQS, function(result){
                    //        console.log(result);
                    //    });
                    //
                    //}
                };

                function QuestionSetModel(){
                    this.name = "";
                    this.questions = [];
                }

            }//end controller
        };
    });