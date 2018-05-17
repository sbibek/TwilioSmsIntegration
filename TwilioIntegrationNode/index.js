var express = require('express');
var bodyParser = require('body-parser');
var env = require('./environment/env').get();
var app = express();

// use bodyparser for parsing post params
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// initialize our twilio controller
require('./twilioModule/twilio.controller')(app);

// now lets start our twilio integration nodejs server
app.listen(env.listenPort,"0.0.0.0", () => {
    console.log("twilioIntegrationServer running@"+env.listenPort);
});