var QuestionSetRepo = require('../repositories/QuestionSet');

var questionset = {
    getAll: function(req, res) {
        QuestionSetRepo.Get({},function(questionsets){
            res.status(200).json(questionsets);
        });
    },
    getOne: function(req, res) {
        QuestionSetRepo.GetOne({Id: req.params.Id},function(questionset){
            res.status(200).json(questionset);
        });
    },
    create: function(req, res) {
        QuestionSetRepo.CreateOne(req.body,function(newquestionset){
            res.status(200).json(newquestionset);
        });
    },
    update: function(req, res) {
        QuestionSetRepo.UpdateOne(req.body,function(update){
            res.status(200).json(update);
        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        QuestionSetRepo.DeleteOne(Id,function(status){
            res.status(status);
        });
    }
};

module.exports = questionset;

