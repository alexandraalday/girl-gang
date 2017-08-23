
//dependencies
const mongoose = require('mongoose');

//schema
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 	image: {type: String, default:''},
	bio: {type: String, default:''},
	author: {type: String, default:''},

});

const User = mongoose.model('User', userSchema);


//export
module.exports = User;
