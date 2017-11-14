/**
* Created by kristys on 2017-11-12.
*/
const connection = require('../connection');

module.exports = function (app) {
  var auth = require('./auth.js').auth;

  // Recruiter post vacancy endpoint
  app.post('/recruiter/postVacancy', auth, function (req, res) {
    var values = [req.session.email, req.body.pname, req.body.dur, req.body.spec, req.body.ddl, req.body.slots];
    connection.query('insert into VacancyPosting (recruiterEmail,pname,duration,specialty,deadline,numslots) values(?, ?, ?, ?, ?, ?)', values,
    function (err, json) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(200).send(json);
      }
    });
  });

  // Recruiter view posting endpoint
  app.get('/recruiter/postings', auth, function (req, res) {
    connection.query('select postingID,pname,duration,specialty,deadline,numslots from VacancyPosting where recruiterEmail=?', [req.session.email],
    function (err, json) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log(json);
        res.status(200).send(json);
      }
    });
  });

  // Recruiter delete posting endpoint
  app.delete('/recruiter/deletePosting/:postID', auth, function (req, res) {
    checkIDUpdate(req,res,'DELETE FROM VacancyPosting where recruiterEmail=? AND postingID=?',
    [req.session.email, req.body.postingID],
    'Successfully deleted posting with postingID '+ req.body.postingID +'.');
  });

  // Recruiter update program name of a posting endpoint
  app.put('/recruiter/updpname/:postID', auth, function (req, res) {
    checkIDUpdate(req,res,'UPDATE VacancyPosting SET pname=? where recruiterEmail=? AND postingID=?',
    [req.body.pname, req.session.email, req.body.postingID],
    'Successfully update pname of postingID '+ req.body.postingID +'.');});

  // Recruiter update program duration endpoint
  app.put('/recruiter/upddur/:postID', auth, function (req, res) {
    checkIDUpdate(req,res,'UPDATE VacancyPosting SET duration=? where recruiterEmail=? AND postingID=?',
    [req.body.dur, req.session.email, req.body.postingID],
    'Successfully update duration of postingID '+ req.body.postingID +'.');});

  // Recruiter update program specialty endpoint
  app.put('/recruiter/updspec/:postID', auth, function (req, res) {
    checkIDUpdate(req,res,'UPDATE VacancyPosting SET specialty=? where recruiterEmail=? AND postingID=?',
    [req.body.spec, req.session.email, req.body.postingID],
    'Successfully update specialty of postingID '+ req.body.postingID +'.');});

  // Recruiter update program deadline endpoint
  app.put('/recruiter/updddl/:postID', auth, function (req, res) {
    checkIDUpdate(req,res,'UPDATE VacancyPosting SET deadline=? where recruiterEmail=? AND postingID=?',
    [req.body.ddl, req.session.email, req.body.postingID],
    'Successfully update specialty of postingID '+ req.body.postingID +'.');});

  // Recruiter update program #slots endpoint
  app.put('/recruiter/updslots/:postID', auth, function (req, res) {
    checkIDUpdate(req,res,'UPDATE VacancyPosting SET numslots=? where recruiterEmail=? AND postingID=?',
    [req.body.slots, req.session.email, req.body.postingID],
    'Successfully update #slots of postingID '+ req.body.postingID +'.');});

  function checkIDUpdate(req,res, query,data,msg) {
    connection.query('select * from VacancyPosting where recruiterEmail=? AND postingID=?',
    [req.session.email, req.body.postingID],
    function (err, json) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        if (json.length===0) {
          res.status(204).send('Non existing posting ID for this recruiter');
        } else {
          updateInfo(res,query, data, msg);
        }
      }});
    }

    function updateInfo(res, query, data,msg) {
      connection.query(query, data,
        function (err, json) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.status(200).send(msg);
          }
        });
      }

}
