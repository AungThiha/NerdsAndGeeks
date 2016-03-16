var Nerd = require('../models/nerd');
var bleach = require('bleach');
var multer = require('multer'),
    path = require('path');
var fs = require('fs');

module.exports = function (express) {
    var nerd = express.Router();


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve('./uploads/'));
        },
        filename: function (req, file, cb) {
            file.edittedName = Date.now() + file.originalname;
            cb(null, file.edittedName);
        }
    });
    var upload = multer({storage: storage});


    nerd.route('/')
        .get(function (req, res) {

            Nerd.find({$query: {}, $orderby: {createdAt: -1}}, function (err, nerds) {

                if (err)
                    res.send(err);

                res.json(nerds);
            });

        })
        .post(upload.single('photo'), function (req, res) {

            var isValidData = Nerd.isValidData(req);
            if (isValidData.hasOwnProperty('error')) {
                res.status(isValidData.status);
                return res.json(isValidData);
            }

            var nerd = {
                name: req.body['name'],
                age: req.body['age'],
                editable: true
            };

            if(req.file){
                nerd.photos = ["/uploads/" + req.file.edittedName];
            }

            if (Object.prototype.hasOwnProperty.call(req.body, 'address')) {
                nerd.address = bleach.sanitize(req.body['address']);
            }

            if (Object.prototype.hasOwnProperty.call(req.body, 'bio')) {
                nerd.bio = bleach.sanitize(req.body['bio']);
            }

            Nerd(nerd).save(function (err, nerd) {
                if (err) {
                    res.status(500);
                    return res.json({error: true, message: err});
                }
                res.json(nerd);
            });

        });


    nerd.param('nerd_id', function (req, res, next, nerd_id) {

        Nerd.findById(nerd_id, function (err, nerd) {

            if (err) {
                res.status(500);
                return res.json({error: true, message: err});
            }

            if (!nerd) {
                res.status(404);
                return res.json({error: true, message: "nerd not found"});
            }
            req.nerd = nerd;
            next();

        });

    });

    function deleteFile(file) {
        var f = "." + file;
        fs.stat(f, function (err, stat) {
            if (!err) {
                fs.unlink(f);
            }
        });

    }

    nerd.route('/:nerd_id/photos')
        .get(function (req, res) {

            res.json({_id: req.nerd._id, photos: req.nerd.photos});

        })
        .delete(function (req, res) {

            if (req.body.hasOwnProperty('photos') && req.body.photos) {

                var photos = req.body.photos;

                for (var i in photos) {
                    deleteFile(photos[i]);
                }

                req.nerd.update({$pullAll: {photos: photos}}, function (err) {
                    if (err) {
                        res.status(500);
                        return res.json({error: true, message: err});
                    }
                    res.json(photos);
                });

            } else {
                res.status(400);
                res.json({error: null, message: "add some photos for delete"});
            }
        })
        .post(upload.array('photos'), function (req, res) {

            var photos = req.files.map(function (f) {
                return "/uploads/" + f.edittedName;
            });
            req.nerd.update({$push: {photos: {$each: photos, $position: 0}}}, {upsert: true}, function (err) {
                if (err) {
                    res.status(500);
                    return res.json({error: true, message: err});
                }
                res.json(photos);
            });

        });


    nerd.route('/:nerd_id')
        .get(function (req, res) {

            res.json(req.nerd);

        })
        .delete(function (req, res) {
            for (var i in req.nerd.photos) {
                deleteFile(req.nerd.photos[i]);
            }
            req.nerd.remove(function (err) {
                if (err) {
                    res.status(500);
                    return res.json({error: true, message: err});
                }
                res.json({message: "deleted"});
            });

        })
        .put(function (req, res) {

            var isValidData = Nerd.isValidData(req);
            if (isValidData.hasOwnProperty('error')) {
                res.status(isValidData.status);
                return res.json(isValidData);
            }

            req.nerd.name = req.body.name;  // update the bears info
            req.nerd.age = req.body.age;


            if (req.body.hasOwnProperty('address')) {
                req.nerd.address = bleach.sanitize(req.body['address']);
            }

            if (req.body.hasOwnProperty('bio')) {
                req.nerd.bio = bleach.sanitize(req.body['bio']);
            }

            // save the bear
            req.nerd.save(function (err, nerd) {
                if (err) {
                    res.status(500);
                    return res.json({error: true, message: err});
                }

                res.json(nerd);
            });

        });

    return nerd;

};