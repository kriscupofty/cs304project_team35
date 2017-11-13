/**
 * Created by kristys on 2017-11-12.
 */
const connection = require('../connection');

module.exports = function (app) {
    var auth = require('./auth.js').auth;

    // admin setupinterview endpoint
    app.post('/admin/setupinterview', auth, function (req, res) {
        var values = req.body.values;
        connection.query('insert into Interview values(?, ?, ?, ?)', values,
            function (err, json) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(json);
                }
            });
    });

    app.get('/admin/offers', auth, function (req, res) {
        connection.query('select * from OfferForAdmin',
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(rows);
                }
            });
    })

}