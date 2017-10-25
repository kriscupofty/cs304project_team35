/**
 * Created by kristys on 2017-10-19.
 */
const connection = require('./connection');
const async = require('async');

async.waterfall([
    function (callback) {
        connection.query(
            `CREATE TABLE Admin (
                name varchar(30),
                email varchar(30),
                pw varchar(30),
                PRIMARY KEY(email)
            )`,
            function (err, result) {
                if (err && err.code !== 'ER_TABLE_EXISTS_ERROR') callback(err);
                else callback(null);
            }
        );
    }

], function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Tables have been created');
    require('./seed-db.js')();
});
