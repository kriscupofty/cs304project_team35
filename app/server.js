/**
 * Created by kristys on 2017-10-19.
 */

const express = require('express');
const connection = require('./connection');
const app = express(),
    session = require('express-session');

//require('./init-db'); // Todo: create all tables and populate them

app.use(session({
    secret: 'yekterces',
    resave: true,
    saveUninitialized: true
}));

app.set('views', './views');
app.use(express.static('./views'));
app.use('/public', express.static('./public'));
app.use(require('body-parser').json());

// Admin login endpoint
app.post('/login/admin', function (req, res) {  // request
    if (!req.body.email || !req.body.pw) {
        res.status(400).send('Login failed: please enter all fields.');
    } else {
        connection.query('SELECT email, pw from Admin where email=? ',
            [req.body.email],           // using the placeholder value
            function(err, rows) {       // rows will contain the results of query.
                if (err) {
                    console.log(err);
                    res.status(400).send('login failed');
                } else {
                    if(rows.length == 0){
                        res.status(401).send('Login failed: Username does not exist.');
                    }
                    else if(rows[0].pw == req.body.pw){
                        req.session.role = 'admin';
                        res.status(200).send("logged in as admin!");
                    }
                    else res.status(401).send('Login failed: Username does not match password.');
                }
            });
    }
});

//Todo: login endpoints for Recruiter and ResidencyCandidate
// for candidate
app.post('/login/candidate', function (req, res) {  // request
    if (!req.body.email || !req.body.pw) {
        res.status(400).send('Login failed: please enter all fields.');
    } else {
        connection.query('SELECT email, pw from Admin where email=? ',
            [req.body.email],           // using the placeholder value
            function(err, rows) {       // rows will contain the results of query.
                if (err) {
                    console.log(err);
                    res.status(400).send('login failed');
                } else {
                    if(rows.length == 0){
                        res.status(401).send('Login failed: Username does not exist.');
                    }
                    else if(rows[0].pw == req.body.pw){
                        req.session.role = 'admin';
                        res.status(200).send("logged in as admin!");
                    }
                    else res.status(401).send('Login failed: Username does not match password.');
                }
            });
    }
});


// for recruiter
app.post('/login/recruiter', function (req, res) {  // request
    if (!req.body.email || !req.body.pw) {
        res.status(400).send('Login failed: please enter all fields.');
    } else {
        connection.query('SELECT email, pw from Admin where email=? ',
            [req.body.email],           // using the placeholder value
            function(err, rows) {       // rows will contain the results of query.
                if (err) {
                    console.log(err);
                    res.status(400).send('login failed');
                } else {
                    if(rows.length == 0){
                        res.status(401).send('Login failed: Username does not exist.');
                    }
                    else if(rows[0].pw == req.body.pw){
                        req.session.role = 'admin';
                        res.status(200).send("logged in as admin!");
                    }
                    else res.status(401).send('Login failed: Username does not match password.');
                }
            });
    }
});




var adminAuth = function(req, res, next) {
    if (req.session && req.session.role == 'admin')
        return next();
    else
        return res.status(401).send('Unauthenticated request');
};
// Todo: create auth middleware functions for Recruiter and ResidencyCandidate


// admin setupinterview endpoint
app.post('/admin/setupinterview', adminAuth, function (req, res) {
    // do queries


    res.status(200).send('Interview set up successfully!');
});

//Todo: other endpoints for queries we expect our app to be able to do

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("/index.html");
});

app.listen(1234);
console.log("app running at http://localhost:1234");

module.exports.getApp = app;