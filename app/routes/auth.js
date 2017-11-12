/**
 * Created by kristys on 2017-11-12.
 */
exports.auth = function(req, res, next) {
    //console.log(req.url);
    var role = req.url.split("/")[1];
    if (req.session && req.session.role == role)
        return next();
    else
        return res.status(401).send('Unauthenticated request');
};