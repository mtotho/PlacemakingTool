'use strict';

angular.module('PlacemakingTool')
    .directive('placemapQuestionList', function () {
        return {
            templateUrl: 'src/controllers/admin/question/directives/placemap-question-list.html',
            restrict: 'EA',
            scope:{
                questionSet:"="
            },
            //require:"^legacyToolExplorer",
            link: function (scope, element, attrs, ctrl) {

            },
            controller: function($scope, QuestionSetResource, QuestionResource){
                var vm = this;


                vm.Questions = [];

                $scope.$watch('questionSet',function(){
                   if(!angular.isUndefinedOrNull($scope.questionSet)){
                       vm.Questions = $scope.questionSet.Questions;
                   }
                });
                function QuestionModel(){
                    this.Name = "";
                    this.Text= "";
                    this.QuestionType = "shortanswer";
                    //this.QuestionSetId = $scope.questionSet.Id;
                    this.QuestionOptions = [];
                }
                $scope.editQuestion = null;

                vm.setEditQuestion = function(question){
                    $scope.editQuestion = question;
                };
                vm.editComplete = function(){
                    $scope.editQuestion = null;
                };
                //var Question = $resource('/api/v1/questions');
                //Question.query(function(data){
                //    $scope.questions = data;
                //});

                //QuestionResource.GetAllBySet(function(questions){
                //    console.log(questions);
                //    vm.Questions = questions;
                //});

                $scope.showQuestionCreateCard = false;
                $scope.newQuestion  = new QuestionModel();


                $scope.toggleCreateQuestionCard = function(){
                    $scope.newQuestion.QuestionSetId = $scope.questionSet.Id;
                    $scope.showQuestionCreateCard = !$scope.showQuestionCreateCard;
                };

                console.log($scope.editQuestion);
                vm.pushQuestion = function(question){

                    if(!vm.Questions)
                        vm.Questions = [];
                    vm.Questions.push(question);

                    $scope.showQuestionCreateCard = false;
                    $scope.newQuestion = new QuestionModel();
                };

                vm.removeQuestion = function(question){
                    vm.Questions=  vm.Questions.filter(function(eachquestion){
                        return eachquestion.Id != question.Id;
                    });
                };

                vm.PushQuestionUp = function(question){
                    var initialOrder = question.DisplayOrder;
                    if(initialOrder > 0){
                        var newOrder = initialOrder - 1;

                        for(var i=0; i<vm.Questions.length; i++){

                            if(vm.Questions[i].DisplayOrder == newOrder){
                                vm.Questions[i].DisplayOrder = initialOrder;
                            }
                        }

                        question.DisplayOrder = newOrder;

                        QuestionResource.UpdateMany(vm.Questions, function(){


                        });
                    }





                };


                vm.PushQuestionDown = function(question){
                    var initialOrder = question.DisplayOrder;
                    if(initialOrder < (vm.Questions.length - 1)){
                        var newOrder = initialOrder + 1;

                        for(var i=0; i<vm.Questions.length; i++){

                            if(vm.Questions[i].DisplayOrder == newOrder){
                                vm.Questions[i].DisplayOrder = initialOrder;
                            }
                        }

                        question.DisplayOrder = newOrder;


                        QuestionResource.UpdateMany(vm.Questions, function(){


                        });
                    }


                };
              //  $scope.selectedSet = null;

                //$scope.$on('qsUpdated',function(event,set){
                //    $scope.selectedSet = set;
                //
                //});



            },//end controller
            controllerAs:"vm"
        };
    });