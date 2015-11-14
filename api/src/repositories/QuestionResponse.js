var models =require('../models');

var QuestionResponse = {

    CreateResponsesForFeedback: function(responses, callback){
        var inserted = 0;
        for(var i=0; i<responses.length; i++){
            var response = responses[i];

            models.QuestionResponse.create({
                ResponseText:response.ResponseText,
                PlaceFeedbackId:response.PlaceFeedbackId,
                QuestionId:response.QuestionId
            }).then(function(newresponse){

                if(newresponse.QuestionOptions){
                    //todo save options
                }

                if(++inserted == responses.length){
                    callback();
                }

            });
        }



    }

};


module.exports = QuestionResponse;

