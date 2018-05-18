var sqlite3 = require('sqlite3').verbose();
var db;

// send table creation
var tables = `
CREATE TABLE IF NOT EXISTS sms (
    id integer PRIMARY KEY AUTOINCREMENT,
    sender text NOT NULL,
    receiver text NOT NULL,
    message NOT NULL,
    type integer NOT NULL
   );
`;


// connecting to sqlite as a file db
var connect = function (location) {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database(location, (err) => {
            if (err) {
                reject(err);
            } else {
                // now lets create the tables
                createTablesIfNotExists((e) => {
                    if (e) {
                        reject(e);
                    } else {
                        resolve();
                    }
                });
            }
        })
    });
}

// create tables if it doesnt exist
var createTablesIfNotExists = function (fn) {
    db.serialize(() => {
        db.run(tables, (err) => {
            if (err) { fn(err); return; }
            fn();
        });
    })
}

// insert sms that was sent
var insertSentSms = function (from, to, message) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('insert into sms (sender,receiver, message, type) values (?,?,?,?)', [from, to, message,1], (err) => {
                if (err) reject(err);
                else resolve();
            })
        })
    });
}

// insert sms that was rcvd
var insertRcvdSms = function (from, to, message) {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('insert into sms (sender,receiver, message, type) values (?,?,?,?)', [from, to, message,2], (err) => {
                if (err) reject(err);
                else resolve();
            })
        })
    });
}

// get all rows from sent sms table
var getAllSentSms = function () {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('select * from sms where type=1', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    })
}

// get all rows from rcvd sms table
var getAllRcvdSms = function () {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all('select * from sms where type=2', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    })
}

// export the functionality
module.exports = {
    connect: connect,
    insertSentSms: insertSentSms,
    insertRcvdSms: insertRcvdSms,
    getAllSentSms: getAllSentSms,
    getAllRcvdSms: getAllRcvdSms
}