'use strict';

angular.module('PlacemakingTool')
    .directive('placemapQuestion', function () {
        return {
            templateUrl: 'src/controllers/admin/question/directives/placemap-question.html',
            restrict: 'EA',
            scope:{
                "question":"=",
                "selectedSet":"="
            },
            require:"^placemapQuestionList",
            link: function (scope, element, attrs, ctrl) {
                scope.setEditQuestion= function(question){
                    ctrl.setEditQuestion(question);
                };
                scope.removeQuestion= function(question){
                    ctrl.removeQuestion(question);
                };
            },
            controller: function($scope,$filter,QuestionResource, QuestionSetResource){
                //$scope.selectedSet= null;
                $scope.inSet = false;

                console.log($scope.selectedSet);
                //$scope.$on('qsUpdated',function(event,set){
                //    $scope.inSet = false;
                //    $scope.selectedSet = set;
                //
                //    console.log(set);
                //    if(set!==null){
                //            var inSet = $filter('getByProp')(set.questions, 'name', $scope.question.name);
                //        if(inSet !== null){
                //            $scope.inSet = true;
                //        }
                //    }
                //});

                //$scope.setEditQuestion = function(){
                //
                //}
                //
                //$scope.addQuestionToSet = function(question){
                //    QuestionSetResource.AddQuestion(question);
                //    $scope.inSet = true;
                //};

                $scope.deleteQuestion = function(question){
                    QuestionResource.DeleteOne(question,function(status){
                        $scope.removeQuestion(question);
                    });
                }


            }//end controller
        };
    });