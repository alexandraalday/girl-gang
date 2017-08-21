
//dependencies
const mongoose = require('mongoose');

//schema
const userSchema = mongoose.Schema({
 	name: String,
 	image: String,
	bio: String,
	author: []
});

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
