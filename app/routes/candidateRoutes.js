/**
 * Created by kristys on 2017-11-12.
 */
const connection = require('../connection');

module.exports = function (app) {
  
  var auth = require('./auth.js').auth;

  // candidate view interview notice endpoint
  app.get('/candidate/applintv', auth, function (req,res) {
    connection.query('select * from ApplIntv where resEmail=?', [req.session.email],
      function (err, rows) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(rows);
      }
    });
  });

  app.get('/candidate/profile', auth, function(req, res) {
    connection.query('select name, email, phone, specialty, employmentStatus from ResidencyCandidate where email = ?', [req.session.email],
      function(err, rows) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(rows);
        }
      });
  });


}
