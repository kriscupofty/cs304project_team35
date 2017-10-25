/**
 * Created by kristys on 2017-10-23.
 */
module.exports = function () {
    const connection = require('./connection');
    const async = require('async');

    async.waterfall([
        function (callback) {
            connection.query(
                `
                INSERT INTO Admin VALUES ('Test User', 'test@test.com', 'password');
                
                `,
                function (err, result) {
                    if (err && err.code !== 'ER_DUP_KEY' && err.code !== 'ER_DUP_ENTRY') callback(err);
                    else callback(null);
                }
            );
        }
    ], function (err, result) {
        if (err) {
            console.error(err);
            return;
        }
        return console.log('Database has been seeded successfully');
    });
};