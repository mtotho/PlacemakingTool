var models =require('../models');

var Question = {
    GetOne:function(query, callback){
        models.Question.findOne({
            include:[
                models.QuestionOption
            ],
            where:query
        }).then(function(question) {
            callback(question);
        });
    },
    Get:function(query, callback){
        models.Question.findAll({
            include:[
                models.QuestionOption
            ],
            where:query
        }).then(function(questions) {
            callback(questions);
        });
    },
    UpdateOne: function(entity, callback){
        models.Question.update({
            Name:entity.Name,
            Text:entity.Text,
            QuestionType:entity.QuestionType,
            IsRequired:entity.IsRequired,
            QuestionSetId:entity.QuestionSetId
        },{
            where: {Id: entity.Id}
        }).then(function(updated){

            if(entity.QuestionOptions){
                //TODO: update question options
            }

            callback(updated);
        });
    },
    CreateOne: function(entity, callback){
        models.Question.create({
            Name:entity.Name,
            Text:entity.Text,
            QuestionType:entity.QuestionType,
            IsRequired:entity.IsRequired,
            QuestionSetId:entity.QuestionSetId
        }).then(function(newquestion){
            callback(newquestion);
        });
    },
    DeleteOne: function(id, callback){
        models.Question.destroy({
            where:{Id:id}
        }).then(function() {
            callback(204);
        });
    }
};


module.exports = Question;

