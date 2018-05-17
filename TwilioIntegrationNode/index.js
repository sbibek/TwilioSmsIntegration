var express = require('express');
var bodyParser = require('body-parser');
var env = require('./environment/env').get();
var app = express();

// allow cross origin request for dev
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// use bodyparser for parsing post params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// initialize our twilio controller
require('./twilioModule/twilio.controller')(app);

// now lets start our twilio integration nodejs server
app.listen(env.listenPort, "0.0.0.0", () => {
    console.log("twilioIntegrationServer running@" + env.listenPort);
});