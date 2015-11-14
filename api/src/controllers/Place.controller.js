var PlaceRepo = require('../repositories/Place');

var place = {

    getAllPublic: function(req, res) {
        PlaceRepo.Get({IsPublic:true},function(places){
            res.json(200, places);
        });
    },

    getOne: function(req, res) {

    },

    create: function(req, res) {

    },

    update: function(req, res) {

    },

    delete: function(req, res) {
        var Id = req.params.Id;

    }
};


module.exports = place;

