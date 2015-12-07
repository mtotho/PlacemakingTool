var models =require('../models');

var QuestionOption = {

    CreateOne: function(entity, callback){
        models.QuestionOption.create({
            OptionText:entity.OptionText,
            QuestionId:entity.QuestionId
        }).then(function(newoption){
            callback(newoption);
        });
    },
    DeleteOne:function(id, callback){
        models.QuestionOption.destroy({
            where:{Id:id}
        }).then(function() {
            callback(204);
        });
    }
};


module.exports = QuestionOption;

