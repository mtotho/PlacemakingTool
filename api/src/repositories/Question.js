var models =require('../models');
var QuestionOption = require('./QuestionOption');

function createNewOptions(newOptions,finalOptions, question,cb){
    if(newOptions.length == 0){
        cb(finalOptions);
    }

    var inserted = 0;
    for(var i=0; i<newOptions.length; i++){
        var option = newOptions[i];
        option.QuestionId = question.Id;
        QuestionOption.CreateOne(option,function(newOption){
            finalOptions.push(newOption);
            if(++inserted == newOptions.length){
               cb(finalOptions);
            }
        });
    }


}

function deleteOptions(options, cb){
    if(options.length == 0)
        cb();

    var deleted = 0;
    for(var i=0; i<options.length; i++){
        var option = options[i];

        QuestionOption.DeleteOne(option.Id,function(status){
            if(++deleted == options.length){
                cb();
            }
        });
    }

}


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
    UpdateMany:function(questions, callback){

        var updated = 0;
        for(var i=0; i<questions.length;i++){
            Question.UpdateOne(questions[i], function(){

                updated ++;

                if(updated == questions.length){
                    callback();
                }
            });
        }

    },
    UpdateOne: function(entity, callback){
        models.Question.update({
            Name:entity.Name,
            Text:entity.Text,
            QuestionType:entity.QuestionType,
            IsRequired:entity.IsRequired,
            DisplayOrder:entity.DisplayOrder,
            QuestionSetId:entity.QuestionSetId
        },{
            where: {Id: entity.Id}
        }).then(function(updated){

            if(entity.QuestionOptions){

                var newOptions = entity.QuestionOptions.filter(function(option){
                   return !option.hasOwnProperty('Id');
                });

                var existingOptions = entity.QuestionOptions.filter(function(option){
                    return option.hasOwnProperty('Id');
                });


                var finalOptions = [];
                finalOptions = finalOptions.concat(existingOptions);

                createNewOptions(newOptions, finalOptions,entity, function(finalOptions){
                    entity.QuestionOptions = finalOptions;

                    Question.GetOne({Id:entity.Id}, function(oldquestion){
                        var toDelete = [];

                        toDelete = oldquestion.QuestionOptions.filter( function( el ) {

                            var d =  finalOptions.filter(function(opt){
                                return opt.Id == el.Id;
                            });

                            return d.length == 0;
                        });

                        deleteOptions(toDelete, function(){
                            callback(entity);
                        });
                    });
                });





            }else{
                callback(updated);
            }


        });
    },
    CreateOne: function(entity, callback){
        models.Question.create({
            Name:entity.Name,
            Text:entity.Text,
            QuestionType:entity.QuestionType,
            IsRequired:entity.IsRequired,
            DisplayOrder:entity.DisplayOrder,
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

