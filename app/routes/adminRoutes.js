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

    app.get('/admin/offers', auth, function (req, res) {
        connection.query('select * from OfferForAdmin',
            function(err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(rows);
                }
            });
    })

}