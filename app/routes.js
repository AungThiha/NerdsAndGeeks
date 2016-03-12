// app/routes.js
var path = require('path');
// grab the nerd model we just created

module.exports = function(app, express) {

    var nerd = require('./routers/nerd')(express);
    app.use('/api/nerds', nerd);

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.resolve('./public/index.html')); // load our public/index.html file
    });

};
