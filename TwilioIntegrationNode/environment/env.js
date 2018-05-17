// return environment specific keys
module.exports = {
    get: function () {
        // return prod if its explicitly mentioned else return dev
        if (process.env.ENV != undefined && process.env.ENV == 'prod') {
            return require('./prod.env');
        } else {
            return require('./dev.env');
        }
    }
}