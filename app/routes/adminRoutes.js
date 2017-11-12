/**
 * Created by kristys on 2017-11-12.
 */
const connection = require('../connection');

module.exports = function (app) {
    var auth = require('./auth.js').auth;

    // admin setupinterview endpoint
    app.post('/admin/setupinterview', auth, function (req, res) {
        // do queries


        res.status(200).send('Interview set up successfully!');
    });
}