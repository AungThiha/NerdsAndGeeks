// app/routes.js
var path = require('path');
var fs = require('fs');
// grab the nerd model we just created

module.exports = function(app, express) {

    var nerd = require('./routers/nerd')(express);
    app.use('/api/nerds', nerd);

    app.get('/uploads/:file_name', function(req, res) {
        var f = path.resolve('./uploads/' + req.params.file_name);
        fs.stat(f, function(err, stat) {
            if(err) {
                res.status(404);
                res.json({error: true, message: "file not found"});
            } else {
                res.sendFile(f);
            }
        });

    });

    app.get('*', function(req, res) {
        res.sendFile(path.resolve('./public/index.html')); // load our public/index.html file
    });

};
