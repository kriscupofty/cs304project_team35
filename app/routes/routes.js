/**
 * Created by kristys on 2017-11-12.
 */
module.exports = function(app) {
    require('./auth');

    require('./adminRoutes')(app);
    require('./candidateRoutes')(app);
    require('./recruiterRoutes')(app);
}
