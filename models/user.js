
//dependencies
const mongoose = require('mongoose');

//schema
const userSchema = mongoose.Schema({
 	name: String,
  email: String,
  password: String,
 	image: String,
	bio: String,
	author: Array
});

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
