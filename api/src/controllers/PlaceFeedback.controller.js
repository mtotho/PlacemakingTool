var PlaceFeedbackRepo = require('../repositories/PlaceFeedback');
var QuestionResponseRepo = require('../repositories/QuestionResponse');

var placefeedback = {
    getAll: function(req, res) {
        PlaceFeedbackRepo.Get({},function(feedback){
            res.status(200).json(feedback);
        });
    },
    getOne: function(req, res) {
        PlaceFeedbackRepo.GetOne({Id: req.params.Id},function(feedback){
            res.status(200).json(feedback);
        });
    },
    create: function(req, res) {
        PlaceFeedbackRepo.CreateOne(req.body,function(newfeedback){

            if(newfeedback.QuestionResponses){

                QuestionResponseRepo.CreateResponsesForFeedback(newfeedback.QuestionResponses,function(){
                    res.status(200).json(newfeedback);
                });

            }else{
                //Then why are we creating feedback

            }

        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        PlaceFeedbackRepo.DeleteOne(Id,function(status){
            res.status(status);
        });
    }
};


module.exports = placefeedback;

