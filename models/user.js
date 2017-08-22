
//dependencies
const mongoose = require('mongoose');

//schema
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 	image: String,
	bio: String,
	author: Array
});

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
