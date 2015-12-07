'use strict';

angular.module('PlacemakingTool')
    .directive('placeFeedback', function () {
        return {
            templateUrl: 'src/controllers/public/place/place-feedback.html',
            restrict: 'EA',
            scope:{
                "place":"="
            },
            link: function (scope, element, attrs, ctrl) {


            },
            controller: function($scope, $mdDialog){

                var vm = this;
                vm.CurrentQuestion = null;
                vm.CurrentIndex = 0;
                vm.QuestionCount = 0;
                vm.questionsComplete = false;
                vm.Responses = [];


                $scope.$watch('place',function(){
                    if(!angular.isUndefinedOrNull($scope.place)){
                        vm.Questions = $scope.place.QuestionSet.Questions;
                        console.log(vm.place);
                        //vm.newFeedback.place = vm.place._id;
                        vm.QuestionCount =vm.Questions.length;

                        if(vm.QuestionCount > 0){
                            vm.Responses = new ResponseObject(vm.Questions);
                            // console.log(vm.responses);
                            vm.CurrentQuestion =  vm.Questions[0];

                        }
                    }
                });

                function ResponseObject(questions){
                    var response = [];

                    for(var i=0; i<questions.length; i++){
                        response[questions[i].Id] = {
                            QuestionId:questions[i].Id,
                            ResponseText:"",
                            TempOptions:[],
                            ResponseOptions:[]
                        }
                    }

                    return response;
                }

                vm.nextQuestion = function(ev){
                    if(vm.CurrentIndex + 1 < vm.QuestionCount){


                        if((vm.CurrentQuestion.IsRequired && vm.Responses[vm.CurrentQuestion.Id].ResponseText!=="" || vm.Responses[vm.CurrentQuestion.Id].TempOptions.length>0) || !vm.CurrentQuestion.IsRequired){
                            vm.CurrentIndex ++;
                            vm.CurrentQuestion =vm.Questions[vm.CurrentIndex];
                        }else{
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.body))
                                    .title('Oops')
                                    .content('Please complete this question before moving on')
                                    .ariaLabel('Alert Dialog')
                                    .ok('Got it!')
                                    .targetEvent(ev)
                            );
                        }

                    }
                };

                vm.previousQuestion = function(){
                    if(vm.CurrentIndex > 0){
                        vm.CurrentIndex --;
                        vm.CurrentQuestion =vm.Questions[vm.CurrentIndex];
                    }
                };


                vm.submitFeedback = function(ev){

                    if((vm.CurrentQuestion.IsRequired && vm.Responses[vm.CurrentQuestion.Id].ResponseText!=="" || vm.Responses[vm.CurrentQuestion.Id].TempOptions.length>0) || !vm.CurrentQuestion.IsRequired){
                        var feedback = {
                            PlaceId:$scope.place.Id,
                            QuestionResponses: []
                        };

                        for(var r in vm.Responses){
                            console.log(r);

                            var respOptions = [];
                            for(var optId in vm.Responses[r].TempOptions){
                                if(vm.Responses[r].TempOptions[optId]){
                                    respOptions.push(optId);
                                }
                            }
                            vm.Responses[r].ResponseOptions = respOptions;
                            feedback.QuestionResponses.push(vm.Responses[r]);
                        }
                        //var Feedback = new Resources.feedback(feedback);
                        //
                        //Feedback.$save(function(result){
                        //    console.log(result);
                        //
                        //    vm.questionIndex = 0;
                        //    vm.responses = [];
                        //    vm.currentQuestion = vm.place.question_set.questions[vm.questionIndex];
                        //    vm.questionsComplete = true;
                        //});
                    }else{
                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.body))
                                .title('Oops')
                                .content('Please complete this question before moving on')
                                .ariaLabel('Alert Dialog')
                                .ok('Got it!')
                                .targetEvent(ev)
                        );
                    }

                };

                // size_content();
            },//end controller,
            controllerAs: 'vm'
        };
    });