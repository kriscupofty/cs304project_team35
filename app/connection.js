/**
 * Created by kristys on 2017-10-19.
 */
const mysql = require('mysql');
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'cs304team35',
    database : 'cs304project',
    multipleStatements: true
});

module.exports = pool;
