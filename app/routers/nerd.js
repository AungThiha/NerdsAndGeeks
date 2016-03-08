
var Nerd = require('../models/nerd');
var bleach = require('bleach');

module.exports = function(express){
	var nerd = express.Router();

	nerd.route('/')
		.get(function(req, res) {
	        // use mongoose to get all nerds in the database
	        Nerd.find({$query:{}, $orderby: { createdAt: -1 }}, function(err, nerds) {

	            // if there is an error retrieving, send the error. 
	                            // nothing after res.send(err) will execute
	            if (err)
	                res.send(err);

	            res.json(nerds); // return all nerds in JSON format
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
            	age: req.body['age']
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

	nerd.route('/:nerd_id')
		.get(function(req, res){
			Nerd.findById(req.params.nerd_id, function(err, nerd) {
				if (err){
	            	res.status(500);
	                return res.json({error: true, message: err});
	            }

	            if (!nerd) {
	            	res.status(404);
	            	return res.json({error: true, message: "nerd not found"});
	            }
	            res.json(nerd);
			});
		})
		.put(function(req, res){
			Nerd.findById(req.params.nerd_id, function(err, nerd) {

	            if (err){
	            	res.status(500);
	                return res.json({error: true, message: err});
	            }

	            if (!nerd) {
	            	res.status(404);
	            	return res.json({error: true, message: "nerd not found"});
	            }

	            var isValidData = Nerd.isValidData(req);
		    	if (isValidData.hasOwnProperty('error')) {
		    		res.status(isValidData.status);
		    		return res.json(isValidData);
		    	}

		    	if (!req.body.hasOwnProperty('address')) {
	            	res.status(403);
		    		return res.json({error: true, message: "Address is required"});
	            }

	            if (!req.body.hasOwnProperty('bio')) {
            		res.status(403);
		    		return res.json({error: true, message: "Biography is required"});
            	}

	            nerd.name = req.body.name;  // update the bears info
	            nerd.age = req.body.age;
	            nerd.address = bleach.sanitize(req.body['address']);
	            nerd.bio = bleach.sanitize(req.body['bio']);

	            // save the bear
	            nerd.save(function(err, nerd) {
	                if (err) {
	                    res.status(500);
	                    return res.json({error: true, message: err});
	                }

	                res.json(nerd);
	            });

        	});
		});

	return nerd;

};