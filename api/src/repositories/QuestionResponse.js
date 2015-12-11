var models =require('../models');

var QuestionResponse = {

    CreateResponsesForFeedback: function(feedbackId,responses, callback){
        var inserted = 0;
        for(var i=0; i<responses.length; i++){
            var response = responses[i];

            models.QuestionResponse.create({
                ResponseText:response.ResponseText,
                PlaceFeedbackId:feedbackId,
                QuestionId:response.QuestionId
            }).then(function(newresponse){

                if(responses[inserted].ResponseOptions.length> 0){
                    //todo save options

                        newresponse.setResponseOptions(responses[inserted].ResponseOptions,function(succces){});

                }

                if(++inserted == responses.length){
                    callback();
                }

            });
        }



    },
    CreateResponseOptions:function(options,callback){
        var inserted = 0;

        for(var i=0; i<options.length;i++){



        }
    },




};


module.exports = QuestionResponse;

