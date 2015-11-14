var models =require('../models');

var PlaceFeedback = {
    GetOne:function(query, callback){
        models.PlaceFeedback.findOne({
            include:[
                {model:models.QuestionResponse, include:[models.QuestionResponse_Option]}
            ],
            where:query
        }).then(function(questionset) {
            callback(questionset);
        });
    },
    Get:function(query, callback){
        models.PlaceFeedback.findAll({
            include:[
                {model:models.QuestionResponse, include:[models.QuestionResponse_Option]}
            ],
            where:query
        }).then(function(questionsets) {
            callback(questionsets);
        });
    },
    CreateOne: function(entity, callback){
        models.PlaceFeedback.create({
            IPAddress:entity.IPAddress,
            Latitude:entity.Latitude,
            Longitude:entity.Longitude,
            PlaceId:entity.PlaceId,
            QuestionSetId:entity.QuestionSetId
        }).then(function(newfeedback){
            callback(newfeedback);
        });
    },
    DeleteOne: function(id, callback){
        models.PlaceFeedback.destroy({
            where:{Id:id}
        }).then(function() {
            callback(204);
        });
    }
};


module.exports = PlaceFeedback;

