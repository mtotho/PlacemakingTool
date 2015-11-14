'use strict';
var express = require('express');
var router = express.Router();
//var auth = require('./api/auth.js');
//
//var user = require('./api/user/user.controller');
var Place = require('./controllers/Place.controller');
//var question = require('./api/question/question.controller');
//var questionset= require('./api/question_set/questionset.controller');
//var feedback= require('./api/feedback/feedback.controller');

////PUBLIC
router.get('/places',  Place.getAllPublic);
//router.get('/places/:id',  place.getOne);
//
//router.post('/login', auth.login);
//router.post('/feedback',  feedback.create);
//
//
////AUTH ONLY
//router.get('/v1/users',  user.getAll);
//router.delete('/v1/user/:id', user.delete);
//router.post('/v1/user', user.create);
//
//router.get('/v1/places',  place.getAll);
//router.post('/v1/places', place.create);
//router.put('/v1/places/:id', place.update);
//
//router.get('/v1/questionsets',  questionset.getAll);
//router.post('/v1/questionsets',  questionset.create);
//router.put('/v1/questionsets/:id',  questionset.update);
//
//router.get('/v1/questions',  question.getAll);
//router.post('/v1/questions',  question.create);
//router.put('/v1/questions/:id',  question.update);

/*
 // All undefined asset or api routes should return a 404
 app.route('/:url(api|auth|components|app|bower_components|assets)/*')
 .get(errors[404]);

 // All other routes should redirect to the index.html
 app.route('/*')
 .get(function(req, res) {
 res.sendfile(app.get('appPath') + '/index.html');
 });*/
// If no route is matched by now, it must be a 404

module.exports = router;