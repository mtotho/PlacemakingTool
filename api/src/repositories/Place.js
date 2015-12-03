var models =require('../models');

var Place = {
    GetOne:function(query, callback){
        models.Place.findOne({
            include:[
                {
                    model:models.QuestionSet,
                    include:[
                        {model:models.Question, include:[models.QuestionOption]}
                    ]
                }
            ],
            where:query
        }).then(function(place) {
            callback(place);
        });
    },
    Get:function(query, callback){
        models.Place.findAll({
            where:query
        }).then(function(places) {
            callback(places);
        });
    },
    UpdateOne: function(entity, callback){
        models.Place.update({
            Name:entity.Name,
            Zoom:entity.Zoom,
            Latitude:entity.Latitude,
            Longitude:entity.Longitude,
            IsPublic:entity.IsPublic,
            QuestionSetId:entity.QuestionSetId
        },{
            where: {Id: entity.Id}
        }).then(function(rowsaffected){
            Place.GetOne({Id:entity.Id}, function(updated){
                callback(updated);
            });
        });
    },
    CreateOne: function(entity, callback){
        models.Place.create({
            Name:entity.Name,
            Zoom:entity.Zoom,
            Latitude:entity.Latitude,
            Longitude:entity.Longitude,
            IsPublic:entity.IsPublic,
            QuestionSetId:entity.QuestionSetId
        }).then(function(newplace){
            callback(newplace);
        });
    },
    DeleteOne: function(id, callback){
        models.Place.destroy({
            where:{Id:id}
        }).then(function() {
            callback(204);
        });
    }
};


module.exports = Place;

