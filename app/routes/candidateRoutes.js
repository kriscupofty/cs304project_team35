/**
 * Created by kristys on 2017-11-12.
 */
const connection = require('../connection');

module.exports = function (app) {
  
  var auth = require('./auth.js').auth;

  // candidate view interview notice endpoint
  app.get('/candidate/applintv', auth, function (req,res) {
    connection.query(`select * from ApplIntv where resEmail=?`, [req.session.email],
      function (err, rows) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(rows);
      }
    });
  });

  // candidate profile endpoint
  app.get('/candidate/profile', auth, function(req, res) {
    connection.query(`select name, email, phone, specialty, employmentStatus from ResidencyCandidate where email = ?`, 
      [req.session.email],
      function(err, rows) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(rows);
        }
      });
  });


  app.post('/candidate/updateProfile', auth, function(req, res) {
    connection.query(`update ResidencyCandidate set name = ?, phone = ?, specialty = ?, employmentStatus = ? where email = ?`, 
    req.body.values,
    function(err) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          console.log("success");
          res.status(200).send("Profile updated successfully.");
        }
    });
  });


  // candidate application endpoint
  app.get('/candidate/application', auth, function(req, res) {
    connection.query(`select A.postingID, H.name, VP.pname, VP.duration, VP.specialty, A.time from Application A, 
      VacancyPosting VP, Recruiter R, Hospital H where A.postingID = VP.postingID and VP.recruiterEmail = R.email 
      and R.hID = H.hID and A.resEmail = ?`, [req.session.email],
      function(err, rows) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.status(200).send(rows);
        }
      });
  });

  // display all postings endpoint
  app.get('/candidate/postings', auth, function(req, res) {
    connection.query(`select H.name, pname, duration, specialty, deadline, numslots, recruiterEmail from 
      VacancyPosting VP, Recruiter R, Hospital H where VP.recruiterEmail = R.email and R.hID = H.hID`,
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
