var QuestionRepo = require('../repositories/Question');

var question = {
    getAll: function(req, res) {
        QuestionRepo.Get({},function(questions){
            res.status(200).json(questions);
        });
    },
    getOne: function(req, res) {
        QuestionRepo.GetOne({Id: req.params.Id},function(question){
            res.status(200).json(questions);
        });
    },
    create: function(req, res) {
        QuestionRepo.CreateOne(req.body,function(newquestion){
            res.status(200).json(newquestion);
        });
    },
    update: function(req, res) {
        QuestionRepo.UpdateOne(req.body,function(update){
            res.status(200).json(update);
        });
    },
    deleteOne: function(req, res) {
        var Id = req.params.Id;
        QuestionRepo.DeleteOne(Id,function(status){
            res.status(200).json(status);
        });
    }
};


module.exports = question;

