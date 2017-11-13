/**
 * Created by kristys on 2017-10-19.
 */

const express = require('express');
const connection = require('./connection');
const app = express(),
    session = require('express-session');

//require('./init-db');

app.use(session({
    secret: 'yekterces',
    resave: false,
    saveUninitialized: true
}));

app.set('views', './views');
app.use('/', express.static(__dirname + '/views'));
app.use('/public', express.static(__dirname + '/public'));
app.use(require('body-parser').json());

// Include all Routes
require('./routes/routes')(app);

// Admin login endpoint
app.post('/login/:role', function (req, res) {  // request
    if (!req.body.email || !req.body.pw) {
        res.status(400).send('Login failed: please enter all fields.');
    } else {
        var role = req.params.role, query;
        if (role == 'admin')
            query = 'SELECT email, pw from Admin where email=?';
        else if (role == 'recruiter')
            query = 'SELECT email, pw from Recruiter where email=?';
        else query = 'SELECT email, pw from ResidencyCandidate where email=?';

        connection.query(query,
            [req.body.email],
            function (err, rows) {       // rows will contain the results of query.
                if (err) {
                    console.log(err);
                    res.status(400).send('login failed');
                } else {
                    if (rows.length == 0) {
                        res.status(401).send('Login failed: Username does not exist.');
                    }
                    else if (rows[0].pw == req.body.pw) {
                        req.session.role = role;
                        req.session.email = req.body.email;
                        res.status(200).send("Logged in as" + role);
                    }
                    else res.status(401).send('Login failed: Username does not match password.');
                }
            });
    }
});

// Logout endpoint
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("/index.html");
});

app.get('/isloggedin/:role', function (req, res) {
    if (req.session && req.session.role == req.params.role)
        return res.status(200).send('Logged in');
    else
        return res.status(401).send('Not loggied in');
});

// registration endpoint
app.post('/register/:role', function (req, res) {  // request
    var role = req.params.role, query, data;

    function insertData(query, data) {
        connection.query(query, data, function (err) {
            if (err) {
                console.log(err);
                res.status(400).send('Sign up failed');
            } else {
                res.status(200).send('Sign up successfully');
            }
        });
    }

    if (role == 'admin') {
        query = 'INSERT INTO Admin VALUES (?,?,?,?)';
        data = [req.body.name, req.body.email, req.body.phone, req.body.pw];
        insertData(query, data);
    } else if (role == 'recruiter') {
        data = [req.body.name, rows[0].hID, req.body.email, req.body.phone, req.body.pw];
        query = 'INSERT INTO Recruiter VALUES (?,?,?,?,?)';
        insertData(query, data);

    } else {
        data = [req.body.name, req.body.spec, req.body.empl, req.body.email, req.body.phone, req.body.pw];
        query = 'INSERT INTO ResidencyCandidate VALUES (?,?,?,?,?,?)';
        insertData(query, data);
    }
});

app.listen(1234);
console.log("app running at http://localhost:1234");

module.exports.getApp = app;