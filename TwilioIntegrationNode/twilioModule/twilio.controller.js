var twilioService = require('./twilio.service');
var dbService = require('../sqliteModule/database');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var twilioController = function (app) {
    app.post('/send', (req, res) => {
        // we should have proper parameters
        if (!hasAllRequiredParams(req.body, ['accountSid', 'authToken', 'from', 'to', 'message'])) {
            res.json({
                success: false,
                errorCode: 101,
                message: "please supply all required fields"
            });
            return;
        }
        // now if we are here means, we have everything for twilio service
        twilioService.twilioSendSms(req.body.accountSid, req.body.authToken, req.body.message, req.body.from, req.body.to).then(response => {
            // this is success then lets insert it into db
            dbService.insertSentSms(req.body.from, req.body.to, req.body.message).then(() => {
                res.json({
                    success: true,
                    errorCode: 0,
                    message: response.sid
                });
            }).catch((err) => {
                res.status(500).json({
                    success: false,
                    errorCode: 201,
                    messssage: err
                });
            })
        }).catch((err) => {
            res.status(500).json({
                success: false,
                errorCode: 102,
                messssage: err
            });
        }).done();
    });

    // incoming message hook from twilio
    app.post('/incoming', (req,res) => {
        console.log("received message");
        console.log(req);
        console.log(req.body);
        console.log("received message");
        const twiml = new MessagingResponse();
        twiml.message('Thank you for the response');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    })
}

// check if we have all required fields
var hasAllRequiredParams = function (object, requiedParams) {
    if (!object) return false;
    for (var i = 0; i < requiedParams.length; i++) {
        if (object[requiedParams[i]] == undefined || object[requiedParams[i]] == '') return false;
    }
    return true;
}

// export the functionality
module.exports = function (app) {
    twilioController(app);
    console.log('twilo controller plugged');
}