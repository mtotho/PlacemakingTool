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
                    vm.Questions.push(question);

                    $scope.showQuestionCreateCard = false;
                    $scope.newQuestion = new QuestionModel();
                };

                vm.removeQuestion = function(question){
                    vm.Questions=  vm.Questions.filter(function(eachquestion){
                        return eachquestion.Id != question.Id;
                    });
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