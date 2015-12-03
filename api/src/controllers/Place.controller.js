var PlaceRepo = require('../repositories/Place');

var place = {
    getAll: function(req, res) {
        PlaceRepo.Get({},function(places){
            res.status(200).json(places);
        });
    },
    getAllPublic: function(req, res) {
        PlaceRepo.Get({IsPublic:true},function(places){
            res.status(200).json(places);
        });
    },
    getOne: function(req, res) {
        PlaceRepo.GetOne({Id: req.params.Id},function(place){
            res.status(200).json(place);
        });
    },
    create: function(req, res) {
        PlaceRepo.CreateOne(req.body,function(newplace){
            res.status(200).json(newplace);
        });
    },
    update: function(req, res) {
        PlaceRepo.UpdateOne(req.body,function(update){
            res.status(200).json(update);
        });
    },
    delete: function(req, res) {
        var Id = req.params.Id;
        PlaceRepo.DeleteOne(Id,function(status){
            res.status(status);
        });
    }
};


module.exports = place;

