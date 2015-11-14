var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

var config = require('./src/conf/ConfigurationManager')();


app.use(logger('dev'));
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = config.port;

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.all('/v1/*', [require('./src/code/validateRequest')]);
//app.all('/v1/*', [require('./app/middlewares/validateRequest')]);
app.use('/', require('./src/routes.api'));
app.use(function(req, res, next) {
    console.log(req);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// Start the server
app.set('port', process.env.PORT || port);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});