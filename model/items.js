'use strict';
var mongoose = require('mongoose');

var ItemsSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    job_title: String,
    company: String,
    email: String,
    address: String,
    phone_number: Number,
    picture: String,
});

//export our module to use in server.js
module.exports = mongoose.model('Contact', ItemsSchema);
