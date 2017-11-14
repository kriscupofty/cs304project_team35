/**
 * Created by kristys on 2017-11-12.
 */
const connection = require('../connection');

module.exports = function (app) {
    var auth = require('./auth.js').auth;

    // Recruiter post vacancy endpoint
    app.post('/recruiter/postVacancy', auth, function (req, res) {
        var values = [req.session.email, req.body.pname, req.body.dur, req.body.spec, req.body.ddl, req.body.slots];
        connection.query(`insert into VacancyPosting (recruiterEmail,pname,duration,specialty,deadline,numslots) values(?, ?, ?, ?, ?, ?)`, values,
            function (err, json) {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.status(200).send(json);
                }
            });
    });

}
