var models =require('../models');

var Place = {
    GetOne:function(id, callback){
        //models.Course.findOne({
        //    where: {Id: id }
        //}).then(function(course) {
        //    callback(course);
        //});
    },
    Get:function(query, callback){
        models.Place.findAll({
            where:query
        }).then(function(places) {
            callback(places);
        });
    },

    CreateOne: function(registration, callback){

    },

    DeleteOne: function(id, callback){
        //models.Course.destroy({
        //    where:{Id:id}
        //}).then(function(company) {
        //    callback(204);
        //});
    }

};


module.exports = Place;

