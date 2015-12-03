'use strict';
var express = require('express');
var router = express.Router();

var Place = require('./controllers/Place.controller');
var PlaceFeedback = require('./controllers/PlaceFeedback.controller');
var Question = require('./controllers/Question.controller');
var QuestionSet = require('./controllers/QuestionSet.controller');


//PUBLIC
router.get('/places',  Place.getAllPublic);
router.get('/places/:Id',  Place.getOne);
//
//router.post('/login', auth.login);
router.post('/placefeedback',  PlaceFeedback.create);
//
//

//AUTH ONLY
//router.get('/v1/users',  user.getAll);
//router.delete('/v1/user/:id', user.delete);
//router.post('/v1/user', user.create);

router.get('/v1/places',  Place.getAll);
router.post('/v1/places', Place.create);
router.put('/v1/places', Place.update);

router.get('/v1/questionsets',  QuestionSet.getAll);
router.post('/v1/questionsets',  QuestionSet.create);
router.put('/v1/questionsets/:Id',  QuestionSet.update);

router.get('/v1/questions',  Question.getAll);
router.post('/v1/questions',  Question.create);
router.put('/v1/questions/:Id',  Question.update);

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