var QuestionSetRepo = require('../repositories/QuestionSet');

var questionset = {
    getAll: function(req, res) {
        QuestionSetRepo.Get({},function(questionsets){
            res.json(200, questionsets);
        });
    },
    getOne: function(req, res) {
        QuestionSetRepo.GetOne({Id: req.params.Id},function(questionset){
            res.json(200, questionset);
        });
    },
    create: function(req, res) {
        QuestionSetRepo.CreateOne(req.body,function(newquestionset){
            res.json(200, newquestionset);
        });
    },
    update: function(req, res) {
        QuestionSetRepo.UpdateOne(req.body,function(update){
            res.json(200, update);
        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        QuestionSetRepo.DeleteOne(Id,function(status){
            res.json(status);
        });
    }
};

module.exports = questionset;

