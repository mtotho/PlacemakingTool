var PlaceRepo = require('../repositories/Place');

var place = {
    getAll: function(req, res) {
        PlaceRepo.Get({},function(places){
            res.json(200, places);
        });
    },
    getAllPublic: function(req, res) {
        PlaceRepo.Get({IsPublic:true},function(places){
            res.json(200, places);
        });
    },
    getOne: function(req, res) {
        PlaceRepo.GetOne({Id: req.params.Id},function(place){
            res.json(200, place);
        });
    },
    create: function(req, res) {
        PlaceRepo.CreateOne(req.body,function(newplace){
            res.json(200, newplace);
        });
    },
    update: function(req, res) {
        PlaceRepo.UpdateOne(req.body,function(update){
            res.json(200, update);
        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        PlaceRepo.DeleteOne(Id,function(status){
            res.json(status);
        });
    }
};


module.exports = place;

