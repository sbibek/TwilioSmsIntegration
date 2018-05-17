var dbService = require('./database');

var init = function (app) {
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