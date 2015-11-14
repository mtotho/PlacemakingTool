var QuestionRepo = require('../repositories/Question');

var question = {
    getAll: function(req, res) {
        QuestionRepo.Get({},function(questions){
            res.json(200, questions);
        });
    },
    getOne: function(req, res) {
        QuestionRepo.GetOne({Id: req.params.Id},function(question){
            res.json(200, questions);
        });
    },
    create: function(req, res) {
        QuestionRepo.CreateOne(req.body,function(newquestion){
            res.json(200, newquestion);
        });
    },
    update: function(req, res) {
        QuestionRepo.UpdateOne(req.body,function(update){
            res.json(200, update);
        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        QuestionRepo.DeleteOne(Id,function(status){
            res.json(status);
        });
    }
};


module.exports = question;

