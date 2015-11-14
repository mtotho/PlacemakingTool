var PlaceFeedbackRepo = require('../repositories/PlaceFeedback');
var QuestionResponseRepo = require('../repositories/QuestionResponse');

var placefeedback = {
    getAll: function(req, res) {
        PlaceFeedbackRepo.Get({},function(feedback){
            res.json(200, feedback);
        });
    },
    getOne: function(req, res) {
        PlaceFeedbackRepo.GetOne({Id: req.params.Id},function(feedback){
            res.json(200, feedback);
        });
    },
    create: function(req, res) {
        PlaceFeedbackRepo.CreateOne(req.body,function(newfeedback){

            if(newfeedback.QuestionResponses){

                QuestionResponseRepo.CreateResponsesForFeedback(newfeedback.QuestionResponses,function(){
                    res.json(200, newfeedback);
                });

            }else{
                //Then why are we creating feedback

            }

        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        PlaceFeedbackRepo.DeleteOne(Id,function(status){
            res.json(status);
        });
    }
};


module.exports = placefeedback;

