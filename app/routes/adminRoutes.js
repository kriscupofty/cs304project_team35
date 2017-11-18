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
    });

    //most preferred candidate(s)
    app.get('/admin/mpc', auth, function (req, res) {
        connection.query(`select *
                          from (select resEmail, name, sum(rank)/count(*) as Average_rank
                                from H_rank HR, ResidencyCandidate C where HR.resEmail = C.email group by resEmail) S
                          group by resEmail, name, Average_rank
                          having Average_rank =
                                    (select min(Average_rank)
                                     from (select sum(rank)/count(*) as Average_rank from H_rank HR group by resEmail) M)`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(rows);
                }
            });
    });

    //most preferred hospital(s)
    app.get('/admin/mph', auth, function (req, res) {
        connection.query(`select *
                          from (select H.hID, name, sum(rank)/count(*) as Average_rank
                                from R_rank RR, Hospital H
                                where RR.hID = H.hID
                                group by hID) S
                          group by hID, name, Average_rank
                          having Average_rank =
                                (select min(Average_rank)
                                 from (select sum(rank)/count(*) as Average_rank
                                       from R_rank RR
                                       group by hID) M)`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(rows);
                }
            });
    });

    // admin add offer endpoint
    app.post('/admin/addoffer', auth, function (req, res) {
      connection.query('insert into Offer values(?, ?, ?, ?)', req.body.values,
      function (err, json) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(json);
        }
      });
    });

    app.get('/admin/offer_rates', auth, function (req, res) {
        connection.query(`select decision, count(*) as count
                          from Offer
                          group by decision`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(rows);
                }
            });
    });

    app.get('/admin/edu_rates', auth, function (req, res) {
        connection.query(`select s.sid AS sid, s.name AS sname, count(*) AS count
                          from Offer o, CandidateAttended c, School s
                          where o.resEmail = c.resEmail AND c.sid = s.sid
                          group by s.sid`,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(rows);
                }
            });
    });

}
