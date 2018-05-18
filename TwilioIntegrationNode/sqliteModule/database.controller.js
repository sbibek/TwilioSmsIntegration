var dbService = require('./database');

// initialize the db related access functionalities with express app
var init = function (app) {

    // get all sent sms
    app.get('/sent', (req, resp) => {
        dbService.getAllSentSms().then(rows => {
            resp.json(rows);
        }).catch((err) => {
            resp.status(500).json({
                success: false,
                errorCode: 202,
                message: err,
            })
        })
    })

    // get all received sms
    app.get('/rcvd', (req, resp) => {
        dbService.getAllRcvdSms().then(rows => {
            resp.json(rows);
        }).catch((err) => {
            resp.status(500).json({
                success: false,
                errorCode: 203,
                message: err,
            })
        })
    })
}

// export it
module.exports = function(app){
    init(app);
    console.log('database controller plugged');
}