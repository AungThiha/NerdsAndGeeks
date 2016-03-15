
var Nerd = require('../models/nerd');
var bleach = require('bleach');

module.exports = function(express){
	var nerd = express.Router();

	nerd.route('/')
		.get(function(req, res) {

	        Nerd.find({$query:{}, $orderby: { createdAt: -1 }}, function(err, nerds) {

	            if (err)
	                res.send(err);

	            res.json(nerds);
	        });

	    })
	    .post(function(req, res){
	    	
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

            if (req.body.hasOwnProperty('address')) {
            	nerd.address = bleach.sanitize(req.body['address']);
            }

            if (req.body.hasOwnProperty('bio')) {
            	nerd.bio = bleach.sanitize(req.body['bio']);
            }

            Nerd(nerd).save(function(err, nerd){
                if (err) {
                    res.status(500);
                    return res.json({error: true, message: err});
                }
                res.json(nerd);
            });

	    });


    nerd.param('nerd_id', function(req, res, next, nerd_id){

        Nerd.findById(nerd_id, function(err, nerd) {

            if (err){
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

	nerd.route('/:nerd_id')
		.get(function(req, res){

            res.json(req.nerd);

		})
		.delete(function(req, res){

			req.nerd.remove(function(err) {
				if (err) {
					res.status(500);
	                return res.json({error: true, message: err});
			    }
				res.json({message: "deleted"});
			});

		})
		.put(function(req, res){

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
            req.nerd.save(function(err, nerd) {
                if (err) {
                    res.status(500);
                    return res.json({error: true, message: err});
                }

                res.json(nerd);
            });

		});


	var multer = require('multer'),
			path = require('path');

	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.resolve('./uploads/'));
		},
		filename: function (req, file, cb) {
            file.edittedName = Date.now() + file.originalname;
			cb(null, file.edittedName);
		}
	});
	var upload = multer({ storage: storage });

	nerd.route('/:nerd_id/photos')
			.get(function(req, res){

                res.json({_id: req.nerd._id, photos: req.nerd.photos});

			})
			.post(upload.array('photos'), function(req, res){

                var photos = req.files.map(function(f){
                    return "/uploads/" + f.edittedName;
                });
                req.nerd.update({$push: {photos: { $each: photos}}}, {upsert:true}, function(err){
                    if (err) {
                        res.status(500);
                        return res.json({error: true, message: err});
                    }
                    res.json(photos);
                });

			});

	return nerd;

};