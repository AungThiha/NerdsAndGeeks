// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called


var nerdSchema = new mongoose.Schema({
    name : {type : String, required: true},
    age: {type: Number, required: true},
    address: String,
    bio: String,
    photos: [String],
    editable: Boolean
},
{
    timestamps: true
});

var Nerd = mongoose.model('Nerd', nerdSchema);


Nerd.isValidName = function(name){
	var re = /^[a-zA-Z ]*$/;
	return re.test(name);
}

Nerd.isValidData = function(req){
	var retval = {};
	if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('age')) {
        retval = {
        	error: true,
        	status: 403,
        	message: 'Both name and age are required'
        };
    }
    if (!Nerd.isValidName(req.body['name'])) {
    	retval = {
        	error: true,
        	status: 403,
        	message: 'Name is not valid'
        };
    }

    req.body.age = parseFloat(req.body['age']);
    if (typeof req.body.age !== "number" || isNaN(req.body.age)) {
    	retval = {
        	error: true,
        	status: 403,
        	message: 'Age must be numeric value'
        };
    }
    return retval;
};

/*Nerd.isValid = function(){
	return true;
};*/

module.exports = Nerd; 