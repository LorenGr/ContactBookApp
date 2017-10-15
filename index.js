'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    router = require('./server/routes');

app.set('port', (process.env.PORT || 3001));
app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
    response.render('public/index');
});

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//db config
var connection = mongoose.connect('mongodb://loren:loren@ds119345.mlab.com:19345/contactbook', {
    useMongoClient: true
});

//Use our router configuration when we call /api
app.use('/api', router);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});