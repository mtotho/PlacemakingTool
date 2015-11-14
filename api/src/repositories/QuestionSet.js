var models =require('../models');

var QuestionSet = {
    GetOne:function(query, callback){
        models.QuestionSet.findOne({
            include:[
                {model:models.Question, include:[models.QuestionOption]}
            ],
            where:query
        }).then(function(questionset) {
            callback(questionset);
        });
    },
    Get:function(query, callback){
        models.QuestionSet.findAll({
            include:[
                {model:models.Question, include:[models.QuestionOption]}
            ],
            where:query
        }).then(function(questionsets) {
            callback(questionsets);
        });
    },
    UpdateOne: function(entity, callback){
        models.QuestionSet.update({
            Name:entity.Name
        },{
            where: {Id: entity.Id}
        }).then(function(updated){

            if(entity.Question){
                //TODO: update questions (or maybe to just through questions)
            }

            callback(updated);
        });
    },
    CreateOne: function(entity, callback){
        models.QuestionSet.create({
            Name:entity.Name
        }).then(function(newquestionset){
            callback(newquestionset);
        });
    },
    DeleteOne: function(id, callback){
        models.QuestionSet.destroy({
            where:{Id:id}
        }).then(function() {
            callback(204);
        });
    }
};


module.exports = QuestionSet;

