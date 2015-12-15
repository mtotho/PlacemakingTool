var models =require('../models');

var Place = {
    GetOnePublic:function(query, callback){
        models.Place.findOne({
            include:[
                {
                    model:models.QuestionSet,
                    include:[
                        {model:models.Question, include:[models.QuestionOption]}
                    ]
                }
            ],
            order:[[
               models.QuestionSet, models.Question, 'DisplayOrder','ASC'
            ]],
            where:query
        }).then(function(place) {
            callback(place);
        });
    },
    GetOne:function(query, callback){
        models.Place.findOne({
            include:[
                {
                    model:models.QuestionSet,
                    include:[
                        {model:models.Question, include:[models.QuestionOption]}
                    ]
                },
                {
                    model:models.PlaceFeedback,
                    include:[
                        {model:models.QuestionResponse, include:[{model:models.QuestionOption,as:"ResponseOptions"},{model:models.Question}]}
                    ]
                }
            ],
            order:[[
                models.QuestionSet, models.Question, 'DisplayOrder','ASC'
            ]],
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
            DescriptionText:entity.DescriptionText,
            Latitude:entity.Latitude,
            Longitude:entity.Longitude,
            IsPublic:entity.IsPublic,
            City:entity.City,
            State:entity.State,
            PostalCode:entity.PostalCode,
            CountryCode:entity.CountryCode,
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
            DescriptionText:entity.DescriptionText,
            Latitude:entity.Latitude,
            Longitude:entity.Longitude,
            IsPublic:entity.IsPublic,
            City:entity.City,
            State:entity.State,
            PostalCode:entity.PostalCode,
            CountryCode:entity.CountryCode,
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

